import {
  BarChart3,
  Building2,
  CalendarRange,
  CircleUser,
  ClipboardCheck,
  Dna,
  FilePlus2,
  FolderKanban,
  Gauge,
  GitCompareArrows,
  IdCard,
  History,
  Inbox,
  LayoutDashboard,
  ListTodo,
  Rocket,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  Library,
  Network,
  Waypoints,
  UserCheck,
  ReceiptText,
  UserCog,
  UserRound,
  Users,
  Bell,
  Layers,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

// Peta halaman area aplikasi dari docs/01-PRD.md §5a-5b.

export interface PageInfo {
  /** ID halaman di 01-PRD §5a. */
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
  /** Satu kalimat tugas halaman. */
  description: string;
}

const PAGE_MAP = {
  "/mulai": { id: "P9", label: "Siapkan ruang kerja", group: "Ruang kerja", icon: Rocket, description: "Mengisi periode, jam kerja, dan data anggota lewat impor CSV." },
  "/dasbor": { id: "P10", label: "Dasbor", group: "Ruang kerja", icon: LayoutDashboard, description: "Melihat apa yang perlu diputuskan sekarang." },
  "/tugas": { id: "P11", label: "Tugas", group: "Ruang kerja", icon: ListTodo, description: "Mengelola daftar tugas, alokasi kerja anggota, dan status penugasan." },
  "/tugas/baru": { id: "P12", label: "Buat tugas", group: "Tugas", icon: FilePlus2, description: "Memasukkan tugas baru: judul, deskripsi, tenggat, dan prioritas." },
  "/tugas/[id]": { id: "P16", label: "Detail tugas", group: "Tugas", icon: ClipboardCheck, description: "Melihat status, penanggung jawab, dan riwayat keputusan tugas." },
  "/tugas/[id]/dna": { id: "P13", label: "Tinjau kebutuhan tugas", group: "Tugas", icon: Dna, description: "Memeriksa dan mengoreksi Task DNA sebelum mencari kandidat." },
  "/tugas/[id]/kandidat": { id: "P14", label: "Rekomendasi kandidat", group: "Tugas", icon: UserCheck, description: "Membandingkan tiga kandidat teratas beserta alasannya." },
  "/tugas/[id]/simulasi": { id: "P15", label: "Simulasi what-if", group: "Tugas", icon: GitCompareArrows, description: "Melihat konsekuensi tiap pilihan sebelum menetapkan penugasan." },
  "/tugas/alokasi-batch": { id: "P17", label: "Alokasi batch", group: "Perencanaan", icon: Layers, description: "Membagi banyak tugas yang belum ditugaskan sekaligus dengan OR-Tools." },
  "/tim": { id: "P18", label: "Tim", group: "Ruang kerja", icon: Users, description: "Mengelola profil kerja (Work Twin), kompetensi, dan kelengkapan data anggota." },
  "/tim/keahlian": { id: "P40", label: "Peta keahlian", group: "Tim", icon: Network, description: "Melihat siapa menguasai apa untuk semua anggota, termasuk kompetensi rawan." },
  "/tim/graf": { id: "P41", label: "Graf relasi", group: "Tim", icon: Waypoints, description: "Melihat hubungan anggota, kompetensi, tugas, dan proyek dalam bentuk graf." },
  "/tim/kompetensi": { id: "P30", label: "Katalog kompetensi", group: "Tim", icon: Library, description: "Mengelola daftar kompetensi ruang kerja yang dipakai Task DNA dan Work Twin." },
  "/tim/[id]": { id: "P19", label: "Profil kerja anggota", group: "Tim", icon: UserRound, description: "Memahami kapasitas, ketersediaan, dan kompetensi satu anggota." },
  "/proyek": { id: "P20", label: "Proyek", group: "Perencanaan", icon: FolderKanban, description: "Mengelompokkan tugas per proyek atau klien." },
  "/proyek/[id]": { id: "P20", label: "Detail proyek", group: "Perencanaan", icon: Building2, description: "Melihat tugas terbuka dan anggota yang terlibat di satu proyek." },
  "/kapasitas": { id: "P21", label: "Kapasitas", group: "Ruang kerja", icon: Gauge, description: "Alokasi waktu dan ketersediaan semua anggota dalam periode aktif. Jam kerja, bukan ukuran produktivitas." },
  "/keputusan": { id: "P22", label: "Riwayat keputusan", group: "Analisis", icon: History, description: "Meninjau keputusan dan override untuk mengkalibrasi rekomendasi." },
  "/laporan": { id: "P23", label: "Laporan dampak", group: "Analisis", icon: BarChart3, description: "Mengukur dampak pilot: waktu keputusan, konflik terdeteksi, penerimaan, dan override." },
  "/saya": { id: "P24", label: "Beranda saya", group: "Anggota", icon: Inbox, description: "Melihat penugasan baru, tugas berjalan, dan kapasitas sendiri." },
  "/saya/ketersediaan": { id: "P25", label: "Ketersediaan saya", group: "Anggota", icon: CalendarRange, description: "Mengisi jam tersedia dan cuti per periode." },
  "/saya/tugas/[id]": { id: "P26", label: "Penugasan masuk", group: "Anggota", icon: ClipboardCheck, description: "Menerima atau menolak penugasan dengan alasan." },
  "/saya/profil": { id: "P27", label: "Profil kerja saya", group: "Anggota", icon: UserRound, description: "Menjaga kompetensi, preferensi, dan batas kerja sendiri." },
  "/pengaturan": { id: "P28", label: "Pengaturan", group: "Sistem", icon: Settings, description: "Mengatur periode default, jam kerja, dan hari libur ruang kerja." },
  "/pengaturan/rekomendasi": { id: "P29", label: "Aturan rekomendasi", group: "Sistem", icon: SlidersHorizontal, description: "Memilih preset bobot dan syarat wajib kandidat." },
  "/pengaturan/tagihan": { id: "P32", label: "Tagihan", group: "Sistem", icon: ReceiptText, description: "Paket, jumlah kursi, dan riwayat invoice ruang kerja." },
  "/pengaturan/anggota": { id: "P31", label: "Anggota & peran", group: "Sistem", icon: UserCog, description: "Mengundang anggota, mengubah peran, dan menonaktifkan akun." },
  "/akun": { id: "P33", label: "Akun saya", group: "Akun", icon: CircleUser, description: "Mengubah profil, sandi, dan preferensi notifikasi." },
  "/notifikasi": { id: "P34", label: "Notifikasi", group: "Akun", icon: Bell, description: "Melihat penugasan baru, penolakan, dan pengingat." },
  "/bantuan": { id: "P35", label: "Bantuan", group: "Akun", icon: LifeBuoy, description: "Panduan singkat alur penugasan dan cara skor kandidat dihitung." },
  "/403": { id: "P38", label: "Akses ditolak", group: "Sistem", icon: ShieldAlert, description: "Halaman ini butuh peran lain. Hubungi admin ruang kerja." },
} satisfies Record<string, PageInfo>;

export type PageRoute = keyof typeof PAGE_MAP;
export const PAGES: Record<PageRoute, PageInfo> = PAGE_MAP;

/** Menu sidebar manajer (01-PRD §5b). */
export const NAVIGATION: { group: string; routes: PageRoute[] }[] = [
  { group: "Ruang kerja", routes: ["/dasbor", "/tugas", "/tim", "/kapasitas"] },
  { group: "Perencanaan", routes: ["/proyek", "/tugas/alokasi-batch"] },
  { group: "Analisis", routes: ["/keputusan", "/laporan"] },
  { group: "Sistem", routes: ["/pengaturan"] },
];

/** Link menu aktif untuk halaman itu sendiri dan semua sub-halamannya. */
export function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Sub-menu bercabang di sidebar (Tim dan Pengaturan). */
export const SUBNAV: Partial<Record<PageRoute, { href: PageRoute; label: string; icon: LucideIcon }[]>> = {
  "/tim": [
    { href: "/tim", label: "Anggota", icon: IdCard },
    { href: "/tim/keahlian", label: "Peta keahlian", icon: Network },
    { href: "/tim/graf", label: "Graf relasi", icon: Waypoints },
    { href: "/tim/kompetensi", label: "Kompetensi", icon: Library },
  ],
  "/pengaturan": [
    { href: "/pengaturan", label: "Umum", icon: Building2 },
    { href: "/pengaturan/rekomendasi", label: "Aturan rekomendasi", icon: SlidersHorizontal },
    { href: "/pengaturan/anggota", label: "Anggota & peran", icon: UserCog },
    { href: "/pengaturan/tagihan", label: "Tagihan", icon: ReceiptText },
  ],
};

/** Kecocokan paling spesifik di antara href (/tugas/alokasi-batch menang atas /tugas). */
function mostSpecific(pathname: string, hrefs: string[]) {
  return hrefs.filter(href => isActive(pathname, href)).sort((a, b) => b.length - a.length)[0];
}

/** Menu sidebar yang aktif. */
export function activeNav(pathname: string): string | undefined {
  return mostSpecific(pathname, NAVIGATION.flatMap(g => g.routes));
}

/** Sub-menu yang aktif; profil anggota (/tim/[id]) termasuk "Anggota". */
export function activeSub(pathname: string): string | undefined {
  return mostSpecific(pathname, Object.values(SUBNAV).flatMap(items => items.map(i => i.href)));
}

/** Cocokkan URL nyata (mis. /tugas/TGS-0142/kandidat) ke rute di PAGES. */
export function matchPage(pathname: string): PageInfo | undefined {
  const parts = pathname.split("/").filter(Boolean);
  const dynamicCount = (key: string) => (key.match(/\[/g) ?? []).length;
  const matches = (Object.keys(PAGES) as PageRoute[]).filter((key) => {
    const pattern = key.split("/").filter(Boolean);
    return (
      pattern.length === parts.length &&
      pattern.every((seg, i) => seg.startsWith("[") || seg === parts[i])
    );
  });
  // Segmen statis menang atas param dinamis (/tugas/baru bukan /tugas/[id]).
  matches.sort((a, b) => dynamicCount(a) - dynamicCount(b));
  return matches[0] ? PAGES[matches[0]] : undefined;
}
