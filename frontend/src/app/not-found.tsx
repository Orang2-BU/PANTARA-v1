import Link from "next/link";
import { SoloFrame } from "@/components/solo/solo-frame";

export default function NotFound() {
  return <SoloFrame>
    <div className="solo-center"><div className="placeholder-card">
      <h1>Halaman tidak ditemukan</h1>
      <p>Pilih halaman dari menu atau kembali ke Dasbor.</p>
      <Link className="button secondary" href="/dasbor">Kembali ke Dasbor</Link>
    </div></div>
  </SoloFrame>;
}
