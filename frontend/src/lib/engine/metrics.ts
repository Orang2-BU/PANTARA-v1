import type { Decision, Task } from "@/lib/demo/types";
import { plannedHours } from "./capacity";

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

const WEEK_MS = 7 * 86_400_000;
const people = (d: Decision) => [...d.memberIds].sort().join();

/**
 * North Star (01-PRD §3): penugasan yang ditetapkan lewat PANTARA dan tidak dipindah ulang dalam 7 hari.
 * Dipindah = ada keputusan lain untuk tugas yang sama dengan penerima berbeda dalam 7 hari. Keputusan yang belum
 * genap 7 hari dihitung "menunggu" dan tidak ikut rasio.
 */
export function stabilityRate(decisions: Decision[], now: string) {
  const assigned = decisions.filter(d => !d.rejected);
  const nowMs = new Date(now).getTime();
  let stable = 0, moved = 0, pending = 0;
  for (const d of assigned) {
    const at = new Date(d.decidedAt).getTime();
    const replaced = assigned.some(x => x !== d && x.taskId === d.taskId && x.decidedAt > d.decidedAt
      && new Date(x.decidedAt).getTime() - at <= WEEK_MS && people(x) !== people(d));
    if (replaced) moved++;
    else if (nowMs - at < WEEK_MS) pending++;
    else stable++;
  }
  return { stable, moved, pending, rate: stable + moved ? stable / (stable + moved) : 0 };
}

/** Akurasi estimasi: rata-rata rasio jam aktual / rencana dari tugas selesai yang punya jam aktual. */
export function estimateAccuracy(tasks: Task[]) {
  const done = tasks.filter(t => t.status === "selesai" && t.actualHours !== undefined && plannedHours(t) > 0);
  const ratio = done.length ? done.reduce((s, t) => s + (t.actualHours as number) / plannedHours(t), 0) / done.length : 0;
  return { n: done.length, ratio: Math.round(ratio * 100) / 100 };
}
