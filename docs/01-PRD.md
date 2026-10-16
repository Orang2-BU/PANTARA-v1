# 01 — PRD: PANTARA

> Apa yang dibangun, untuk siapa, dan kenapa. Turunan dari 00-BRIEF. Status: ✅ ACC 2026-10-16
> Label sumber angka: `[dari user]` (proposal/jawaban user), `[asumsi]` (perlu divalidasi), `[riset: sumber]` (lihat §2b).

## 1. Pitch Satu Kalimat
Untuk project manager di software house dan agensi digital kecil yang harus membagi banyak tugas paralel ke tim yang kapasitasnya terus berubah, PANTARA adalah sistem pendukung keputusan penugasan yang menunjukkan siapa yang paling pas, apa akibatnya bagi beban tim, dan kenapa, sebelum tugas diberikan. Tidak seperti Float, Runn, atau Resource Guru yang berfokus pada jadwal dan visualisasi beban, PANTARA mengurai kebutuhan tugas (Task DNA), mencocokkannya dengan kondisi aktual anggota (Work Twin), lalu menyimulasikan konsekuensi tiap pilihan, dan keputusan akhir tetap di manajer.

## 2. Masalah, Pengguna, dan Nilai
- **Pengguna utama & pekerjaannya:** *Raka, 29 tahun, PM di software house 14 orang di Surabaya* `[asumsi]`. Setiap minggu ia membagi 10-20 tugas baru ke developer, desainer, dan QA. Datanya tersebar: kompetensi di kepalanya, beban di Jira, cuti di grup WhatsApp, tenggat di spreadsheet klien. Kendalanya: tidak bisa melihat semua itu sekaligus saat memutuskan, sehingga ia cenderung memberi tugas ke orang yang "biasanya bisa".
- **Stakeholder lain:**
  - *Anggota tim* (developer, desainer, QA): ingin beban adil dan tidak merasa diawasi.
  - *Pemilik/direktur*: pembeli; peduli proyek tepat waktu dan biaya lembur.
- **Value proposition:**
  - **Sebelum:** penugasan dari ingatan + 3-4 sumber terpisah. Konflik beban baru ketahuan saat tugas sudah berjalan.
  - **Bagaimana:** Task DNA → Work Twin → Top 3 kandidat + alasan → simulasi what-if → manajer menetapkan.
  - **Sesudah:** keputusan dalam satu layar dengan konsekuensi terlihat sebelum aksi. Dampak diukur, bukan diklaim (§2 "Ukuran keberhasilan").
- **Alternatif saat ini & kelemahannya:**

| Alternatif | Yang sudah bisa | Kelemahan untuk segmen ini |
|---|---|---|
| Spreadsheet + WhatsApp + ingatan | Gratis, fleksibel | Tidak ada gambaran beban real-time; tergantung satu orang |
| Jira / Trello / ClickUp | Melacak tugas & status | Tidak menjawab "siapa yang paling pas dan apa akibatnya" |
| Asana (workload, capacity planning) | Visualisasi beban, memindah tugas | Manajer tetap memilih sendiri; harga USD `[dari user]` |
| Kantata (resource recommendations) | Rekomendasi berbobot peran, ketersediaan, skill, biaya | Untuk perusahaan jasa profesional besar, harga per penawaran `[dari user]` |
| Mosaic | AI menilai skill, ketersediaan, beban | Pasar AS/enterprise `[dari user]` |
| Float / Runn / Resource Guru | Jadwal sumber daya; US$5-12 per orang/bulan | Penjadwalan, bukan analisis kebutuhan tugas + simulasi konsekuensi; Runn minimal 20 seat `[riset: R8]` |

- **Ukuran keberhasilan** (dihitung dari data pilot, tanpa klaim persen sebelum diuji, proposal §4.1):

| Metrik | Definisi | Target pilot `[asumsi]` |
|---|---|---|
| Efisiensi waktu keputusan | (Tb − Tp) / Tb × 100%. Tb = waktu rata-rata manual (observasi), Tp = dari "buat tugas" sampai "tetapkan" (tercatat otomatis) | Diukur; hipotesis turun ≥ 30% (H3) |
| Konflik terdeteksi sebelum penugasan | Jumlah peringatan kapasitas/tenggat/dependensi yang muncul di simulasi | Dicatat per minggu |
| Tingkat penerimaan rekomendasi | % penugasan memakai kandidat peringkat 1-3 | ≥ 50% (H2) |
| Frekuensi override | % penugasan ke orang di luar Top 3 + alasannya | Dipantau; alasan dipakai mengkalibrasi bobot |
| Kelengkapan Work Twin | % anggota dengan kompetensi + ketersediaan periode ini terisi | ≥ 80% setelah minggu pertama (H1) |

### 2b. Dasar riset
Setiap keputusan desain di dokumen ini merujuk sumber berikut. Semua DOI dicek lewat Crossref/OpenAlex pada 16 Okt 2026.

| Kode | Sumber | Temuan yang dipakai | Dipakai untuk |
|---|---|---|---|
| R1 | Al-Fraihat dkk. (2024), *Heliyon* 10(21), doi:10.1016/j.heliyon.2024.e39926 `[dari user]` | Alokasi tugas yang tidak tepat terkait masalah koordinasi hingga kegagalan proyek agile terdistribusi | Masalah |
| R2 | Sheveleva dkk. (2023), *Economics Letters* 227, doi:10.1016/j.econlet.2023.111115 `[dari user]` | Alokasi tugas faktor penting produktivitas pekerja | Masalah |
| R3 | Segundo dkk. (2025), *ADCAIJ* 14, doi:10.14201/adcaij.32600 `[dari user]` | Alokasi tugas memengaruhi distribusi pengetahuan (truck factor) | Preset "Sebar pengetahuan" |
| R4 | Avelino dkk. (2016), ICPC, doi:10.1109/icpc.2016.7503718 | 65% dari 133 proyek GitHub populer punya truck factor ≤ 2 | Masalah konsentrasi pengetahuan |
| R5 | Hajari, Malmir, Mirsaeedi & Rigby (2024), *IEEE TSE*, doi:10.1109/tse.2024.3366753 | Rekomendasi yang memperhitungkan keahlian, beban, dan turnover bisa menyebar pengetahuan sekaligus meratakan beban | Faktor skor & preset |
| R6 | Dietvorst, Simmons & Massey (2018), *Management Science*, doi:10.1287/mnsc.2016.2643 | Orang jauh lebih mau memakai algoritma yang tidak sempurna bila bisa mengubah hasilnya, walau sedikit; kepuasan dan kepercayaan naik | Terima/ubah/tolak, bobot bisa diatur, koreksi Task DNA |
| R7 | Siegel, König & Lazar (2022), *Computers in Human Behavior Reports* 8, doi:10.1016/j.chbr.2022.100227 | Meta-analisis 70 sampel: pemantauan elektronik sedikit menurunkan kepuasan kerja (r = −0,10), menaikkan stres (r = 0,11), dan tidak terkait kinerja (r = −0,01) | Aturan "bukan alat pengawasan", data jam kerja bukan ukuran produktivitas |
| R8 | Halaman harga Float, Runn, Resource Guru (dibaca ulang lewat perbandingan PeopleMuster, Sep 2026) | Float US$7-12, Runn US$7-11 (min. 20 seat), Resource Guru US$5-12 per orang/bulan | Pricing |
| R9 | Bondi dkk. (2022), AAAI, doi:10.1609/aaai.v36i5.20465; Madras dkk. (2018), NeurIPS | Sistem yang menyerahkan kasus ragu ke manusia (defer) meningkatkan akurasi tim manusia-AI; cara menyampaikan status "ragu" memengaruhi akurasi manusia | Zona ambang Task DNA (otomatis / review / kosong) |
| R10 | Liu dkk. (2025), survei UQ & kalibrasi LLM, KDD, doi:10.1145/3711896.3736569 | Confidence yang ditulis LLM sendiri sering tidak terkalibrasi | Probabilitas dari mayoritas 5 sampel, bukan angka yang ditulis model |
| R11 | Schemmer dkk. (2023), ACM TiiS, doi:10.1145/3581641.3584066 | Penjelasan memengaruhi "appropriate reliance": mengikuti saran yang benar, menolak yang salah | Alasan per faktor, tingkat override sebagai metrik |
| R12 | Google OR-Tools, "Solving an Assignment Problem" (developers.google.com/optimization/assignment) | Penugasan banyak tugas ke banyak pekerja diselesaikan dengan MIP/CP-SAT dari matriks biaya | Alokasi batch |
| R13 | UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi | Data pribadi pekerja butuh dasar pemrosesan, tujuan jelas, dan hak subjek data | Privasi Work Twin |
| R14 | van de Weerd, Mangula & Brinkkemper (2016), *Information & Management*, doi:10.1016/j.im.2016.05.008; Tju, Putra & Handayani (2020), ICIMTech, doi:10.1109/icimtech50083.2020.9211248 | Adopsi SaaS UKM dipengaruhi faktor organisasi dan lingkungan | GTM lewat pilot + jaringan |
| R15 | Sahid dkk. (2026), *JTAS* 1(1), doi:10.64878/jtas.v1i1.87 `[dari user]` | Studi kasus PT Metanouva: banyak platform eksternal → fragmentasi data proyek dan sulit mengalokasikan sumber daya | Masalah (konteks Indonesia) |

## 3. Strategi — Startup Canvas
> **Status bagian bisnis (§3, §3b): DITUNDA, menunggu rancangan dari tim bisnis (00-BRIEF P8).** Isi di bawah adalah bahan awal hasil riset AI, bukan keputusan. Segmen, harga, model pendapatan, ROI, GTM, dan hipotesis H5 akan diganti oleh rancangan tim. Bagian lain PRD tidak bergantung pada angka di sini.

| # | Bagian | Isi |
|---|---|---|
| 1 | Vision | Setiap keputusan "siapa mengerjakan apa" di tim digital Indonesia diambil dengan gambaran lengkap dan bisa dijelaskan, tanpa membuat anggota merasa diawasi. |
| 2 | Segmen utama & JTBD | **Software house & agensi digital 5-30 orang di Jawa Timur** `[asumsi]`. JTBD: "Saat ada tugas baru dan tim sedang padat, saya ingin tahu siapa yang paling pas dan apa akibatnya, supaya tidak ada yang kelebihan beban dan tenggat aman." Kenapa segmen ini dulu: tugas paralel tinggi, belum mampu membayar tool enterprise, terjangkau lewat jaringan kampus dan komunitas lokal. |
| 3 | Pembeda | Satu alur keputusan: Task DNA yang bisa dikoreksi + Work Twin yang diisi anggota sendiri + simulasi konsekuensi + alasan per faktor. Lokal: bahasa Indonesia, harga rupiah, onboarding impor CSV. |
| 4 | Relative costs | Biaya rendah: mesin keputusan deterministik (murah, tanpa GPU); AI hanya untuk mengurai teks tugas (sekali per tugas). Nilai unik: konsekuensi terlihat sebelum aksi. |
| 5 | Trade-off | Tidak membuat time tracking, chat, papan kanban, penggajian, atau penilaian kinerja. PANTARA melengkapi Jira/Trello, bukan menggantinya. |
| 6 | Key metrics | **North Star: jumlah penugasan per minggu yang ditetapkan lewat PANTARA dan tidak dipindah ulang dalam 7 hari.** Pendukung: tingkat penerimaan, override, kelengkapan Work Twin, Tp. |
| 7 | Growth / GTM | Sales dipimpin pendiri (SLG): pilot gratis 1 bulan untuk 1 tim via jaringan Polije, alumni, komunitas developer Jember/Surabaya, dan inkubator kampus. Pembeli = pemilik/direktur; pengguna = PM + anggota. Bukti hasil pilot (Tb vs Tp) jadi bahan penjualan berikutnya `[riset: R14]`. |
| 8 | Capabilities | Bangun sendiri: Work Twin, mesin keputusan, simulasi, UI. Partner/API: LLM untuk Task DNA, OR-Tools (open source), hosting VPS. Nanti: integrasi Jira/Trello (impor tugas), HRIS. |
| 9 | Can't/Won't | Jujur: pemain besar *bisa* meniru fiturnya. Yang membuat mereka *tidak mau* mengejar segmen ini: harga USD dan minimum seat (Runn mulai 20 seat `[riset: R8]`), fokus pasar AS/enterprise, tanpa bahasa Indonesia dan dukungan lokal. Keunggulan kita adalah kedekatan dan kecepatan iterasi, bukan teknologi yang mustahil ditiru. |

**Model bisnis:**
- **Struktur biaya** (per bulan, MVP) `[asumsi]`:
  - VPS 2 vCPU/4 GB + domain: ±Rp250.000 (tetap).
  - LLM untuk Task DNA: ±1.500 token masuk + 300 keluar per panggilan × 5 sampel; dengan model kecil ± di bawah Rp100 per tugas. Tim 15 orang × 60 tugas/bulan ≈ Rp6.000 (berskala dengan tugas).
  - Tim: belum dibayar (mahasiswa) selama pilot.
- **Pendapatan & pricing** `[asumsi]`:
  - Rp35.000 per anggota terjadwal per bulan (manajer dan tamu gratis, mengikuti pola Float `[riset: R8]`).
  - Setara ±US$2,1 (kurs Rp16.500/US$ `[asumsi]`), sekitar 30-60% harga paket termurah Float/Runn/Resource Guru (US$5-7) `[riset: R8]`, karena segmen ini sensitif harga dan fiturnya lebih sempit.
  - Pilot gratis 1 bulan untuk 1 tim, lalu bayar tahunan dengan diskon 2 bulan.
  - Contoh: tim 14 orang = Rp490.000/bulan.
- **ROI pelanggan** `[asumsi, divalidasi di pilot]`:
  - Biaya PM ±Rp10 juta/bulan ÷ 173 jam ≈ Rp58.000/jam.
  - Bila PANTARA menghemat 2 jam/minggu waktu koordinasi PM (H3) = ±8,7 jam/bulan ≈ Rp500.000.
  - Itu sudah menutup langganan tim 14 orang, sebelum menghitung lembur dan keterlambatan yang dicegah.
  - Angka ini hipotesis; yang dijual setelah pilot adalah angka Tb vs Tp yang terukur.

**Hipotesis berisiko:**
| # | Hipotesis | Cara dibuktikan |
|---|---|---|
| H1 | Anggota mau mengisi dan menjaga Work Twin-nya (ketersediaan, kompetensi) | Pilot 1 tim: ≥ 80% anggota dengan data periode ini lengkap setelah minggu pertama, tanpa diingatkan lebih dari sekali |
| H2 | Rekomendasi cukup relevan untuk dipakai | ≥ 50% penugasan memakai kandidat Top 3; alasan override dikategorikan untuk kalibrasi bobot |
| H3 | Waktu keputusan penugasan turun dibanding cara lama | Observasi Tb (stopwatch, 10 keputusan) sebelum pilot vs Tp tercatat sistem; target ≥ 30% lebih cepat |
| H4 | Anggota tidak merasa diawasi `[riset: R7]` | Survei singkat akhir pilot (5 butir Likert); kurang dari 20% setuju "PANTARA dipakai untuk mengawasi saya" |
| H5 | Segmen mau membayar Rp35.000/anggota/bulan | Wawancara 5 pemilik + konversi pilot ke berbayar |

### 3b. Kartu Contekan Bisnis
> Ditunda bersama §3. Angka harga & ROI di bawah masih bahan awal.

> Dibaca ulang sebelum ngobrol dengan calon pengguna, juri, atau investor.

**Ide dalam 3 kalimat:**
PM di software house kecil membagi tugas tiap minggu, tapi info siapa yang bisa, siapa yang masih longgar, dan siapa yang tenggatnya bentrok tersebar di banyak tempat. Akibatnya tugas menumpuk ke orang yang "biasanya bisa" dan masalahnya baru ketahuan saat proyek molor. PANTARA mengurai tugas jadi kebutuhan yang jelas, mencocokkannya dengan kondisi tiap anggota, lalu menunjukkan 3 kandidat beserta akibat dan alasannya, dan PM yang memutuskan.

**Cara menghasilkan uang:** langganan bulanan per anggota tim yang dijadwalkan (Rp35.000), manajer gratis, mulai dari pilot gratis 1 bulan.

**Angka kunci:**
| Angka | Nilai | Sumber | Cara menghitung (kalau ditanya) |
|---|---|---|---|
| Harga | Rp35.000/anggota/bulan | asumsi | ±30-60% dari harga termurah Float/Runn/Resource Guru (US$5-7) karena fitur lebih sempit dan segmen sensitif harga |
| Harga pesaing | US$5-12/orang/bulan | riset R8 | Halaman harga resmi, dibaca Sep 2026 |
| ROI pelanggan | ±Rp500.000/bulan dihemat (tim 14 orang bayar Rp490.000) | asumsi | 2 jam/minggu × 4,33 minggu × Rp58.000/jam biaya PM |
| Biaya AI per tugas | di bawah Rp100 | asumsi | (1.500 token masuk + 300 keluar) × 5 sampel × harga model kecil |
| Truck factor | 65% proyek populer punya TF ≤ 2 | riset R4 | Avelino dkk. 2016, 133 proyek GitHub |
| Efek pemantauan | kepuasan r = −0,10, stres r = +0,11, kinerja r ≈ 0 | riset R7 | Meta-analisis 70 sampel, Siegel dkk. 2022 |

**Kalau ditanya hal yang tidak kamu tahu:** "Itu asumsi kami berdasarkan {{harga pesaing / literatur}}; langkah berikutnya adalah memvalidasinya lewat pilot satu tim dan wawancara PM." Jujur lebih baik daripada mengarang.

**Kamus istilah:**
| Istilah | Artinya |
|---|---|
| MVP | Versi paling sederhana yang sudah bisa dipakai dan menguji ide |
| Mockup | Tampilan aplikasi yang bisa diklik dengan data contoh, belum terhubung server sungguhan |
| Segmen / persona | Kelompok pengguna yang paling butuh produk ini, digambarkan sebagai satu orang contoh |
| JTBD (job to be done) | Pekerjaan yang ingin diselesaikan pengguna dengan "menyewa" produk ini |
| Value proposition | Kondisi sebelum → apa yang berubah → hasil sesudah |
| North Star metric | Satu angka utama yang paling menunjukkan produk memberi nilai |
| ROI | Uang yang dihemat pelanggan dibanding biaya yang dia bayar |
| B2B SaaS | Software berlangganan lewat internet yang dibeli oleh perusahaan |
| Pilot | Uji coba gratis di satu tim nyata untuk membuktikan manfaat |
| SLG | Dijual lewat percakapan langsung (pendiri/tim sales), bukan daftar sendiri |
| Churn | Pelanggan berhenti berlangganan |
| Seat | Satu orang yang dihitung untuk tagihan |
| Task DNA | Kebutuhan tugas yang sudah diurai: kompetensi, level, upaya, kompleksitas, tenggat, prioritas, dependensi |
| Work Twin | Profil kerja aktual anggota: kompetensi, kapasitas, ketersediaan, beban aktif, riwayat, preferensi, batas kerja |
| Hard constraint | Syarat wajib; kandidat yang tidak memenuhi langsung dibuang (mis. sedang cuti) |
| Skor kesesuaian | Nilai 0-1 hasil rumus berbobot dari 5 faktor; makin tinggi makin cocok |
| What-if | Simulasi "kalau tugas ini diberikan ke X, apa yang berubah" sebelum benar-benar ditetapkan |
| Override | Manajer memilih orang di luar rekomendasi; alasannya dicatat |
| Kapasitas | Jam kerja yang tersedia untuk tugas proyek dalam satu periode (bukan ukuran produktivitas) |
| Utilisasi | Jam teralokasi ÷ kapasitas, dalam persen |
| Truck factor | Jumlah orang minimal yang kalau pergi membuat proyek macet; makin kecil makin berisiko |
| Confidence | Seberapa yakin AI pada hasilnya |
| Ambang (threshold) | Batas yakin minimal sebelum hasil AI dipakai tanpa ditandai; di bawahnya wajib dicek manusia |
| Eval set | Kumpulan contoh dengan jawaban benar untuk mengukur akurasi AI |

## 4. Alur Inti
> Hanya fitur di jalur ini yang Must.

1. **Manajer membuat tugas:** judul, deskripsi, tenggat, prioritas, proyek (P12).
2. **Meninjau Task DNA:** sistem mengurai kebutuhan; isian yang ragu ditandai, manajer mengoreksi lalu mengonfirmasi (P13).
3. **Melihat Top 3 kandidat:** kandidat yang lolos syarat wajib diperingkat, dengan skor dan alasan per faktor (P14).
4. **Membandingkan konsekuensi (what-if):** perubahan kapasitas tiap kandidat, konflik tenggat/beban/dependensi, dampak ke tim (P15).
5. **Menetapkan penugasan:** terima rekomendasi, pilih kandidat lain (alasan wajib), tolak rekomendasi (alasan wajib, tercatat di P22/P23), atau simpan sebagai draf (P15 dialog).
6. **Kapasitas tim diperbarui** dan terlihat di Dasbor, Tim, dan Kapasitas sebagai konteks keputusan berikutnya (P10, P18, P21).

Prasyarat agar alur jalan: Work Twin anggota terisi (P18, P19) dan manajer bisa masuk (P5).

## 5. Peta Halaman
> Lengkap untuk produk; mockup M0 hanya mengerjakan halaman Must secara penuh, sisanya placeholder rapi yang tetap ada di navigasi.

**Peran:** tamu · manajer (PM/ketua tim) · anggota (karyawan) · admin organisasi (pemilik; di MVP sama dengan manajer pertama).
**Total:** 39 halaman. Must 12 · Should 22 · Could 5.

### 5a. Daftar halaman

**Publik (area landing, mode Persuade)**
| # | Halaman | Rute | Peran | Tugas | Info utama (besar) | Info pendukung (kecil) | Aksi utama | Aksi sekunder | State khusus | Prioritas |
|---|---|---|---|---|---|---|---|---|---|---|
| P1 | Landing | `/` | tamu | Meyakinkan PM/pemilik untuk mencoba pilot | Nilai utama + bukti alur (lihat 5d) | Prinsip "kamu yang memutuskan" | Coba demo | Lihat harga | reduced-motion, tanpa JS tetap terbaca | Must |
| P2 | Harga | `/harga` | tamu | Menjelaskan biaya & pilot (isi menunggu rancangan bisnis) | Paket & harga dari tim bisnis | FAQ tagihan | Ajukan pilot | Hubungi tim | — | Should |
| P3 | Kebijakan privasi | `/privasi` | tamu | Menjelaskan data apa yang diproses dan haknya (UU PDP) | Data yang dikumpulkan, tujuan, hak | Kontak | — | — | — | Should |
| P4 | Syarat layanan | `/syarat` | tamu | Ketentuan pakai | Isi syarat | Tanggal berlaku | — | — | — | Could |

**Akun**
| # | Halaman | Rute | Peran | Tugas | Info utama | Info pendukung | Aksi utama | Aksi sekunder | State khusus | Prioritas |
|---|---|---|---|---|---|---|---|---|---|---|
| P5 | Masuk | `/masuk` | tamu | Masuk ke ruang kerja (mockup: pilih peran demo) | Form email + sandi | Tautan lupa sandi | Masuk | Masuk sebagai demo manajer/anggota | error kredensial, terkunci | Must |
| P6 | Daftar organisasi | `/daftar` | tamu | Membuat ruang kerja baru | Nama organisasi, akun admin | Syarat & privasi | Buat ruang kerja | Masuk | email terpakai | Should |
| P7 | Lupa / reset sandi | `/lupa-sandi`, `/reset-sandi` | tamu | Memulihkan akses | Email / sandi baru | Batas waktu tautan | Kirim tautan / Simpan sandi | — | tautan kedaluwarsa | Should |
| P8 | Terima undangan | `/undangan/[token]` | tamu | Anggota bergabung ke ruang kerja | Nama organisasi, peran | Pengundang | Gabung | — | undangan kedaluwarsa | Should |
| P9 | Onboarding ruang kerja | `/mulai` | admin | Menyiapkan data awal (Work Twin) | Langkah: periode & jam kerja → impor CSV anggota & kompetensi → undang anggota | Contoh file CSV | Lanjut | Lewati langkah | CSV error per baris | Should |

**Inti manajer (area aplikasi, mode Operate)**
| # | Halaman | Rute | Peran | Tugas | Info utama (besar) | Info pendukung (kecil) | Aksi utama | Aksi sekunder (menu ⋯) | State khusus | Prioritas |
|---|---|---|---|---|---|---|---|---|---|---|
| P10 | Dasbor | `/dasbor` | manajer | Melihat apa yang perlu diputuskan sekarang | Tugas belum ditugaskan, kapasitas tim periode ini, catatan yang perlu ditinjau (data belum lengkap, tenggat berdekatan), penugasan yang menunggu jawaban atau ditolak anggota | Periode, waktu sinkron | Buat tugas | Ganti periode | kosong (ruang kerja baru → ke P9), data tidak lengkap | Must |
| P11 | Daftar tugas | `/tugas` | manajer | Mengelola semua tugas dan statusnya | Judul, kebutuhan, prioritas, status, penanggung jawab, sisa estimasi, tenggat | ID tugas, proyek | Buat tugas | Cari kandidat, Buka, Arsipkan | kosong, filter tanpa hasil, loading | Must |
| P12 | Buat tugas | `/tugas/baru` | manajer | Memasukkan tugas baru | Judul, deskripsi, tenggat, prioritas | Proyek, lampiran tautan | Analisis kebutuhan | Simpan draf | validasi, tenggat lewat | Must |
| P13 | Tinjau Task DNA | `/tugas/[id]/dna` | manajer | Memeriksa dan mengoreksi hasil uraian | Kompetensi + level, estimasi upaya (jam), kompleksitas, dependensi; tiap isian dengan tanda yakin/ragu | Versi model & prompt, kutipan kalimat sumber | Konfirmasi & cari kandidat | Analisis ulang | analisis gagal (isi manual), isian ragu, kompetensi di luar katalog | Must |
| P14 | Rekomendasi kandidat | `/tugas/[id]/kandidat` | manajer | Membandingkan Top 3 kandidat | Kartu sorotan kandidat #1; tiga kartu dengan skor, kontribusi 5 faktor, sisa kapasitas | Kandidat yang tersaring + alasannya (dilipat), preset bobot | Simulasikan | Ganti preset bobot, Pilih orang lain, Tolak rekomendasi (alasan wajib) | tidak ada kandidat lolos (tampilkan syarat yang gagal + saran: pecah tugas, geser tenggat) | Must |
| P15 | Simulasi what-if | `/tugas/[id]/simulasi` | manajer | Melihat konsekuensi sebelum menetapkan | Sebelum → sesudah per skenario: utilisasi kandidat, konflik tenggat/dependensi, sebaran beban tim | Asumsi simulasi (jam/hari, periode) | Tetapkan penugasan (dialog) | Simpan draf, Bagi ke 2 orang | konflik kritis (butuh konfirmasi), skenario > 3 | Must |
| P16 | Detail tugas | `/tugas/[id]` | manajer, anggota yang ditugaskan | Melihat status, penanggung jawab, riwayat keputusan | Status, penanggung jawab, sisa estimasi, tenggat | Task DNA final, log keputusan (siapa, kapan, alasan) | Ubah status | Tugaskan ulang, Arsipkan | ditolak anggota (tampilkan alasan + tombol cari kandidat lagi) | Must |
| P17 | Alokasi batch | `/tugas/alokasi-batch` | manajer | Membagi banyak tugas belum ditugaskan sekaligus (OR-Tools) | Usulan pasangan tugas → anggota, total skor, utilisasi akhir per anggota | Tugas yang tidak bisa dialokasikan + sebab | Tinjau & tetapkan terpilih | Ubah pasangan | tidak feasible | Should |
| P18 | Tim | `/tim` | manajer | Melihat Work Twin semua anggota | Nama, keahlian, peran, alokasi kapasitas, tugas aktif, status kelengkapan data | Waktu sinkron | Tambah anggota (modal) | Impor CSV, Ingatkan lengkapi data | data belum lengkap, kosong | Must |
| P19 | Profil kerja (Work Twin) anggota | `/tim/[id]` | manajer | Memahami kondisi satu anggota | Kapasitas & ketersediaan periode, kompetensi + level + sumber (klaim/verifikasi/riwayat), tugas aktif | Preferensi, batas kerja, riwayat tugas relevan | Verifikasi kompetensi | Ubah data, Nonaktifkan | data belum lengkap | Must |
| P20 | Proyek | `/proyek`, `/proyek/[id]` | manajer | Mengelompokkan tugas per proyek/klien | Nama proyek, tenggat, tugas terbuka, anggota terlibat | Klien | Buat proyek (modal) | Arsipkan | kosong | Should |
| P21 | Kapasitas | `/kapasitas` | manajer | Melihat alokasi waktu tim per periode | Tersedia vs teralokasi per anggota, utilisasi %, total tim | Status data ketersediaan | Perbarui ketersediaan | Ganti periode (mingguan/2 mingguan) | ketersediaan belum diisi, mendekati penuh (≥ 85%) | Must |
| P22 | Riwayat keputusan | `/keputusan` | manajer | Meninjau keputusan & override untuk belajar | Tugas, kandidat dipilih, peringkatnya, alasan override, waktu keputusan | Preset yang dipakai | Ekspor CSV | Filter | kosong | Should |
| P23 | Laporan dampak | `/laporan` | manajer, admin | Mengukur dampak pilot | Tp rata-rata vs Tb, konflik terdeteksi, tingkat penerimaan, override, kelengkapan Work Twin | Periode, jumlah keputusan | Ekspor | Isi baseline Tb | data < 10 keputusan ("belum cukup data") | Should |

**Sisi anggota**
| # | Halaman | Rute | Peran | Tugas | Info utama | Info pendukung | Aksi utama | Aksi sekunder | State khusus | Prioritas |
|---|---|---|---|---|---|---|---|---|---|---|
| P24 | Beranda saya | `/saya` | anggota | Melihat tugas dan kapasitas sendiri | Penugasan baru (menunggu jawaban), tugas berjalan, kapasitas saya | Pengingat isi ketersediaan | Buka penugasan | — | kosong, ketersediaan belum diisi | Should |
| P25 | Ketersediaan saya | `/saya/ketersediaan` | anggota | Mengisi jam tersedia & cuti per periode | Jam per hari/periode, tanggal cuti | Batas kerja mingguan | Simpan | Salin dari periode lalu | validasi jam | Should |
| P26 | Penugasan masuk | `/saya/tugas/[id]` | anggota | Menerima atau menolak penugasan | Tugas, tenggat, estimasi, alasan dipilih | Task DNA | Terima | Tolak dengan alasan, Minta penyesuaian | sudah dijawab | Should |
| P27 | Profil kerja saya | `/saya/profil` | anggota | Menjaga Work Twin sendiri | Kompetensi (klaim) + level, preferensi jenis tugas, batas kerja | Data apa yang dilihat manajer | Simpan | — | — | Should |

**Pengaturan & akun**
| # | Halaman | Rute | Peran | Tugas | Info utama | Info pendukung | Aksi utama | Aksi sekunder | State khusus | Prioritas |
|---|---|---|---|---|---|---|---|---|---|---|
| P28 | Pengaturan ruang kerja | `/pengaturan` | admin | Periode default, jam kerja, hari libur | Nilai saat ini | — | Simpan | — | — | Should |
| P29 | Aturan rekomendasi | `/pengaturan/rekomendasi` | admin, manajer | Memilih preset bobot dan syarat wajib | Preset (Seimbang, Kejar tenggat, Ratakan beban, Sebar pengetahuan), bobot w1-w5, ambang utilisasi | Penjelasan tiap faktor | Simpan | Kembalikan default | — | Should |
| P30 | Katalog kompetensi | `/tim/kompetensi` | admin, manajer | Mengelola daftar kompetensi tim (data tim, bukan pengaturan sistem) | Nama, kategori, jumlah anggota | Alias | Tambah kompetensi (modal) | Gabung duplikat, Hapus | dipakai tugas aktif (tidak bisa dihapus) | Should |
| P31 | Anggota & peran | `/pengaturan/anggota` | admin | Undang, ubah peran, nonaktifkan | Email, peran, status undangan | Terakhir aktif | Undang anggota (modal) | Kirim ulang undangan | — | Should |
| P32 | Tagihan | `/pengaturan/tagihan` | admin | Paket, jumlah seat, invoice | Seat terpakai, biaya bulan ini | Riwayat invoice | Ubah paket | Unduh invoice | pilot (sisa hari) | Could |
| P33 | Akun saya | `/akun` | semua | Profil, sandi, preferensi notifikasi | Nama, email | — | Simpan | Keluar dari semua perangkat | — | Should |
| P34 | Notifikasi | `/notifikasi` | semua | Melihat penugasan baru, penolakan, pengingat | Daftar notifikasi | Waktu | Buka terkait | Tandai dibaca | kosong | Should |
| P35 | Bantuan | `/bantuan` | semua | Panduan singkat & cara kerja skor | Langkah alur inti, penjelasan faktor | Kontak | — | — | — | Could |

**Sistem**
| # | Halaman | Rute | Peran | Tugas | Prioritas |
|---|---|---|---|---|---|
| P36 | Tidak ditemukan | `/404` | semua | Kembali ke dasbor | Should |
| P37 | Galat server | `/500` (App Router: `app/error.tsx`) | semua | Coba lagi / kembali | Could |
| P38 | Akses ditolak | `/403` | semua | Menjelaskan peran yang dibutuhkan | Should |
| P39 | Pemeliharaan | `/pemeliharaan` | semua | Info waktu kembali | Could |

### 5b. Struktur navigasi
- **Menu utama manajer (sidebar):**
  - Grup "Ruang kerja": Dasbor, Tugas, Tim, Kapasitas.
  - Grup "Perencanaan": Proyek, Alokasi batch.
  - Grup "Analisis": Riwayat keputusan, Laporan dampak.
  - Grup "Sistem": Pengaturan.
  - Bawah sidebar: Panduan demo (dialog) + kartu akun (dialog profil: Akun saya, Notifikasi, Keluar). Halaman yang belum dibangun di mockup ditandai titik.
- **Menu utama anggota (sidebar):** Beranda saya, Ketersediaan, Profil kerja saya.
- **Menu akun (kartu akun di bawah sidebar → popover):** Akun saya, Notifikasi, Pengaturan (admin), Bantuan, Keluar.
- **Tim (sub-navigasi tab di dalam P18):** Anggota, Kompetensi (P30).
- **Pengaturan (sub-navigasi tab di dalam P28), hanya urusan sistem & admin:** Umum, Aturan rekomendasi, Anggota & peran, Tagihan.
- **Hanya lewat tautan/aksi:**
  - P12 → P13 → P14 → P15 (alur inti, dengan stepper "Tugas · Kebutuhan · Kandidat · Simulasi").
  - P16 dari P11, P19 dari P18, P26 dari notifikasi/P24.
- **Publik:** navbar landing (Cara kerja, Harga, Masuk) + footer (Privasi, Syarat).

### 5c. Matriks entitas
| Entitas | Daftar | Detail | Buat | Ubah | Hapus | Catatan |
|---|---|---|---|---|---|---|
| Tugas | P11 | P16 | P12 | P13 (kebutuhan), P16 (status) | Arsipkan di P16 (soft delete; riwayat keputusan disimpan) | Status: draf · belum ditugaskan · menunggu jawaban · berjalan · selesai · diarsipkan |
| Task DNA | — (bagian Tugas) | P13, P16 | otomatis dari P12 | P13 | ikut tugas | Versi disimpan per analisis |
| Anggota (Work Twin) | P18 | P19 | modal di P18, impor CSV di P9/P18 | P19, P27 (oleh anggota) | Nonaktifkan di P31 (data dihapus sesuai permintaan subjek data, R13) | |
| Kompetensi anggota | P19 | P19 | P19, P27 | P19 (verifikasi), P27 (klaim) | P19 | Sumber: klaim / verifikasi manajer / riwayat |
| Ketersediaan | P21 | P19 | P25, P21 | P25 | P25 | Per periode |
| Penugasan | P16, P22 | P16 | P15 dialog, P17 | Tugaskan ulang di P16 | Batalkan di P16 | |
| Keputusan (log) | P22 | P16 | otomatis saat tetapkan | tidak bisa diubah (audit) | tidak | Berisi Tp, peringkat kandidat, alasan override |
| Proyek | P20 | P20 | modal di P20 | P20 | Arsipkan | |
| Kompetensi (katalog) | P30 | — | modal P30 | P30 | P30 bila tidak dipakai | |
| Pengguna & peran | P31 | — | undangan P31 | P31 | Nonaktifkan | |
| Notifikasi | P34 | — | otomatis | tandai dibaca | otomatis 90 hari | |

### 5d. Section landing (P1)
> Draf sampai inspirasi dari user masuk (00-BRIEF P2). Satu section satu tugas.

| # | Section | Tugas | Isi | CTA |
|---|---|---|---|---|
| L1 | Hero | Nilai utama terlihat tanpa scroll | "Tahu siapa yang paling pas, sebelum tugas diberikan." + cuplikan nyata kartu Top 3 + simulasi (bukan mockup miring) | Coba demo |
| L2 | Masalah | Rasa sakit PM dengan kalimatnya sendiri | Info tersebar di 4 tempat; tugas jatuh ke "yang biasanya bisa"; konflik ketahuan saat telat | — |
| L3 | Cara kerja | 4 langkah alur inti | Task DNA → Work Twin → Top 3 → What-if, masing-masing dengan potongan layar | — |
| L4 | Kamu yang memutuskan | Menjawab keberatan "AI mengambil alih" dan "alat pengawasan" | Terima/ubah/tolak; alasan per faktor; jam kerja bukan ukuran produktivitas (R6, R7) | — |
| L5 | Untuk siapa | Menunjukkan segmen | Software house, agensi, tim TI 5-30 orang | — |
| L6 | Harga | Biaya jelas | Menunggu rancangan bisnis; di mockup tampil sebagai section "Ajukan pilot" tanpa angka harga | Ajukan pilot |
| L7 | FAQ | Keberatan umum | Data aman? Harus ganti Jira? Bagaimana skor dihitung? Butuh berapa lama setup? | — |
| L8 | CTA penutup | Ulangi aksi utama | Ajak pilot satu tim | Coba demo |

## 6. Titik Keputusan AI
> Pola: `docs/AI-PRIMITIVES.md`. AI hanya mengurai teks tugas. **Penerima tugas diputuskan oleh kode deterministik dan manajer**, bukan oleh AI.

| Keputusan fuzzy | Rubrik / pertanyaan ke AI (tipe) | Kode yang memutuskan |
|---|---|---|
| Kompetensi apa yang dibutuhkan tugas ini? | ya/tidak + p per kompetensi di katalog organisasi ("Apakah tugas ini butuh {kompetensi}?"), p = proporsi dari 5 sampel `[riset: R10]` | p ≥ 0,8 → dipakai; 0,6-0,8 → dipakai, ditandai "ragu" (wajib dilihat); < 0,6 → tidak dipakai. Kompetensi di luar katalog → saran "tambah ke katalog" |
| Level minimum per kompetensi | score 1-3 (1 Dasar / 2 Mandiri / 3 Mahir; 0 = belum punya) dengan kriteria konkret | Level = median 5 sampel; jadi syarat wajib "level anggota ≥ level tugas − 1" (bisa diubah di P29) |
| Seberapa besar upayanya? | choice ukuran: S (≤ 4 jam) · M (4-8) · L (8-16) · XL (> 16) | Kode memetakan ke jam (S=3, M=6, L=12, XL=20); bila ada ≥ 5 tugas serupa selesai, pakai median jam aktualnya. XL → saran "pecah tugas" |
| Seberapa kompleks? | score 0-3 dengan kriteria | Kompleksitas ≥ 2 → bobot kompetensi naik di preset Seimbang |
| Apakah tugas ini bergantung pada tugas lain yang masih terbuka? | ya/tidak + p per kandidat tugas (maks 10 tugas terbuka di proyek yang sama) | p ≥ 0,8 → dependensi; 0,5-0,8 → disarankan, manajer konfirmasi |
| Tenggat & prioritas | — (deterministik dari form) | — |

**Bagian yang memakai LLM generatif (teks bebas):** tidak ada di MVP. Alasan rekomendasi disusun oleh kode dari kontribusi faktor (template kalimat), sehingga selalu sesuai angka sebenarnya `[riset: R11]`.

**Mesin keputusan (deterministik, bukan AI):**
1. **Syarat wajib (hard constraint):** tersedia di periode tugas (tidak cuti pada rentang kerja), sisa kapasitas sebelum tenggat ≥ 50% estimasi (bisa dibagi), memenuhi level minimum kompetensi wajib, tidak melewati batas kerja mingguan yang ditentukan anggota.
2. **Skor:** `S = w1·K + w2·C + w3·A + w4·R − w5·F`, semua faktor dinormalisasi 0-1:
   - K kesesuaian kompetensi (rata-rata min(level anggota / level dibutuhkan, 1) berbobot kompleksitas),
   - C kapasitas setelah penugasan (1 − utilisasi sesudah),
   - A ketersediaan sampai tenggat (jam tersedia / estimasi, dibatasi 1),
   - R relevansi riwayat & preferensi: 0,7 × riwayat (tugas sejenis yang pernah selesai, maks 3 = 1) + 0,3 × preferensi (jenis tugas disukai = 1, netral = 0,5, dihindari = 0). Preferensi disebut di fitur Adaptive Assignment proposal §2.2,
   - F risiko konflik (tenggat berdekatan ≤ 1 hari, utilisasi sesudah ≥ 90%, dependensi belum selesai).
3. **Preset bobot** (dikalibrasi dari data override, R6):

| Preset | w1 K | w2 C | w3 A | w4 R | w5 F | Kapan |
|---|---|---|---|---|---|---|
| Seimbang (default) | 0,35 | 0,25 | 0,15 | 0,15 | 0,10 | Umum |
| Kejar tenggat | 0,30 | 0,15 | 0,30 | 0,15 | 0,10 | Tenggat ≤ 2 hari |
| Ratakan beban | 0,25 | 0,40 | 0,15 | 0,05 | 0,15 | Ada anggota ≥ 85% utilisasi |
| Sebar pengetahuan | 0,30 | 0,25 | 0,15 | 0,00 | 0,10 + bonus 0,20 untuk anggota yang belum pernah mengerjakan kompetensi ini tapi memenuhi level minimum | Truck factor rendah `[riset: R3, R4, R5]` |

4. **Alokasi batch (Should):** banyak tugas sekaligus diselesaikan dengan OR-Tools CP-SAT: maksimalkan Σ skor, kendala kapasitas per anggota dan satu penanggung jawab per tugas `[riset: R12]`.

## 7. Fitur
| # | Fitur | Prioritas | Alur / halaman | Kriteria terima |
|---|---|---|---|---|
| F1 | Buat tugas | Must | 1 · P12 | Judul, deskripsi (≥ 20 karakter), tenggat (≥ hari ini), prioritas wajib; draf tersimpan |
| F2 | Task DNA + koreksi | Must | 2 · P13 | Kompetensi+level, upaya, kompleksitas, dependensi tampil dengan tanda yakin/ragu; setiap isian bisa diubah; isian ragu wajib dilihat sebelum konfirmasi; versi model & prompt tercatat. Mockup: hasil dari seed |
| F3 | Work Twin minimum | Must | prasyarat · P18, P19 | Kompetensi+level+sumber, kapasitas, ketersediaan periode, tugas aktif, preferensi, batas kerja; status "lengkap/belum lengkap" |
| F4 | Top 3 kandidat + alasan | Must | 3 · P14 | Kandidat gagal syarat wajib dibuang dengan alasan; 3 teratas tampil dengan skor dan kontribusi 5 faktor; alasan berupa kalimat dari angka; preset bisa diganti dan peringkat berubah langsung |
| F5 | Simulasi what-if | Must | 4 · P15 | Untuk 1-3 kandidat: utilisasi sebelum → sesudah, konflik (tenggat ≤ 1 hari, utilisasi ≥ 90%, dependensi), sebaran beban tim; skenario bagi ke 2 orang |
| F6 | Tetapkan / ubah / tolak + log | Must | 5 · P15, P16 | Pilih di luar Top 3 → alasan wajib (pilihan + teks); simpan draf; log keputusan berisi Tp, peringkat, preset, alasan |
| F7 | Pembaruan kapasitas | Must | 6 · P10, P18, P21 | Setelah tetapkan, utilisasi anggota dan daftar tugas langsung berubah di semua halaman |
| F8 | Dasbor keputusan | Must | P10 | Tugas belum ditugaskan, kapasitas tim, catatan tinjau |
| F9 | Masuk | Must | P5 | Mockup: pilih peran demo. MVP: email + sandi, sesi aman |
| F10 | Landing page | Must | P1 | Section L1-L8; lulus larangan AI slop; reduced-motion |
| F11 | Sisi anggota minimal | Should | P24-P27 | Isi ketersediaan, terima/tolak dengan alasan, ubah status, ubah klaim kompetensi |
| F12 | Onboarding + impor CSV | Should | P9 | Template CSV; error per baris; ≤ 10 menit untuk tim 15 orang |
| F13 | Aturan rekomendasi | Should | P29 | Preset + bobot manual (jumlah = 1), ambang utilisasi |
| F14 | Riwayat keputusan & laporan dampak | Should | P22, P23 | Tp otomatis; isi Tb manual; 4 indikator proposal §4.1 |
| F15 | Alokasi batch OR-Tools | Should | P17 | ≤ 30 tugas × 30 anggota selesai < 5 detik; tugas tak teralokasi dijelaskan |
| F16 | Notifikasi dalam aplikasi | Should | P34 | Penugasan baru, penolakan, pengingat ketersediaan |
| F17 | Pengingat "data belum lengkap" | Could (A12) | P18 | Satu klik mengirim pengingat ke anggota |
| F18 | Salin ketersediaan dari periode lalu | Could (A12) | P25 | Satu klik |
| F19 | Ekspor CSV riwayat keputusan | Could (A12) | P22 | Kolom sesuai tabel |
| F20 | Pintasan keyboard alur inti | Could (A12) | P13-P15 | `1/2/3` pilih kandidat, `Enter` simulasikan |
| F21 | Tagihan | Could | P32 | Setelah pilot berbayar |

## 8. Di Luar Scope
- Time tracking, timesheet, penggajian, penilaian kinerja individu (bertentangan dengan R7 dan prinsip produk).
- Papan kanban/chat/komentar tugas (tetap di Jira/Trello/WhatsApp).
- Integrasi Jira/Trello/HRIS, Collaboration Graph, pemodelan kompetensi dinamis (peta jalan setelah MVP tervalidasi, proposal §4.2). "Riwayat kolaborasi" di flowchart manajer proposal termasuk Collaboration Graph ini.
- Aplikasi mobile native (web responsif cukup).
- LLM yang menulis alasan rekomendasi atau memilih penerima tugas.
- Multi-bahasa (bahasa Indonesia saja di MVP).

## 9. Riwayat Perubahan
| Tanggal | Perubahan |
|---|---|
| 2026-10-16 | Dokumen awal dari proposal Duluin 2026 + sesi konsultasi setup-project-00 |
| 2026-10-16 | Cek ulang vs proposal: preferensi masuk faktor R; riwayat kolaborasi = peta jalan |
| 2026-10-16 | Navigasi §5b disesuaikan dengan shell template (4 grup sidebar, dialog akun & panduan) |
| 2026-10-16 | Bagian bisnis (§3, §3b, harga di P2/L6) ditunda sampai tim bisnis menyerahkan rancangan |
| 2026-10-16 | Alur inti langkah 5 + P14: tolak rekomendasi dengan alasan wajib (proposal §3.2); P37 memakai `app/error.tsx` |
| 2026-10-16 | P30 Katalog kompetensi dipindah dari Pengaturan ke tab di halaman Tim (`/tim/kompetensi`), atas permintaan user |
| 2026-10-16 | P10 Dasbor: kartu "Menunggu jawaban anggota" (termasuk jumlah yang ditolak anggota) |
