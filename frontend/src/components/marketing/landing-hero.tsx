"use client";

import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui";
import { Ceiling } from "@/components/ui/ceiling";
import { AppShot } from "@/components/ui/app-shot";
import { usePointerDrift } from "@/components/ui/use-pointer-drift";
import { useScene } from "./use-scene";

const LINES = [
  "Setiap minggu, manajer memutuskan berulang kali",
  "siapa yang mengerjakan tugas berikutnya.",
  "Kompetensi, jam kosong, cuti, dan tenggat",
  "tersebar di spreadsheet, chat, dan ingatan.",
  "PANTARA menyatukannya di satu layar,",
  "lalu menunjukkan siapa yang paling pas",
  "dan apa akibatnya, sebelum tugas diberikan.",
];

/** Adegan pembuka: ruang gelap berlampu, judul mengapit kartu dashboard, lalu masuk ke cahaya. */
export function LandingHero() {
  const { ref, step } = useScene<HTMLElement>(20);
  usePointerDrift(ref);
  return <section ref={ref} id="beranda" className="lp-hero" data-tone={step >= 18 ? "light" : "dark"} data-chapter="0" aria-labelledby="lp-hero-title">
    <div className="lp-stage">
      <div className="lp-hero-frame">
        <Ceiling />
        <p className="lp-side left">Sistem pendukung keputusan penugasan</p>
        <p className="lp-side right">Untuk PM software house dan agensi</p>
        <h1 id="lp-hero-title" className="lp-hero-title">
          <span className="top">Tahu siapa yang paling pas,</span>
          <span className="bottom"><em>sebelum</em> tugas diberikan.</span>
        </h1>
        <div className="lp-hero-object">
          <span className="lp-paren" aria-hidden="true">(</span>
          <span className="lp-hero-card"><AppShot id="cand-1" preload sizes="(max-width: 767px) 56vw, 300px" /></span>
          <span className="lp-paren" aria-hidden="true">)</span>
        </div>
        <p className="lp-hero-tag">Rekomendasi dan simulasi dari data tim. Keputusan tetap di tanganmu.</p>
        <a className="lp-scroll" href="#tentang" aria-label="Lanjut ke bagian Tentang"><Icon icon={ChevronDown} size={20} /></a>
      </div>
      <div className="lp-orb" aria-hidden="true" />
      <div className="lp-orb-text">
        <p className="lp-orb-lead">Orkestrasi kerja adaptif: tugas sampai ke orang yang paling pas, dengan <strong>kamu</strong> sebagai penentu.</p>
        <p className="lp-lines">{LINES.map((line, i) => <span key={line} style={{ "--i": i } as CSSProperties}>{line} </span>)}</p>
      </div>
    </div>
  </section>;
}
