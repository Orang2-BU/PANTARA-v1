"use client";

import type { CSSProperties } from "react";
import { AppShot, type AppShotId } from "@/components/ui/app-shot";
import { ChapterPill } from "./chapter-pill";
import { useScene } from "./use-scene";

const GOALS = [
  { title: "Lebih cepat memutuskan", text: "Waktu dari tugas masuk sampai ditetapkan tercatat, lalu dibandingkan dengan cara lama.", href: "/dashboard" },
  { title: "Konflik terlihat lebih awal", text: "Beban berlebih dan tenggat bentrok muncul sebelum tugas diberikan.", href: "/tugas/TGS-0142/simulasi" },
  { title: "Beban lebih merata", text: "Kapasitas semua anggota terlihat di satu tempat, jadi tugas tidak selalu jatuh ke orang yang sama.", href: "/kapasitas" },
  { title: "Pengetahuan tersebar", text: "Kompetensi yang hanya dikuasai satu orang ditandai, lalu bisa disebar lewat preset.", href: "/tim/keahlian" },
];

// Kolase diagonal: kiri atas kecil dan jauh, kanan bawah besar dan dekat. l/t/w dalam persen zona kolase,
// d = kedalaman parallax, g = tujuan yang diwakili (-1 = hiasan).
const COLLAGE: { id: AppShotId; l: number; t: number; w: number; d: number; g: number }[] = [
  { id: "metric-data", l: 0, t: 0, w: 19, d: 0.5, g: -1 },
  { id: "metric-unassigned", l: 11, t: 9, w: 21, d: 0.62, g: 0 },
  { id: "sim-conflict", l: 24, t: 19, w: 27, d: 0.74, g: 1 },
  { id: "dash-capacity-after", l: 39, t: 31, w: 40, d: 0.88, g: 2 },
  { id: "skill-risk", l: 46, t: 74, w: 54, d: 1, g: 3 },
];

/** Bab 4: tagline di tengah atas, daftar tujuan di kiri, kolase kartu aplikasi menurun diagonal. */
export function LandingGoals() {
  const { ref, step } = useScene<HTMLElement>(GOALS.length);
  return <section ref={ref} id="tujuan" className="lp-goals" data-tone="light" data-chapter="4" data-step={step} aria-labelledby="lp-goals-title">
    <div className="lp-stage">
      <h2 id="lp-goals-title" className="lp-goals-tagline">Tugas sampai ke orang yang tepat,<br />tim tetap sehat.</h2>
      <div className="lp-goals-side">
        <p className="lp-goals-label">Tujuan</p>
        <ol className="lp-goals-list">
          {GOALS.map((g, i) => <li key={g.title} data-active={step === i ? "" : undefined}><h3>{g.title}</h3><p>{g.text}</p></li>)}
        </ol>
        <p className="lp-goals-note">Dampak diukur saat pilot, bukan dijanjikan dengan angka.</p>
      </div>
      <div className="lp-collage" aria-hidden="true">
        {COLLAGE.map((c, k) => <div key={c.id} className="lp-collage-card" data-active={c.g === step ? "" : undefined}
          style={{ "--l": c.l, "--t": c.t, "--w": c.w, "--d": c.d, zIndex: k + 1 } as CSSProperties}>
          <AppShot id={c.id} decorative sizes="(max-width: 767px) 80vw, 36vw" />
        </div>)}
      </div>
      <ChapterPill chapter="Tujuan" sub={GOALS[step].title} href={GOALS[step].href} />
    </div>
  </section>;
}
