# 07 — RULES: Aturan Wajib

> Aturan tertinggi projek. Berlaku untuk setiap AI dan setiap perubahan kode, tanpa pengecualian.

## 1. Tuntaskan Permintaan
- Kerjakan setiap permintaan sampai benar-benar selesai, mengikuti aturan di docs/.
- Jangan berhenti di tengah jalan atau menyerahkan pekerjaan setengah jadi sebagai "selesai".

## 2. Verifikasi Wajib Setiap Perubahan Kode
Jalankan semua pemeriksaan yang tersedia di projek ini (dari folder `frontend/`; backend mulai M1):

| Cek | Perintah |
|---|---|
| Test | `npm run test` · BE: `uv run pytest` |
| Build | `npm run build` |
| Typecheck | `npx tsc --noEmit` |
| Lint | `npm run lint` · BE: `uv run ruff check .` |
| Dead code | `npx knip` · BE: `uv run vulture apps` |
| Token desain (bila 08-DESIGN berubah) | `npx -p @google/design.md designmd lint ../docs/08-DESIGN.md` lalu `export` ulang |
| Cek fungsi terkait | Buka halaman yang berubah di browser; untuk perubahan engine/alur: jalankan **cek alur inti** |
| Cek alur inti | Masuk (demo manajer) → buat tugas → konfirmasi Task DNA → pilih kandidat → simulasi → Tetapkan → utilisasi berubah di Dasbor, Tim, Kapasitas |

## 3. Siklus Perbaikan Error
Jika ada pemeriksaan yang gagal:
1. Cari **akar penyebabnya** (baca pesan error, reproduksi).
2. Perbaiki penyebabnya, bukan gejalanya.
3. Jalankan ulang **semua** pemeriksaan wajib.
4. Ulangi sampai semuanya berhasil.

## 4. Dilarang
- Melewati pemeriksaan wajib.
- Melemahkan test: menghapus/men-skip test, melonggarkan assertion, menambah `@ts-ignore`, `eslint-disable`, `# type: ignore`, `any`, atau sejenisnya hanya agar lolos.
- Menyatakan pekerjaan selesai tanpa bukti verifikasi (output perintah).
- Mengarang hasil pemeriksaan.
- Membuat LLM memilih penerima tugas atau menulis alasan rekomendasi (01-PRD §6).
- Menampilkan atau menghitung "produktivitas" per orang (01-PRD §8).

## 5. Kejujuran
Jika ada pemeriksaan yang tidak bisa dijalankan (tool belum terpasang, butuh kredensial, butuh layanan eksternal, dsb.), jelaskan dengan jujur: pemeriksaan apa, kenapa tidak bisa, dan risikonya.

## 6. Nol Dead Code
Projek harus bersih dari kode tak terpakai setiap saat:
- Tidak ada import, variabel, fungsi, export, komponen, file, atau dependency yang tidak dipakai.
- Tidak ada kode yang di-comment-out, `console.log`/print debug, atau feature flag mati.
- Saat mengubah/menghapus kode, telusuri dan hapus juga semua yang jadi tak terpakai karenanya.
- Jalankan cek dead code sebagai bagian dari verifikasi wajib.

## 7. Solusi Paling Sederhana (Ponytail)
Berlaku untuk setiap tugas koding: menulis, memperbaiki, refactor, review, memilih dependency.
- Kalau skill `ponytail` tersedia (Claude Code), panggil otomatis. Kalau tidak, prinsip di bawah tetap wajib.
- Tanya dulu: apakah ini perlu dibuat sama sekali? (YAGNI)
- Urutan pilihan: fitur bawaan bahasa/standard library → fitur bawaan framework/platform → dependency yang sudah ada di projek → dependency baru (harus minta izin, sertakan alasan).
- Kode sesedikit mungkin yang tetap benar, terbaca, dan teruji. Tidak ada abstraksi, konfigurasi, atau lapisan "untuk jaga-jaga".
- Sederhana bukan berarti asal: tidak boleh mengorbankan kebenaran, keamanan, test, atau aturan lain di dokumen ini.

## 8. UI/UX
Berlaku untuk setiap kerja tampilan: halaman, komponen, layout, warna, tipografi, aksesibilitas, responsif.
- Kalau skill `impeccable` tersedia (Claude Code), panggil otomatis: `impeccable` menentukan tampilan, `ponytail` menentukan cara membangunnya. Jangan menurunkan kualitas visual demi menghemat kode.
- `docs/08-DESIGN.md` wajib dipakai: hanya token di dokumen itu, tidak ada nilai hardcode di luar token. Baca "Peta area" dulu: file landing → Bersama + Area Landing; file aplikasi → Bersama + Area Aplikasi.
- Sumber komponen, berurutan: komponen & kelas CSS template yang sudah ada di projek (port K-DASP, lihat 08-DESIGN) → pola dari starter template Soft Op → tulis sendiri dengan pola yang sama. shadcn/sidebar-21st tidak dipakai di projek ini (03-ARCHITECTURE Q13). Lalu → 21st.dev/Aceternity/Magic UI/React Bits hanya bila diminta → tulis sendiri. Library UI lain butuh izin.
- Checklist wajib sebelum UI dinyatakan selesai:
  - Responsif di 375px, 768px, dan 1440px tanpa scroll horizontal.
  - Kontras teks ≥ 4.5:1 (teks besar & elemen UI ≥ 3:1).
  - Semua aksi bisa lewat keyboard, focus terlihat jelas.
  - Target sentuh ≥ 44×44px di bawah 1200px (≥ 36px di desktop); body text ≥ 16px di mobile.
  - State lengkap: hover, active, focus, disabled, loading, empty, error.
  - Input punya label; ikon tanpa teks punya `aria-label`.
  - Konsisten dengan komponen lain yang sudah ada.
  - Teks yang terlihat user tanpa em-dash (`—`/`–` sebagai pemisah); konten contoh realistis.
  - Bagian setinggi layar memakai `min-h-[100dvh]`, bukan `h-screen`; font lewat `next/font`.
  - Setelah token diubah: `designmd lint` 0 error dan tanpa warning `contrast-ratio`, lalu `export` ulang.
  - Lulus Prinsip UX di "Do's and Don'ts" 08-DESIGN.
  - Lulus Standar UI A1-A11 + A13 di bagian Do's and Don'ts 08-DESIGN (tanpa emoji, tanpa warna bawaan AI, satu layar satu tugas, tanpa elemen tanpa fungsi, tanpa em-dash, konten realistis, `100dvh` + font self-host, semua elemen klik punya hover/tekan/fokus beranimasi).
  - Section landing lulus larangan AI slop (LANDING-PAGE §7, ditulis di 08-DESIGN Area Landing) dan audit `impeccable`; animasi mati saat reduced-motion.
- Verifikasi visual: buka halaman yang berubah di browser (desktop + mobile) dan cek checklist di atas. Masukkan hasilnya ke laporan.

## 9. Output Perintah Hemat (RTK)
- Kalau `rtk` terpasang, jalankan perintah yang outputnya panjang lewat `rtk`.
- Kalau tidak, pakai flag ringkas bawaan tool tanpa menyembunyikan error.
- Gabungkan perintah yang saling terkait dalam satu kali jalan.
- Output ringkas tidak bisa dipakai → jalankan ulang tanpa peringkas (`rtk proxy <cmd>`). Jangan menebak dari output terpotong.

## 10. Laporan Akhir (wajib setelah setiap pekerjaan)
```
### Perubahan
- {{file}}: {{apa yang diubah dan kenapa}}

### Pemeriksaan
| Cek | Perintah | Hasil |
|---|---|---|
| Test | npm run test | ✅ ... |
| Build | npm run build | ✅ |
| Typecheck | npx tsc --noEmit | ✅ |
| Lint | npm run lint | ✅ |
| Dead code | npx knip | ✅ tidak ada temuan |
| Alur inti | manual (07-RULES §2) | ✅ {{apa yang dicek}} |
| UI (jika ada perubahan tampilan) | browser 375 / 768 / 1440 | ✅ {{checklist §8}} |
| UI: Standar UI A1-A11 | 08-DESIGN Do's and Don'ts | ✅ |

### Tidak bisa dijalankan / catatan
- {{... atau "Tidak ada"}}
```
