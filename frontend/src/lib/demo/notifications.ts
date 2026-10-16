import type { DemoState } from "./store";

export interface Notice { id: string; title: string; subtitle: string; href: string }

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
  for (const t of s.tasks.filter(t => t.status === "menunggu")) {
    notices.push({ id: `tunggu-${t.id}`, title: `Menunggu jawaban untuk "${t.title}"`, subtitle: "Penugasan sudah dikirim ke anggota", href: `/tugas/${t.id}` });
  }
  if (s.tasks.some(t => t.id === "TGS-0139" && t.status === "berjalan")) {
    notices.push({ id: "tenggat-citra", title: "Tenggat berdekatan: Citra Maheswari", subtitle: "Ada tugas jatuh tempo 2 Okt · cek sebelum menugaskan", href: "/tim/citra" });
  }
  return notices;
}
