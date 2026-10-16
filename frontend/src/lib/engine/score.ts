import type { Level, Member, PresetId, Requirement, Task, Weights } from "@/lib/demo/types";

// Mesin keputusan deterministik (01-PRD §6). AI tidak ikut memilih penerima tugas.

export const PRESETS: Record<PresetId, { label: string; when: string; weights: Weights; spreadBonus: number }> = {
  seimbang: { label: "Seimbang", when: "Umum", weights: { k: 0.35, c: 0.25, a: 0.15, r: 0.15, f: 0.1 }, spreadBonus: 0 },
  tenggat: { label: "Kejar tenggat", when: "Tenggat ≤ 2 hari", weights: { k: 0.3, c: 0.15, a: 0.3, r: 0.15, f: 0.1 }, spreadBonus: 0 },
  ratakan: { label: "Ratakan beban", when: "Ada anggota ≥ 85% terisi", weights: { k: 0.25, c: 0.4, a: 0.15, r: 0.05, f: 0.15 }, spreadBonus: 0 },
  sebar: { label: "Sebar pengetahuan", when: "Pengetahuan terkumpul di 1-2 orang", weights: { k: 0.3, c: 0.25, a: 0.15, r: 0, f: 0.1 }, spreadBonus: 0.2 },
};

export interface EngineSettings {
  preset: PresetId;
  /** Level anggota minimal = level dibutuhkan − selisih ini. */
  levelTolerance: number;
  /** Utilisasi sesudah ≥ ambang ini dihitung risiko beban. */
  overloadAt: number;
}

export const DEFAULT_SETTINGS: EngineSettings = { preset: "seimbang", levelTolerance: 1, overloadAt: 0.9 };

export interface Factors { k: number; c: number; a: number; r: number; f: number }

export interface Candidate {
  member: Member;
  score: number;
  factors: Factors;
  allocated: number;
  available: number;
  utilBefore: number;
  utilAfter: number;
  reasons: string[];
  cautions: string[];
}

interface Filtered { member: Member; failures: string[] }

/** Jam teralokasi anggota di periode aktif (tugas yang sudah ditugaskan). */
export function allocatedHours(memberId: string, tasks: Task[]): number {
  return tasks
    .filter(t => t.status !== "draf" && t.status !== "belum")
    .flatMap(t => t.assignments)
    .filter(a => a.memberId === memberId)
    .reduce((sum, a) => sum + a.hours, 0);
}

function memberLevel(member: Member, competencyId: string): Level {
  return member.competencies.find(c => c.id === competencyId)?.level ?? 0;
}

export const LEVEL_LABEL = ["Belum", "Dasar", "Mandiri", "Mahir"] as const;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const DAY = 86_400_000;

/** Tugas aktif anggota yang tenggatnya ≤ 1 hari dari tenggat tugas baru. */
export function nearbyDeadlines(memberId: string, dueDate: string, tasks: Task[], excludeTaskId?: string): Task[] {
  const due = new Date(dueDate).getTime();
  return tasks.filter(t =>
    t.id !== excludeTaskId &&
    (t.status === "berjalan" || t.status === "menunggu") &&
    t.assignments.some(a => a.memberId === memberId) &&
    Math.abs(new Date(t.dueDate).getTime() - due) <= DAY,
  );
}

/** Jumlah tugas selesai anggota yang memakai salah satu kompetensi yang dibutuhkan. */
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
 * K kompetensi, C kapasitas setelah, A ketersediaan, R riwayat & preferensi, F risiko konflik.
 */
export function rankCandidates(task: Task, members: Member[], tasks: Task[], settings: EngineSettings = DEFAULT_SETTINGS, names: Record<string, string> = {}) {
  const dna = task.dna;
  const effort = dna?.effortHours ?? task.remainingHours;
  const requirements = dna?.requirements ?? [];
  const preset = PRESETS[settings.preset];
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
    const remaining = available - allocated;
    if (remaining < effort * 0.5) failures.push(`Sisa kapasitas ${remaining} jam, kurang dari separuh estimasi (${effort / 2} jam)`);
    for (const req of requirements) {
      const min = Math.max(0, req.level - settings.levelTolerance);
      const have = memberLevel(member, req.competencyId);
      if (have < min) failures.push(`${names[req.competencyId] ?? req.competencyId} ${have ? `baru ${LEVEL_LABEL[have]}` : "belum dimiliki"}, butuh minimal ${LEVEL_LABEL[min]}`);
    }
    if (allocated + effort > member.weeklyLimit) failures.push(`Melewati batas kerja mingguan ${member.weeklyLimit} jam`);
    if (member.leaveDates.some(d => d <= task.dueDate)) failures.push("Cuti sebelum tenggat");
    if (failures.length) { filtered.push({ member, failures }); continue; }

    const k = requirements.length
      ? requirements.reduce((s, r) => s + Math.min(memberLevel(member, r.competencyId) / Math.max(r.level, 1), 1), 0) / requirements.length
      : 1;
    const utilBefore = allocated / available;
    const utilAfter = (allocated + effort) / available;
    const c = clamp(1 - utilAfter);
    const a = clamp(remaining / effort);
    const history = relevantHistory(member.id, requirements, tasks);
    const r = 0.7 * clamp(history / 3) + 0.3 * preference(member, requirements);
    const overload = utilAfter >= 1 ? 1 : utilAfter >= settings.overloadAt ? 0.5 : 0;
    const deadline = nearbyDeadlines(member.id, task.dueDate, tasks, task.id).length ? 0.5 : 0;
    const f = clamp(overload + deadline);
    const w = preset.weights;
    const bonus = preset.spreadBonus && history === 0 ? preset.spreadBonus : 0;
    const score = clamp(w.k * k + w.c * c + w.a * a + w.r * r - w.f * f + bonus);
    const factors = { k, c, a, r, f };
    candidates.push({ member, score, factors, allocated, available, utilBefore, utilAfter, ...explain(factors, { history, bonus, utilAfter, deadline: deadline > 0 }) });
  }
  candidates.sort((x, y) => y.score - x.score || x.utilAfter - y.utilAfter);
  return { candidates, filtered, effort };
}

/** Alasan disusun dari angka faktor (bukan teks AI), supaya selalu sesuai skor. */
function explain(f: Factors, ctx: { history: number; bonus: number; utilAfter: number; deadline: boolean }) {
  const reasons: string[] = [];
  const cautions: string[] = [];
  if (f.k >= 0.99) reasons.push("Memenuhi semua level kompetensi yang dibutuhkan");
  else if (f.k >= 0.6) reasons.push("Memenuhi sebagian besar level kompetensi");
  else cautions.push("Kompetensi di bawah level yang dibutuhkan, perlu pendampingan");
  if (f.a >= 1) reasons.push("Jam tersisa cukup untuk seluruh estimasi sebelum tenggat");
  else cautions.push("Jam tersisa hanya cukup untuk sebagian estimasi");
  if (ctx.history >= 2) reasons.push(`Pernah menyelesaikan ${ctx.history} tugas sejenis`);
  if (ctx.bonus) reasons.push("Belum pernah memegang kompetensi ini: menyebar pengetahuan tim");
  if (ctx.utilAfter >= 1) cautions.push(`Beban jadi ${Math.round(ctx.utilAfter * 100)}%, melebihi kapasitas`);
  else if (ctx.utilAfter >= 0.85) cautions.push(`Beban jadi ${Math.round(ctx.utilAfter * 100)}%, mendekati penuh`);
  else reasons.push(`Beban setelah penugasan ${Math.round(ctx.utilAfter * 100)}%, masih aman`);
  if (ctx.deadline) cautions.push("Ada tenggat lain berdekatan (≤ 1 hari)");
  return { reasons, cautions };
}
