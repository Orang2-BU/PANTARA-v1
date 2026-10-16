import type { Decision } from "@/lib/demo/types";

/** Indikator dampak proposal §4.1: penerimaan, override, penolakan, Tp, konflik terdeteksi. */
export function decisionStats(decisions: Decision[]) {
  const assigned = decisions.filter(d => !d.rejected);
  const accepted = assigned.filter(d => d.rank !== null).length;
  return {
    n: decisions.length,
    assigned: assigned.length,
    accepted,
    override: assigned.length - accepted,
    rejected: decisions.length - assigned.length,
    // Tp = lama sampai penugasan ditetapkan, jadi penolakan tidak ikut dirata-rata.
    avgMs: assigned.length ? assigned.reduce((s, d) => s + d.decisionMs, 0) / assigned.length : 0,
    conflicts: decisions.reduce((s, d) => s + d.conflictsSeen, 0),
  };
}
