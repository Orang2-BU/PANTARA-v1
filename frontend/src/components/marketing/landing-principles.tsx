"use client";

import { EyeOff, Scale, SlidersHorizontal } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui";
import { ChapterPill } from "./chapter-pill";
import { AppShot } from "@/components/ui/app-shot";
import { useScene } from "./use-scene";

const PRINCIPLES = [
  { icon: Scale, title: "AI mengurai, kode menghitung", text: "Model bahasa hanya membaca deskripsi tugas. Skor kandidat dihitung rumus terbuka yang bisa diperiksa: S = w1K + w2C + w3A + w4R - w5F." },
  { icon: SlidersHorizontal, title: "Manajer yang memutuskan", text: "Terima, pilih orang lain, atau tolak rekomendasi. Alasan dicatat supaya keputusan berikutnya lebih baik." },
  { icon: EyeOff, title: "Bukan alat pengawasan", text: "Tanpa time tracking, tanpa tangkapan layar, tanpa skor produktivitas per orang. Kapasitas adalah jam kerja untuk perencanaan." },
];

/**
 * Bab 3: band gelap klimaks. Langkah 0 = judul + kartu sorotan kandidat #1,
 * langkah 1-3 = prinsip muncul satu per satu (yang sudah muncul tetap tampil, yang terbaru ditandai).
 */
export function LandingPrinciples() {
  const { ref, step } = useScene<HTMLElement>(PRINCIPLES.length + 1);
  // Kartu masuk sekali saat adegan mulai terlihat, jadi sudah tajam ketika adegan menempel.
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return <section ref={ref} id="prinsip" className="lp-principles" data-tone="fade" data-chapter="3" data-step={step} data-near={near ? "" : undefined} aria-labelledby="lp-principles-title">
    <div className="lp-stage">
      <div className="lp-streams" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <span key={i} style={{ "--k": i } as CSSProperties} />)}</div>
      <div className="lp-principles-head">
        <p className="lp-kicker">Bab 3 <span>Prinsip</span></p>
        <h2 id="lp-principles-title">Rekomendasi membantu.<br /><em>Kamu</em> yang menetapkan.</h2>
      </div>
      <AppShot id="cand-highlight" className="lp-principles-shot" sizes="(max-width: 767px) 92vw, 880px" />
      <ul className="lp-principles-list">
        {PRINCIPLES.map((p, i) => <li key={p.title} data-on={step > i ? "" : undefined} data-current={step === i + 1 ? "" : undefined}>
          <Icon icon={p.icon} size={20} /><h3>{p.title}</h3><p>{p.text}</p>
        </li>)}
      </ul>
      <ChapterPill chapter="Prinsip" sub={step ? PRINCIPLES[step - 1].title : "Skor terbuka"} href="/tugas/TGS-0142/kandidat" />
    </div>
  </section>;
}
