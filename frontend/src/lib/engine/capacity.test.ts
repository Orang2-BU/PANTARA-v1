import { describe, expect, it } from "vitest";
import type { Member, Task } from "@/lib/demo/types";
import { committedUntil, hoursUntil, loadScore, overrunFactor, replanRisks, weeklyLoad, workdays } from "./capacity";

const member = (patch: Partial<Member> = {}): Member => ({
  id: "m", name: "Mira Lestari", initials: "ML", role: "Pengembang", email: "m@contoh.id",
  availableHours: 32, leaveDates: [], weeklyLimit: 40, competencies: [], prefers: [], avoids: [], access: "anggota", ...patch,
});
const task = (patch: Partial<Task>): Task => ({
  id: "T", projectId: "p", title: "Tugas", description: "", dueDate: "2026-10-02", priority: "normal", status: "berjalan",
  assignments: [{ memberId: "m", hours: 8 }], remainingHours: 6, createdAt: "2026-09-28T09:00:00+07:00", competencyIds: [], ...patch,
});

describe("workdays", () => {
  it("menghitung Senin-Jumat secara inklusif", () => {
    expect(workdays("2026-09-29", "2026-10-02")).toEqual(["2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02"]);
  });

  it("melewati akhir pekan", () => {
    expect(workdays("2026-10-02", "2026-10-06")).toEqual(["2026-10-02", "2026-10-05", "2026-10-06"]);
  });

  it("kosong bila tanggal akhir sebelum awal", () => {
    expect(workdays("2026-10-02", "2026-09-30")).toEqual([]);
  });
});

describe("hoursUntil", () => {
  it("jam per hari kerja dikali hari kerja tersisa sampai tenggat", () => {
    expect(hoursUntil(member(), "2026-10-02", "2026-09-29")).toBeCloseTo(25.6);
  });

  it("hari cuti di dalam rentang mengurangi kapasitas, cuti yang sudah lewat diabaikan", () => {
    expect(hoursUntil(member({ leaveDates: ["2026-09-30"] }), "2026-10-02", "2026-09-29")).toBeCloseTo(19.2);
    expect(hoursUntil(member({ leaveDates: ["2026-09-25"] }), "2026-10-02", "2026-09-29")).toBeCloseTo(25.6);
  });

  it("nol bila semua hari kerja sampai tenggat cuti, atau ketersediaan belum diisi", () => {
    expect(hoursUntil(member({ leaveDates: ["2026-09-29", "2026-09-30"] }), "2026-09-30", "2026-09-29")).toBe(0);
    expect(hoursUntil(member({ availableHours: null }), "2026-10-02", "2026-09-29")).toBe(0);
  });
});

describe("committedUntil", () => {
  it("menjumlah sisa jam tugas aktif yang jatuh tempo sampai tenggat, dibagi sesuai porsi jam", () => {
    const tasks = [
      task({ id: "A", dueDate: "2026-10-01", remainingHours: 6 }),
      task({ id: "B", dueDate: "2026-10-02", remainingHours: 6, assignments: [{ memberId: "m", hours: 4 }, { memberId: "x", hours: 4 }] }),
      task({ id: "C", dueDate: "2026-10-05", remainingHours: 9 }),
      task({ id: "D", status: "selesai", remainingHours: 0 }),
    ];
    expect(committedUntil("m", "2026-10-02", tasks)).toBe(9);
    expect(committedUntil("m", "2026-10-02", tasks, "A")).toBe(3);
  });
});

describe("loadScore", () => {
  it("1 saat kosong, 0 saat penuh atau lewat", () => {
    expect(loadScore(0)).toBe(1);
    expect(loadScore(1)).toBe(0);
    expect(loadScore(1.2)).toBe(0);
  });

  it("turun pelan di beban rendah dan tajam mendekati penuh (cembung, seperti antrean)", () => {
    const loss = (u: number) => 1 - loadScore(u);
    expect(loss(0.9) - loss(0.75)).toBeGreaterThan(3 * (loss(0.15) - loss(0)));
    expect(loadScore(0.85)).toBeCloseTo(0.575, 3);
  });
});

describe("overrunFactor", () => {
  it("memakai asumsi 1,5 bila jam aktual kurang dari 5 tugas", () => {
    expect(overrunFactor([task({ status: "selesai", actualHours: 12 })])).toEqual({ factor: 1.5, samples: 1 });
  });

  it("memakai persentil ke-80 rasio jam aktual / rencana bila data cukup", () => {
    const done = [1, 1.2, 1.4, 1.6, 2].map((r, i) => task({ id: `S${i}`, status: "selesai", remainingHours: 0, assignments: [{ memberId: "m", hours: 10 }], actualHours: 10 * r }));
    expect(overrunFactor(done)).toEqual({ factor: 1.6, samples: 5 });
  });

  it("tidak pernah di bawah 1", () => {
    const fast = Array.from({ length: 5 }, (_, i) => task({ id: `F${i}`, status: "selesai", assignments: [{ memberId: "m", hours: 10 }], actualHours: 6 }));
    expect(overrunFactor(fast).factor).toBe(1);
  });
});

describe("replanRisks", () => {
  it("menandai tugas yang penanggung jawabnya cuti sampai tenggat atau kekurangan jam", () => {
    const tasks = [
      task({ id: "A", dueDate: "2026-09-30", remainingHours: 4, assignments: [{ memberId: "cuti", hours: 4 }] }),
      task({ id: "B", dueDate: "2026-09-30", remainingHours: 20, assignments: [{ memberId: "padat", hours: 20 }] }),
      task({ id: "C", dueDate: "2026-10-02", remainingHours: 4, assignments: [{ memberId: "aman", hours: 4 }] }),
    ];
    const members = [
      member({ id: "cuti", leaveDates: ["2026-09-29", "2026-09-30"] }),
      member({ id: "padat" }),
      member({ id: "aman" }),
    ];
    const risks = replanRisks(tasks, members, "2026-09-29");
    expect(risks.map(r => [r.task.id, r.member.id, r.kind])).toEqual([["A", "cuti", "cuti"], ["B", "padat", "kurang-jam"]]);
    expect(risks[1].shortfall).toBeCloseTo(20 - 12.8);
  });
});

describe("weeklyLoad", () => {
  it("menyebar sisa jam rata ke hari kerja sampai tenggat, per minggu", () => {
    const tasks = [task({ dueDate: "2026-10-09", remainingHours: 9 })];
    const weeks = weeklyLoad(member(), tasks, "2026-09-29", 3);
    expect(weeks.map(w => w.start)).toEqual(["2026-09-28", "2026-10-05", "2026-10-12"]);
    expect(weeks.map(w => Math.round(w.hours * 10) / 10)).toEqual([4, 5, 0]);
    expect(weeks[0].capacity).toBeCloseTo(25.6);
    expect(weeks[1].capacity).toBe(32);
  });
});
