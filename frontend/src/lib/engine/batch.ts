import type { Member, Task } from "@/lib/demo/types";
import { rankCandidates, type EngineSettings } from "./score";

export interface BatchPair { task: Task; memberId: string | null; score: number; reason?: string }

const PRIORITY = { tinggi: 0, normal: 1, rendah: 2 } as const;

/**
 * Alokasi banyak tugas sekaligus. Versi mockup: serakah per prioritas lalu tenggat,
 * kapasitas diperbarui setiap pasangan. MVP: OR-Tools CP-SAT memaksimalkan Σ skor (03-ARCHITECTURE E3).
 */
export function allocateBatch(open: Task[], members: Member[], tasks: Task[], settings: EngineSettings, names: Record<string, string> = {}): BatchPair[] {
  let working = tasks;
  const ordered = [...open].sort((a, b) => PRIORITY[a.priority] - PRIORITY[b.priority] || a.dueDate.localeCompare(b.dueDate));
  return ordered.map(task => {
    const { candidates, filtered, effort } = rankCandidates(task, members, working, settings, names);
    const best = candidates[0];
    if (!best) {
      // Jelaskan lewat anggota yang paling dekat lolos (gagal syarat paling sedikit).
      const closest = [...filtered].sort((x, y) => x.failures.length - y.failures.length)[0];
      const reason = closest ? `Tidak ada yang lolos syarat wajib. Paling dekat ${closest.member.name}: ${closest.failures[0].toLowerCase()}` : "Tidak ada anggota";
      return { task, memberId: null, score: 0, reason };
    }
    working = working.map(t => t.id === task.id ? { ...t, status: "menunggu", assignments: [{ memberId: best.member.id, hours: effort }] } : t);
    return { task, memberId: best.member.id, score: best.score };
  });
}
