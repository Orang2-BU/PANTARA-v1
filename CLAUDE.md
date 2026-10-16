# PANTARA

> Dibuat oleh skill setup-project-00 (16 Okt 2026). File ini dimuat otomatis setiap sesi,
> jadi tidak perlu membaca ulang docs/ kecuali dibutuhkan (lihat bagian "Kapan baca docs").

## Aplikasi Ini
PANTARA adalah sistem pendukung keputusan penugasan untuk PM di software house dan agensi digital kecil (lomba Duluin Innovation Summit 2026, arah B2B SaaS). Alur inti: buat tugas → Task DNA (AI mengurai kebutuhan, manajer mengoreksi) → Top 3 kandidat dari Work Twin + alasan → simulasi what-if → manajer menetapkan → kapasitas tim diperbarui. AI tidak pernah memilih penerima tugas; skor dan alasan dihitung kode deterministik.
**Fase sekarang: M0 mockup frontend dengan data contoh, tenggat Kamis 22 Okt 2026.** Backend, AI, dan sisi anggota didokumentasikan untuk tahap berikutnya.
Di luar scope: time tracking, penilaian kinerja/produktivitas, kanban, chat, integrasi Jira/HRIS.
Ide asli dan arahan user ada di `docs/00-BRIEF.md`.

## Stack & Perintah
- **Stack:** Next.js App Router + TS strict + Tailwind v4 + lucide-react + shell template Soft Op (port persis K-DASP, tanpa shadcn/sidebar-21st) (folder `frontend/`). Nanti: Django + DRF, PostgreSQL, OR-Tools, LLM (folder `backend/`).
- **Test:** `npm run test` · **Build:** `npm run build` · **Typecheck:** `npx tsc --noEmit` · **Lint:** `npm run lint` · **Dead code:** `npx knip` (jalankan di `frontend/`)

## Konvensi Singkat (dari docs/02-AGENT.md)
- Rute halaman persis 01-PRD §5a (bahasa Indonesia). Teks UI bahasa Indonesia, nama domain di kode bahasa Inggris.
- Mesin keputusan = fungsi murni di `src/lib/engine/`, wajib Vitest; data demo di `src/lib/demo/`.
- Server Component default; `'use client'` hanya untuk yang interaktif. TS strict tanpa `any`.
- Data contoh dari seed (nama & angka prototipe proposal), tanpa chip/label "Data contoh" di layar.
- Jangan pernah menampilkan "produktivitas" per orang; kapasitas = jam kerja.
- Commit hanya bila user setuju; Conventional Commits.

## UI
- Semua UI wajib ikut `docs/08-DESIGN.md`, termasuk Standar UI anti tampilan AI (A1-A13) di "Do's and Don'ts".
- Sebelum mengerjakan UI, baca "Peta area" di 08-DESIGN. File landing → Bersama + Area Landing; file aplikasi → Bersama + Area Aplikasi. Jangan campur gaya kedua area. Lenis, efek Motion Primitives, dan GSAP (bila dipilih) hanya di area landing.
- Token dihasilkan dengan `designmd export`, jangan ditulis tangan.

## AI
- Saat membuat panggilan AI (M2+), ikuti §5 `docs/03-ARCHITECTURE.md` dan `docs/AI-PRIMITIVES.md`.

## Aturan Wajib
@docs/07-RULES.md

## Aturan Main
@docs/06-WORKFLOW.md

## Kapan baca docs
- Mulai task baru → bagian task terkait di `docs/03-ARCHITECTURE.md`
- Status task berubah → update `docs/04-TODO.md` (wajib)
- Pitch & script demo → `docs/05-PITCH.md`
- Ragu soal scope fitur → `docs/01-PRD.md`
- Membuat/mengubah halaman → "Peta Halaman" di `docs/01-PRD.md` + `docs/08-DESIGN.md`
- Detail konvensi koding → `docs/02-AGENT.md`
