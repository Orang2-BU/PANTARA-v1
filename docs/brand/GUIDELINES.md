# PANTARA — Panduan Logo (ringkas)

> Untuk tim dan siapa pun yang memakai logo PANTARA. Master file ada di folder ini.

## 1. Logo
- **Ide:** huruf P dari cincin tebal dan tangkai berujung bulat. Titik di dalam lubang adalah penugasan yang jatuh tepat di tempatnya ("Tepat").
- **Versi:**

| Versi | File (latar terang) | File (latar teal/gelap) | Dipakai untuk |
|---|---|---|---|
| Horizontal (utama) | `pantara-horizontal.svg` | `pantara-horizontal-reversed.svg` | Header aplikasi, landing, dokumen, slide |
| Bertumpuk | `pantara-stacked.svg` | `pantara-stacked-reversed.svg` | Ruang persegi: poster, halaman masuk, sampul |
| Simbol | `pantara-symbol.svg` | `pantara-symbol-reversed.svg` | Sidebar ciut, avatar, stiker |
| Simbol kecil (≤ 32 px) | `pantara-symbol-small.svg` | `pantara-symbol-small-reversed.svg` | Favicon, ikon app (lubang & titik diperbesar agar tidak menutup) |
| Wordmark saja | `pantara-wordmark.svg` | — | Bila simbol sudah tampil di dekatnya |

- **Satu warna:** `export/symbol/` dan `export/horizontal/` (hitam, putih, teal `#0F766E`, gelap `#122B29`).
- **Ikon web:** `export/symbol/` berisi `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `maskable-512.png`, `site.webmanifest`, `head-snippet.html`. Di Next.js salin ke `frontend/src/app/` (favicon.ico, icon.svg, apple-icon.png) atau `public/`.

## 2. Ruang kosong
Beri jarak minimal **1 × diameter cincin dalam** (lubang P, ±20% tinggi simbol) di semua sisi. Jarak ini ikut membesar/mengecil bersama logo.

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
| Aqua Tepat | #5EEAD4 | 94, 234, 212 | 60, 0, 9, 8 | **Hanya** titik di versi reversed |
| Tinta | #141414 | 20, 20, 20 | 0, 0, 0, 92 | Wordmark di latar terang |

Pantone: belum dipilih; cocokkan dengan swatch fisik sebelum cetak. CMYK di atas konversi matematis, minta proof dari percetakan.

**Pasangan yang disetujui:** teal + wordmark tinta di putih/`#F4F4F3` · putih + titik aqua di teal `#0F766E` · putih + titik aqua di gelap `#122B29` · hitam di putih · putih di hitam. Di foto: pakai versi putih di area tenang, atau simbol di ubin teal.

## 5. Tipografi
- **Wordmark:** Montserrat Alternates SemiBold, sudah dikonversi ke path (jangan diketik ulang). Lisensi: SIL Open Font License (boleh untuk logo).
- **UI & dokumen:** Onest + JetBrains Mono (08-DESIGN).

## 6. Jangan
Jangan meregangkan atau memipihkan · jangan mewarnai di luar palet · jangan memutar · jangan menambah bayangan, garis tepi, gradien, atau efek · jangan memakai titik aqua di latar terang (kontras rendah) · jangan menghapus titik atau memindah posisinya · jangan menaruh P di dalam kotak dengan sudut biasa (terbaca seperti rambu parkir; untuk ubin pakai ikon app) · jangan mengetik ulang wordmark dengan font lain · jangan menaruh di latar ramai tanpa wadah.

## 7. Catatan
- Uji: lolos audit SVG (99/100), terbaca di 16/24/32/64 px, satu warna, dan reversed (dicek 16 Okt 2026).
- **Merek dagang belum dicek.** Bentuk "p bulat dengan titik" cukup umum: lakukan pencarian di PDKI (pdki-indonesia.dgip.go.id) dan reverse image search sebelum rilis publik.
- Konsep yang tidak dipilih: `concepts/` (v1) dan `concepts-v2/` (v3). Board presentasi: `presentation.html`, `slides/`.
