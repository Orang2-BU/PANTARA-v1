import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav, SoloFrame } from "@/components/solo/solo-frame";
import { Badge } from "@/components/ui";

export const metadata: Metadata = { title: "Harga" };

export default function HargaPage() {
  return <SoloFrame nav={<PublicNav />}>
    <section className="public-main">
      <h1>Harga</h1>
      <p className="lead">Paket dan harga menyusul setelah rancangan bisnis tim selesai.</p>
      <div className="actions"><Badge>Belum tersedia di mockup</Badge><Link className="button secondary" href="/">Kembali ke beranda</Link></div>
    </section>
  </SoloFrame>;
}
