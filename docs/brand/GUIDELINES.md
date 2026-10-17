# PANTARA — Panduan Logo (ringkas)

> Untuk tim dan siapa pun yang memakai logo PANTARA. Master file ada di folder ini. Versi sebelumnya ("Tepat", huruf P) diarsipkan di `v1-tepat/`.

## 1. Logo "Cincin Tepat"
- **Ide:** cincin kapasitas yang terbuka, dan satu titik penugasan duduk pas di celahnya dengan jarak sama di kedua sisi. Maknanya sama dengan logo sebelumnya ("Tepat"), dalam bentuk yang lebih tenang dan serasi dengan gaya kaca. Nama PANTARA = *Platform for Adaptive, Networked Task Allocation and Resource Alignment*.
- **Versi:**

| Versi | File (latar terang) | File (latar teal/gelap) | Dipakai untuk |
|---|---|---|---|
| Horizontal (utama) | `pantara-horizontal.svg` | `pantara-horizontal-reversed.svg` | Header aplikasi, landing, dokumen, slide |
| Bertumpuk | `pantara-stacked.svg` | `pantara-stacked-reversed.svg` | Ruang persegi: poster, halaman masuk, sampul |
| Simbol | `pantara-symbol.svg` | `pantara-symbol-reversed.svg` | Sidebar, avatar, stiker |
| Simbol kecil (≤ 32 px) | `pantara-symbol-small.svg` | `pantara-symbol-small-reversed.svg` | Favicon, ikon kecil (cincin lebih tebal, celah lebih lebar) |
| Ubin avatar | `pantara-avatar.svg` | (sudah di latar teal) | Foto profil, media sosial |
| Ikon aplikasi kaca | `pantara-app-icon.svg`, `pantara-app-icon-maskable.svg` | (ubin teal bergradasi) | Ikon PWA, layar utama ponsel |
| Wordmark saja | `pantara-wordmark.svg` | — | Bila simbol sudah tampil di dekatnya |

- **Satu warna:** `export/symbol/` dan `export/horizontal/` (hitam, putih, teal `#0F766E`, gelap `#122B29`).
- **Ikon web:** `export/web/` berisi `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `maskable-512.png`, `site.webmanifest`, `head-snippet.html`. Di Next.js sudah dipasang di `frontend/src/app` dan `frontend/public`.

## 2. Ruang kosong
Beri jarak minimal **1 × diameter titik** (±17% tinggi simbol) di semua sisi. Jarak ini ikut membesar/mengecil bersama logo.

## 3. Ukuran minimum
| Versi | Layar | Cetak |
|---|---|---|
| Horizontal | 96 px lebar | 25 mm lebar |
| Simbol | 24 px (di bawah itu pakai `-small`) | 6 mm |
| Simbol kecil | 16 px | 4 mm |

## 4. Warna
| Nama | HEX | RGB | CMYK (perkiraan) | Peran |
|---|---|---|---|---|
| Teal Selaras | #0F766E | 15, 118, 110 | 87, 0, 7, 54 | Simbol di latar terang, latar merek |
| Gelap Teal | #122B29 | 18, 43, 41 | 58, 0, 5, 83 | Latar gelap, teks alternatif |
| Aqua Tepat | #5EEAD4 | 94, 234, 212 | 60, 0, 9, 8 | **Hanya** titik di versi reversed dan ubin kaca |
| Tinta | #141414 | 20, 20, 20 | 0, 0, 0, 92 | Wordmark di latar terang |

Pantone: belum dipilih; cocokkan dengan swatch fisik sebelum cetak. CMYK di atas konversi matematis, minta proof dari percetakan.

**Pasangan yang disetujui:** teal + wordmark tinta di putih/`#F4F4F3` · putih + titik aqua di teal `#0F766E` · putih + titik aqua di gelap `#122B29` · hitam di putih · putih di hitam.

**Ubin kaca:** gradasi `#14B8A6` → `#0F766E` → `#0B4F4A` dengan kilau di kiri atas dan tepi cahaya. Hanya untuk ikon aplikasi (`pantara-app-icon.svg`), bukan untuk logo di dalam dokumen.

## 5. Tipografi
- **Wordmark:** Montserrat Alternates SemiBold, sudah dikonversi ke path (jangan diketik ulang). Lisensi: SIL Open Font License (boleh untuk logo).
- **UI & dokumen:** Onest + JetBrains Mono (08-DESIGN).

## 6. Jangan
Jangan meregangkan atau memipihkan · jangan mewarnai di luar palet · jangan memutar atau memindah posisi titik · jangan menambah bayangan, garis tepi, atau efek pada logo (gradasi hanya pada ubin ikon aplikasi) · jangan memakai titik aqua di latar terang (kontras rendah) · jangan menghapus titik · jangan menutup celah cincin.

## 7. Catatan
- Uji: lolos audit SVG (99–100/100), terbaca di 16/24/32/64 px (versi kecil untuk ≤ 32 px), satu warna, dan reversed.
- Pemakaian di aplikasi: `frontend/src/components/shell/brand.tsx` (sidebar), `frontend/src/app/icon.svg`, `favicon.ico`, `apple-icon.png`, `frontend/public/icon-*.png`.
- **Merek dagang belum dicek.** Bentuk "cincin terbuka dengan titik" cukup umum: lakukan pencarian di PDKI (pdki-indonesia.dgip.go.id) dan reverse image search sebelum rilis publik.
- Konsep yang tidak dipilih: `glass/` (P squircle, tiga busur, bidik), `glass-v2/` (titik temu, kapasitas), `concepts/` dan `concepts-v2/` (lama). Board presentasi: `presentation.html`, `slides/`.
