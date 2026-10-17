import { replanRisks, type ReplanRisk } from "@/lib/engine/capacity";
import { clashingDeadline } from "@/lib/engine/score";
import { shortDate } from "@/lib/format";
import { NOW } from "./seed";
import type { DemoState } from "./store";

export interface Notice { id: string; title: string; subtitle: string; href: string }

/** Kalimat risiko jadwal ulang (dipakai notifikasi dan Dashboard). */
export function replanMessage(r: ReplanRisk): string {
  const name = r.member.name;
  return r.kind === "cuti"
    ? `${name} cuti di semua hari kerja sampai tenggat ${shortDate(r.task.dueDate)}. Perlu dijadwal ulang.`
    : `${name} kekurangan ${Math.ceil(r.shortfall)} jam sampai tenggat ${shortDate(r.task.dueDate)}. Bagi atau pindahkan sebagian.`;
}

/** Notifikasi manajer diturunkan dari data (bukan daftar statis). */
export function managerNotices(s: DemoState): Notice[] {
  const notices: Notice[] = [];
  const open = s.tasks.filter(t => t.status === "belum");
  if (open.length) notices.push({ id: `open-${open.length}`, title: `${open.length} tugas belum ditugaskan`, subtitle: open.map(t => t.title).slice(0, 2).join(" · "), href: "/tugas?status=belum" });
  for (const m of s.members.filter(m => m.availableHours === null)) {
    notices.push({ id: `avail-${m.id}`, title: `Ketersediaan ${m.name} belum diisi`, subtitle: "Profil belum lengkap · tidak ikut rekomendasi", href: `/tim/${m.id}` });
  }
  for (const t of s.tasks.filter(t => t.responseReason && t.status === "belum")) {
    notices.push({ id: `tolak-${t.id}`, title: `Penugasan "${t.title}" ditolak`, subtitle: t.responseReason as string, href: `/tugas/${t.id}` });
  }
  for (const r of replanRisks(s.tasks, s.members, NOW.slice(0, 10))) {
    notices.push({ id: `ulang-${r.task.id}-${r.member.id}`, title: `Perlu jadwal ulang: "${r.task.title}"`, subtitle: replanMessage(r), href: `/tugas/${r.task.id}` });
  }
  for (const t of s.tasks.filter(t => t.status === "menunggu")) {
    notices.push({ id: `tunggu-${t.id}`, title: `Menunggu jawaban untuk "${t.title}"`, subtitle: "Penugasan sudah dikirim ke karyawan", href: `/tugas/${t.id}` });
  }
  for (const m of s.members) {
    const near = clashingDeadline(m.id, s.tasks);
    if (near) notices.push({ id: `tenggat-${m.id}`, title: `Tenggat berdekatan: ${m.name}`, subtitle: `Dua tugas aktif jatuh tempo sekitar ${shortDate(near)} · cek sebelum menugaskan`, href: `/tim/${m.id}` });
  }
  return notices;
}
