import type { Assignment, Member, Task } from "@/lib/demo/types";
import { shortDate } from "@/lib/format";
import { allocatedHours, nearbyDeadlines } from "./score";

export type Tone = "ok" | "warn" | "crit";

interface SimRow {
  member: Member;
  before: number;
  after: number;
  available: number;
  added: number;
}

interface Conflict { tone: Tone; text: string }

export function utilTone(util: number): Tone {
  return util >= 1 ? "crit" : util >= 0.85 ? "warn" : "ok";
}

/** Simulasi what-if: akibat skenario penugasan ke beban tim, tanpa mengubah data. */
export function simulate(task: Task, scenario: Assignment[], members: Member[], tasks: Task[]) {
  const rows: SimRow[] = members
    .filter(m => m.availableHours !== null)
    .map(m => {
      const available = m.availableHours as number;
      const before = allocatedHours(m.id, tasks);
      const added = scenario.filter(s => s.memberId === m.id).reduce((s, a) => s + a.hours, 0);
      return { member: m, before, after: before + added, available, added };
    });
  const conflicts: Conflict[] = [];
  for (const s of scenario) {
    const row = rows.find(r => r.member.id === s.memberId);
    if (!row) continue;
    const util = row.after / row.available;
    const name = row.member.name.split(" ")[0];
    if (util >= 1) conflicts.push({ tone: "crit", text: `${name} jadi ${Math.round(util * 100)}% (${row.after}/${row.available} jam), melebihi kapasitas periode ini` });
    else if (util >= 0.85) conflicts.push({ tone: "warn", text: `${name} jadi ${Math.round(util * 100)}%, mendekati penuh` });
    for (const t of nearbyDeadlines(s.memberId, task.dueDate, tasks, task.id)) {
      conflicts.push({ tone: "warn", text: `${name} juga memegang "${t.title}" yang tenggatnya berdekatan` });
    }
  }
  for (const dep of task.dna?.dependencies ?? []) {
    const depTask = tasks.find(t => t.id === dep.taskId);
    if (depTask && depTask.status !== "selesai") {
      conflicts.push({ tone: "warn", text: `Bergantung pada "${depTask.title}" yang belum selesai (tenggat ${shortDate(depTask.dueDate)})` });
    }
  }
  const peak = (key: "before" | "after") => Math.max(...rows.map(r => r[key] / r.available));
  const total = (key: "before" | "after") => rows.reduce((s, r) => s + r[key], 0);
  const capacity = rows.reduce((s, r) => s + r.available, 0);
  return {
    rows,
    conflicts,
    peakBefore: peak("before"),
    peakAfter: peak("after"),
    teamBefore: total("before") / capacity,
    teamAfter: total("after") / capacity,
  };
}

/** Pembagian jam saat tugas dibagi ke dua orang (proporsi utama:pendamping). */
export function splitHours(effort: number, primaryShare = 0.5): [number, number] {
  const first = Math.round(effort * primaryShare);
  return [first, effort - first];
}
