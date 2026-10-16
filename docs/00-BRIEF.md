# 00 — BRIEF: PANTARA

> Sumber kebenaran untuk ide asli, tujuan, dan batasan. Prioritas: 07-RULES > instruksi user > dokumen ini > dokumen lain.

## 1. Ide Asli
> Sumber: proposal "PANTARA_Positif dan Profesional_PoliteknikNegeriJember_DuluinInnovation2026.pdf" (Tim Positif dan Profesional, Politeknik Negeri Jember), dikutip apa adanya dari bagian 2.1.
>
> "PANTARA (Platform for Adaptive, Networked Task Allocation and Resource Alignment) merupakan platform berbasis web untuk orkestrasi kerja adaptif yang membantu manajer menentukan alokasi tugas berdasarkan kebutuhan pekerjaan dan kondisi aktual tim. PANTARA dirancang sebagai sistem pendukung keputusan, bukan sebagai pengganti kewenangan manajer. Fokusnya adalah membantu proses penugasan sebelum keputusan dibuat dengan menyatukan informasi yang sebelumnya tersebar, seperti kompetensi, kapasitas aktif, ketersediaan, pekerjaan berjalan, serta karakteristik tugas.
>
> Proses dimulai ketika manajer memasukkan deskripsi tugas, tenggat, prioritas, dan informasi pendukung. PANTARA kemudian membentuk Task DNA, yaitu representasi terstruktur mengenai kebutuhan tugas seperti kompetensi yang diperlukan, estimasi upaya, kompleksitas, tenggat, dan ketergantungan. Hasil analisis dapat diperiksa dan dikoreksi pengguna sebelum digunakan dalam proses rekomendasi. Data tersebut selanjutnya dibandingkan dengan Work Twin versi minimum yang merepresentasikan kompetensi, kapasitas, ketersediaan, dan riwayat tugas relevan setiap anggota tim.
>
> Berdasarkan informasi tersebut, sistem menyaring kandidat yang tidak memenuhi batas wajib, lalu menampilkan tiga kandidat penugasan teratas beserta tingkat kesesuaian dan konsekuensi apabila tugas diberikan. Manajer dapat membandingkan perubahan kapasitas, potensi konflik pekerjaan, serta alasan setiap rekomendasi melalui simulasi what-if. Rekomendasi dapat diterima, diubah, atau ditolak, sehingga keputusan akhir tetap berada pada manusia. Setelah penugasan ditetapkan, kondisi kapasitas tim diperbarui sebagai konteks bagi keputusan berikutnya."
>
> Arahan user di sesi setup (16 Okt 2026): "untuk sementara aku butuh mockup dulu, di kumpulkan paling lambat tgl 22, tapi kamu tetep bikin file docs secara lengkap, tapi pas aku eksekusi prd nanti hanya front end". Warna merek: teal (opsi "Selaras"). Landing page: ada, inspirasi menyusul. Desain aplikasi: template Soft Op Dashboard. Semua saran konsultan disetujui, dengan catatan "pastikan semua saranmu itu berdasarkan riset yang mendalam".

## 2. Ringkasan
- **Masalah inti:** keputusan "tugas ini dikerjakan siapa" diambil berulang kali dengan informasi yang tersebar (spreadsheet, WhatsApp, Jira/Trello, ingatan manajer). Akibatnya beban menumpuk pada orang tertentu, tenggat bentrok, dan pengetahuan terkonsentrasi pada sedikit orang.
- **Untuk siapa:** project manager / ketua tim di software house dan agensi digital kecil (5-30 orang), mulai dari Jawa Timur `[asumsi]`. Anggota tim memakai sisi karyawan versi minimal.
- **Hasil yang diharapkan:** manajer memilih penerima tugas lebih cepat, konflik kapasitas dan tenggat terdeteksi sebelum tugas diberikan, dan keputusan tetap di tangan manusia dengan alasan yang bisa dijelaskan.

## 3. Projek
| Item | Isi |
|---|---|
| Jenis | Produk/startup (lomba Duluin Innovation Summit 2026, arah B2B SaaS) |
| Kategori lomba | Project Management & Collaboration · Track 1.4 Intelligent Workforce Allocation and Capacity Management |
| Target waktu | **Mockup frontend (data contoh) dikumpulkan paling lambat Kamis, 22 Okt 2026.** Setelah itu MVP penuh mengikuti timeline proposal (6 minggu) `[asumsi]` |
| Lingkup eksekusi sekarang | Hanya frontend (milestone M0 di 03-ARCHITECTURE). Backend, AI, dan integrasi didokumentasikan lengkap untuk tahap berikutnya |
| Dipresentasikan | Ya, ke juri Duluin Innovation Summit 2026 (tanggal final belum diketahui) |
| Bisnis | Ya (saklar bisnis aktif) |
| Platform | Web (desktop utama, responsif sampai mobile) |
| Budget & hosting | Mockup: hosting Next.js gratis, mis. Vercel Hobby `[asumsi]`. MVP: Docker + VPS + Nginx (proposal) |

## 4. Tim
| Nama | NIM | Skill | Peran |
|---|---|---|---|
| Krisna Panca Dewa (ketua) | E31241924 | — | — |
| Aditya Fadni Athaullah | E41240068 | — | — |
| Hadi Akram Ramadhan | E41250480 | — | — |
| Muchamad Lucky Ramadhan | E31251584 | — | — |
| Mohammad Yassir Thoriq Fathirurrizqy | E41240985 | — | — |

Pemilik task di 04-TODO diisi "—" sampai pembagian peran ditentukan.

## 5. Batasan & Asumsi
- **Batasan:**
  - Stack sesuai proposal: Next.js, Django + DRF, Python + Google OR-Tools, LLM API, PostgreSQL, Docker + Nginx.
  - Mockup 22 Okt hanya frontend dengan data contoh; tidak ada backend nyata, AI dipalsukan dengan hasil yang sudah disiapkan di seed.
  - Data anggota adalah data pribadi pekerja: tunduk pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.
  - LLM tidak boleh menentukan penerima tugas; LLM hanya mengurai deskripsi tugas (proposal §3.1).
  - Klaim dampak tidak memakai persentase yang belum diuji (proposal §4.1).
- **Asumsi:**
  - `[asumsi]` Segmen pertama: software house/agensi 5-30 orang di Jawa Timur, karena data contoh prototipe sudah tim dev 6 orang dan tim bisa mendekati mereka langsung.
  - `[asumsi]` Masalah diketahui dari jurnal dan pengamatan, belum dari wawancara PM. Perlu divalidasi (P1).
  - `[asumsi]` Cara kerja sekarang: campuran spreadsheet, WhatsApp/rapat, dan Jira/Trello. Ini baseline (Tb) untuk mengukur efisiensi waktu.
  - `[asumsi]` Sisi karyawan versi minimal masuk MVP: isi ketersediaan sendiri, terima/tolak penugasan dengan alasan, ubah status tugas.
  - `[asumsi]` Kesalahan rekomendasi berakibat proyek telat atau anggota kelebihan beban, sehingga ambang AI dibuat ketat dan manajer selalu menyetujui.
  - Bagian bisnis (segmen final, harga, model pendapatan, GTM) **ditunda**: dirancang oleh anggota tim (arahan user 16 Okt 2026). Draf AI di 01-PRD §3 hanya bahan awal.
  - `[asumsi]` Package manager npm, hosting mockup gratis (butuh izin user sebelum deploy).
  - `[asumsi]` Landing page memakai section standar B2B sampai inspirasi dari user masuk.

## 6. Pertanyaan Terbuka
| # | Pertanyaan | Asumsi sementara | Status |
|---|---|---|---|
| P1 | Apakah PM nyata membenarkan masalah ini dan berapa lama mereka butuh untuk satu keputusan penugasan? | Wawancara 3-5 PM software house/agensi sebelum final; catat Tb | terbuka |
| P2 | Inspirasi landing page (URL/screenshot), rasa, animasi (Lenis + Motion Primitives atau tidak), gaya tombol | Section standar B2B, animasi CSS ringan, tombol "rekomendasi AI" | terbuka (user akan mengirim) |
| P3 | Tanggal dan durasi presentasi final | 7-10 menit termasuk demo | terbuka |
| P4 | Pembagian peran tim (FE/BE/AI/desain/pitch) | Owner "—" | terbuka |
| P5 | Penyedia LLM untuk Task DNA dan budget API | Diputuskan di task AI1 berdasarkan eval biaya dan akurasi | terbuka |
| P6 | Harga yang mau dibayar segmen pertama | Bagian dari P8 | terbuka |
| P8 | Rancangan bisnis dari tim (segmen, harga, model pendapatan, ROI, GTM) | Draf AI di 01-PRD §3 sebagai bahan awal | terbuka (dikerjakan anggota tim) |
| P7 | Hosting mockup untuk dikumpulkan (link vs video vs file) | Link deploy preview + video rekaman cadangan | terbuka |
