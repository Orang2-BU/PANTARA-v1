"use client";

import type { CSSProperties } from "react";
import { ChapterPill } from "./chapter-pill";
import { Wordmark } from "@/components/shell/brand";
import { AppShot, type AppShotId } from "@/components/ui/app-shot";
import { useScene } from "./use-scene";

// Kartu melayang: posisi awal tersebar (x0, y0) lalu berbaris diagonal kiri bawah ke kanan atas (x1, y1),
// makin besar ke kanan atas seperti mendekat ke kamera. Satuan: persen lebar/tinggi panggung dari tengah.
// Kartu melayang di margin kiri/kanan (|x| >= 31) supaya tidak menabrak kotak teks tengah.
// Awal tersebar dan miring, lalu berbaris diagonal: kiri rendah dan jauh, kanan tinggi dan dekat.
const FLOAT: { id: AppShotId; x0: number; y0: number; x1: number; y1: number; r: number; w: number; d: number }[] = [
  { id: "metric-waiting", x0: -40, y0: 30, x1: -33, y1: 34, r: -6, w: 11, d: 0.7 },
  { id: "dash-queue", x0: -36, y0: -22, x1: -38, y1: 6, r: 5, w: 14, d: 0.78 },
  { id: "metric-unassigned", x0: -33, y0: 6, x1: -36, y1: -24, r: -4, w: 11, d: 0.86 },
  { id: "metric-review", x0: 38, y0: 32, x1: 34, y1: 26, r: 4, w: 11, d: 0.94 },
  { id: "sim-conflict", x0: 34, y0: -4, x1: 37, y1: -2, r: -5, w: 14, d: 1.02 },
  { id: "dash-notes", x0: 37, y0: -30, x1: 35, y1: -28, r: 6, w: 13, d: 1.1 },
];

const PHASES = [
  { sub: "PANTARA", href: "/dashboard" },
  { sub: "Konsep", href: "/tim/keahlian" },
  { sub: "Masalah", href: "/dashboard" },
];

export function LandingAbout() {
  const { ref, step } = useScene<HTMLElement>(PHASES.length);
  return <section ref={ref} id="tentang" className="lp-about" data-tone="light" data-chapter="1" data-step={step} aria-labelledby="lp-about-title">
    <div className="lp-stage">
      <div className="lp-float" aria-hidden="true">
        {FLOAT.map(f => {
          const style = { "--x0": f.x0, "--y0": f.y0, "--x1": f.x1, "--y1": f.y1, "--r": f.r, "--w": f.w, "--d": f.d } as CSSProperties;
          return <div key={f.id} className="lp-float-card" style={style}><AppShot id={f.id} decorative sizes="20vw" /></div>;
        })}
      </div>

      <div className="lp-about-phase brand" data-phase="0">
        <Wordmark className="xl" />
        <p className="lp-about-sub">Orkestrasi kerja adaptif</p>
        <AppShot id="dash-highlight" className="lp-about-shot" sizes="(max-width: 767px) 84vw, 400px" />
      </div>

      <div className="lp-about-phase" data-phase="1">
        <p className="lp-kicker">Bab 1 <span>Tentang</span></p>
        <h2 id="lp-about-title">Satu tempat untuk memutuskan siapa mengerjakan apa.</h2>
        <p>PANTARA menyatukan kompetensi, jam kosong, cuti, dan pekerjaan berjalan setiap karyawan menjadi <strong>Work Twin</strong>. Saat tugas baru masuk, kebutuhannya diurai menjadi <strong>Task DNA</strong>, lalu dicocokkan dengan kondisi nyata tim.</p>
      </div>

      <div className="lp-about-phase" data-phase="2">
        <p className="lp-kicker">Bab 1 <span>Masalah</span></p>
        <h2>Tanpa itu, penugasan bergantung pada ingatan.</h2>
        <p>Info tersebar di spreadsheet, chat, dan kepala manajer. Tugas jatuh ke orang yang biasanya bisa, beban menumpuk di satu dua orang, dan tenggat yang bentrok baru ketahuan saat sudah telat.</p>
      </div>

      <ChapterPill chapter="Tentang" sub={PHASES[step].sub} href={PHASES[step].href} />
    </div>
  </section>;
}
