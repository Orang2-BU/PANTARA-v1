# 05 — PITCH & Demo

> Untuk final Duluin Innovation Summit 2026 (tanggal & durasi belum diketahui, 00-BRIEF P3; kerangka di bawah memakai 8 menit `[asumsi]`). Diisi final menjelang presentasi.

## 1. Alur Cerita (8 menit)
| Menit | Bagian | Isi |
|---|---|---|
| 0:00 | Hook | "Jumat sore, ada 3 tugas mendesak. PM membuka Jira, spreadsheet, grup WhatsApp, lalu memberi tugas ke orang yang 'biasanya bisa'. Senin pagi, orang itu kelebihan beban dan dua tenggat bentrok." |
| 0:45 | Masalah | Info penugasan tersebar (R15, konteks Indonesia); alokasi yang salah terkait kegagalan koordinasi proyek (R1) dan produktivitas (R2); 65% proyek populer bergantung pada ≤ 2 orang (R4) |
| 1:45 | Solusi | Satu alur: Task DNA → Work Twin → Top 3 + alasan → what-if → manajer memutuskan |
| 2:30 | Demo | Alur inti (§2), 3 menit |
| 5:30 | Bukti & cara mengukur | Engine deterministik dengan test; AI dibatasi mengurai tugas + ambang + koreksi manusia (R9, R10); 4 indikator dampak (Tb vs Tp, konflik terdeteksi, penerimaan, override) dan rencana pilot |
| 6:30 | Model bisnis | Menunggu rancangan tim bisnis (00-BRIEF P8). Bahan awal: 01-PRD §3 |
| 7:15 | Pembeda & langkah berikutnya | Bukan dasbor beban atau mesin ranking, tapi pendukung keputusan yang bisa diubah manusia (R6) dan tidak mengawasi (R7). Minta: akses ke 1-2 tim untuk pilot |

## 2. Script Demo
| # | Aksi di layar | Kalimat yang diucapkan |
|---|---|---|
| 1 | Masuk sebagai demo manajer → Dasbor | "Ini pagi Selasa, 29 September. Ada 3 tugas belum ditugaskan, dan PANTARA sudah menandai: Citra punya tenggat berdekatan, data Rafi belum lengkap." |
| 2 | Buat tugas "Integrasi autentikasi" (OAuth2, tenggat 2 Okt, prioritas tinggi) | "Manajer cukup menulis tugas seperti biasa." |
| 3 | Tinjau Task DNA: Backend API & OAuth2 (Mandiri) yakin; Integrasi API dan estimasi "M, 6 jam" ditandai Perlu dicek | "AI hanya mengurai kebutuhan. Yang ragu ditandai kuning dan wajib dicek. Kami ubah estimasi jadi 8 jam." |
| 4 | Rekomendasi: Bima 0,66 · Ayu 0,38 · Dimas 0,26; Citra, Nadia, Rafi tersaring dengan alasan | "Kandidat yang tidak memenuhi syarat wajib dibuang dengan alasan. Bima di atas karena kompetensinya cocok, masih punya 16 jam, dan pernah mengerjakan login OTP & SSO." |
| 5 | Ganti preset ke "Sebar pengetahuan" → Dimas naik ke #2 | "Kalau tim ingin pengetahuan OAuth tidak hanya di satu orang, preset ini menaikkan anggota yang belum pernah, selama levelnya cukup." |
| 6 | Simulasi: skenario #1 Bima lalu #2 Ayu | "Kalau ke Ayu, bebannya jadi 113% dan tenggatnya berdekatan. Kalau ke Bima, 75%, aman. Konsekuensinya terlihat sebelum keputusan." |
| 7 | Tetapkan ke Bima → Dasbor/Kapasitas berubah | "Keputusan tetap di manajer. Kapasitas tim langsung diperbarui untuk keputusan berikutnya, dan waktu keputusan tercatat untuk mengukur dampak." |

**Cadangan:** video rekaman alur inti (T26) · data demo di seed (bisa direset dengan reload).

## 3. Outline Deck
1. PANTARA: "Tahu siapa yang paling pas, sebelum tugas diberikan"
2. Masalah: info tersebar, beban tidak rata, konsentrasi pengetahuan (R1, R2, R4, R15)
3. Solusi: diagram 4 langkah alur inti
4. Demo
5. Cara kerja yang bisa dipertanggungjawabkan: syarat wajib → skor 5 faktor → what-if; AI dibatasi + ambang
6. Dampak terukur: 4 indikator + rencana pilot (tanpa klaim persen)
7. Model bisnis (menunggu rancangan tim bisnis; pembanding harga pesaing: R8)
8. Pembeda vs Asana, Kantata, Mosaic, Float/Runn
9. Tim & langkah berikutnya

## 4. Persiapan Q&A
| Pertanyaan audiens | Jawaban (≤ 30 detik) | Penjawab |
|---|---|---|
| Apa bedanya dengan Asana/Kantata/Mosaic? | Mereka kuat di visualisasi beban dan pencarian sumber daya. PANTARA menggabungkan uraian kebutuhan tugas yang bisa dikoreksi, Work Twin yang diisi anggota, dan simulasi konsekuensi beserta alasan dalam satu alur, untuk tim kecil dengan harga rupiah | — |
| Bobot w1-w5 dari mana? | Awalnya preset yang dipilih manajer sesuai situasi; lalu dikalibrasi dari data override di pilot. Riset menunjukkan orang lebih mau memakai algoritma bila bisa mengubahnya (Dietvorst dkk. 2018) | — |
| Kalau AI salah membaca tugas? | AI hanya mengurai; probabilitas dihitung dari 5 sampel, isian ragu ditandai dan wajib dilihat, manajer bisa mengoreksi atau mengisi manual. Kami mengukur akurasi dengan 40 contoh berlabel sebelum rilis | — |
| Seberapa akurat AI-nya? | Target eval: recall kompetensi ≥ 0,85, presisi ≥ 0,8 pada 40 tugas berlabel. Angka nyata diisi setelah AI1 | — |
| OR-Tools dipakai buat apa? | Untuk membagi banyak tugas sekaligus (alokasi batch) dengan kendala kapasitas. Untuk satu tugas, cukup syarat wajib + skor, lebih cepat dan mudah dijelaskan | — |
| Bukankah ini alat mengawasi karyawan? | Tidak. Tidak ada pelacakan aktivitas; data jam kerja bukan ukuran produktivitas; anggota mengisi dan melihat datanya sendiri. Meta-analisis 70 sampel menunjukkan pemantauan menurunkan kepuasan dan tidak menaikkan kinerja (Siegel dkk. 2022) | — |
| Data awal dari mana? | Impor CSV + anggota mengisi sendiri; status "belum lengkap" ditandai. Ini hipotesis H1 yang kami uji di pilot | — |
| Bagaimana kalau dipakai skala besar? | Engine deterministik O(anggota) per tugas; alokasi batch 30×30 target < 5 detik; AI dipanggil sekali per tugas | — |
| Privasi & keamanan data? | Data dipisah per organisasi, teks yang dikirim ke AI tidak memuat data pribadi anggota, mengikuti UU PDP No. 27/2022 | — |
| Kenapa orang mau bayar? | Diisi setelah rancangan bisnis selesai. Fakta yang sudah ada: pesaing US$5-12/orang/bulan (R8); manfaat dibuktikan dengan pilot (Tb vs Tp) | — |
| Kalau semua rekomendasi tidak cocok? | Manajer bisa menolak rekomendasi dengan alasan (kandidat tidak sesuai kondisi nyata, kebutuhan berubah, ditunda). Penolakan tercatat dan menurunkan tingkat penerimaan, jadi kami tahu kapan engine perlu dikalibrasi | — |
| Dampaknya berapa persen? | Belum kami klaim. Kami mengukur Tb vs Tp, konflik terdeteksi, tingkat penerimaan, dan override di pilot | — |

## 5. Kartu Contekan
Ide 3 kalimat, angka kunci, dan kamus istilah ada di 01-PRD §3b. Tambahan khusus presentasi:

| Angka | Nilai | Sumber | Cara menghitung (kalau ditanya) |
|---|---|---|---|
| Sektor infokom Indonesia 2024 | tumbuh 7,57%, kontribusi 4,34% PDB | BPS 2025 (proposal) | Dikutip dari proposal §1.1 |
| Data demo | 6 anggota, kapasitas 160 jam, teralokasi 110 jam (68,7%) | seed demo | Σ jam teralokasi ÷ Σ jam tersedia anggota dengan data lengkap |

| Istilah | Artinya |
|---|---|
| Appropriate reliance | Mengikuti saran AI saat benar dan menolaknya saat salah |
| Defer | AI menyerahkan kasus ragu ke manusia |
