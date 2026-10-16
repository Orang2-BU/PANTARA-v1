import { describe, expect, it } from "vitest";
import { MEMBERS, TASKS } from "@/lib/demo/seed";
import type { Task } from "@/lib/demo/types";
import { allocateBatch } from "./batch";
import { DEFAULT_SETTINGS, allocatedHours, rankCandidates } from "./score";
import { simulate, utilTone } from "./whatif";

const auth = TASKS.find(t => t.id === "TGS-0142") as Task;
/** Skenario demo: manajer mengoreksi estimasi Task DNA dari 6 ke 8 jam. */
const authCorrected: Task = { ...auth, dna: { ...auth.dna!, effortHours: 8, confirmed: true } };

describe("seed", () => {
  it("jam teralokasi sama dengan prototipe proposal (110 dari 160 jam)", () => {
    const perMember = MEMBERS.map(m => allocatedHours(m.id, TASKS));
    expect(perMember).toEqual([28, 16, 20, 22, 24, 0]);
    expect(perMember.reduce((a, b) => a + b)).toBe(110);
  });
});

describe("rankCandidates", () => {
  it("menyaring anggota yang ketersediaannya belum diisi", () => {
    const { filtered } = rankCandidates(authCorrected, MEMBERS, TASKS);
    expect(filtered.find(f => f.member.id === "rafi")?.failures[0]).toMatch(/belum diisi/);
  });

  it("menyaring anggota yang level kompetensinya di bawah minimum", () => {
    const { filtered } = rankCandidates(authCorrected, MEMBERS, TASKS);
    expect(filtered.map(f => f.member.id)).toEqual(expect.arrayContaining(["citra", "nadia"]));
    const named = rankCandidates(authCorrected, MEMBERS, TASKS, DEFAULT_SETTINGS, { "backend-api": "Backend API" });
    expect(named.filtered.find(f => f.member.id === "citra")?.failures).toContain("Backend API belum dimiliki, butuh minimal Dasar");
  });

  it("memeringkat Bima di atas karena kompetensi, kapasitas, dan riwayat", () => {
    const { candidates } = rankCandidates(authCorrected, MEMBERS, TASKS);
    expect(candidates.map(c => c.member.id)).toEqual(["bima", "ayu", "dimas"]);
    expect(candidates[0].score).toBeCloseTo(0.6625, 3);
  });

  it("preset Sebar pengetahuan menaikkan anggota tanpa riwayat sejenis", () => {
    const { candidates } = rankCandidates(authCorrected, MEMBERS, TASKS, { ...DEFAULT_SETTINGS, preset: "sebar" });
    expect(candidates.map(c => c.member.id)).toEqual(["bima", "dimas", "ayu"]);
  });

  it("menandai beban melebihi kapasitas sebagai risiko penuh", () => {
    const ayu = rankCandidates(authCorrected, MEMBERS, TASKS).candidates.find(c => c.member.id === "ayu")!;
    expect(ayu.utilAfter).toBeCloseTo(1.125);
    expect(ayu.factors.f).toBe(1);
    expect(ayu.cautions.join(" ")).toMatch(/melebihi kapasitas/);
  });

  it("alasan sesuai angka faktor", () => {
    const bima = rankCandidates(authCorrected, MEMBERS, TASKS).candidates[0];
    expect(bima.reasons).toContain("Memenuhi semua level kompetensi yang dibutuhkan");
    expect(bima.reasons).toContain("Beban setelah penugasan 75%, masih aman");
  });
});

describe("simulate", () => {
  it("menghitung beban sebelum dan sesudah tanpa mengubah data", () => {
    const sim = simulate(authCorrected, [{ memberId: "bima", hours: 8 }], MEMBERS, TASKS);
    const bima = sim.rows.find(r => r.member.id === "bima")!;
    expect([bima.before, bima.after]).toEqual([16, 24]);
    expect(allocatedHours("bima", TASKS)).toBe(16);
  });

  it("memunculkan konflik kapasitas, tenggat, dan dependensi", () => {
    const sim = simulate(authCorrected, [{ memberId: "ayu", hours: 8 }], MEMBERS, TASKS);
    expect(sim.conflicts.map(c => c.tone)).toContain("crit");
    expect(sim.conflicts.some(c => /berdekatan/.test(c.text))).toBe(true);
    expect(sim.conflicts.some(c => /Bergantung/.test(c.text))).toBe(true);
  });

  it("memberi nada sesuai ambang utilisasi", () => {
    expect([utilTone(0.5), utilTone(0.86), utilTone(1.1)]).toEqual(["ok", "warn", "crit"]);
  });
});

describe("allocateBatch", () => {
  it("mengalokasikan tiap tugas terbuka dan menjelaskan yang tidak bisa", () => {
    const open = TASKS.filter(t => t.status === "belum");
    const pairs = allocateBatch(open, MEMBERS, TASKS, DEFAULT_SETTINGS);
    expect(pairs).toHaveLength(3);
    expect(pairs[0].task.id).toBe("TGS-0142");
    const qa = pairs.find(p => p.task.id === "TGS-0144")!;
    expect(qa.memberId).toBeNull();
    expect(qa.reason).toBeTruthy();
  });
});
