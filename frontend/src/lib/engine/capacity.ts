import type { Member, Task } from "@/lib/demo/types";

// Kapasitas berbasis waktu: jam kosong sampai tenggat, beban cembung, kalibrasi estimasi, risiko jadwal ulang.
// Asumsi mockup: ketersediaan mingguan karyawan berlaku sama untuk minggu berikutnya, dibagi rata ke 5 hari kerja.

const WORKDAYS_PER_WEEK = 5;
/** Kelengkungan biaya beban; makin kecil makin tajam di dekat penuh. Asumsi, belum dikalibrasi. */
const LOAD_KNEE = 0.15;
/** Faktor molor estimasi bila jam aktual belum cukup (planning fallacy). Asumsi, digantikan data jam aktual. */
const DEFAULT_OVERRUN = 1.5;
const MIN_SAMPLES = 5;

const day = (date: string) => new Date(`${date.slice(0, 10)}T00:00:00Z`);
const toIso = (d: Date) => d.toISOString().slice(0, 10);
const ACTIVE = new Set(["menunggu", "berjalan"]);

/** Tanggal hari kerja (Senin-Jumat) dari `from` sampai `to`, inklusif. */
export function workdays(from: string, to: string): string[] {
  const out: string[] = [];
  for (let d = day(from); d <= day(to); d.setUTCDate(d.getUTCDate() + 1)) {
    const w = d.getUTCDay();
    if (w !== 0 && w !== 6) out.push(toIso(d));
  }
  return out;
}

/** Jam kerja karyawan dari `today` sampai `dueDate`: jam per hari kerja × hari kerja tersisa yang bukan cuti. */
export function hoursUntil(member: Member, dueDate: string, today: string): number {
  if (member.availableHours === null) return 0;
  const days = workdays(today, dueDate).filter(d => !member.leaveDates.includes(d));
  return (member.availableHours / WORKDAYS_PER_WEEK) * days.length;
}

/** Porsi sisa jam karyawan pada satu tugas aktif (sisa jam dibagi sesuai porsi jam penugasan). */
function memberShare(task: Task, memberId: string): number {
  const total = task.assignments.reduce((s, a) => s + a.hours, 0);
  const mine = task.assignments.filter(a => a.memberId === memberId).reduce((s, a) => s + a.hours, 0);
  return total ? task.remainingHours * (mine / total) : 0;
}

/** Sisa jam yang sudah dijanjikan karyawan pada tugas aktif yang jatuh tempo paling lambat `dueDate`. */
export function committedUntil(memberId: string, dueDate: string, tasks: Task[], excludeTaskId?: string): number {
  return tasks
    .filter(t => t.id !== excludeTaskId && ACTIVE.has(t.status) && t.dueDate <= dueDate)
    .reduce((s, t) => s + memberShare(t, memberId), 0);
}

/**
 * Skor beban 0-1 dari utilisasi sesudah penugasan: turun pelan di beban rendah dan tajam mendekati 100%.
 * Bentuknya meniru waktu tunggu antrean yang sebanding dengan ρ/(1−ρ) (Kingman 1961); penerapan ke satu orang adalah analogi.
 */
export function loadScore(util: number): number {
  const headroom = 1 - util;
  if (headroom <= 0) return 0;
  return Math.min(1, ((1 + LOAD_KNEE) * headroom) / (headroom + LOAD_KNEE));
}

/** Jam rencana tugas: total jam penugasan, atau estimasi Analisis kebutuhan bila belum ada penugasan. */
export const plannedHours = (t: Task) => t.assignments.reduce((s, a) => s + a.hours, 0) || t.dna?.effortHours || 0;

/**
 * Faktor molor estimasi: persentil ke-80 rasio jam aktual / rencana dari tugas selesai (outside view).
 * Bila kurang dari 5 tugas punya jam aktual, pakai asumsi 1,5. Tidak pernah di bawah 1.
 */
export function overrunFactor(tasks: Task[]): { factor: number; samples: number } {
  const ratios = tasks
    .filter(t => t.status === "selesai" && t.actualHours !== undefined && plannedHours(t) > 0)
    .map(t => (t.actualHours as number) / plannedHours(t))
    .sort((a, b) => a - b);
  if (ratios.length < MIN_SAMPLES) return { factor: DEFAULT_OVERRUN, samples: ratios.length };
  const p80 = ratios[Math.ceil(0.8 * ratios.length) - 1];
  return { factor: Math.max(1, Math.round(p80 * 100) / 100), samples: ratios.length };
}

export interface ReplanRisk { task: Task; member: Member; kind: "cuti" | "kurang-jam"; shortfall: number }

/** Tugas aktif yang perlu dijadwal ulang: penanggung jawab cuti sampai tenggat, atau jam kosongnya tidak cukup. */
export function replanRisks(tasks: Task[], members: Member[], today: string): ReplanRisk[] {
  const risks: ReplanRisk[] = [];
  for (const task of tasks.filter(t => ACTIVE.has(t.status) && t.dueDate >= today)) {
    for (const a of task.assignments) {
      const member = members.find(m => m.id === a.memberId);
      if (!member || member.availableHours === null) continue;
      const capacity = hoursUntil(member, task.dueDate, today);
      const committed = committedUntil(member.id, task.dueDate, tasks);
      if (capacity === 0) risks.push({ task, member, kind: "cuti", shortfall: committed });
      else if (committed > capacity + 0.01) risks.push({ task, member, kind: "kurang-jam", shortfall: committed - capacity });
    }
  }
  return risks;
}

/** Senin dari minggu yang memuat `date`. */
function weekStart(date: string): Date {
  const d = day(date);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d;
}

/** Proyeksi beban karyawan per minggu: sisa jam tugas aktif disebar rata ke hari kerja sampai tenggat. */
export function weeklyLoad(member: Member, tasks: Task[], today: string, weeks = 4): { start: string; hours: number; capacity: number }[] {
  const first = weekStart(today);
  const out = Array.from({ length: weeks }, (_, i) => {
    const s = new Date(first);
    s.setUTCDate(first.getUTCDate() + i * 7);
    const e = new Date(s);
    e.setUTCDate(s.getUTCDate() + 4);
    const start = toIso(s), end = toIso(e);
    return { start, end, hours: 0, capacity: hoursUntil(member, end, start > today ? start : today) };
  });
  for (const t of tasks.filter(x => ACTIVE.has(x.status))) {
    const share = memberShare(t, member.id);
    const days = workdays(today, t.dueDate < today ? today : t.dueDate);
    if (!share || !days.length) continue;
    for (const d of days) {
      const w = out.find(x => d >= x.start && d <= x.end);
      if (w) w.hours += share / days.length;
    }
  }
  return out.map(({ start, hours, capacity }) => ({ start, hours, capacity }));
}
