import { describe, expect, it } from "vitest";
import type { Decision } from "@/lib/demo/types";
import { decisionStats } from "./metrics";

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
