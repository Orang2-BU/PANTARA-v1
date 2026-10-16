# 06 — WORKFLOW: Aturan Main

> Prinsip: alur inti selalu bisa jalan. Lebih baik sedikit fitur yang stabil daripada banyak fitur setengah jadi.
> Fase sekarang: M0 mockup frontend (tenggat 22 Okt 2026). Jangan mengerjakan backend sebelum diminta.

## 1. Alur per Task
1. Ambil task dari 04-TODO sesuai prioritas → 🟦.
2. Baca bagian terkait di 03-ARCHITECTURE (dan 01-PRD §5 untuk halaman, 08-DESIGN untuk UI); ambigu → tanya, jangan menebak.
3. Implementasi minimal yang memenuhi kriteria selesai.
4. Verifikasi sesuai 07-RULES, termasuk cek alur inti.
5. Update 04-TODO; laporkan. Commit hanya bila user setuju.

## 2. Boleh Jalan Sendiri
- Mengerjakan task di 04-TODO, menjalankan semua pemeriksaan, memperbaiki error dari perubahan sendiri.
- Menambah/memperbaiki data contoh (seed) agar realistis dan konsisten dengan prototipe proposal.

## 3. Wajib Minta Izin
- Menambah dependency baru atau mengganti stack/database.
- Mengubah model data yang sudah dipakai fitur lain.
- Fitur atau halaman di luar 01-PRD §5, atau mengubah alur inti.
- Commit, push, deploy (termasuk deploy preview mockup), aksi ke layanan eksternal, menghapus data.
- Memotong scope (✂️): usulkan dengan alasan, user memutuskan.

## 4. Prioritas
- M0: T1-T5 (fondasi + engine) → T6-T15 (halaman alur inti) → T16-T24 (landing) → T25-T26.
- Kalau task jauh lebih rumit dari perkiraan, usulkan versi lebih sederhana yang tetap memenuhi alur inti.
- Mendekati 22 Okt: halaman yang belum siap tetap tampil sebagai Placeholder rapi, bukan setengah jadi.

## 5. Definition of Done
- [ ] Kriteria selesai di 03-ARCHITECTURE terpenuhi
- [ ] Semua pemeriksaan di 07-RULES hijau dengan bukti
- [ ] Alur inti masih jalan end-to-end
- [ ] Tidak ada dead code / debug log tersisa
- [ ] 04-TODO diupdate, laporan diberikan

## 6. Prioritas Saat Konflik
07-RULES > instruksi user > 00-BRIEF > 01-PRD > 08-DESIGN (untuk UI) > 06-WORKFLOW > 03-ARCHITECTURE > 02-AGENT
