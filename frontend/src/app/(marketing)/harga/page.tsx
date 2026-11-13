import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav, SoloFrame } from "@/components/solo/solo-frame";

export const metadata: Metadata = { title: "Harga" };

export default function HargaPage() {
  return <SoloFrame nav={<PublicNav />}>
    <section className="public-main">
      <h1>Harga</h1>
      <p className="lead">Paket menyesuaikan jumlah karyawan di ruang kerjamu. Tagihan dan kursi diatur admin dari menu Pengaturan.</p>
      <div className="actions"><Link className="button primary" href="/daftar">Buat ruang kerja</Link><Link className="button secondary" href="/">Kembali ke beranda</Link></div>
    </section>
  </SoloFrame>;
}
