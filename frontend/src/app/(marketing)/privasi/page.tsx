import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav, SoloFrame } from "@/components/solo/solo-frame";

export const metadata: Metadata = { title: "Kebijakan privasi" };

// Draf kebijakan mengikuti UU No. 27 Tahun 2022 (01-PRD R13); perlu ditinjau ahli hukum sebelum rilis.
export default function PrivasiPage() {
  return <SoloFrame nav={<PublicNav />}>
    <section className="public-main">
      <h1>Kebijakan privasi</h1>
      <p className="lead">Data apa yang Pantara proses, untuk apa, dan hakmu sebagai pemilik data. Draf untuk mockup, berlaku efektif setelah ditinjau.</p>
      <div className="prose">
        <h2>Data yang diproses</h2>
        <ul>
          <li>Data akun: nama, email, peran di ruang kerja.</li>
          <li>Work Twin: kompetensi dan levelnya, jam tersedia per periode, tanggal cuti, batas kerja, preferensi jenis tugas, dan riwayat tugas di ruang kerja.</li>
          <li>Data tugas: judul, deskripsi, tenggat, prioritas, dan log keputusan penugasan.</li>
        </ul>
        <h2>Tujuan</h2>
        <p>Hanya untuk membantu manajer membagi tugas dengan adil dan menghindari beban berlebih. Data jam kerja <strong>tidak</strong> dipakai untuk menilai kinerja atau produktivitas, dan Pantara tidak melacak aktivitas komputer anggota.</p>
        <h2>Pemrosesan oleh AI</h2>
        <p>Untuk mengurai kebutuhan tugas, teks judul dan deskripsi tugas dikirim ke penyedia model bahasa. Data pribadi anggota tidak ikut dikirim. AI tidak memilih siapa yang ditugaskan.</p>
        <h2>Hakmu</h2>
        <ul>
          <li>Melihat data dirimu yang dilihat manajer (menu Profil kerja saya).</li>
          <li>Memperbaiki data yang keliru dan menarik persetujuan.</li>
          <li>Meminta penghapusan data saat keluar dari ruang kerja.</li>
        </ul>
        <h2>Penyimpanan & keamanan</h2>
        <p>Data dipisah per organisasi, dikirim lewat HTTPS, dan dicadangkan harian di server di Indonesia. Log keputusan disimpan untuk audit selama ruang kerja aktif.</p>
        <h2>Kontak</h2>
        <p>Tim Positif dan Profesional, Politeknik Negeri Jember. Pertanyaan privasi: privasi@pantara.id.</p>
      </div>
      <p className="spaced"><Link className="button secondary" href="/">Kembali ke beranda</Link></p>
    </section>
  </SoloFrame>;
}
