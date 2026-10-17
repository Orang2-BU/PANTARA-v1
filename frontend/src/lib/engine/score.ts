import { NOW } from "@/lib/demo/seed";
import type { CompetencySource, Level, Member, PresetId, Requirement, Task, Weights } from "@/lib/demo/types";
import { committedUntil, hoursUntil, loadScore, overrunFactor, workdays } from "./capacity";

// Mesin keputusan deterministik (01-PRD §6). AI tidak ikut memilih penerima tugas.

export const PRESETS: Record<PresetId, { label: string; when: string; weights: Weights; spreadBonus: number }> = {
  seimbang: { label: "Seimbang", when: "Umum", weights: { k: 0.35, c: 0.25, a: 0.15, r: 0.15, f: 0.1 }, spreadBonus: 0 },
  tenggat: { label: "Kejar tenggat", when: "Tenggat ≤ 2 hari", weights: { k: 0.3, c: 0.15, a: 0.3, r: 0.15, f: 0.1 }, spreadBonus: 0 },
  ratakan: { label: "Ratakan beban", when: "Ada karyawan ≥ 85% terisi", weights: { k: 0.25, c: 0.4, a: 0.15, r: 0.05, f: 0.15 }, spreadBonus: 0 },
  sebar: { label: "Sebar pengetahuan", when: "Pengetahuan terkumpul di 1-2 orang", weights: { k: 0.3, c: 0.25, a: 0.15, r: 0, f: 0.1 }, spreadBonus: 0.2 },
};

export interface EngineSettings {
  preset: PresetId;
  /** Level karyawan minimal = level dibutuhkan − selisih ini. */
  levelTolerance: number;
  /** Utilisasi sesudah ≥ ambang ini dihitung risiko beban. */
  overloadAt: number;
}

export const DEFAULT_SETTINGS: EngineSettings = { preset: "seimbang", levelTolerance: 1, overloadAt: 0.9 };

export interface Factors { k: number; c: number; a: number; r: number; f: number }

/** Keyakinan per sumber level kompetensi (asumsi awal, bisa dikalibrasi): klaim sendiri dihitung lebih rendah. */
export const SOURCE_CONFIDENCE: Record<CompetencySource, number> = { verifikasi: 1, riwayat: 0.9, klaim: 0.7 };
/** Selisih skor di bawah ini ditampilkan sebagai "praktis setara", bukan peringkat tegas (cegah automation bias). */
export const TIE_GAP = 0.03;
const DEMO_TODAY = NOW.slice(0, 10);

/** Bobot efektif: tugas kompleks (>= 2) di preset Seimbang memberi bobot lebih ke kompetensi (01-PRD §6). */
export function effectiveWeights(preset: PresetId, complexity: number): Weights {
  const w = PRESETS[preset].weights;
  if (preset !== "seimbang" || complexity < 2) return w;
  return { ...w, k: w.k + 0.1, c: w.c - 0.05, r: w.r - 0.05 };
}

export interface Candidate {
  member: Member;
  score: number;
  factors: Factors;
  allocated: number;
  available: number;
  utilBefore: number;
  utilAfter: number;
  /** Utilisasi bila tugas molor seperti biasanya (estimasi x faktor molor). */
  utilAfterHigh: number;
  /** Jam kosong sampai tenggat (kapasitas sampai tenggat dikurangi janji tugas lain yang jatuh tempo lebih dulu). */
  free: number;
  /** Skor praktis setara dengan kandidat di atasnya (selisih < TIE_GAP). */
  tiedWithPrev: boolean;
  reasons: string[];
  cautions: string[];
}

interface Filtered { member: Member; failures: string[] }

/** Jam teralokasi karyawan di periode aktif (tugas yang sudah ditugaskan). */
export function allocatedHours(memberId: string, tasks: Task[]): number {
  return tasks
    .filter(t => t.status !== "draf" && t.status !== "belum")
    .flatMap(t => t.assignments)
    .filter(a => a.memberId === memberId)
    .reduce((sum, a) => sum + a.hours, 0);
}

export function memberLevel(member: Member, competencyId: string): Level {
  return member.competencies.find(c => c.id === competencyId)?.level ?? 0;
}

export const LEVEL_LABEL = ["Belum", "Dasar", "Mandiri", "Mahir"] as const;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const DAY = 86_400_000;

/** Tugas aktif karyawan yang tenggatnya ≤ 1 hari dari tenggat tugas baru. */
export function nearbyDeadlines(memberId: string, dueDate: string, tasks: Task[], excludeTaskId?: string): Task[] {
  const due = new Date(dueDate).getTime();
  return tasks.filter(t =>
    t.id !== excludeTaskId &&
    (t.status === "berjalan" || t.status === "menunggu") &&
    t.assignments.some(a => a.memberId === memberId) &&
    Math.abs(new Date(t.dueDate).getTime() - due) <= DAY,
  );
}

/** Tenggat paling awal dari dua tugas aktif karyawan yang tenggatnya berdekatan (≤ 1 hari), bila ada. */
export function clashingDeadline(memberId: string, tasks: Task[]): string | undefined {
  return tasks
    .filter(t => (t.status === "berjalan" || t.status === "menunggu") && t.assignments.some(a => a.memberId === memberId))
    .filter(t => nearbyDeadlines(memberId, t.dueDate, tasks, t.id).length)
    .map(t => t.dueDate)
    .sort()[0];
}

/** Jumlah tugas selesai karyawan yang memakai salah satu kompetensi yang dibutuhkan. */
function relevantHistory(memberId: string, requirements: Requirement[], tasks: Task[]): number {
  const needed = new Set(requirements.map(r => r.competencyId));
  return tasks.filter(t =>
    t.status === "selesai" &&
    t.assignments.some(a => a.memberId === memberId) &&
    t.competencyIds.some(id => needed.has(id)),
  ).length;
}

function preference(member: Member, requirements: Requirement[]): number {
  const primary = [...requirements].sort((a, b) => b.p - a.p)[0]?.competencyId;
  if (!primary) return 0.5;
  if (member.prefers.includes(primary)) return 1;
  if (member.avoids.includes(primary)) return 0;
  return 0.5;
}

/**
 * Syarat wajib → skor S = w1·K + w2·C + w3·A + w4·R − w5·F (+ bonus preset Sebar pengetahuan).
 * K kompetensi (berbobot keyakinan p dan sumber level), C skor beban cembung, A jam kosong sampai tenggat,
 * R riwayat & preferensi, F risiko tenggat berdekatan. Dependensi berlaku sama untuk semua kandidat, jadi
 * ditampilkan sebagai peringatan tugas (simulasi), bukan faktor peringkat.
 */
export function rankCandidates(task: Task, members: Member[], tasks: Task[], settings: EngineSettings = DEFAULT_SETTINGS, names: Record<string, string> = {}, today = DEMO_TODAY) {
  const dna = task.dna;
  const effort = dna?.effortHours ?? task.remainingHours;
  const requirements = dna?.requirements ?? [];
  const preset = PRESETS[settings.preset];
  const w = effectiveWeights(settings.preset, dna?.complexity ?? 0);
  const overrun = overrunFactor(tasks).factor;
  const label = (id: string) => names[id] ?? id;
  const candidates: Candidate[] = [];
  const filtered: Filtered[] = [];

  for (const member of members) {
    const failures: string[] = [];
    const available = member.availableHours;
    const allocated = allocatedHours(member.id, tasks);
    if (available === null) {
      filtered.push({ member, failures: ["Ketersediaan periode ini belum diisi"] });
      continue;
    }
    const window = workdays(today, task.dueDate);
    const leaveDays = window.filter(d => member.leaveDates.includes(d)).length;
    const free = hoursUntil(member, task.dueDate, today) - committedUntil(member.id, task.dueDate, tasks, task.id);
    if (window.length > 0 && leaveDays === window.length) failures.push("Cuti di semua hari kerja sampai tenggat");
    else if (free < effort * 0.5) failures.push(`Jam kosong sampai tenggat ${Math.max(0, Math.round(free))} jam, kurang dari separuh estimasi (${effort / 2} jam)`);
    for (const req of requirements) {
      const min = Math.max(0, req.level - settings.levelTolerance);
      const have = memberLevel(member, req.competencyId);
      if (have < min) failures.push(`${label(req.competencyId)} ${have ? `baru ${LEVEL_LABEL[have]}` : "belum dimiliki"}, butuh minimal ${LEVEL_LABEL[min]}`);
    }
    if (allocated + effort > member.weeklyLimit) failures.push(`Melewati batas kerja mingguan ${member.weeklyLimit} jam`);
    if (failures.length) { filtered.push({ member, failures }); continue; }

    const totalP = requirements.reduce((s, r) => s + r.p, 0);
    const levelFit = (req: Requirement) => Math.min(memberLevel(member, req.competencyId) / Math.max(req.level, 1), 1);
    const confidence = (req: Requirement) => {
      const own = member.competencies.find(c => c.id === req.competencyId);
      return own ? SOURCE_CONFIDENCE[own.source] : 0;
    };
    const weighted = (fn: (req: Requirement) => number) => totalP ? requirements.reduce((s, req) => s + req.p * fn(req), 0) / totalP : 1;
    // Alasan memakai kecocokan level; skor K memakai level dikali keyakinan sumbernya.
    const levels = weighted(levelFit);
    const k = weighted(req => levelFit(req) * confidence(req));
    const claimed = requirements
      .filter(req => member.competencies.find(c => c.id === req.competencyId)?.source === "klaim")
      .map(req => label(req.competencyId));
    const utilBefore = allocated / available;
    const utilAfter = (allocated + effort) / available;
    const utilAfterHigh = (allocated + effort * overrun) / available;
    const c = loadScore(utilAfter);
    const a = clamp(free / effort);
    const history = relevantHistory(member.id, requirements, tasks);
    const r = 0.7 * clamp(history / 3) + 0.3 * preference(member, requirements);
    const nearby = nearbyDeadlines(member.id, task.dueDate, tasks, task.id).length;
    const f = clamp(0.5 * nearby);
    const bonus = preset.spreadBonus && history === 0 ? preset.spreadBonus : 0;
    const score = clamp(w.k * k + w.c * c + w.a * a + w.r * r - w.f * f + bonus);
    const factors = { k, c, a, r, f };
    candidates.push({
      member, score, factors, allocated, available, utilBefore, utilAfter, utilAfterHigh, free, tiedWithPrev: false,
      ...explain(factors, { levels, history, bonus, utilAfter, utilAfterHigh, overrun, free, deadline: nearby > 0, leaveDays, claimed }),
    });
  }
  candidates.sort((x, y) => y.score - x.score || x.utilAfter - y.utilAfter);
  candidates.forEach((cand, i) => { cand.tiedWithPrev = i > 0 && candidates[i - 1].score - cand.score < TIE_GAP; });
  return { candidates, filtered, effort };
}

/** Alasan disusun dari angka faktor (bukan teks AI), supaya selalu sesuai skor. */
function explain(f: Factors, ctx: { levels: number; history: number; bonus: number; utilAfter: number; utilAfterHigh: number; overrun: number; free: number; deadline: boolean; leaveDays: number; claimed: string[] }) {
  const reasons: string[] = [];
  const cautions: string[] = [];
  if (ctx.levels >= 0.99) reasons.push("Memenuhi semua level kompetensi yang dibutuhkan");
  else if (ctx.levels >= 0.6) reasons.push("Memenuhi sebagian besar level kompetensi");
  else cautions.push("Kompetensi di bawah level yang dibutuhkan, perlu pendampingan");
  if (ctx.claimed.length) cautions.push(`${ctx.claimed.join(", ")} hanya berdasarkan klaim, belum terverifikasi`);
  if (f.a >= 1) reasons.push("Jam kosong cukup untuk seluruh estimasi sebelum tenggat");
  else cautions.push(`Jam kosong sampai tenggat hanya ${Math.round(ctx.free)} jam`);
  if (ctx.leaveDays) cautions.push(`Ada ${ctx.leaveDays} hari cuti sebelum tenggat, jam kosong sudah dikurangi`);
  if (ctx.history >= 2) reasons.push(`Pernah menyelesaikan ${ctx.history} tugas sejenis`);
  if (ctx.bonus) reasons.push("Belum pernah memegang kompetensi ini: menyebar pengetahuan antar karyawan");
  if (ctx.utilAfter >= 1) cautions.push(`Beban jadi ${Math.round(ctx.utilAfter * 100)}%, melebihi kapasitas`);
  else if (ctx.utilAfter >= 0.85) cautions.push(`Beban jadi ${Math.round(ctx.utilAfter * 100)}%, mendekati penuh`);
  else reasons.push(`Beban setelah penugasan ${Math.round(ctx.utilAfter * 100)}%, masih aman`);
  if (ctx.utilAfter < 1 && ctx.utilAfterHigh >= 1) cautions.push(`Bila molor seperti biasanya (×${String(ctx.overrun).replace(".", ",")}), beban jadi ${Math.round(ctx.utilAfterHigh * 100)}%`);
  if (ctx.deadline) cautions.push("Ada tenggat lain berdekatan (≤ 1 hari)");
  return { reasons, cautions };
}
