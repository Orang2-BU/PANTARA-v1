"use client";

import Link from "next/link";
import { SoloFrame } from "@/components/solo/solo-frame";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <SoloFrame>
    <div className="solo-center"><div className="placeholder-card">
      <h1>Terjadi galat di server</h1>
      <p>Halaman ini gagal dimuat. Perubahanmu yang sudah tersimpan tidak hilang.</p>
      <div className="actions"><button className="button primary" onClick={reset}>Coba lagi</button><Link className="button secondary" href="/dasbor">Kembali ke Dasbor</Link></div>
    </div></div>
  </SoloFrame>;
}
