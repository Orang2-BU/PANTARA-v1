---
version: alpha
name: "PANTARA"
description: "Tenang, lembut, padat data. Teal yang menyelaraskan, satu kartu gelap untuk keputusan terpenting."
colors:
  canvas: "#F4F4F3"
  surface: "#FFFFFF"
  surface-muted: "#ECECEA"
  on-surface: "#141414"
  on-surface-muted: "#6B6B68"
  on-inverse: "#FFFFFF"
  border: "#E2E2DF"
  on-primary: "#FFFFFF"
  primary: "#0F766E"
  primary-hover: "#0B5F58"
  accent-fill: "#0D9488"
  accent-soft: "#E7F4F3"
  surface-inverse: "#122B29"
  on-inverse-muted: "#A9C9C4"
  on-inverse-accent: "#5EEAD4"
  neutral-fill: "#D9E3E1"
  status-ok: "#146C34"
  status-ok-soft: "#E8F5EC"
  status-warn: "#94580A"
  status-warn-fill: "#EAB308"
  status-warn-soft: "#FDF4DC"
  status-crit: "#B91C1C"
  status-crit-soft: "#FCE9E9"
  focus: "#0B5F58"
typography:
  display:
    fontFamily: "Onest"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Onest"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
  metric:
    fontFamily: "Onest"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "Onest"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  body-mobile:
    fontFamily: "Onest"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Onest"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "JetBrains Mono"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
  landing-display-xl:
    fontFamily: "Onest"
    fontSize: "56px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  landing-lead:
    fontFamily: "Onest"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  landing-section-y: 96px
  landing-section-y-mobile: 64px
components:
  page:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface}"
  page-muted-text:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface-muted}"
  panel:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.lg}"
    padding: "20px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  card-caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.label}"
  card-highlight:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-highlight-muted:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse-muted}"
  card-highlight-accent:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse-accent}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: "44px"
  link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  chip-accent:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  badge-ok:
    backgroundColor: "{colors.status-ok-soft}"
    textColor: "{colors.status-ok}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  badge-warn:
    backgroundColor: "{colors.status-warn-soft}"
    textColor: "{colors.status-warn}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  capacity-bar-warn:
    backgroundColor: "{colors.status-warn-fill}"
    rounded: "{rounded.full}"
  badge-crit:
    backgroundColor: "{colors.status-crit-soft}"
    textColor: "{colors.status-crit}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: "44px"
  bar-track:
    backgroundColor: "{colors.surface-muted}"
    rounded: "{rounded.full}"
    height: "8px"
  bar-fill:
    backgroundColor: "{colors.accent-fill}"
    rounded: "{rounded.full}"
  bar-compare:
    backgroundColor: "{colors.neutral-fill}"
    rounded: "{rounded.full}"
  divider:
    backgroundColor: "{colors.border}"
  focus-ring:
    backgroundColor: "{colors.focus}"
  landing-hero:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface}"
    typography: "{typography.landing-display-xl}"
  landing-lead-text:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.landing-lead}"
  landing-band-dark:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse}"
  landing-band-dark-muted:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-inverse-muted}"
---

# PANTARA — Design System

> Sumber kebenaran untuk semua kerja UI. Format: [Google DESIGN.md spec](https://github.com/google-labs-code/design.md) (alpha). Token di YAML di atas adalah nilai resmi; jangan pakai warna, ukuran, radius, atau shadow di luar token.
> Status: ✅ ACC 2026-10-16 · Kemiripan referensi: belum diukur (tanpa preview) · Lint: 0 error, 0 warning (16 Okt 2026)
> Template: Soft Op Dashboard (asal K-DASP), warna merek: teal "Selaras" dipilih user (16 Okt 2026). Area Landing: sementara, menunggu inspirasi user (00-BRIEF P2).

## Overview

PANTARA terasa tenang, rapi, dan bisa dipercaya: alat kerja harian PM yang dipakai berjam-jam, bukan papan promosi. Kanvas abu terang, panel abu berisi kartu putih membulat besar, satu warna merek teal sebagai aksen, dan **satu kartu gelap per layar** untuk hal yang paling menentukan keputusan (mis. kandidat #1, ringkasan simulasi). Kedalaman dari lapisan warna, bukan bayangan. Warna kuat hanya untuk hal yang butuh tindakan.

Persona: Raka, PM software house 14 orang (01-PRD §2). Yang ingin ditimbulkan: "aku melihat semuanya, dan aku yang memutuskan".

- **Referensi:** template Soft Op Dashboard (`setup-project-00/design-templates/soft-ops-dashboard`), prototipe proposal Lampiran 2 (struktur menu & isi), konsep warna "Selaras".
- **Dihindari:** gradien ungu-biru, glassmorphism, ilustrasi dekoratif, avatar bulat bergradasi, emoji, angka terlalu rapi, metrik "produktivitas" per orang.
- **Mode:** light (aplikasi dan landing).

### Peta area (baca dulu sebelum mengerjakan UI)
| Area | Berlaku untuk file | Mode | Pakai bagian |
|---|---|---|---|
| Bersama | semua | - | `### Bersama` di tiap bagian + token tanpa awalan |
| Aplikasi | `app/(app)/**`, `app/(auth)/**`, `components/app/**` | Operate | `### Area Aplikasi` + token tanpa awalan |
| Landing | `app/(marketing)/**`, `components/marketing/**`, `components/motion/**` | Persuade | `### Area Landing` + token `landing-*` |

Aturan: kerjakan file Landing → baca Bersama + Area Landing saja, abaikan Area Aplikasi (dan sebaliknya). Komponen `components/ui/` memakai token Bersama.

## Colors

### Bersama
Satu hue merek (teal 175°) di atas netral hangat; status memakai hijau/kuning/merah yang tidak bentrok dengan teal (selisih hue hijau ±34°).

| Token | Hex | Peran | Kontras |
|---|---|---|---|
| `primary` | #0F766E | Tombol utama, link, teks aksen kecil | 5,47:1 di putih |
| `primary-hover` | #0B5F58 | Hover tombol utama | 7,52:1 |
| `accent-fill` | #0D9488 | Batang kapasitas, grafik, ikon besar. **Tidak untuk teks < 18px** | 3,74:1 (elemen UI) |
| `accent-soft` | #E7F4F3 | Latar baris/kartu terpilih, chip aksen (teks `primary`) | 4,86:1 |
| `surface-inverse` | #122B29 | Satu kartu sorotan per layar | putih 14,96:1 |
| `on-inverse-muted` | #A9C9C4 | Teks sekunder di kartu gelap | 8,44:1 |
| `on-inverse-accent` | #5EEAD4 | Angka/skor penting di kartu gelap | 10,12:1 |
| `neutral-fill` | #D9E3E1 | Batang pembanding (sebelum), arsir | - |
| `canvas` / `surface` / `surface-muted` | #F4F4F3 / #FFFFFF / #ECECEA | Kanvas / kartu / panel | - |
| `on-surface` / `on-surface-muted` | #141414 / #6B6B68 | Teks utama / pendukung | muted 4,52:1 di panel |
| `border` | #E2E2DF | Garis baris, divider | - |
| `status-ok/warn/crit` (+ `-soft`) | #146C34 / #94580A / #B91C1C | Aman / perhatian / konflik. Selalu teks + warna | ≥ 5,2:1 di latar soft |
| `focus` | #0B5F58 | Ring fokus 2px offset 2px | - |

- Warna masuk lewat data: utilisasi (aman < 85% `accent-fill`, 85-99% `status-warn-fill`, ≥ 100% `status-crit`), skor kandidat, konflik. Tombol sekunder dan ikon dekoratif tetap netral.
- Teal tidak pernah berarti "berhasil" atau "aman"; itu tugas `status-ok`.

### Area Aplikasi
Satu primary per layar; satu `surface-inverse` per layar.

### Area Landing
Sementara memakai token Bersama; band gelap `surface-inverse` boleh satu kali per halaman (section "Kamu yang memutuskan"). Akan disesuaikan dengan inspirasi user.

## Typography

### Bersama
Onest (sans, angka tabular `font-variant-numeric: tabular-nums` untuk metrik dan tabel) + JetBrains Mono (ID tugas, versi model). Dimuat lewat `next/font/google` (self-host saat build, `display: swap`). Hierarki lewat ukuran, ketebalan, dan warna.

- **display 32/600:** judul halaman. Mobile 26px.
- **title 18/600:** judul kartu & section.
- **metric 28/600 tabular:** angka kartu metrik dan skor.
- **body 14/400:** isi desktop; **body-mobile 16px** di bawah 768px.
- **label 12/500:** header tabel, badge, caption. Tanpa huruf kapital semua; tanpa eyebrow label di atas judul.
- **mono 12/500:** ID (`TGS-0142`), versi (`taskdna-v1`).

### Area Landing
- **landing-display-xl 56/600** (tampil `clamp(36px, 6vw, 56px)`), **landing-lead 20/400**. Final setelah inspirasi.

## Layout

### Bersama
| Nama | Lebar | Grid | Navigasi |
|---|---|---|---|
| Mobile | < 768px | 1 kolom, gutter 16px | Burger 44×44 + drawer kiri |
| Tablet | 768-1199px | 2 kolom, gap 16px | Sidebar ciut 76px (ikon dalam lingkaran 44px) |
| Desktop | ≥ 1200px | 12 kolom, gap 16px, padding 32px | Sidebar terbuka 264px |

- **Drawer:** kiri, lebar ≤ 85vw, scrim; tutup via scrim/tombol tutup/Esc/pilih item; `aria-expanded`, fokus masuk-terkunci-kembali, scroll body terkunci.
- **Target sentuh:** ≥ 44px di bawah 1200px, ≥ 36px di desktop. Tanpa scroll horizontal di 360px; tabel lebar scroll di dalam kartunya.
- **Tinggi layar:** `min-h-[100dvh]`.

### Area Aplikasi
- **Implementasi acuan:** shell area aplikasi adalah port langsung dari K-DASP/MilkGraph (`D:\Aplikasi\K-DASP`, starter di `setup-project-00/design-templates/soft-ops-dashboard/starter/`). Kode: `frontend/src/components/shell/`, `frontend/src/components/ui/index.tsx`, kelas CSS di `frontend/src/app/globals.css`. Bandingkan berdampingan dengan screenshot acuan di 1440/768/375 setiap mengubah shell.
- **Frame:** penuh layar; body dan `.app-frame` berlatar `canvas`, tanpa margin dan tanpa sudut membulat (revisi user 16 Okt 2026).
- **Sidebar menempel:** `position: sticky; top: 0; height: 100dvh`; tidak ikut bergeser saat halaman di-scroll. Bila layar pendek, sidebar bisa di-scroll sendiri.
- **Sidebar** (sidebar template sendiri, bukan sidebar-21st/shadcn): 264px, padding 28/20/20, garis kanan `border`. Baris brand: simbol + wordmark + caption "Orkestrasi kerja adaptif" (10px muted). Grup: Ruang kerja (Dasbor, Tugas, Tim, Kapasitas), Perencanaan (Proyek, Alokasi batch), Analisis (Riwayat keputusan, Laporan dampak), Sistem (Pengaturan). Judul grup 11px muted. Item: pill 44px, 13px, ikon 19px; aktif = latar `surface`, teks 600, ikon `primary`. Halaman yang masih placeholder diberi titik 4px di kanan. Bawah: item "Panduan demo" (dialog) + kartu akun `surface` radius `md` (avatar `neutral-fill` 36px, nama 11px, peran 10px, chevron) yang membuka dialog profil. Saat ciut (manual atau otomatis di tablet): label grup disembunyikan dan diganti garis pendek 20px `border` di tengah kolom ikon; logo selebar 44px agar sejajar ikon; tooltip & `aria-label` ikon menyebut grupnya ("Proyek · Perencanaan"). Sub-menu bercabang (Tim → Anggota, Peta keahlian, Kompetensi; Pengaturan → Umum, Aturan rekomendasi, Anggota & peran, Tagihan): batang & cabang melengkung 1,5px `border` dari tengah ikon induk, cabang aktif tergambar `primary` (stroke-dashoffset 420ms), baris 36px teks 12px muted, aktif `primary` 600; terbuka saat berada di bagian itu (lipat 300ms), `inert` saat tertutup. Saat sidebar ciut: garis cabang diganti rel vertikal 1,5px `border` di tengah kolom ikon, tiap sub-halaman jadi bulatan ikon 30px (`canvas` + cincin `border`; aktif `accent-soft` + cincin `primary`), label disembunyikan secara visual saja (tetap terbaca pembaca layar) dan muncul di tooltip. Ikon sub-menu sendiri (tidak sama dengan induk): Anggota `IdCard`, Peta keahlian `Network`, Kompetensi `Library`, Umum `Building2`, Aturan rekomendasi `SlidersHorizontal`, Anggota & peran `UserCog`, Tagihan `ReceiptText`.
- **Ciut:** 76px otomatis di 768-1199px (`.auto-sidebar`), atau lewat tombol `ChevronsLeft/Right` di top bar; label disembunyikan, item jadi ikon 44px. Tidak melebar saat hover.
- **Top bar:** menempel di atas saat halaman di-scroll (sticky, latar `canvas`, `z-index` di atas konten; `scroll-padding-top` 109px supaya tautan anchor tidak tertutup), tinggi 85px (76px tablet, 72px mobile), garis bawah `border`. Kiri: tombol ciut + breadcrumb "Ruang kerja / Halaman" 12px. Kanan: tombol periode pill `surface` ("Minggu aktif, 28 Sep - 2 Okt 2026" + chevron, membuka dialog), tombol notifikasi bulat `surface` dengan angka `primary`, avatar 40px. Mobile: tombol menu + wordmark menggantikan breadcrumb; periode & avatar disembunyikan.
- **Judul halaman:** `h1` 32px (28px mobile) + subjudul 13px muted, aksi di kanan; jarak 28px ke konten.
- **Footer:** "Pantara / Orkestrasi kerja adaptif" kiri, "Diperbarui 09.15 WIB" + titik `status-ok` kanan, 10px muted.
- **Drawer mobile:** `<dialog>` native, lebar min(320px, 85vw), latar `canvas`, backdrop 40% + blur 4px, isi sama dengan sidebar + tombol tutup bulat.
- **Header aksi:** maksimal satu primary pill + secondary pill.
- **Stepper alur inti** di P12-P15: gaya `.toggle` template (wadah `surface-muted` pill, langkah aktif latar `surface`, selesai teks `primary` + centang), "1. Tugas · 2. Kebutuhan · 3. Kandidat · 4. Simulasi".
- **Panel:** `surface-muted` radius `lg` padding 20px mengelompokkan 2-4 kartu putih.
- **Pola per jenis halaman:**

| Jenis / layar | Tugas | Pola layout | Info utama (besar) | Info pendukung (kecil) |
|---|---|---|---|---|
| Dasbor (P10) | Melihat yang perlu diputuskan | **Monitor:** 4 kartu metrik → kiri 8 kolom kartu Kapasitas anggota (ringkasan total + tabel per anggota) → kanan 4 kolom "Perlu penugasan" + "Catatan untuk ditinjau" | Tugas belum ditugaskan, utilisasi per anggota | Waktu sinkron |
| Daftar (P11, P18, P20, P22) | Menemukan & memilih | Filter pill + cari di atas, tabel dalam kartu, aksi baris di kanan, aksi sekunder di ⋯ | Judul, status, angka | ID mono, proyek |
| Detail (P16, P19) | Memahami satu objek | Kiri 8 kolom isi utama, kanan 4 kolom ringkasan + aksi | Status, penanggung jawab / kapasitas | Riwayat, log |
| Form (P12, P25) | Memasukkan data | Satu kolom maks 720px dalam kartu; opsi lanjutan dilipat | Field wajib | Bantuan field |
| Tinjau Task DNA (P13) | Memeriksa uraian AI | Kiri 5 kolom: teks tugas dengan kutipan tersorot; kanan 7 kolom: isian per kelompok dengan badge "Yakin"/"Perlu dicek" | Kompetensi + level, estimasi jam | Versi model, p |
| Rekomendasi (P14) | Membandingkan kandidat | **Rencana:** kartu sorotan gelap kandidat #1 (skor besar `on-inverse-accent`, 3 alasan) → 3 kartu kandidat berdampingan dengan batang kontribusi 5 faktor → "Tidak lolos syarat (2)" dilipat | Skor, sisa kapasitas | Faktor rinci |
| Simulasi (P15) | Melihat konsekuensi | Toggle skenario (maks 3) → kartu sorotan perbandingan sebelum → sesudah → tabel sebaran beban anggota (batang `neutral-fill` sebelum, `accent-fill` sesudah) → daftar konflik → dialog Tetapkan | Utilisasi sesudah, konflik | Asumsi |
| Kapasitas (P21) | Melihat alokasi waktu | 3 kartu metrik → tabel anggota dengan batang | Jam tersedia/teralokasi, % | Status data |
| Pengaturan (P28, P29, P31, P32) | Mengubah aturan sistem & administrasi | Tab di atas, kartu per kelompok | Nilai saat ini | Penjelasan |
| Auth (P5-P8) | Masuk/daftar | Kartu tengah 420px di kanvas | Form | Tautan |
| Kosong / error / placeholder | Menjelaskan & mengarahkan | Kartu tengah: ikon dalam lingkaran, judul, satu kalimat, satu aksi | Judul | Badge "Belum tersedia" (placeholder M0) |

- **Urutan mobile P14:** kartu sorotan → kandidat 2 → kandidat 3 → tidak lolos. Tabel jadi daftar kartu.

### Area Landing
- Lebar konten maks 1200px, padding section `landing-section-y` (96px) desktop / `landing-section-y-mobile` (64px) mobile. Kepadatan bergantian: section padat diikuti section lega.
- Urutan section mengikuti 01-PRD §5d (L1-L8). Hero memperlihatkan potongan UI nyata (kartu Top 3 + batang simulasi) dibangun dari komponen aplikasi, bukan gambar mockup miring.

## Elevation & Depth

### Bersama
Tanpa bayangan untuk kartu; kedalaman dari lapisan `canvas` → `surface-muted` → `surface`. Bayangan hanya untuk lapisan melayang: popover/menu `0 8px 24px rgba(20,20,20,0.10)`, dialog `0 16px 48px rgba(20,20,20,0.16)` dengan scrim `rgba(20,20,20,0.40)`.

## Shapes

### Bersama
- **Radius:** `sm` 10px (input, badge kotak, blok kecil), `md` 16px (kartu), `lg` 24px (panel, kartu sorotan), `xl` 32px (dialog), `full` (tombol pill, chip, batang).
- **Ikon:** lucide-react, outline, stroke 1.75, ukuran 16px (inline) / 20px (navigasi) / ikon dalam lingkaran 36px (kartu metrik). Tanpa emoji.
- **Avatar:** inisial dalam lingkaran `surface-muted` teks `on-surface`; tanpa gradien.
- **Logo:** konsep "Cincin Tepat" (cincin kapasitas terbuka + satu titik penugasan pas di celahnya; versi lama "Tepat" diarsipkan di `docs/brand/v1-tepat/`), file di `docs/brand/`, aturan di `docs/brand/GUIDELINES.md`. Sidebar terbuka: simbol 34px + wordmark; sidebar ciut & mobile: simbol; favicon & ikon: `docs/brand/export/web/` (ubin kaca teal). Titik aqua `on-inverse-accent` hanya di versi reversed dan ubin kaca (kartu gelap, latar teal).

## Components

### Bersama
- **Sumber komponen:** kelas CSS template (`.button .primary/.secondary`, `.icon-button`, `.badge`, `.card`, `.panel`, `.section-heading`, `.toggle`, `.modal`, `.placeholder-*`) dan komponen `Icon`, `Badge`, `Modal` di `components/ui/index.tsx`, semuanya port dari K-DASP. Tanpa shadcn, tanpa sidebar-21st, tanpa framer-motion (keputusan user 16 Okt 2026: harus persis template). Komponen baru ditulis dengan pola yang sama (kelas CSS + token); pola lain (kartu metrik, tabel, kartu sorotan, Gantt, grafik batang) diambil dari starter template.
- **Button:** pill 44px. Primary `primary` (hover `primary-hover`, tekan `scale-[0.98]`), secondary `surface` bergaris `border` (di dalam wadah putih, mis. kartu atau dialog, latarnya `canvas` supaya tetap terlihat), ikon 44px bulat dengan `aria-label`. Transisi warna 150ms ease-out, tekan 100ms. Focus ring 2px `focus` offset 2px. Loading: spinner + label tetap. Label menyebut konsekuensi bila relevan ("Tetapkan ke Bima", "Simpan sebagai draf").
- **Input:** label selalu ada di atas; error `status-crit` + pesan di bawah; hint `on-surface-muted`.
- **Checkbox:** bulat 20px di seluruh aplikasi (bukan kotak): garis 1,5px `on-surface-muted` di atas `surface`; tercentang `primary` + centang putih (`on-primary`) dengan pegas kecil; hover garis `primary`, fokus cincin `focus`, nonaktif 45%.
- **Select:** tanpa panah bawaan browser; chevron digambar dari token `on-surface-muted`, hover garis `on-surface-muted`, fokus cincin `focus` (bukan biru browser). Berlaku untuk `.select` (form) dan `.filter-select` (filter pill).
- **Kontrol segmen** (`.level-select`): untuk 2-4 pilihan pendek yang langsung berlaku (level Dasar/Mandiri/Mahir, ukuran S-XL, kompleksitas, peran akses). Satu wadah pill `canvas` bergaris `border`, item 28px font 11px, terpilih = keping `surface` bertepi dengan teks `primary`. Di bawah 1200px area sentuh diperluas ke 44px tanpa membesarkan tampilan. Lebih dari 4 pilihan atau label panjang: pakai select.
- **Toggle/tab** (`.toggle`): di mobile tetap satu baris dan bisa digeser; tab aktif digeser ke dalam layar. Stepper alur inti di mobile dibagi rata 4 kolom.
- **Badge status:** pill bertitik, latar `status-*-soft` + teks `status-*`; teks selalu ada ("Aman", "Mendekati penuh", "Konflik tenggat", "Data belum lengkap").
- **Konfirmasi aksi:** banner `decision-banner` di halaman tujuan setelah tetapkan/simpan ("Penugasan ditetapkan"). Toast dengan "Urungkan" belum dibuat di M0. Di mobile, aksi banner turun ke bawah teks.
- **Motion:** easing `--ease` cubic-bezier(0.22,1,0.36,1) untuk warna/opacity 150-250ms; `--spring` cubic-bezier(0.34,1.36,0.5,1) untuk gerak fluid area aplikasi: anak `.page-enter` dan kartu dalam grid naik bertahap (560ms, jeda 60ms per kartu, maks 5), kartu bertaut terangkat 3px saat hover/fokus, batang kapasitas/faktor/lama keputusan tumbuh dari kiri (900ms), dialog muncul dengan pegas (420ms), tombol menyusut 0,97 saat ditekan. Hanya `transform`, `opacity`, warna; `animation-fill-mode: backwards` supaya tidak menimpa transform hover. `prefers-reduced-motion` mematikan semua gerak. Tanpa library animasi (Lenis/Motion/GSAP tetap hanya landing).
- **Aksen kaca (terarah):** hanya di lapisan yang melayang di atas konten: top bar (kanvas 72% + blur 18px), dialog (surface 86% + blur 28px, backdrop blur 4px), drawer mobile, menu folder. Kartu data (tabel, metrik, form) tetap solid supaya teks kecil tajam. Kartu sorotan gelap memakai motif cair token (`FluidArt`, gaya streak) di bawah lapisan `surface-inverse` 95% → 84%; kontras teks `on-inverse-muted` terburuk diukur 5,08:1.

### Area Aplikasi
- **Kartu metrik:** ikon dalam lingkaran 36px + label; angka `metric`; keterangan satu baris. Tanpa sparkline di M0 (belum ada data tren).
- **Folder proyek (P20):** grid kartu folder kaca (`GlassFolder`, lebar 320px, `auto-fill minmax(320px)`). Panel belakang motif cair dari palet token (`surface` → `accent-soft` → `accent-fill` → `primary` → `surface-inverse`), panel depan kaca buram `surface`; label = nama proyek + "n tugas terbuka · tenggat". Hover/fokus: kaca condong; klik/Enter: lembar tugas terbuka mengipas (maks 4, tiap lembar tautan ke tugas). Tombol ⋯ membuka menu kaca (keyboard: panah, Home/End, Escape). Di bawah folder: klien + "Detail proyek". Animasi mati saat reduced-motion. Motif adalah identitas proyek, bukan hiasan foto (A-standar).
- **Graf relasi (P41):** graf node-link gaya Obsidian di kartu: SVG responsif, latar `canvas`. Bentuk node per jenis (bukan hanya warna): anggota lingkaran `primary` 13px, kompetensi belah ketupat `accent-fill`, tugas lingkaran kecil `on-surface-muted`, proyek kotak `surface-inverse`; garis `border`, garis anggota-kompetensi lebih tebal menurut level, garis ke node terfokus `primary`. Fisika hidup (tolak, pegas, redam) yang bisa diseret; hover/fokus meredupkan node non-tetangga; klik/Enter memilih node dan panel kanan 300px mendaftar hubungannya (tombol yang bisa dipilih, setara teks untuk pembaca layar). Filter jenis node = tombol `aria-pressed`. Mobile: graf 640px dalam wadah geser, label 14px, node `touch-action: none`. Reduced-motion: layout statis hasil `settle`.
- **Peta keahlian (P40):** kartu "Kompetensi rawan" (grid item `canvas`, badge `warn` "Hanya {nama} ({level})" atau `crit` "Belum ada yang Mandiri") di atas matriks. Matriks dalam wadah geser horizontal (`position: relative` supaya teks `sr-only` ikut terpotong), kolom anggota menempel di kiri, header dua baris (kategori lalu kompetensi, ikon peringatan di depan nama kompetensi yang rawan, satu baris flex supaya tidak terpisah saat nama terbungkus). Sel level berurutan terang ke gelap dan selalu bertulisan: Dasar (`canvas` bergaris), Mandiri (`accent-soft`), Mahir (`primary`), kosong "-".
- **Ringkasan total semua anggota (P10):** blok `canvas` di atas tabel per anggota: label "Total semua anggota", persen besar, keterangan jumlah anggota yang dihitung, lalu batang kapasitas total. Anggota tanpa data ketersediaan tidak ikut dihitung dan disebut di keterangan.
- **Batang kapasitas:** track `surface-muted` 8px, isi `accent-fill`; ≥ 85% isi `status-warn-fill` (kuning; teksnya tetap `status-warn` agar kontras), ≥ 100% `status-crit` dan melewati track dengan penanda; teks "28 / 32 jam" tabular + "Sisa 4 jam". Selalu ada teks, bukan warna saja.
- **Kartu kandidat (P14):** inisial + nama + peran; skor `metric` (0,00-1,00, dua desimal koma); 5 baris faktor (Kompetensi, Kapasitas setelah, Ketersediaan, Riwayat relevan, Risiko konflik) dengan batang kontribusi kecil (risiko ditampilkan sebagai pengurang); 2-3 kalimat alasan dari engine; aksi "Simulasikan". Kandidat #1 sebagai kartu sorotan gelap.
- **Isian Task DNA (P13):** baris per isian; badge "Yakin" (`badge-ok`) atau "Perlu dicek" (`badge-warn`, baris berlatar `status-warn-soft`); kutipan kalimat sumber disorot di kolom kiri (diambil dari deskripsi, judul hanya cadangan); setiap isian ragu (kompetensi, estimasi, dependensi) punya aksi "Sudah benar" atau ditandai dicek saat nilainya diubah; konfirmasi ditolak dengan pesan bila masih ada yang belum dicek. Tombol hapus kompetensi: ikon 36px transparan, merah saat hover.
- **Perbandingan sebelum → sesudah (P15):** dua batang bertumpuk per anggota (`bar-compare` sebelum, `bar-fill` sesudah) + angka "50% → 75%"; konflik sebagai daftar badge dengan penjelasan satu kalimat.
- **Dialog keputusan:** `<dialog>` native, focus trap, Esc; memilih kandidat teratas → catatan opsional; memilih orang lain → alasan wajib (pilihan: "Pertimbangan klien", "Pengembangan anggota", "Info yang tidak ada di sistem", "Lainnya" + teks); menolak rekomendasi (P14) → alasan wajib ("Kandidat tidak sesuai kondisi nyata", "Kebutuhan tugas perlu diubah", "Tugas ditunda", "Lainnya" + teks); hasil tercatat dengan nama + waktu. Judul daftar kandidat mengikuti jumlah nyata ("3 kandidat teratas", "Satu kandidat lolos syarat").
- **Tabel:** header `label` muted, tanpa garis vertikal, garis baris `border`, angka rata kanan tabular, ID `mono`, hover baris `canvas` dengan sudut membulat `sm` dan jarak 12px di tepi.
- **Placeholder (M0):** kartu tengah, ikon dalam lingkaran, judul halaman, satu kalimat fungsi halaman (dari 01-PRD §5a), badge "Belum tersedia di mockup", tombol "Kembali ke Dasbor".
- **Istilah "anggota", bukan "tim":** kapasitas dan beban dihitung untuk semua anggota ruang kerja di semua proyek, jadi labelnya "Kapasitas anggota", "Total semua anggota", "Beban tertinggi anggota". Kata "Tim" hanya untuk nama menu daftar anggota dan peran "Manajer tim".
- **Tanpa chip "Data contoh":** label data contoh tidak ditampilkan di layar (keputusan user 16 Okt 2026).

### Area Landing
- **CTA utama:** "Coba demo" (satu per layar, diulang di L8). Gaya tombol menunggu pilihan user (Slide icon / Flow / rekomendasi AI); default rekomendasi AI: pill tenang, panah geser 3px saat hover.
- **Standar interaksi:** mengikuti `setup-project-00/references/LANDING-PAGE.md` §5 (satu komponen per pola).
- **Animasi:** menunggu pilihan user; default transisi CSS dengan token motion Bersama, tanpa Lenis.

## Do's and Don'ts

**Prinsip UX (wajib, semua layar)**

| # | Prinsip | Penerapan di projek ini |
|---|---|---|
| 1 | Tahan variasi konten | Nama anggota panjang dipotong dengan tooltip; tim 1 orang dan 30 orang tetap rapi; tugas tanpa kandidat lolos punya state sendiri |
| 2 | Konsisten | Satu grid 12 kolom, Onest + JetBrains Mono, lucide stroke 1.75, satu gaya batang kapasitas di semua halaman |
| 3 | Hierarki | Skor dan utilisasi besar; ID, versi model, waktu sinkron kecil; judul menonjol tanpa huruf kapital |
| 4 | Info di titik keputusan | Sisa kapasitas dan konflik tampil di kartu kandidat, bukan halaman lain; alasan tepat di bawah skor |
| 5 | Konsekuensi terlihat sebelum aksi | Simulasi sebelum → sesudah wajib dilewati sebelum Tetapkan; label tombol menyebut nama penerima |
| 6 | Kurangi hambatan | Stepper alur inti selalu terlihat; tombol "Simulasikan" ada di setiap kartu kandidat; preset bobot siap pakai + bobot manual |
| 7 | Hapus yang berlebihan | Tanpa sapaan "Selamat pagi"; tanpa kartu promosi; badge maksimal 3 kata |
| 8 | Detail premium | Divider `border` halus, spacing menyatakan hubungan (faktor dalam satu kartu rapat 8px), angka tabular |
| 9 | Aksi utama jelas tapi tidak agresif | Satu primary pill per layar; aksi berisiko (tugaskan ulang) di menu ⋯ dengan konfirmasi |

**Anti tampilan AI (Standar UI A1-A13)**

| # | Aturan | Penerapan |
|---|---|---|
| A1 | Tanpa emoji | lucide saja, termasuk empty state |
| A2 | Tanpa warna bawaan AI | Hanya token; teal hanya untuk aksi/aksen, status untuk arti |
| A3 | Satu layar satu tugas | Kandidat (P14) dan Simulasi (P15) dipisah; Task DNA punya layar sendiri |
| A4 | Navigasi fokus | Sidebar 9 item dalam 4 grup; akun, notifikasi, panduan lewat dialog; detail lewat tautan |
| A5 | Elemen ramai dirapikan | Aksi sekunder di ⋯; kebutuhan kompetensi panjang jadi chip + tooltip; angka rata kanan |
| A6 | Tanpa elemen tanpa fungsi | Setiap kartu metrik bisa diklik ke halaman terkait atau tidak memakai tanda aksi |
| A7 | Wadah sesuai isi | Tambah anggota/proyek/kompetensi = modal; kandidat tidak lolos dilipat; pengaturan pakai tab |
| A8 | Data bisa dibandingkan | Kandidat berdampingan dengan faktor yang sama; sebelum/sesudah berdampingan; tabel bisa diurutkan |
| A9 | Tanpa em-dash | Rentang "28 Sep - 2 Okt 2026"; pemisah memakai titik tengah "·" atau koma |
| A10 | Konten realistis | Nama, tugas, dan angka dari seed (prototipe proposal); tanpa "Elevate/Seamless" |
| A11 | 100dvh & font stabil | `min-h-[100dvh]`; `next/font` |
| A12 | Fitur kecil bernilai besar | Pengingat data belum lengkap, salin ketersediaan, ekspor CSV, pintasan keyboard (Could di 04-TODO) |
| A13 | Interaksi hidup | Semua elemen klik punya hover/tekan/fokus 150-250ms; yang tidak bisa diklik tanpa chevron/kursor pointer |

**Larangan AI slop Area Landing:** hero generik (judul tengah + 2 tombol + gradien + mockup miring); grid fitur 3 kolom ikon-dalam-lingkaran seragam; eyebrow label kapital di atas heading; gradient text, glassmorphism, blob, glow; animasi di semua elemen (maks satu efek teks per halaman); testimoni/logo klien karangan; kata klise dan em-dash; ritme section yang sama dari atas ke bawah; emoji.

**Aksesibilitas**
- Do: kontras teks ≥ 4.5:1, elemen UI ≥ 3:1 (dicek `lint`); focus selalu terlihat; keyboard penuh (termasuk dialog & drawer); target sentuh ≥ 44px di bawah 1200px; label untuk setiap input; `aria-label` untuk ikon tanpa teks; batang kapasitas punya teks angka.
- Don't: menyampaikan status hanya lewat warna; `accent-fill` untuk teks kecil.

**Checklist review UI**
- [ ] Hanya memakai token dari file ini
- [ ] Semua state komponen ada (hover, focus, disabled, loading, empty, error)
- [ ] Responsif di 375px, 768px, 1440px tanpa scroll horizontal
- [ ] Lulus Prinsip UX 1-9 dan A1-A13, diuji dengan konten ekstrem (nama panjang, tim kosong, 30 anggota)
- [ ] `lint` 0 error dan tanpa warning `contrast-ratio`

## Deviations from Reference

| Aspek | Referensi (Soft Op / K-DASP) | Di sini | Alasan |
|---|---|---|---|
| Warna merek | Oranye #C2410C | Teal #0F766E | Pilihan user; tema menyelaraskan, tidak bentrok status |
| Token tambahan | - | `on-inverse-accent` #5EEAD4 | Skor kandidat #1 di kartu gelap perlu aksen yang terbaca (10,12:1) |
| Kartu metrik | Dengan sparkline | Tanpa sparkline di M0 | Belum ada data tren; A6 |
| Pola Telusuri | Ada | Tidak dipakai | PRD tidak punya layar tanya-jawab |
| Gantt | Di pola Rencana | Diganti tabel sebaran beban + batang sebelum/sesudah | Template §6: projek tanpa timeline |
| Body mobile | 14px | 16px di < 768px | 07-RULES §8 |
| Bingkai | Margin 12px, radius 32px di atas body putih | Penuh layar, tanpa radius | Revisi user 16 Okt 2026 |
| Sidebar | Ikut bergeser bersama halaman | Sticky, tinggi 100dvh | Revisi user 16 Okt 2026 |

## Implementation

Token tidak ditulis ulang di kode; hasilkan dari file ini (Windows: pakai alias `designmd`):

```bash
npx -p @google/design.md designmd lint docs/08-DESIGN.md
npx -p @google/design.md designmd export --format css-tailwind docs/08-DESIGN.md > frontend/src/styles/theme.css
```

Shell & komponen memakai kelas CSS template di `globals.css` yang membaca token `--color-*`, `--radius-*` dari `theme.css`. Tailwind v4: nama spacing `xs`-`2xl` bentrok dengan ukuran bawaan Tailwind; setelah `@import` theme, lepas di `globals.css`: `@theme inline { --spacing-xs: initial; --spacing-sm: initial; --spacing-md: initial; --spacing-lg: initial; --spacing-xl: initial; --spacing-2xl: initial; }`. Token berawalan `landing-` aman.

## Changelog

| Tanggal | Perubahan |
|---|---|
| 2026-10-16 | Bingkai penuh layar tanpa sudut membulat; sidebar sticky saat halaman di-scroll |
| 2026-10-16 | Shell area aplikasi diganti port persis K-DASP (sidebar, top bar, footer, placeholder, drawer dialog); shadcn & sidebar-21st dilepas |
| 2026-10-16 | Logo final "Tepat" ditambahkan di Shapes |
| 2026-10-16 | Dokumen awal dari template Soft Op Dashboard + warna teal "Selaras"; kemiripan belum diukur (tanpa preview); Area Landing sementara |
