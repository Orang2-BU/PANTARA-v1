import { describe, expect, it } from "vitest";
import type { Decision, Task } from "@/lib/demo/types";
import { decisionStats, estimateAccuracy, stabilityRate } from "./metrics";

const base = { taskId: "TGS-1", preset: "seimbang", decidedAt: "2026-09-29T09:00:00+07:00", conflictsSeen: 1 } as const;
const decisions: Decision[] = [
  { ...base, id: "KPT-1", memberIds: ["bima"], rank: 1, decisionMs: 6 * 60_000 },
  { ...base, id: "KPT-2", memberIds: ["nadia"], rank: null, reasonCode: "klien", decisionMs: 10 * 60_000 },
  { ...base, id: "KPT-3", memberIds: [], rank: null, rejected: true, reasonCode: "tidak-sesuai", decisionMs: 4 * 60_000 },
];

describe("decisionStats", () => {
  it("menghitung penolakan terpisah dari override", () => {
    expect(decisionStats(decisions)).toMatchObject({ n: 3, accepted: 1, override: 1, rejected: 1, conflicts: 3 });
  });

  it("Tp rata-rata hanya dari keputusan yang menetapkan penugasan", () => {
    expect(decisionStats(decisions).avgMs).toBe(8 * 60_000);
  });
});

describe("stabilityRate (North Star: penugasan tidak dipindah ulang dalam 7 hari)", () => {
  const at = (day: number) => `2026-09-${String(day).padStart(2, "0")}T09:00:00+07:00`;
  const d = (id: string, taskId: string, day: number, memberIds: string[], extra: Partial<Decision> = {}): Decision =>
    ({ id, taskId, memberIds, rank: 1, preset: "seimbang", decidedAt: at(day), decisionMs: 60_000, conflictsSeen: 0, ...extra });

  it("stabil bila tidak ada keputusan lain untuk tugas yang sama dalam 7 hari", () => {
    const list = [d("1", "A", 1, ["x"]), d("2", "A", 4, ["y"]), d("3", "B", 2, ["x"]), d("4", "C", 3, [], { rejected: true })];
    expect(stabilityRate(list, at(20))).toEqual({ stable: 2, moved: 1, pending: 0, rate: 2 / 3 });
  });

  it("keputusan yang belum genap 7 hari dihitung menunggu, bukan stabil", () => {
    const list = [d("1", "A", 1, ["x"]), d("2", "B", 18, ["y"])];
    expect(stabilityRate(list, at(20))).toEqual({ stable: 1, moved: 0, pending: 1, rate: 1 });
  });

  it("pemindahan setelah lewat 7 hari tidak membatalkan stabilitas", () => {
    const list = [d("1", "A", 1, ["x"]), d("2", "A", 12, ["y"])];
    expect(stabilityRate(list, at(25)).moved).toBe(0);
  });
});

describe("estimateAccuracy", () => {
  const done = (planned: number, actual?: number): Task => ({
    id: `T${planned}${actual}`, projectId: "p", title: "", description: "", dueDate: "2026-09-30", priority: "normal", status: "selesai",
    assignments: [{ memberId: "m", hours: planned }], remainingHours: 0, createdAt: "2026-09-20T09:00:00+07:00", competencyIds: [], actualHours: actual,
  });

  it("rata-rata rasio jam aktual / rencana, hanya dari tugas yang punya jam aktual", () => {
    expect(estimateAccuracy([done(8, 12), done(10, 10), done(6)])).toEqual({ n: 2, ratio: 1.25 });
  });

  it("kosong bila belum ada jam aktual", () => {
    expect(estimateAccuracy([done(6)])).toEqual({ n: 0, ratio: 0 });
  });
});

