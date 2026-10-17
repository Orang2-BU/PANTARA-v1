# 04 — TODO: Progres Build

> AI wajib memperbarui file ini setiap status task berubah. ID sama dengan 03-ARCHITECTURE.

**Legenda:** ⬜ Todo · 🟦 In Progress · ✅ Done · ⛔ Blocked · ✂️ Dipotong (scope cut)

**Target:** Mockup frontend Kamis, 22 Okt 2026 · MVP: 6 minggu setelah lomba `[asumsi]` · **Update terakhir:** 2026-10-16 (setup T1-T2)

## Task

### M0 — Mockup frontend (tenggat 22 Okt 2026)
| ID | Task | Pemilik | Prioritas | Status | Bukti verifikasi / Catatan |
|---|---|---|---|---|---|
| T1 | Scaffold frontend + tooling + token + font | — | Must | ✅ | Next 16.4.2 + Tailwind v4 + Onest/JetBrains Mono; token dari `designmd export`; favicon & ikon dari docs/brand. tsc, lint, vitest (3 lulus), knip, build (42 rute) hijau, 16 Okt |
| T2 | App shell persis template + stepper + kerangka semua rute + Placeholder | — | Must | ✅ | Port shell K-DASP; dibandingkan berdampingan dengan screenshot acuan di 1440/768/375; drawer dialog (Esc, fokus kembali), tanpa scroll horizontal, tanpa error console; 7 test, knip bersih, build 42 rute, 16 Okt |
| T3 | Seed demo + tipe + store | — | Must | ✅ | Seed konsisten dengan prototipe (28/16/20/22/24/0 = 110 dari 160 jam), store + sessionStorage + reset, 16 Okt |
| T4 | Engine: syarat wajib + skor + preset + alasan (Vitest) | — | Must | ✅ | Engine skor + 4 preset + alasan dari faktor; Vitest (Bima 0,6625 sesuai hitung manual), 16 Okt |
| T5 | Engine: what-if + konflik (Vitest) | — | Must | ✅ | What-if (beban sebelum/sesudah, konflik kapasitas/tenggat/dependensi, bagi 2 orang); Vitest, 16 Okt |
| T6 | P10 Dasbor | — | Must | ✅ | Dasbor sesuai prototipe (4 metrik, kapasitas anggota, sorotan tugas berikutnya, catatan), 16 Okt |
| T7 | P11 Daftar tugas | — | Must | ✅ | Daftar tugas: cari, filter status (URL) & prioritas, aksi per status, 16 Okt |
| T8 | P12 Buat tugas | — | Must | ✅ | Buat tugas: validasi per field, simpan draf, Task DNA simulasi kata kunci, 16 Okt |
| T9 | P13 Tinjau Task DNA | — | Must | ✅ | Task DNA: bukti tersorot, zona yakin/perlu dicek, isian ragu wajib ditinjau, edit level/upaya/dependensi, 16 Okt |
| T10 | P14 Rekomendasi kandidat | — | Must | ✅ | Kandidat: sorotan #1, 3 kartu faktor K-C-A-R-F, ganti preset, tidak lolos + alasan, pilih orang lain, 16 Okt |
| T11 | P15 Simulasi what-if + dialog Tetapkan | — | Must | ✅ | Simulasi: skenario Top 3 + bagi 2 orang, sebelum→sesudah, konflik, dialog tetapkan (alasan wajib bila override), 16 Okt |
| T12 | Pembaruan kapasitas + P16 Detail tugas | — | Must | ✅ | Kapasitas diperbarui di semua halaman; detail tugas + log keputusan + tugaskan ulang, 16 Okt |
| T13 | P18 Tim + P19 Profil kerja | — | Must | ✅ | Tim (filter, tambah anggota) + profil Work Twin (verifikasi kompetensi, ubah ketersediaan), 16 Okt |
| T14 | P21 Kapasitas | — | Must | ✅ | Kapasitas: 160/110/68,8% sesuai prototipe, filter, lengkapi data, 16 Okt |
| T15 | P5 Masuk (demo) + P36/P38 | — | Must | ✅ | Masuk demo, daftar/lupa/reset/undangan dengan validasi, 404, 403, 16 Okt |
| T16 | Landing: token Area Landing, `Section`, navbar, footer | — | Must | ⛔ | Menunggu inspirasi landing (00-BRIEF P2) |
| T17 | Landing L1 Hero | — | Must | ⬜ | — |
| T18 | Landing L2 Masalah | — | Must | ⬜ | — |
| T19 | Landing L3 Cara kerja | — | Must | ⬜ | — |
| T20 | Landing L4 Kamu yang memutuskan | — | Must | ⬜ | — |
| T21 | Landing L5 Untuk siapa | — | Should | ⬜ | — |
| T22 | Landing L6 Harga | — | Should | ⬜ | Tanpa angka harga sampai rancangan bisnis masuk (00-BRIEF P8) |
| T23 | Landing L7 FAQ | — | Should | ⬜ | — |
| T24 | Landing L8 CTA penutup + `content/landing.ts` + meta SEO/OG | — | Must | ⬜ | — |
| T25 | Uji responsif, a11y, Standar UI A1-A13 + perbaikan | — | Must | ⬜ | — |
| T26 | Deploy preview + video cadangan + latihan demo | — | Must | ⬜ | Deploy butuh izin user |
| T27 | Pengingat "data belum lengkap" satu klik (F17) | — | Could | ✅ | Ingatkan lengkapi data di profil anggota, 16 Okt |
| T28 | Pintasan keyboard alur inti (F20) | — | Could | ⬜ | A12 |

### M1-M5 — MVP (setelah lomba)
| ID | Task | Pemilik | Prioritas | Status | Bukti verifikasi / Catatan |
|---|---|---|---|---|---|
| B1 | Scaffold backend Django + DRF + PostgreSQL + health-check | — | Must | ⬜ | — |
| B2 | Model Work Twin + migrasi | — | Must | ⬜ | — |
| B3 | Auth sesi + peran | — | Must | ⬜ | — |
| B4 | Model & API tugas | — | Must | ⬜ | — |
| B5 | `seed_demo` | — | Must | ⬜ | — |
| B6 | API Work Twin + impor CSV | — | Should | ⬜ | — |
| AI1 | Eval set 40 tugas + pilih penyedia | — | Must | ⬜ | — |
| AI2 | Primitif kompetensi + level | — | Must | ⬜ | — |
| AI3 | Primitif upaya, kompleksitas, dependensi + ambang + fallback | — | Must | ⬜ | — |
| AI4 | Endpoint analisis + versi + koreksi | — | Must | ⬜ | — |
| E1 | Port engine ke Python | — | Must | ⬜ | — |
| E2 | What-if Python + RecommendationRun + Decision log | — | Must | ⬜ | — |
| E3 | Alokasi batch OR-Tools | — | Should | ⬜ | — |
| I1 | FE ke API (mode demo tetap ada) | — | Must | ⬜ | — |
| I2 | Sisi anggota + notifikasi | — | Should | ⬜ | — |
| I3 | Onboarding + impor CSV | — | Should | ⬜ | — |
| I4 | Riwayat keputusan + Laporan dampak | — | Should | ⬜ | — |
| I5 | Pengaturan | — | Should | ⬜ | — |
| I6 | Halaman Should sisanya | — | Should | ⬜ | — |
| R1 | Deploy Docker + Nginx + HTTPS | — | Must | ⬜ | — |
| R2 | Uji kegunaan 3-5 PM | — | Must | ⬜ | — |
| R3 | Pilot 1 tim + ukur H1-H5 | — | Must | ⬜ | — |

## Alur Inti Check
| Langkah | Status | Dicek |
|---|---|---|
| 1. Manajer membuat tugas (P12) | ✅ | Uji browser 16 Okt (TGS-0142 → Bima, KPT-032) |
| 2. Meninjau & mengonfirmasi Task DNA (P13) | ✅ | Uji browser 16 Okt (TGS-0142 → Bima, KPT-032) |
| 3. Melihat Top 3 kandidat + alasan (P14) | ✅ | Uji browser 16 Okt (TGS-0142 → Bima, KPT-032) |
| 4. Membandingkan konsekuensi what-if (P15) | ✅ | Uji browser 16 Okt (TGS-0142 → Bima, KPT-032) |
| 5. Menetapkan / override dengan alasan / tolak rekomendasi dengan alasan / draf (P14, P15) | ✅ | Uji browser 16 Okt (TGS-0142 → Bima, KPT-032; tolak rekomendasi tercatat di P22/P23) |
| 6. Kapasitas anggota diperbarui di P10, P18, P21 | ✅ | Uji browser 16 Okt (TGS-0142 → Bima, KPT-032) |

## Halaman
> Dari 01-PRD §5. Selesai di M0 = halaman jalan dengan data seed + semua state (kosong, loading, error) + responsif. Halaman non-Must di M0 = Placeholder rapi.

| # | Halaman | Prioritas | Status | Catatan |
|---|---|---|---|---|
| P1 | Landing | Must | ⬜ | Menunggu inspirasi |
| P2 | Harga | Should | ⬜ | — |
| P3 | Kebijakan privasi | Should | ✅ | Mockup M0 dengan data contoh |
| P4 | Syarat layanan | Could | ✅ | Draf syarat, perlu ditinjau ahli hukum, 16 Okt |
| P5 | Masuk | Must | ✅ | Mockup M0 dengan data contoh |
| P6 | Daftar organisasi | Should | ✅ | Mockup M0 dengan data contoh |
| P7 | Lupa / reset sandi | Should | ✅ | Mockup M0 dengan data contoh |
| P8 | Terima undangan | Should | ✅ | Mockup M0 dengan data contoh |
| P9 | Onboarding ruang kerja | Should | ✅ | Mockup M0 dengan data contoh |
| P10 | Dasbor | Must | ✅ | Mockup M0 dengan data contoh |
| P11 | Daftar tugas | Must | ✅ | Mockup M0 dengan data contoh |
| P12 | Buat tugas | Must | ✅ | Mockup M0 dengan data contoh |
| P13 | Tinjau Task DNA | Must | ✅ | Mockup M0 dengan data contoh |
| P14 | Rekomendasi kandidat | Must | ✅ | Mockup M0 dengan data contoh |
| P15 | Simulasi what-if | Must | ✅ | Mockup M0 dengan data contoh |
| P16 | Detail tugas | Must | ✅ | Mockup M0 dengan data contoh |
| P17 | Alokasi batch | Should | ✅ | Mockup M0 dengan data contoh |
| P18 | Tim | Must | ✅ | Mockup M0 dengan data contoh |
| P19 | Profil kerja anggota | Must | ✅ | Mockup M0 dengan data contoh |
| P40 | Peta keahlian | Should | ✅ | Tab Tim `/tim/keahlian`: matriks + kompetensi rawan, 16 Okt |
| P20 | Proyek | Should | ✅ | Mockup M0 dengan data contoh |
| P21 | Kapasitas | Must | ✅ | Mockup M0 dengan data contoh |
| P22 | Riwayat keputusan | Should | ✅ | Mockup M0 dengan data contoh |
| P23 | Laporan dampak | Should | ✅ | Mockup M0 dengan data contoh |
| P24 | Beranda saya | Should | ✅ | Mockup M0 dengan data contoh |
| P25 | Ketersediaan saya | Should | ✅ | Mockup M0 dengan data contoh |
| P26 | Penugasan masuk | Should | ✅ | Mockup M0 dengan data contoh |
| P27 | Profil kerja saya | Should | ✅ | Mockup M0 dengan data contoh |
| P28 | Pengaturan ruang kerja | Should | ✅ | Mockup M0 dengan data contoh |
| P29 | Aturan rekomendasi | Should | ✅ | Mockup M0 dengan data contoh |
| P30 | Katalog kompetensi | Should | ✅ | Tab di halaman Tim (`/tim/kompetensi`), dipindah dari Pengaturan 16 Okt |
| P31 | Anggota & peran | Should | ✅ | Mockup M0 dengan data contoh |
| P32 | Tagihan | Could | ✅ | Kursi terpakai dari data; paket & harga menunggu rancangan bisnis, 16 Okt |
| P33 | Akun saya | Should | ✅ | Mockup M0 dengan data contoh |
| P34 | Notifikasi | Should | ✅ | Mockup M0 dengan data contoh |
| P35 | Bantuan | Could | ✅ | Mockup M0 dengan data contoh |
| P36 | 404 | Should | ✅ | Mockup M0 dengan data contoh |
| P37 | 500 | Could | ✅ | `app/error.tsx`, 16 Okt |
| P38 | 403 | Should | ✅ | Mockup M0 dengan data contoh |
| P39 | Pemeliharaan | Could | ✅ | Halaman info, 16 Okt |

## Scope Cut
| Fitur/task | Alasan dipotong | Tanggal |
|---|---|---|

## Log
| Tanggal | Ringkasan |
|---|---|
| 2026-10-16 | TODO dibuat (setup-project-00) |
| 2026-10-16 | Setup frontend: T1, T2 selesai; T15 sebagian |
| 2026-10-16 | Shell diganti port persis K-DASP atas permintaan user; shadcn, sidebar-21st, framer-motion dilepas |
| 2026-10-16 | Revisi: bingkai penuh layar tanpa sudut membulat, sidebar sticky |
| 2026-10-16 | Semua halaman aplikasi diisi (data contoh + engine nyata); alur inti lulus uji browser; 20 test |
| 2026-10-16 | Audit UI/UX: pemilih level jadi kontrol segmen kompak, tombol sekunder terlihat di kartu, langkah alur & baris Task DNA rapi di mobile, banner, rasio wordmark |
| 2026-10-16 | Peran akses jadi kontrol segmen; semua select pakai chevron & fokus token; toggle mobile satu baris bisa digeser |
| 2026-10-16 | Daftar "Pilih orang lain": badge Override sebaris; alasan tersaring pakai nama level (LEVEL_LABEL pindah ke engine) |
| 2026-10-16 | Chip & label "Data contoh" dihapus dari layar atas permintaan user (docs disesuaikan) |
| 2026-10-16 | Audit menyeluruh: 36 rute x 2 lebar bersih; perbaiki overflow tooltip /laporan di mobile dan kutipan bukti Task DNA (utamakan deskripsi); alur inti lulus (110 -> 113 jam) |
| 2026-10-16 | Tolak rekomendasi + alasan (Riwayat & Laporan), judul jumlah kandidat dinamis, tombol Sudah benar di estimasi; halaman /syarat, /pengaturan/tagihan, /pemeliharaan, galat server (error.tsx) |
| 2026-10-16 | Katalog kompetensi pindah ke tab Tim (/tim/kompetensi); Pengaturan tinggal Umum, Aturan rekomendasi, Anggota & peran, Tagihan |
| 2026-10-16 | Dasbor: kartu ke-4 "Menunggu jawaban anggota" (jumlah menunggu + ditolak anggota, tautan ke filter terkait) |
| 2026-10-16 | Dasbor: ringkasan total tim di kartu Kapasitas tim; baris sorot di tabel mobile jadi satu blok; "Lihat semua" tidak terpotong |
| 2026-10-16 | Teks kapasitas/beban: "tim" diganti "anggota"/"semua anggota" (Dasbor, Kapasitas, Simulasi, detail tugas, panduan) |
| 2026-10-16 | P40 Peta keahlian di tab Tim (matriks anggota × kompetensi, kompetensi rawan, Vitest atRiskCompetencies); perbaikan overflow teks sr-only di wadah geser |
| 2026-10-16 | Peta keahlian: ikon kompetensi rawan dipindah ke depan nama supaya tidak turun ke baris baru |
| 2026-10-16 | Heatmap beban harian di P21 dicoba lalu dihapus total atas permintaan user (komponen, engine, test, CSS, docs) |
| 2026-10-17 | Sidebar ciut: logo diberi lebar 44px seperti kotak menu supaya sejajar tengah dengan ikon (sebelumnya geser 8px ke kiri) |
| 2026-10-17 | Sidebar ciut: garis pemisah antar grup + nama grup di tooltip/aria-label ikon |
| 2026-10-17 | Top bar menempel di atas saat scroll (sticky), seperti sidebar |
| 2026-10-17 | Proyek: kartu jadi Glass Folder (port 21st.dev ke token), isi folder = tugas terbuka, menu ⋯ ke detail & buat tugas |
| 2026-10-17 | Aksen kaca terarah (top bar, dialog, drawer) + motif cair di kartu sorotan + gerak fluid CSS (masuk bertahap, hover pegas, batang tumbuh, dialog pegas) |
| 2026-10-17 | GlassSurface (React Bits) dicoba di kapsul topbar lalu dihapus total atas permintaan user; efek pembiasan hampir tak terlihat di latar polos |
| 2026-10-17 | Sidebar: sub-menu bercabang Tim (pola BranchedMenu, lucide + token); tab di halaman Tim dihapus |
| 2026-10-17 | Sidebar: sub-menu bercabang Pengaturan; tab di halaman Pengaturan dihapus |
| 2026-10-17 | Sidebar ciut: sub-halaman tampil sebagai rel mini dengan bulatan ikon (aktif bercincin teal) |
| 2026-10-17 | Ikon sub-menu disesuaikan isi: Anggota IdCard, Peta keahlian Network, Kompetensi Library (bukan label harga), Umum Building2 |
| 2026-10-17 | Checkbox di seluruh aplikasi jadi bulat (tercentang teal + centang putih) |
| 2026-10-17 | P41 Graf relasi di Tim (node-link gaya Obsidian, fisika sendiri, 11 test engine); galat hidrasi karena cos/sin diperbaiki dengan pembulatan |
| 2026-10-17 | Dasbor: tabel Kapasitas anggota: jumlah baris dihitung dari sisa tinggi kartu (`useFitRows`, `fitRows` di `lib/paginate.ts`, 8 test), ukuran baris tetap; pager hanya muncul bila data lebih dari satu halaman |
| 2026-10-17 | Seed: +4 anggota (Fajar, Gita, Hana, Irfan; keahlian di luar tugas demo) dengan 5 tugas berjalan/selesai (68 jam) agar tabel Dasbor terisi dan bar kapasitas nyata; Top 3 dan skenario alur inti tidak berubah, total Dasbor jadi 178 / 288 jam (61,8%); test seed dipersempit ke 6 anggota prototipe |
| 2026-10-17 | Kaca di seluruh aplikasi: latar bergradasi, card/kontrol/toggle/dropdown (base-select, Chromium) kaca, topbar full-bleed, sidebar menyatu, card mesh (kandidat, ringkasan Dasbor), bar kapasitas kuning (`status-warn-fill`), fokus teal, DatePicker kalender kaca (`lib/calendar.ts` + 5 test) menggantikan input tanggal bawaan |
| 2026-10-17 | Audit deadcode: knip bersih (file, export, dependensi); CSS yatim dihapus (`.wide`, `.nav-count`, `.placeholder-dot`, `.placeholder-panel` + aturan media, 6 baris, -636 B); `.crit-text` dipertahankan karena dipakai dinamis (`${tone}-text`); field `Task.createdAt` ditulis tapi tak dibaca (field model data, dipertahankan); 31 rute 200, tanpa galat konsol |
| 2026-10-17 | Mobile: tabel jadi kartu padat per baris (judul, lencana dan data singkat mengalir sebaris; sel lebar seperti bar kapasitas, orang, dan kontrol bersusun), preset bobot 5 kolom K C A R F, Kapasitas menyembunyikan jam yang sudah terbaca di bar, kartu ringkasan 2 kolom, filter graf 2x2; semua diukur di 375px tanpa overflow |
| 2026-10-17 | Proyek di mobile: folder kaca 2 kolom (skala mengikuti lebar kolom via ResizeObserver), nama dan keterangan di bawah folder, tap folder membuka detail proyek; desktop tidak berubah (320 px) |
| 2026-10-17 | Navigasi halaman turunan: breadcrumb bertaut dengan induk (Ruang kerja / Tugas / Buat tugas; nama anggota dan proyek terbaca) dan tombol "Kembali ke <induk>" di atas halaman turunan; tab sub-menu (Tim, Pengaturan) tanpa tombol kembali; `trailOf` murni di `lib/nav.ts` + 5 test |
| 2026-10-17 | Logo baru "Cincin Tepat" (pengganti "Tepat"): kit lengkap di docs/brand (simbol, lockup, versi kecil, ubin kaca, ekspor satu warna, ikon web, papan presentasi, panduan); terpasang di sidebar, favicon, apple-icon, ikon PWA; kit lama diarsipkan di docs/brand/v1-tepat |
| 2026-10-17 | Semua tabel data dipaginasi 10 baris per halaman (komponen `Paged` di `ui/pager.tsx`; pager hanya muncul bila lebih dari 10 baris; halaman kembali ke awal saat jumlah data berubah); Dasbor tetap sebanyak baris yang muat; panah dropdown jadi ikon chevron Lucide, rata tengah dengan teks |
| 2026-10-17 | Perbaikan: halaman tidak lagi bergeser saat modal/drawer terbuka (scrollbar-gutter: stable di html; sebelumnya scrollbar hilang saat scroll dikunci dan lebar konten berubah 15 px) |
| 2026-10-17 | Scrollbar menyatu dengan latar: jalur transparan, thumb abu-abu tembus; gradasi latar aplikasi dipindah ke akar halaman (`html:has(.app-frame)`) supaya lajur scrollbar ikut bergradasi, bukan strip krem solid |
| 2026-10-17 | Scrollbar saat modal/drawer terbuka: lajur scrollbar ikut digelapkan (scrim sama dengan backdrop, lewat `html:has(dialog[open])`) agar tidak kontras terang; gradasi latar jadi variabel `--app-wash` |
| 2026-10-17 | Koreksi: kunci scroll modal/drawer lewat `lib/scroll-lock.ts` (padding setebal scrollbar yang hilang), menggantikan `scrollbar-gutter: stable` dan scrim lajur scrollbar yang tidak efektif; backdrop menutup seluruh lebar layar tanpa strip terang, konten tidak bergeser |
