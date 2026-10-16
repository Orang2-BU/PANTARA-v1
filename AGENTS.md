# PANTARA

> Instruksi untuk semua AI coding assistant. Dibuat oleh skill setup-project-00 (16 Okt 2026).
> Sumber kebenaran ada di `docs/`. File ini ringkasannya.

## WAJIB sebelum ngoding pertama kali
Jika kamu AI yang belum pernah bekerja di projek ini, baca **seluruh** file di `docs/` (00 sampai 08, plus `AI-PRIMITIVES.md`) secara berurutan satu kali, lalu ikuti aturannya. Setelah itu cukup rujuk file ini.

## Aplikasi
PANTARA: sistem pendukung keputusan penugasan untuk PM software house/agensi kecil. Alur inti: buat tugas → Task DNA (dikoreksi manajer) → Top 3 kandidat + alasan → simulasi what-if → manajer menetapkan → kapasitas diperbarui. AI hanya mengurai tugas; pemilihan oleh kode deterministik + manusia. Fase sekarang: **M0 mockup frontend dengan data contoh, tenggat 22 Okt 2026**. Di luar scope: time tracking, penilaian kinerja, kanban, chat, integrasi Jira/HRIS. Ide asli di `docs/00-BRIEF.md`.

## Stack & Perintah Verifikasi
- **Stack:** Next.js App Router + TS + Tailwind v4 + lucide-react + shell template Soft Op (port persis K-DASP, tanpa shadcn/sidebar-21st) (`frontend/`); nanti Django + DRF, PostgreSQL, OR-Tools, LLM (`backend/`).
- **Test:** `npm run test` · **Build:** `npm run build` · **Typecheck:** `npx tsc --noEmit` · **Lint:** `npm run lint` · **Dead code:** `npx knip`

## Aturan Wajib (ringkas — lengkapnya di docs/07-RULES.md)
- Tuntaskan setiap permintaan sesuai aturan projek.
- Setiap perubahan kode: jalankan test, build, typecheck, lint, cek dead code, dan cek fungsi terkait (termasuk cek alur inti).
- Error → cari akar penyebab, perbaiki, ulangi semua pemeriksaan sampai hijau.
- Dilarang skip pemeriksaan, melemahkan test, atau klaim selesai tanpa bukti.
- Pemeriksaan yang tidak bisa dijalankan → jelaskan dengan jujur.
- Projek harus bersih dari dead code.
- Solusi paling sederhana yang benar. Pakai skill `ponytail` jika tersedia.
- Kerja UI: ikuti docs/08-DESIGN.md termasuk Standar UI anti tampilan AI. Baca "Peta area" dulu: file landing → Bersama + Area Landing; file aplikasi → Bersama + Area Aplikasi; jangan campur. Lenis/Motion Primitives/GSAP hanya di area landing. Pakai skill `impeccable` jika tersedia.
- Panggilan AI (M2+): ikuti §5 docs/03-ARCHITECTURE.md dan docs/AI-PRIMITIVES.md.
- Output perintah panjang lewat `rtk` jika terpasang.
- Selesai kerja → laporkan perubahan, pemeriksaan, dan hasilnya.

## Aturan Main (ringkas — lengkapnya di docs/06-WORKFLOW.md)
- **Otonomi:** kerjakan task 04-TODO dan pemeriksaannya sendiri.
- **Wajib minta izin:** dependency baru, ubah model data/alur inti, halaman di luar PRD, commit/push/deploy, hapus data, potong scope.
- **Selesai =** kriteria di 03 terpenuhi + semua cek hijau + ada test + 04-TODO diupdate + laporan.

## Konvensi (ringkas — lengkapnya di docs/02-AGENT.md)
- Rute persis 01-PRD §5a; teks UI bahasa Indonesia; nama domain di kode bahasa Inggris.
- Engine = fungsi murni di `src/lib/engine/` dengan Vitest; seed di `src/lib/demo/`.
- Server Component default; TS strict tanpa `any`.
- Data contoh dari seed; tanpa chip "Data contoh" di layar.
- Tidak ada metrik produktivitas per orang.
- Conventional Commits; commit hanya bila user setuju.

## Kapan baca docs
- Mulai task baru → bagian terkait di `docs/03-ARCHITECTURE.md`
- Status task berubah → update `docs/04-TODO.md` (wajib)
- Pitch & script demo → `docs/05-PITCH.md`
- Ragu scope → `docs/01-PRD.md`
- Membuat/mengubah halaman → "Peta Halaman" di `docs/01-PRD.md` + `docs/08-DESIGN.md`
- Konflik aturan → prioritas: 07-RULES > instruksi user > 00-BRIEF > 01-PRD > 08-DESIGN (untuk UI) > 06-WORKFLOW > 03-ARCHITECTURE > 02-AGENT
