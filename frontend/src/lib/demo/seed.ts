import type { Competency, Decision, Member, Project, Task } from "./types";

// Data contoh dari prototipe proposal (Lampiran 2): 6 anggota, 32 jam/minggu,
// periode 28 Sep - 2 Okt 2026, 110 dari 160 jam teralokasi. Tugas di luar
// daftar prototipe ditambahkan supaya jam teralokasi per orang konsisten.

export const PERIOD = { start: "2026-09-28", end: "2026-10-02", label: "28 Sep - 2 Okt 2026" };
/** "Sekarang" di mockup: Selasa, 29 Sep 2026 09.15 WIB. */
export const NOW = "2026-09-29T09:15:00+07:00";
export const WORKSPACE = { name: "Positif & Profesional", hoursPerWeek: 32 };

export const COMPETENCIES: Competency[] = [
  { id: "backend-api", name: "Backend API", category: "Backend" },
  { id: "oauth2", name: "OAuth2 & autentikasi", category: "Backend" },
  { id: "arsitektur-data", name: "Arsitektur data", category: "Data" },
  { id: "sql", name: "SQL & PostgreSQL", category: "Data" },
  { id: "integrasi-api", name: "Integrasi API", category: "Backend" },
  { id: "technical-writing", name: "Technical writing", category: "Dokumentasi" },
  { id: "react", name: "Frontend React", category: "Frontend" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend" },
  { id: "aksesibilitas", name: "Aksesibilitas (WCAG)", category: "Frontend" },
  { id: "uiux", name: "UI/UX", category: "Desain" },
  { id: "design-system", name: "Design system", category: "Desain" },
  { id: "qa", name: "QA testing", category: "Kualitas" },
  { id: "e2e", name: "Pengujian E2E", category: "Kualitas" },
  { id: "devops", name: "DevOps", category: "Infrastruktur" },
];

export const MEMBERS: Member[] = [
  {
    id: "ayu", name: "Ayu Pramesti", initials: "AP", role: "Pengembang perangkat lunak", email: "ayu@positifprofesional.id",
    availableHours: 32, leaveDates: [], weeklyLimit: 40, access: "anggota",
    competencies: [
      { id: "backend-api", level: 3, source: "verifikasi" }, { id: "arsitektur-data", level: 3, source: "verifikasi" },
      { id: "sql", level: 3, source: "riwayat" }, { id: "oauth2", level: 2, source: "klaim" }, { id: "integrasi-api", level: 2, source: "riwayat" },
    ],
    prefers: ["arsitektur-data", "sql"], avoids: ["technical-writing"],
  },
  {
    id: "bima", name: "Bima Pradana", initials: "BP", role: "Pengembang perangkat lunak", email: "bima@positifprofesional.id",
    availableHours: 32, leaveDates: [], weeklyLimit: 36, access: "anggota",
    competencies: [
      { id: "technical-writing", level: 3, source: "verifikasi" }, { id: "integrasi-api", level: 3, source: "riwayat" },
      { id: "backend-api", level: 2, source: "verifikasi" }, { id: "oauth2", level: 2, source: "riwayat" },
    ],
    prefers: ["integrasi-api", "backend-api"], avoids: [],
  },
  {
    id: "citra", name: "Citra Maheswari", initials: "CM", role: "Pengembang perangkat lunak", email: "citra@positifprofesional.id",
    availableHours: 32, leaveDates: [], weeklyLimit: 36, access: "anggota",
    competencies: [
      { id: "react", level: 3, source: "verifikasi" }, { id: "aksesibilitas", level: 3, source: "verifikasi" },
      { id: "tailwind", level: 2, source: "riwayat" }, { id: "uiux", level: 1, source: "klaim" },
    ],
    prefers: ["aksesibilitas", "react"], avoids: ["devops"],
  },
  {
    id: "dimas", name: "Dimas Saputra", initials: "DS", role: "Pengembang perangkat lunak", email: "dimas@positifprofesional.id",
    availableHours: 32, leaveDates: [], weeklyLimit: 36, access: "anggota",
    competencies: [
      { id: "sql", level: 3, source: "verifikasi" }, { id: "backend-api", level: 2, source: "riwayat" },
      { id: "arsitektur-data", level: 2, source: "klaim" }, { id: "oauth2", level: 1, source: "klaim" }, { id: "devops", level: 1, source: "klaim" },
    ],
    prefers: ["sql", "devops"], avoids: [],
  },
  {
    id: "nadia", name: "Nadia Putri", initials: "NP", role: "Desainer produk", email: "nadia@positifprofesional.id",
    availableHours: 32, leaveDates: [], weeklyLimit: 32, access: "anggota",
    competencies: [
      { id: "uiux", level: 3, source: "verifikasi" }, { id: "design-system", level: 3, source: "verifikasi" },
      { id: "tailwind", level: 2, source: "klaim" }, { id: "react", level: 1, source: "klaim" },
    ],
    prefers: ["design-system", "uiux"], avoids: ["sql"],
  },
  {
    id: "rafi", name: "Rafi Ramadhan", initials: "RR", role: "Penguji perangkat lunak / QA", email: "rafi@positifprofesional.id",
    availableHours: null, leaveDates: [], weeklyLimit: 32, access: "anggota",
    competencies: [
      { id: "qa", level: 3, source: "verifikasi" }, { id: "e2e", level: 2, source: "klaim" }, { id: "react", level: 1, source: "klaim" },
    ],
    prefers: ["qa", "e2e"], avoids: [],
  },
];

export const PROJECTS: Project[] = [
  { id: "klinik", name: "Sistem Antrean Klinik Kaliwates", client: "Klinik Pratama Kaliwates", dueDate: "2026-10-30" },
  { id: "koperasi", name: "Aplikasi Simpan Pinjam Tani Makmur", client: "Koperasi Tani Makmur Ambulu", dueDate: "2026-11-20" },
  { id: "internal", name: "Peningkatan platform internal", client: "Positif & Profesional", dueDate: "2026-10-16" },
];

const AUTH_DESC = "Tambahkan login dengan akun Google untuk staf klinik memakai OAuth2. Backend API perlu endpoint callback dan penyimpanan sesi yang aman. Sesi lama dari login email tetap berjalan sampai staf pindah. Perlu dicek juga apakah integrasi ke API kepegawaian klinik dibutuhkan.";

export const TASKS: Task[] = [
  // Belum ditugaskan (prototipe: Perlu penugasan)
  {
    id: "TGS-0142", projectId: "klinik", title: "Integrasi autentikasi", description: AUTH_DESC,
    dueDate: "2026-10-02", priority: "tinggi", status: "belum", assignments: [], remainingHours: 8,
    createdAt: "2026-09-29T09:02:00+07:00", competencyIds: [],
    dna: {
      requirements: [
        { competencyId: "backend-api", level: 2, p: 0.96, quote: "Backend API perlu endpoint callback dan penyimpanan sesi yang aman" },
        { competencyId: "oauth2", level: 2, p: 0.92, quote: "login dengan akun Google untuk staf klinik memakai OAuth2" },
        { competencyId: "integrasi-api", level: 1, p: 0.66, quote: "apakah integrasi ke API kepegawaian klinik dibutuhkan" },
      ],
      effortSize: "M", effortP: 0.55, effortHours: 6, complexity: 2, complexitySpread: 1,
      dependencies: [{ taskId: "TGS-0137", p: 0.62 }],
      model: "llm-kecil@2026-09", prompt: "taskdna-v1", confirmed: false,
    },
  },
  {
    id: "TGS-0143", projectId: "klinik", title: "Penyempurnaan halaman onboarding", description: "Rapikan alur onboarding pasien baru di aplikasi web: langkah isi data diri dipecah jadi tiga, validasi NIK langsung di form, dan tampilan mengikuti design system klinik. Komponen React dan Tailwind yang sudah ada dipakai ulang.",
    dueDate: "2026-10-02", priority: "normal", status: "belum", assignments: [], remainingHours: 6,
    createdAt: "2026-09-28T14:20:00+07:00", competencyIds: [],
    dna: {
      requirements: [
        { competencyId: "react", level: 2, p: 0.94, quote: "Komponen React dan Tailwind yang sudah ada dipakai ulang" },
        { competencyId: "tailwind", level: 1, p: 0.88, quote: "Komponen React dan Tailwind" },
        { competencyId: "uiux", level: 1, p: 0.72, quote: "langkah isi data diri dipecah jadi tiga" },
      ],
      effortSize: "M", effortP: 0.8, effortHours: 6, complexity: 1, complexitySpread: 0,
      dependencies: [], model: "llm-kecil@2026-09", prompt: "taskdna-v1", confirmed: true,
    },
  },
  {
    id: "TGS-0144", projectId: "internal", title: "Pengujian alur penugasan", description: "Buat skenario uji end-to-end untuk alur buat tugas sampai tetapkan penugasan, termasuk kasus kandidat tidak lolos syarat dan simpan draf. Hasil uji ditulis sebagai checklist QA.",
    dueDate: "2026-10-02", priority: "normal", status: "belum", assignments: [], remainingHours: 4,
    createdAt: "2026-09-28T16:05:00+07:00", competencyIds: [],
    dna: {
      requirements: [
        { competencyId: "qa", level: 2, p: 0.97, quote: "Hasil uji ditulis sebagai checklist QA" },
        { competencyId: "e2e", level: 2, p: 0.9, quote: "skenario uji end-to-end" },
      ],
      effortSize: "S", effortP: 0.8, effortHours: 4, complexity: 1, complexitySpread: 0,
      dependencies: [], model: "llm-kecil@2026-09", prompt: "taskdna-v1", confirmed: true,
    },
  },
  // Berjalan & selesai di periode aktif (membentuk 110 jam teralokasi)
  { id: "TGS-0131", projectId: "internal", title: "Refaktor modul kapasitas mingguan", description: "Pisahkan perhitungan kapasitas mingguan dari modul laporan dan pindahkan ke skema data tersendiri.", dueDate: "2026-09-30", priority: "tinggi", status: "berjalan", assignments: [{ memberId: "ayu", hours: 16 }], remainingHours: 12, createdAt: "2026-09-24T10:00:00+07:00", competencyIds: ["arsitektur-data", "sql"] },
  { id: "TGS-0137", projectId: "klinik", title: "Migrasi skema antrean ke PostgreSQL 16", description: "Pindahkan tabel antrean dan sesi pengguna ke PostgreSQL 16 dengan skrip migrasi yang bisa diulang.", dueDate: "2026-10-01", priority: "normal", status: "berjalan", assignments: [{ memberId: "ayu", hours: 12 }], remainingHours: 7, createdAt: "2026-09-25T09:30:00+07:00", competencyIds: ["sql", "backend-api"] },
  { id: "TGS-0135", projectId: "koperasi", title: "Integrasi webhook notifikasi WhatsApp", description: "Kirim notifikasi jatuh tempo angsuran lewat webhook penyedia WhatsApp Business.", dueDate: "2026-10-02", priority: "normal", status: "berjalan", assignments: [{ memberId: "bima", hours: 8 }], remainingHours: 5, createdAt: "2026-09-25T13:00:00+07:00", competencyIds: ["integrasi-api", "backend-api"] },
  { id: "TGS-0128", projectId: "internal", title: "Penyusunan dokumentasi endpoint kandidat", description: "Dokumentasikan endpoint rekomendasi kandidat untuk tim frontend.", dueDate: "2026-09-27", priority: "rendah", status: "selesai", assignments: [{ memberId: "bima", hours: 8 }], remainingHours: 0, createdAt: "2026-09-22T09:00:00+07:00", competencyIds: ["technical-writing", "backend-api"] },
  { id: "TGS-0126", projectId: "klinik", title: "Audit aksesibilitas WCAG 2.2 layar utama", description: "Audit kontras, fokus keyboard, dan label pembaca layar di lima layar utama.", dueDate: "2026-09-28", priority: "rendah", status: "selesai", assignments: [{ memberId: "citra", hours: 16 }], remainingHours: 0, createdAt: "2026-09-21T09:00:00+07:00", competencyIds: ["aksesibilitas", "react"] },
  { id: "TGS-0139", projectId: "klinik", title: "Perbaikan kontras halaman laporan", description: "Perbaiki temuan kontras dari audit WCAG di halaman laporan harian.", dueDate: "2026-10-02", priority: "normal", status: "berjalan", assignments: [{ memberId: "citra", hours: 4 }], remainingHours: 3, createdAt: "2026-09-28T11:00:00+07:00", competencyIds: ["aksesibilitas", "tailwind"] },
  { id: "TGS-0133", projectId: "internal", title: "Optimasi query beban alokasi", description: "Kurangi waktu query beban alokasi per periode dengan indeks komposit.", dueDate: "2026-10-02", priority: "normal", status: "berjalan", assignments: [{ memberId: "dimas", hours: 14 }], remainingHours: 8, createdAt: "2026-09-24T14:00:00+07:00", competencyIds: ["sql", "arsitektur-data"] },
  { id: "TGS-0129", projectId: "koperasi", title: "Indeks pencarian riwayat transaksi", description: "Tambahkan indeks pencarian riwayat transaksi anggota koperasi.", dueDate: "2026-09-29", priority: "normal", status: "selesai", assignments: [{ memberId: "dimas", hours: 8 }], remainingHours: 0, createdAt: "2026-09-22T10:00:00+07:00", competencyIds: ["sql"] },
  { id: "TGS-0134", projectId: "koperasi", title: "Desain sistem komponen form adaptif", description: "Rancang komponen form yang menyesuaikan jenis pinjaman dan token desain koperasi.", dueDate: "2026-10-01", priority: "normal", status: "berjalan", assignments: [{ memberId: "nadia", hours: 16 }], remainingHours: 10, createdAt: "2026-09-24T09:00:00+07:00", competencyIds: ["design-system", "uiux"] },
  { id: "TGS-0130", projectId: "klinik", title: "Ilustrasi keadaan kosong antrean", description: "Buat ilustrasi dan teks untuk keadaan antrean kosong.", dueDate: "2026-09-29", priority: "rendah", status: "selesai", assignments: [{ memberId: "nadia", hours: 8 }], remainingHours: 0, createdAt: "2026-09-23T09:00:00+07:00", competencyIds: ["uiux"] },
  // Riwayat sebelum periode aktif (untuk faktor R), tidak memakan kapasitas minggu ini
  { id: "TGS-0118", projectId: "koperasi", title: "Login anggota koperasi dengan OTP", description: "Login OTP lewat SMS untuk anggota koperasi.", dueDate: "2026-09-18", priority: "tinggi", status: "selesai", assignments: [{ memberId: "bima", hours: 0 }], remainingHours: 0, createdAt: "2026-09-10T09:00:00+07:00", competencyIds: ["oauth2", "backend-api"] },
  { id: "TGS-0112", projectId: "internal", title: "API rekap kapasitas tim", description: "Endpoint rekap kapasitas per periode.", dueDate: "2026-09-11", priority: "normal", status: "selesai", assignments: [{ memberId: "ayu", hours: 0 }], remainingHours: 0, createdAt: "2026-09-04T09:00:00+07:00", competencyIds: ["backend-api", "sql"] },
  { id: "TGS-0108", projectId: "klinik", title: "Single sign-on dasbor admin klinik", description: "SSO untuk dasbor admin klinik.", dueDate: "2026-09-04", priority: "normal", status: "selesai", assignments: [{ memberId: "bima", hours: 0 }], remainingHours: 0, createdAt: "2026-08-28T09:00:00+07:00", competencyIds: ["oauth2", "integrasi-api"] },
];

/** Keputusan sebelum demo (untuk Riwayat keputusan & Laporan dampak). */
export const DECISIONS: Decision[] = [
  { id: "KPT-031", taskId: "TGS-0139", memberIds: ["citra"], rank: 1, preset: "seimbang", decidedAt: "2026-09-28T11:06:00+07:00", decisionMs: 6 * 60_000, conflictsSeen: 1 },
  { id: "KPT-030", taskId: "TGS-0137", memberIds: ["ayu"], rank: 2, preset: "seimbang", decidedAt: "2026-09-25T09:41:00+07:00", decisionMs: 11 * 60_000, conflictsSeen: 2 },
  { id: "KPT-029", taskId: "TGS-0135", memberIds: ["bima"], rank: 1, preset: "tenggat", decidedAt: "2026-09-25T13:08:00+07:00", decisionMs: 8 * 60_000, conflictsSeen: 0 },
  { id: "KPT-028", taskId: "TGS-0134", memberIds: ["nadia"], rank: null, preset: "seimbang", reasonCode: "klien", note: "Klien koperasi minta desainer yang sama dengan proyek sebelumnya.", decidedAt: "2026-09-24T09:15:00+07:00", decisionMs: 14 * 60_000, conflictsSeen: 1 },
  { id: "KPT-027", taskId: "TGS-0133", memberIds: ["dimas"], rank: 1, preset: "ratakan", decidedAt: "2026-09-24T14:07:00+07:00", decisionMs: 7 * 60_000, conflictsSeen: 1 },
  { id: "KPT-026", taskId: "TGS-0131", memberIds: ["ayu"], rank: 1, preset: "seimbang", decidedAt: "2026-09-24T10:09:00+07:00", decisionMs: 9 * 60_000, conflictsSeen: 0 },
];

/** Baseline Tb dari observasi manual sebelum pilot (menit per keputusan) `[asumsi]`. */
export const BASELINE_MINUTES = 24;
