import type { Metadata } from "next";
import Link from "next/link";
import { SoloFrame } from "@/components/solo/solo-frame";

export const metadata: Metadata = { title: "Sedang pemeliharaan" };

export default function PemeliharaanPage() {
  return <SoloFrame>
    <div className="solo-center"><div className="placeholder-card">
      <h1>Pantara sedang dipelihara</h1>
      <p>Kami sedang memperbarui sistem. Data dan keputusanmu aman. Perkiraan kembali pukul 22.00 WIB.</p>
      <Link className="button secondary" href="/dashboard">Coba buka Dashboard</Link>
    </div></div>
  </SoloFrame>;
}
