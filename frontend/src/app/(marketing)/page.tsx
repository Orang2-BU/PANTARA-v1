import Link from "next/link";
import { PublicNav, SoloFrame } from "@/components/solo/solo-frame";
import { Badge } from "@/components/ui";

// Landing sementara (P1). Section L1-L8 dibangun di T16-T24 setelah inspirasi masuk.
export default function LandingPage() {
  return <SoloFrame nav={<PublicNav />}>
    <section className="public-main">
      <h1>Tahu siapa yang paling pas, sebelum tugas diberikan.</h1>
      <p className="lead">Pantara mengurai kebutuhan tugas, mencocokkannya dengan kondisi tim, lalu menunjukkan tiga kandidat beserta akibat dan alasannya. Kamu yang memutuskan.</p>
      <div className="actions"><Link className="button primary" href="/masuk">Coba demo</Link><Badge>Landing lengkap menyusul</Badge></div>
    </section>
  </SoloFrame>;
}
