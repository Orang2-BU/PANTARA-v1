import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav, SoloFrame } from "@/components/solo/solo-frame";

export const metadata: Metadata = { title: "Syarat layanan" };

// Draf syarat untuk mockup; perlu ditinjau ahli hukum sebelum rilis (sama seperti kebijakan privasi).
export default function SyaratPage() {
  return <SoloFrame nav={<PublicNav />}>
    <section className="public-main">
      <h1>Syarat layanan</h1>
      <p className="lead">Ketentuan memakai Pantara. Draf untuk mockup, berlaku efektif setelah ditinjau.</p>
      <div className="prose">
        <h2>Layanan</h2>
        <p>Pantara membantu manajer menentukan penugasan dengan menguraikan kebutuhan tugas, membandingkan kondisi kerja karyawan, dan mensimulasikan akibat penugasan. Pantara adalah alat pendukung keputusan: keputusan penugasan dan akibatnya tetap menjadi tanggung jawab organisasi pengguna.</p>
        <h2>Akun dan ruang kerja</h2>
        <ul>
          <li>Admin ruang kerja bertanggung jawab atas siapa yang diundang dan peran aksesnya.</li>
          <li>Setiap pengguna menjaga kerahasiaan sandinya sendiri.</li>
          <li>Data karyawan hanya dimasukkan dengan sepengetahuan karyawan yang bersangkutan.</li>
        </ul>
        <h2>Pemakaian yang tidak diperbolehkan</h2>
        <ul>
          <li>Memakai data jam kerja untuk menilai kinerja, produktivitas, atau dasar sanksi.</li>
          <li>Memasukkan data pribadi di luar keperluan penugasan, misalnya data kesehatan.</li>
          <li>Mencoba mengakses ruang kerja organisasi lain.</li>
        </ul>
        <h2>Rekomendasi dan AI</h2>
        <p>Skor dan alasan kandidat dihitung oleh aturan yang bisa dilihat di menu Aturan rekomendasi. AI hanya mengurai deskripsi tugas dan hasilnya selalu bisa dikoreksi. Pantara tidak menjamin rekomendasi selalu tepat.</p>
        <h2>Data</h2>
        <p>Pemrosesan data mengikuti <Link className="inline-link" href="/privasi">Kebijakan privasi</Link> dan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi. Organisasi dapat meminta ekspor atau penghapusan data ruang kerjanya.</p>
        <h2>Biaya</h2>
        <p>Paket dan harga menyusul setelah rancangan bisnis selesai. Ketentuan tagihan akan ditambahkan di bagian ini.</p>
        <h2>Kontak</h2>
        <p>Tim Positif dan Profesional, Politeknik Negeri Jember.</p>
      </div>
      <p className="spaced"><Link className="button secondary" href="/">Kembali ke beranda</Link></p>
    </section>
  </SoloFrame>;
}
