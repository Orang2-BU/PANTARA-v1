import type { Competency, Decision, Member, Project, Task } from "./types";

// Simulasi pemakaian nyata: Arunika Digital, agensi pengembangan perangkat lunak di Jember dengan 20 karyawan
// dan 5 proyek klien. Data sengaja memuat kondisi sehari-hari: karyawan belum mengisi ketersediaan, karyawan baru
// tanpa kompetensi, pemula yang levelnya masih klaim, magang dan paruh waktu, cuti di tengah minggu, beban hampir
// penuh, penugasan yang ditolak karyawan, dan penugasan yang dipindah dalam 7 hari.

export const PERIOD = { start: "2026-09-28", end: "2026-10-02", label: "28 Sep - 2 Okt 2026" };
/** "Sekarang" di mockup: Selasa, 29 Sep 2026 09.15 WIB. */
export const NOW = "2026-09-29T09:15:00+07:00";
export const WORKSPACE = { name: "Arunika Digital", hoursPerWeek: 32 };

export const COMPETENCIES: Competency[] = [
  { id: "backend-api", name: "Backend API", category: "Backend" },
  { id: "oauth2", name: "OAuth2 & autentikasi", category: "Backend" },
  { id: "integrasi-api", name: "Integrasi API", category: "Backend" },
  { id: "laravel", name: "Laravel (PHP)", category: "Backend" },
  { id: "arsitektur-data", name: "Arsitektur data", category: "Data" },
  { id: "sql", name: "SQL & PostgreSQL", category: "Data" },
  { id: "react", name: "Frontend React", category: "Frontend" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend" },
  { id: "aksesibilitas", name: "Aksesibilitas (WCAG)", category: "Frontend" },
  { id: "flutter", name: "Flutter", category: "Mobile" },
  { id: "uiux", name: "UI/UX", category: "Desain" },
  { id: "design-system", name: "Design system", category: "Desain" },
  { id: "qa", name: "QA testing", category: "Kualitas" },
  { id: "e2e", name: "Pengujian E2E", category: "Kualitas" },
  { id: "devops", name: "DevOps", category: "Infrastruktur" },
  { id: "technical-writing", name: "Technical writing", category: "Dokumentasi" },
];

type Seed = Omit<Member, "email" | "initials" | "access" | "leaveDates" | "prefers" | "avoids"> & Partial<Pick<Member, "leaveDates" | "prefers" | "avoids" | "access">>;

// Foto contoh dari randomuser.me (portret dummy bebas pakai). Bayu (baru bergabung) dan Salsabila belum mengunggah foto.
const PHOTOS: Record<string, string> = {
  ayu: "women/44", bima: "men/32", dimas: "men/46", teguh: "men/75", yoga: "men/22", rizky: "men/11", citra: "women/68",
  putri: "women/26", dewi: "women/57", fikri: "men/7", andre: "men/52", nadia: "women/12", hana: "women/33",
  rafi: "men/64", gita: "women/90", fajar: "men/85", irfan: "men/41", wulan: "women/79",
};

const person = (m: Seed): Member => ({
  leaveDates: [], prefers: [], avoids: [], access: "anggota",
  ...(PHOTOS[m.id] && { photo: `https://randomuser.me/api/portraits/${PHOTOS[m.id]}.jpg` }),
  ...m,
  initials: m.name.split(" ").map(w => w[0]).slice(0, 2).join(""),
  email: `${m.id}@arunika.id`,
});

export const MEMBERS: Member[] = [
  // Backend
  person({ id: "ayu", name: "Ayu Pramesti", role: "Pengembang backend senior", availableHours: 32, weeklyLimit: 40,
    competencies: [{ id: "backend-api", level: 3, source: "verifikasi" }, { id: "arsitektur-data", level: 3, source: "verifikasi" }, { id: "sql", level: 3, source: "riwayat" }, { id: "oauth2", level: 2, source: "klaim" }, { id: "integrasi-api", level: 2, source: "riwayat" }],
    prefers: ["arsitektur-data", "sql"], avoids: ["technical-writing"] }),
  person({ id: "bima", name: "Bima Pradana", role: "Pengembang backend", availableHours: 32, weeklyLimit: 36,
    competencies: [{ id: "technical-writing", level: 3, source: "verifikasi" }, { id: "integrasi-api", level: 3, source: "riwayat" }, { id: "backend-api", level: 2, source: "verifikasi" }, { id: "oauth2", level: 2, source: "riwayat" }],
    prefers: ["integrasi-api", "backend-api"] }),
  person({ id: "dimas", name: "Dimas Saputra", role: "Pengembang backend", availableHours: 32, weeklyLimit: 36,
    competencies: [{ id: "sql", level: 3, source: "verifikasi" }, { id: "backend-api", level: 2, source: "riwayat" }, { id: "arsitektur-data", level: 2, source: "klaim" }, { id: "oauth2", level: 1, source: "klaim" }, { id: "devops", level: 1, source: "klaim" }],
    prefers: ["sql", "devops"] }),
  person({ id: "teguh", name: "Teguh Santoso", role: "Pengembang fullstack senior", availableHours: 30, weeklyLimit: 30,
    competencies: [{ id: "laravel", level: 3, source: "verifikasi" }, { id: "backend-api", level: 3, source: "verifikasi" }, { id: "oauth2", level: 3, source: "verifikasi" }, { id: "react", level: 2, source: "riwayat" }, { id: "sql", level: 2, source: "riwayat" }],
    prefers: ["laravel"], avoids: ["technical-writing"] }),
  person({ id: "yoga", name: "Yoga Prasetyo", role: "Pengembang Laravel", availableHours: 32, weeklyLimit: 40,
    competencies: [{ id: "laravel", level: 3, source: "riwayat" }, { id: "sql", level: 2, source: "riwayat" }, { id: "integrasi-api", level: 2, source: "klaim" }],
    prefers: ["laravel"] }),
  person({ id: "rizky", name: "Rizky Ananda", role: "Pengembang backend junior", availableHours: 32, weeklyLimit: 36,
    competencies: [{ id: "laravel", level: 2, source: "klaim" }, { id: "backend-api", level: 1, source: "klaim" }, { id: "sql", level: 1, source: "klaim" }],
    prefers: ["backend-api"] }),
  person({ id: "bayu", name: "Bayu Saputra", role: "Pengembang backend (baru bergabung)", availableHours: 32, weeklyLimit: 40, competencies: [] }),
  // Frontend
  person({ id: "citra", name: "Citra Maheswari", role: "Pengembang frontend senior", availableHours: 32, weeklyLimit: 36,
    competencies: [{ id: "react", level: 3, source: "verifikasi" }, { id: "aksesibilitas", level: 3, source: "verifikasi" }, { id: "tailwind", level: 2, source: "riwayat" }, { id: "uiux", level: 1, source: "klaim" }],
    prefers: ["aksesibilitas", "react"], avoids: ["devops"] }),
  person({ id: "putri", name: "Putri Ayuningtyas", role: "Pengembang frontend", availableHours: 32, weeklyLimit: 40,
    competencies: [{ id: "react", level: 2, source: "riwayat" }, { id: "tailwind", level: 3, source: "riwayat" }, { id: "design-system", level: 1, source: "klaim" }],
    prefers: ["tailwind"] }),
  person({ id: "dewi", name: "Dewi Lestari", role: "Pengembang frontend", availableHours: 32, weeklyLimit: 36, leaveDates: ["2026-09-30", "2026-10-01", "2026-10-02"],
    competencies: [{ id: "react", level: 2, source: "verifikasi" }, { id: "tailwind", level: 2, source: "riwayat" }, { id: "aksesibilitas", level: 1, source: "klaim" }] }),
  person({ id: "fikri", name: "Fikri Hidayatullah", role: "Pengembang frontend (magang)", availableHours: 20, weeklyLimit: 20,
    competencies: [{ id: "react", level: 1, source: "klaim" }, { id: "tailwind", level: 1, source: "klaim" }],
    prefers: ["tailwind"] }),
  // Mobile
  person({ id: "andre", name: "Andre Kurniawan", role: "Pengembang mobile senior", availableHours: 32, weeklyLimit: 40,
    competencies: [{ id: "flutter", level: 3, source: "verifikasi" }, { id: "integrasi-api", level: 2, source: "riwayat" }, { id: "backend-api", level: 1, source: "klaim" }],
    prefers: ["flutter"] }),
  person({ id: "salsabila", name: "Salsabila Putri", role: "Pengembang mobile junior", availableHours: null, weeklyLimit: 32,
    competencies: [{ id: "flutter", level: 1, source: "klaim" }] }),
  // Desain
  person({ id: "nadia", name: "Nadia Putri", role: "Desainer produk", availableHours: 32, weeklyLimit: 32,
    competencies: [{ id: "uiux", level: 3, source: "verifikasi" }, { id: "design-system", level: 3, source: "verifikasi" }, { id: "tailwind", level: 2, source: "klaim" }, { id: "react", level: 1, source: "klaim" }],
    prefers: ["design-system", "uiux"], avoids: ["sql"] }),
  person({ id: "hana", name: "Hana Kurniawati", role: "Desainer UI (paruh waktu)", availableHours: 20, weeklyLimit: 20,
    competencies: [{ id: "uiux", level: 2, source: "riwayat" }, { id: "design-system", level: 2, source: "klaim" }],
    prefers: ["uiux"], avoids: ["devops"] }),
  // Kualitas, infrastruktur, analisis
  person({ id: "rafi", name: "Rafi Ramadhan", role: "QA engineer", availableHours: null, weeklyLimit: 32,
    competencies: [{ id: "qa", level: 3, source: "verifikasi" }, { id: "e2e", level: 2, source: "klaim" }, { id: "react", level: 1, source: "klaim" }],
    prefers: ["qa", "e2e"] }),
  person({ id: "gita", name: "Gita Larasati", role: "QA engineer", availableHours: 32, weeklyLimit: 32,
    competencies: [{ id: "qa", level: 2, source: "riwayat" }, { id: "e2e", level: 1, source: "klaim" }],
    prefers: ["qa"] }),
  person({ id: "fajar", name: "Fajar Hidayat", role: "DevOps engineer", availableHours: 32, weeklyLimit: 36,
    competencies: [{ id: "devops", level: 3, source: "verifikasi" }, { id: "sql", level: 1, source: "klaim" }],
    prefers: ["devops"], avoids: ["uiux"] }),
  person({ id: "irfan", name: "Irfan Maulana", role: "Analis sistem", availableHours: 32, weeklyLimit: 36,
    competencies: [{ id: "technical-writing", level: 2, source: "verifikasi" }, { id: "arsitektur-data", level: 1, source: "klaim" }],
    prefers: ["technical-writing"] }),
  person({ id: "wulan", name: "Wulan Sari", role: "Penulis teknis (paruh waktu)", availableHours: 24, weeklyLimit: 24,
    competencies: [{ id: "technical-writing", level: 3, source: "verifikasi" }, { id: "design-system", level: 1, source: "klaim" }],
    prefers: ["technical-writing"] }),
];

export const PROJECTS: Project[] = [
  { id: "klinik", name: "Sistem Antrean Klinik Kaliwates", client: "Klinik Pratama Kaliwates", dueDate: "2026-10-30" },
  { id: "koperasi", name: "Aplikasi Simpan Pinjam Tani Makmur", client: "Koperasi Tani Makmur Ambulu", dueDate: "2026-11-20" },
  { id: "smk", name: "Portal Penerimaan Siswa SMK Bina Karya", client: "SMK Bina Karya Jember", dueDate: "2026-11-06" },
  { id: "batik", name: "Toko Online Batik Tanjung", client: "Batik Tanjung Banyuwangi", dueDate: "2026-10-23" },
  { id: "internal", name: "Peningkatan platform internal", client: "Arunika Digital", dueDate: "2026-10-16" },
];

const AUTH_DESC = "Tambahkan login dengan akun Google untuk staf klinik memakai OAuth2. Backend API perlu endpoint callback dan penyimpanan sesi yang aman. Sesi lama dari login email tetap berjalan sampai staf pindah. Perlu dicek juga apakah integrasi ke API kepegawaian klinik dibutuhkan.";
const MODEL = { model: "llm-kecil@2026-09", prompt: "taskdna-v1" };

type Quick = Pick<Task, "id" | "projectId" | "title" | "description" | "dueDate" | "status" | "remainingHours" | "createdAt" | "competencyIds"> & Partial<Pick<Task, "priority" | "assignments" | "actualHours" | "responseReason" | "dna">>;
const task = (t: Quick): Task => ({ priority: "normal", assignments: [], ...t });

export const TASKS: Task[] = [
  // ---- Belum ditugaskan
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
      dependencies: [{ taskId: "TGS-0137", p: 0.62 }], ...MODEL, confirmed: false,
    },
  },
  {
    id: "TGS-0143", projectId: "klinik", title: "Penyempurnaan halaman onboarding pasien", description: "Rapikan alur onboarding pasien baru di aplikasi web: langkah isi data diri dipecah jadi tiga, validasi NIK langsung di form, dan tampilan mengikuti design system klinik. Komponen React dan Tailwind yang sudah ada dipakai ulang.",
    dueDate: "2026-10-02", priority: "normal", status: "belum", assignments: [], remainingHours: 6,
    createdAt: "2026-09-28T14:20:00+07:00", competencyIds: [],
    dna: {
      requirements: [
        { competencyId: "react", level: 2, p: 0.94, quote: "Komponen React dan Tailwind yang sudah ada dipakai ulang" },
        { competencyId: "tailwind", level: 1, p: 0.88, quote: "Komponen React dan Tailwind" },
        { competencyId: "uiux", level: 1, p: 0.72, quote: "langkah isi data diri dipecah jadi tiga" },
      ],
      effortSize: "M", effortP: 0.8, effortHours: 6, complexity: 1, complexitySpread: 0, dependencies: [], ...MODEL, confirmed: true,
    },
  },
  {
    id: "TGS-0144", projectId: "internal", title: "Pengujian alur penugasan", description: "Buat skenario uji end-to-end untuk alur buat tugas sampai tetapkan penugasan, termasuk kasus kandidat tidak lolos syarat dan simpan draf. Hasil uji ditulis sebagai checklist QA.",
    dueDate: "2026-10-02", priority: "normal", status: "belum", assignments: [], remainingHours: 4,
    createdAt: "2026-09-28T16:05:00+07:00", competencyIds: [],
    dna: {
      requirements: [
        { competencyId: "qa", level: 3, p: 0.97, quote: "Hasil uji ditulis sebagai checklist QA" },
        { competencyId: "e2e", level: 2, p: 0.9, quote: "skenario uji end-to-end" },
      ],
      effortSize: "S", effortP: 0.8, effortHours: 4, complexity: 2, complexitySpread: 1, dependencies: [], ...MODEL, confirmed: true,
    },
  },
  {
    id: "TGS-0166", projectId: "smk", title: "Notifikasi status pendaftaran lewat email", description: "Kirim email otomatis saat status pendaftaran calon siswa berubah (diverifikasi, diterima, cadangan). Backend API menyimpan antrean email dan memanggil layanan pengirim email sekolah.",
    dueDate: "2026-10-06", priority: "normal", status: "belum", assignments: [], remainingHours: 6,
    createdAt: "2026-09-28T10:40:00+07:00", competencyIds: [],
    dna: {
      requirements: [
        { competencyId: "backend-api", level: 2, p: 0.93, quote: "Backend API menyimpan antrean email" },
        { competencyId: "integrasi-api", level: 1, p: 0.81, quote: "memanggil layanan pengirim email sekolah" },
      ],
      effortSize: "M", effortP: 0.7, effortHours: 6, complexity: 1, complexitySpread: 0, dependencies: [], ...MODEL, confirmed: true,
    },
  },
  {
    id: "TGS-0167", projectId: "batik", title: "Optimasi gambar produk dan lazy load", description: "Halaman katalog terasa lambat di ponsel. Kompres foto produk, sajikan ukuran sesuai layar, dan muat gambar saat terlihat di komponen React katalog.",
    dueDate: "2026-10-05", priority: "tinggi", status: "belum", assignments: [], remainingHours: 4,
    createdAt: "2026-09-29T08:30:00+07:00", competencyIds: [],
    dna: {
      requirements: [
        { competencyId: "react", level: 2, p: 0.9, quote: "muat gambar saat terlihat di komponen React katalog" },
        { competencyId: "devops", level: 1, p: 0.64, quote: "sajikan ukuran sesuai layar" },
      ],
      effortSize: "S", effortP: 0.75, effortHours: 4, complexity: 1, complexitySpread: 0, dependencies: [], ...MODEL, confirmed: true,
    },
  },
  {
    id: "TGS-0168", projectId: "koperasi", title: "Layar simulasi pinjaman di aplikasi mobile", description: "Anggota koperasi bisa mencoba besaran pinjaman dan tenor lalu melihat angsuran per bulan sebelum mengajukan. Dibuat di aplikasi Flutter dengan tampilan yang mudah dibaca petani.",
    dueDate: "2026-10-06", priority: "normal", status: "belum", assignments: [], remainingHours: 12,
    createdAt: "2026-09-28T13:10:00+07:00", competencyIds: [],
    dna: {
      requirements: [
        { competencyId: "flutter", level: 2, p: 0.97, quote: "Dibuat di aplikasi Flutter" },
        { competencyId: "uiux", level: 1, p: 0.7, quote: "tampilan yang mudah dibaca petani" },
      ],
      effortSize: "L", effortP: 0.6, effortHours: 12, complexity: 2, complexitySpread: 1, dependencies: [{ taskId: "TGS-0160", p: 0.8 }], ...MODEL, confirmed: true,
    },
  },
  task({ id: "TGS-0170", projectId: "batik", title: "Dokumentasi API pembayaran untuk tim toko", description: "Tulis panduan alur pembayaran Midtrans, status transaksi, dan cara menangani pembayaran gagal untuk admin toko.", dueDate: "2026-10-07", status: "belum", remainingHours: 4, createdAt: "2026-09-25T15:00:00+07:00", competencyIds: [],
    dna: { requirements: [
      { competencyId: "technical-writing", level: 2, p: 0.95, quote: "Tulis panduan alur pembayaran Midtrans" },
      { competencyId: "backend-api", level: 1, p: 0.7, quote: "status transaksi, dan cara menangani pembayaran gagal" },
    ], effortSize: "S", effortP: 0.8, effortHours: 4, complexity: 1, complexitySpread: 0, dependencies: [], ...MODEL, confirmed: true },
    responseReason: "Masih fokus menyelesaikan modul pembayaran, baru bisa minggu depan. Lebih tepat ke tim dokumentasi." }),
  // ---- Draf (belum dianalisis)
  task({ id: "TGS-0169", projectId: "klinik", title: "Rekap kunjungan pasien per poli", description: "Kepala klinik minta rekap jumlah kunjungan per poli per hari untuk rapat bulanan.", dueDate: "2026-10-09", status: "draf", remainingHours: 0, createdAt: "2026-09-29T08:50:00+07:00", competencyIds: [] }),
  // ---- Menunggu jawaban karyawan
  task({ id: "TGS-0152", projectId: "smk", title: "Review kode modul pendaftaran", description: "Tinjau kode modul pendaftaran sebelum dibuka untuk umum: validasi berkas, keamanan unggahan, dan query rekap.", dueDate: "2026-10-02", status: "menunggu", assignments: [{ memberId: "teguh", hours: 6 }], remainingHours: 6, createdAt: "2026-09-28T16:30:00+07:00", competencyIds: ["laravel", "backend-api"] }),
  task({ id: "TGS-0171", projectId: "smk", title: "Halaman tanya jawab portal pendaftaran", description: "Halaman FAQ berisi syarat berkas, jadwal, dan kontak panitia.", dueDate: "2026-10-05", priority: "rendah", status: "menunggu", assignments: [{ memberId: "fikri", hours: 4 }], remainingHours: 4, createdAt: "2026-09-28T17:00:00+07:00", competencyIds: ["react", "tailwind"] }),
  // ---- Berjalan
  task({ id: "TGS-0131", projectId: "internal", title: "Refaktor modul kapasitas mingguan", description: "Pisahkan perhitungan kapasitas mingguan dari modul laporan dan pindahkan ke skema data tersendiri.", dueDate: "2026-09-30", priority: "tinggi", status: "berjalan", assignments: [{ memberId: "ayu", hours: 16 }], remainingHours: 12, createdAt: "2026-09-24T10:00:00+07:00", competencyIds: ["arsitektur-data", "sql"] }),
  task({ id: "TGS-0137", projectId: "klinik", title: "Migrasi skema antrean ke PostgreSQL 16", description: "Pindahkan tabel antrean dan sesi pengguna ke PostgreSQL 16 dengan skrip migrasi yang bisa diulang.", dueDate: "2026-10-01", status: "berjalan", assignments: [{ memberId: "ayu", hours: 12 }], remainingHours: 7, createdAt: "2026-09-25T09:30:00+07:00", competencyIds: ["sql", "backend-api"] }),
  task({ id: "TGS-0135", projectId: "koperasi", title: "Integrasi webhook notifikasi WhatsApp", description: "Kirim notifikasi jatuh tempo angsuran lewat webhook penyedia WhatsApp Business.", dueDate: "2026-10-02", status: "berjalan", assignments: [{ memberId: "bima", hours: 8 }], remainingHours: 5, createdAt: "2026-09-25T13:00:00+07:00", competencyIds: ["integrasi-api", "backend-api"] }),
  task({ id: "TGS-0133", projectId: "internal", title: "Optimasi query beban alokasi", description: "Kurangi waktu query beban alokasi per periode dengan indeks komposit.", dueDate: "2026-10-02", status: "berjalan", assignments: [{ memberId: "dimas", hours: 14 }], remainingHours: 8, createdAt: "2026-09-24T14:00:00+07:00", competencyIds: ["sql", "arsitektur-data"] }),
  task({ id: "TGS-0151", projectId: "batik", title: "Modul pembayaran Midtrans", description: "Checkout memakai Midtrans: virtual account, QRIS, dan pembaruan status lewat webhook.", dueDate: "2026-10-06", priority: "tinggi", status: "berjalan", assignments: [{ memberId: "teguh", hours: 20 }], remainingHours: 14, createdAt: "2026-09-22T09:00:00+07:00", competencyIds: ["laravel", "integrasi-api"] }),
  task({ id: "TGS-0153", projectId: "smk", title: "Form pendaftaran calon siswa", description: "Form pendaftaran bertahap dengan unggah rapor dan kartu keluarga.", dueDate: "2026-10-09", priority: "tinggi", status: "berjalan", assignments: [{ memberId: "yoga", hours: 18 }], remainingHours: 12, createdAt: "2026-09-14T09:00:00+07:00", competencyIds: ["laravel", "sql"] }),
  task({ id: "TGS-0150", projectId: "koperasi", title: "Ekspor laporan simpanan ke PDF", description: "Pengurus koperasi bisa mengunduh laporan simpanan bulanan dalam PDF.", dueDate: "2026-10-07", status: "berjalan", assignments: [{ memberId: "rizky", hours: 12 }], remainingHours: 10, createdAt: "2026-09-23T10:00:00+07:00", competencyIds: ["laravel", "backend-api"] }),
  task({ id: "TGS-0139", projectId: "klinik", title: "Perbaikan kontras halaman laporan", description: "Perbaiki temuan kontras dari audit WCAG di halaman laporan harian.", dueDate: "2026-10-02", status: "berjalan", assignments: [{ memberId: "citra", hours: 4 }], remainingHours: 3, createdAt: "2026-09-28T11:00:00+07:00", competencyIds: ["aksesibilitas", "tailwind"] }),
  task({ id: "TGS-0172", projectId: "klinik", title: "Layar antrean untuk TV ruang tunggu", description: "Tampilan nomor antrean besar untuk TV di ruang tunggu, terbaca dari jarak 5 meter.", dueDate: "2026-10-01", status: "berjalan", assignments: [{ memberId: "citra", hours: 10 }], remainingHours: 6, createdAt: "2026-09-25T10:00:00+07:00", competencyIds: ["react", "aksesibilitas"] }),
  task({ id: "TGS-0155", projectId: "batik", title: "Halaman katalog produk batik", description: "Katalog dengan filter motif, ukuran, dan harga.", dueDate: "2026-10-02", status: "berjalan", assignments: [{ memberId: "putri", hours: 16 }], remainingHours: 9, createdAt: "2026-09-21T09:00:00+07:00", competencyIds: ["react", "tailwind"] }),
  task({ id: "TGS-0156", projectId: "batik", title: "Keranjang dan halaman checkout", description: "Keranjang belanja, ongkir per kota, dan ringkasan pesanan.", dueDate: "2026-10-09", status: "berjalan", assignments: [{ memberId: "putri", hours: 10 }], remainingHours: 10, createdAt: "2026-09-25T09:00:00+07:00", competencyIds: ["react", "tailwind"] }),
  task({ id: "TGS-0158", projectId: "smk", title: "Halaman status pendaftaran", description: "Calon siswa melihat status berkas dan pengumuman hasil seleksi.", dueDate: "2026-10-02", status: "berjalan", assignments: [{ memberId: "dewi", hours: 10 }], remainingHours: 8, createdAt: "2026-09-24T09:00:00+07:00", competencyIds: ["react", "tailwind"] }),
  task({ id: "TGS-0157", projectId: "smk", title: "Tampilan responsif halaman profil sekolah", description: "Perbaiki tata letak profil sekolah di layar ponsel kecil.", dueDate: "2026-10-05", priority: "rendah", status: "berjalan", assignments: [{ memberId: "fikri", hours: 8 }], remainingHours: 6, createdAt: "2026-09-24T13:00:00+07:00", competencyIds: ["tailwind"] }),
  task({ id: "TGS-0159", projectId: "koperasi", title: "Pengingat angsuran di aplikasi mobile", description: "Notifikasi pengingat angsuran tiga hari sebelum jatuh tempo.", dueDate: "2026-10-06", status: "berjalan", assignments: [{ memberId: "andre", hours: 20 }], remainingHours: 12, createdAt: "2026-09-22T10:00:00+07:00", competencyIds: ["flutter", "integrasi-api"] }),
  task({ id: "TGS-0160", projectId: "koperasi", title: "Integrasi API simpanan ke aplikasi mobile", description: "Saldo dan mutasi simpanan tampil di aplikasi mobile dari API koperasi.", dueDate: "2026-10-02", priority: "tinggi", status: "berjalan", assignments: [{ memberId: "andre", hours: 10 }], remainingHours: 8, createdAt: "2026-09-24T10:00:00+07:00", competencyIds: ["flutter", "integrasi-api"] }),
  task({ id: "TGS-0134", projectId: "koperasi", title: "Desain komponen form pengajuan pinjaman", description: "Rancang komponen form yang menyesuaikan jenis pinjaman dan token desain koperasi.", dueDate: "2026-10-01", status: "berjalan", assignments: [{ memberId: "nadia", hours: 16 }], remainingHours: 10, createdAt: "2026-09-24T09:00:00+07:00", competencyIds: ["design-system", "uiux"] }),
  task({ id: "TGS-0138", projectId: "klinik", title: "Revisi antarmuka jadwal dokter", description: "Revisi tata letak dan hierarki visual halaman jadwal dokter berdasarkan masukan klinik.", dueDate: "2026-10-02", status: "berjalan", assignments: [{ memberId: "hana", hours: 14 }], remainingHours: 9, createdAt: "2026-09-25T10:00:00+07:00", competencyIds: ["uiux", "design-system"] }),
  task({ id: "TGS-0164", projectId: "klinik", title: "Uji regresi modul antrean", description: "Uji ulang alur ambil nomor, panggil, dan lewati antrean setelah migrasi database.", dueDate: "2026-10-01", status: "berjalan", assignments: [{ memberId: "gita", hours: 12 }], remainingHours: 8, createdAt: "2026-09-25T13:00:00+07:00", competencyIds: ["qa", "e2e"] }),
  task({ id: "TGS-0136", projectId: "internal", title: "Pipeline CI/CD lingkungan staging", description: "Siapkan pipeline build, uji, dan deploy otomatis ke lingkungan staging.", dueDate: "2026-10-02", status: "berjalan", assignments: [{ memberId: "fajar", hours: 20 }], remainingHours: 11, createdAt: "2026-09-24T11:00:00+07:00", competencyIds: ["devops"] }),
  task({ id: "TGS-0140", projectId: "koperasi", title: "Analisis kebutuhan laporan simpan pinjam", description: "Petakan kebutuhan laporan bulanan simpan pinjam bersama pengurus koperasi.", dueDate: "2026-10-02", status: "berjalan", assignments: [{ memberId: "irfan", hours: 8 }], remainingHours: 5, createdAt: "2026-09-28T09:30:00+07:00", competencyIds: ["technical-writing", "arsitektur-data"] }),
  task({ id: "TGS-0165", projectId: "smk", title: "Spesifikasi alur seleksi siswa", description: "Dokumen aturan seleksi, kuota per jurusan, dan alur verifikasi berkas bersama panitia.", dueDate: "2026-10-08", status: "berjalan", assignments: [{ memberId: "irfan", hours: 12 }], remainingHours: 10, createdAt: "2026-09-25T09:00:00+07:00", competencyIds: ["technical-writing", "arsitektur-data"] }),
  task({ id: "TGS-0132", projectId: "klinik", title: "Panduan integrasi API untuk mitra klinik", description: "Tulis panduan langkah demi langkah integrasi API antrean untuk mitra klinik.", dueDate: "2026-10-01", status: "berjalan", assignments: [{ memberId: "wulan", hours: 12 }], remainingHours: 7, createdAt: "2026-09-24T13:00:00+07:00", competencyIds: ["technical-writing"] }),
  // ---- Selesai di periode aktif (jam aktual dicatat saat selesai)
  task({ id: "TGS-0128", projectId: "internal", title: "Dokumentasi endpoint kandidat", description: "Dokumentasikan endpoint rekomendasi kandidat untuk tim frontend.", dueDate: "2026-09-28", priority: "rendah", status: "selesai", assignments: [{ memberId: "bima", hours: 8 }], remainingHours: 0, actualHours: 10, createdAt: "2026-09-22T09:00:00+07:00", competencyIds: ["technical-writing", "backend-api"] }),
  task({ id: "TGS-0126", projectId: "klinik", title: "Audit aksesibilitas WCAG 2.2 layar utama", description: "Audit kontras, fokus keyboard, dan label pembaca layar di lima layar utama.", dueDate: "2026-09-28", priority: "rendah", status: "selesai", assignments: [{ memberId: "citra", hours: 16 }], remainingHours: 0, actualHours: 21, createdAt: "2026-09-21T09:00:00+07:00", competencyIds: ["aksesibilitas", "react"] }),
  task({ id: "TGS-0129", projectId: "koperasi", title: "Indeks pencarian riwayat transaksi", description: "Tambahkan indeks pencarian riwayat transaksi anggota koperasi.", dueDate: "2026-09-29", status: "selesai", assignments: [{ memberId: "dimas", hours: 8 }], remainingHours: 0, actualHours: 8, createdAt: "2026-09-22T10:00:00+07:00", competencyIds: ["sql"] }),
  task({ id: "TGS-0130", projectId: "klinik", title: "Ilustrasi keadaan kosong antrean", description: "Buat ilustrasi dan teks untuk keadaan antrean kosong.", dueDate: "2026-09-28", priority: "rendah", status: "selesai", assignments: [{ memberId: "nadia", hours: 8 }], remainingHours: 0, actualHours: 11, createdAt: "2026-09-23T09:00:00+07:00", competencyIds: ["uiux"] }),
  task({ id: "TGS-0127", projectId: "internal", title: "Checklist uji fitur ekspor", description: "Susun checklist uji untuk fitur ekspor laporan.", dueDate: "2026-09-28", priority: "rendah", status: "selesai", assignments: [{ memberId: "gita", hours: 4 }], remainingHours: 0, actualHours: 6, createdAt: "2026-09-21T10:00:00+07:00", competencyIds: ["qa"] }),
  task({ id: "TGS-0154", projectId: "smk", title: "Impor data siswa dari Excel", description: "Impor data siswa tahun lalu dari berkas Excel sekolah.", dueDate: "2026-09-28", status: "selesai", assignments: [{ memberId: "yoga", hours: 6 }], remainingHours: 0, actualHours: 9, createdAt: "2026-09-21T09:00:00+07:00", competencyIds: ["laravel", "sql"] }),
  task({ id: "TGS-0162", projectId: "batik", title: "Aset banner promo bulan batik", description: "Banner promo Hari Batik untuk beranda dan media sosial.", dueDate: "2026-09-28", priority: "rendah", status: "selesai", assignments: [{ memberId: "hana", hours: 4 }], remainingHours: 0, actualHours: 5, createdAt: "2026-09-23T13:00:00+07:00", competencyIds: ["uiux"] }),
  // ---- Riwayat sebelum periode aktif (untuk faktor R), tidak memakan kapasitas minggu ini
  task({ id: "TGS-0118", projectId: "koperasi", title: "Login anggota koperasi dengan OTP", description: "Login OTP lewat SMS untuk anggota koperasi.", dueDate: "2026-09-18", priority: "tinggi", status: "selesai", assignments: [{ memberId: "bima", hours: 0 }], remainingHours: 0, createdAt: "2026-09-10T09:00:00+07:00", competencyIds: ["oauth2", "backend-api"] }),
  task({ id: "TGS-0112", projectId: "internal", title: "API rekap kapasitas tim", description: "Endpoint rekap kapasitas per periode.", dueDate: "2026-09-11", status: "selesai", assignments: [{ memberId: "ayu", hours: 0 }], remainingHours: 0, createdAt: "2026-09-04T09:00:00+07:00", competencyIds: ["backend-api", "sql"] }),
  task({ id: "TGS-0108", projectId: "klinik", title: "Single sign-on dashboard admin klinik", description: "SSO untuk dashboard admin klinik.", dueDate: "2026-09-04", status: "selesai", assignments: [{ memberId: "bima", hours: 0 }], remainingHours: 0, createdAt: "2026-08-28T09:00:00+07:00", competencyIds: ["oauth2", "integrasi-api"] }),
  task({ id: "TGS-0106", projectId: "batik", title: "Login pelanggan dengan Google", description: "Login pelanggan toko memakai akun Google.", dueDate: "2026-09-11", status: "selesai", assignments: [{ memberId: "teguh", hours: 0 }], remainingHours: 0, createdAt: "2026-09-02T09:00:00+07:00", competencyIds: ["oauth2", "laravel"] }),
  task({ id: "TGS-0104", projectId: "smk", title: "Kerangka aplikasi portal sekolah", description: "Instalasi Laravel, autentikasi admin, dan struktur modul.", dueDate: "2026-09-14", status: "selesai", assignments: [{ memberId: "yoga", hours: 0 }], remainingHours: 0, createdAt: "2026-09-07T09:00:00+07:00", competencyIds: ["laravel"] }),
  task({ id: "TGS-0101", projectId: "koperasi", title: "Kerangka aplikasi mobile koperasi", description: "Struktur proyek Flutter, tema, dan navigasi.", dueDate: "2026-09-11", status: "selesai", assignments: [{ memberId: "andre", hours: 0 }], remainingHours: 0, createdAt: "2026-09-01T09:00:00+07:00", competencyIds: ["flutter"] }),
];

/** Keputusan tiga minggu terakhir (untuk Riwayat keputusan & Laporan dampak). */
export const DECISIONS: Decision[] = [
  { id: "KPT-044", taskId: "TGS-0139", memberIds: ["citra"], rank: 1, preset: "seimbang", decidedAt: "2026-09-28T11:06:00+07:00", decisionMs: 6 * 60_000, conflictsSeen: 1 },
  { id: "KPT-043", taskId: "TGS-0152", memberIds: ["teguh"], rank: 1, preset: "seimbang", decidedAt: "2026-09-28T16:41:00+07:00", decisionMs: 5 * 60_000, conflictsSeen: 1 },
  { id: "KPT-042", taskId: "TGS-0171", memberIds: ["fikri"], rank: null, preset: "sebar", reasonCode: "pengembangan", note: "Tugas ringan untuk melatih anak magang.", decidedAt: "2026-09-28T17:05:00+07:00", decisionMs: 9 * 60_000, conflictsSeen: 0 },
  { id: "KPT-041", taskId: "TGS-0144", memberIds: [], rank: null, rejected: true, preset: "seimbang", reasonCode: "tidak-sesuai", note: "Rafi belum mengisi ketersediaan, Gita masih di level klaim untuk E2E.", decidedAt: "2026-09-28T16:20:00+07:00", decisionMs: 7 * 60_000, conflictsSeen: 0 },
  { id: "KPT-040", taskId: "TGS-0170", memberIds: ["teguh"], rank: 1, preset: "seimbang", decidedAt: "2026-09-25T15:12:00+07:00", decisionMs: 4 * 60_000, conflictsSeen: 1 },
  { id: "KPT-039", taskId: "TGS-0137", memberIds: ["ayu"], rank: 2, preset: "seimbang", decidedAt: "2026-09-25T09:41:00+07:00", decisionMs: 11 * 60_000, conflictsSeen: 2 },
  { id: "KPT-038", taskId: "TGS-0135", memberIds: ["bima"], rank: 1, preset: "tenggat", decidedAt: "2026-09-25T13:08:00+07:00", decisionMs: 8 * 60_000, conflictsSeen: 0 },
  { id: "KPT-037", taskId: "TGS-0134", memberIds: ["nadia"], rank: null, preset: "seimbang", reasonCode: "klien", note: "Klien koperasi minta desainer yang sama dengan proyek sebelumnya.", decidedAt: "2026-09-24T09:15:00+07:00", decisionMs: 14 * 60_000, conflictsSeen: 1 },
  { id: "KPT-036", taskId: "TGS-0133", memberIds: ["dimas"], rank: 1, preset: "ratakan", decidedAt: "2026-09-24T14:07:00+07:00", decisionMs: 7 * 60_000, conflictsSeen: 1 },
  { id: "KPT-035", taskId: "TGS-0131", memberIds: ["ayu"], rank: 1, preset: "seimbang", decidedAt: "2026-09-24T10:09:00+07:00", decisionMs: 9 * 60_000, conflictsSeen: 0 },
  { id: "KPT-034", taskId: "TGS-0158", memberIds: ["dewi"], rank: 1, preset: "seimbang", decidedAt: "2026-09-24T09:20:00+07:00", decisionMs: 6 * 60_000, conflictsSeen: 0 },
  { id: "KPT-033", taskId: "TGS-0150", memberIds: ["rizky"], rank: 3, preset: "sebar", decidedAt: "2026-09-23T10:30:00+07:00", decisionMs: 12 * 60_000, conflictsSeen: 1 },
  { id: "KPT-032", taskId: "TGS-0159", memberIds: ["andre"], rank: 1, preset: "seimbang", decidedAt: "2026-09-22T10:20:00+07:00", decisionMs: 5 * 60_000, conflictsSeen: 0 },
  { id: "KPT-031", taskId: "TGS-0151", memberIds: ["teguh"], rank: 1, preset: "tenggat", decidedAt: "2026-09-22T09:25:00+07:00", decisionMs: 6 * 60_000, conflictsSeen: 1 },
  { id: "KPT-030", taskId: "TGS-0155", memberIds: ["putri"], rank: 1, preset: "seimbang", decidedAt: "2026-09-21T09:40:00+07:00", decisionMs: 8 * 60_000, conflictsSeen: 0 },
  { id: "KPT-029", taskId: "TGS-0153", memberIds: ["yoga"], rank: null, preset: "seimbang", reasonCode: "info", note: "Rizky ternyata belum pernah memegang unggah berkas; dipindah ke Yoga.", decidedAt: "2026-09-16T10:05:00+07:00", decisionMs: 10 * 60_000, conflictsSeen: 1 },
  { id: "KPT-028", taskId: "TGS-0153", memberIds: ["rizky"], rank: 1, preset: "sebar", decidedAt: "2026-09-14T09:30:00+07:00", decisionMs: 7 * 60_000, conflictsSeen: 0 },
];

/** Baseline Tb dari observasi manual sebelum pilot (menit per keputusan) `[asumsi]`. */
export const BASELINE_MINUTES = 24;
