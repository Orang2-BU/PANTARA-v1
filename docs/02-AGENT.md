# 02 — AGENT: Instruksi untuk AI

> Konvensi yang harus diikuti AI (dan developer manusia) di projek ini.

## 1. Konteks Singkat
- **Aplikasi:** PANTARA, sistem pendukung keputusan penugasan: Task DNA → Work Twin → Top 3 kandidat + alasan → simulasi what-if → manajer memutuskan.
- **Stack:** Next.js (App Router, TS strict, Tailwind v4, lucide-react; shell & kelas CSS template Soft Op port dari K-DASP) · nanti Django + DRF, PostgreSQL, OR-Tools, LLM.
- **Fase:** M0 mockup frontend dengan data seed (tenggat 22 Okt 2026).

## 2. Struktur Folder
```
Pantara/
├─ docs/                         # sumber kebenaran (00-08)
├─ frontend/                     # Next.js
│  └─ src/
│     ├─ app/
│     │  ├─ (marketing)/         # landing + halaman publik (mode Persuade)
│     │  ├─ (auth)/masuk/        # halaman akun
│     │  └─ (app)/               # area aplikasi (mode Operate), layout dengan sidebar
│     │     ├─ dasbor/  tugas/  tim/  kapasitas/  keputusan/  laporan/
│     │     ├─ saya/             # sisi anggota
│     │     └─ pengaturan/
│     ├─ components/
│     │  ├─ shell/               # app-shell (sidebar, top bar, footer, dialog), placeholder, brand
│     │  ├─ ui/index.tsx         # Icon, Badge, Modal (port template)
│     │  ├─ solo/                # bingkai halaman di luar shell (masuk, publik)
│     │  └─ <fitur>/             # layar inti per fitur, mis. tugas/, tim/ (pola K-DASP)
│     ├─ content/landing.ts      # semua teks landing
│     ├─ lib/
│     │  ├─ engine/              # mesin keputusan murni (tanpa React): constraints.ts, score.ts, whatif.ts, explain.ts
│     │  └─ demo/                # seed, tipe, store (M0)
│     └─ styles/theme.css        # HASIL export 08-DESIGN, jangan diedit tangan
└─ backend/                      # Django (M1+)
   ├─ apps/  (accounts, workforce, tasks, taskdna, engine, decisions)
   └─ eval/                      # eval set & skrip akurasi Task DNA
```
- **Rute halaman:** persis rute di 01-PRD §5a (bahasa Indonesia, kebab-case: `/tugas/baru`, `/tugas/[id]/kandidat`). Satu halaman = satu folder `page.tsx`.

## 3. Gaya Koding
- **Penamaan:** variabel/fungsi camelCase, komponen PascalCase, file kebab-case, konstanta UPPER_SNAKE. Nama domain dalam bahasa Inggris di kode (`TaskDna`, `WorkTwin`, `availability`), teks UI bahasa Indonesia.
- **Prinsip:** fungsi kecil & satu tanggung jawab; solusi paling sederhana yang benar; fitur bawaan sebelum dependency.
- **Engine:** fungsi murni (input → output), tanpa akses store/React, supaya bisa dites dan dipindah ke Python dengan kasus test yang sama (fixture JSON di `src/lib/engine/__fixtures__/`).
- **Typing:** TS `strict`, tanpa `any`; tipe domain di `src/lib/demo/types.ts` mengikuti 03-ARCHITECTURE §3. Python: type hints + ruff.
- **Komponen:** Server Component secara default; `'use client'` hanya untuk yang interaktif.
- **Error handling:** validasi di form dengan pesan per field; error tak terduga → state error halaman dengan aksi "Coba lagi".
- **Formatter / linter:** ESLint (config Next) + Prettier bawaan editor; Python ruff. Config di repo adalah sumber kebenaran.

## 4. Gaya Komentar
- Komentar menjelaskan **kenapa**, bukan **apa**. Bahasa Indonesia.
- Fungsi publik engine diberi JSDoc singkat berisi rumus/aturan yang dipakai (rujuk 01-PRD §6).
- Tidak ada kode yang di-comment-out.

## 5. Testing
- **Framework:** Vitest (FE), pytest (BE).
- **Lokasi & penamaan:** `*.test.ts` di samping file.
- **Format:** Arrange-Act-Assert; satu perilaku per test; nama test mendeskripsikan perilaku ("menyaring anggota yang cuti di rentang tugas").
- **Wajib ditest:** engine (syarat wajib, skor, preset, konflik, what-if), validasi form, filter organisasi (BE), bug yang pernah terjadi.

## 6. Dependency
- Tambah dependency hanya jika jelas lebih sederhana dari menulis sendiri, dengan izin user.
- Package manager: npm (FE), uv (BE) `[asumsi]`.

## 7. Git
- **Format commit:** Conventional Commits (`feat: ...`, `fix: ...`, `docs: ...`).
- **Branch:** `main` + branch per task (`t10-rekomendasi`). Commit hanya bila user setuju.

## 8. Lain-lain
- **Bahasa UI:** Indonesia, kalimat biasa (sentence case), tanpa em-dash (A9).
- **Data contoh:** nama dan angka dari seed (prototipe proposal), bukan karangan baru. Tanpa chip/label "Data contoh" di layar (keputusan user 16 Okt 2026).
- **Aksesibilitas:** WCAG AA, keyboard penuh, `prefers-reduced-motion`.
- **Privasi:** jangan pernah menampilkan metrik "produktivitas" per orang; kapasitas = jam kerja, bukan penilaian.
