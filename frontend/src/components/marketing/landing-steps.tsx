"use client";

import { Check } from "lucide-react";
import { Icon } from "@/components/ui";
import { ChapterPill } from "./chapter-pill";
import { AppShot, type AppShotId } from "@/components/ui/app-shot";
import { useScene } from "./use-scene";

const STEPS: { sub: string; href: string; title: string; text: string; points: string[]; shots: { id: AppShotId; cls: string }[] }[] = [
  {
    sub: "Buat tugas", href: "/tugas/baru",
    title: "Tulis tugas seperti biasa.",
    text: "Judul, deskripsi, tenggat, prioritas. Tidak perlu formulir kebutuhan yang rumit.",
    points: ["Deskripsi apa adanya, bahasa sehari-hari", "Bisa disimpan sebagai draf"],
    shots: [{ id: "task-form", cls: "main" }],
  },
  {
    sub: "Task DNA", href: "/tugas/TGS-0142/kebutuhan",
    title: "AI mengurai kebutuhan. Kamu yang mengoreksi.",
    text: "Kompetensi, level minimum, estimasi jam, dan dependensi diambil dari kalimat deskripsi. Isian yang ragu ditandai kuning dan wajib dicek.",
    points: ["Setiap isian menunjuk kalimat buktinya", "AI tidak pernah memilih penerima tugas"],
    shots: [{ id: "dna-analysis", cls: "main" }],
  },
  {
    sub: "Top 3 kandidat", href: "/tugas/TGS-0142/kandidat",
    title: "Tiga kandidat teratas, lengkap dengan alasan.",
    text: "Yang tidak memenuhi syarat wajib disaring dulu. Sisanya diberi skor dari lima faktor: kompetensi, kapasitas, ketersediaan, riwayat relevan, dan risiko konflik.",
    points: ["Rumus terbuka, dihitung kode deterministik", "Preset bobot: Seimbang, Kejar tenggat, Ratakan beban, Sebar pengetahuan"],
    shots: [{ id: "cand-1", cls: "c1" }, { id: "cand-2", cls: "c2" }, { id: "cand-3", cls: "c3" }],
  },
  {
    sub: "Simulasi what-if", href: "/tugas/TGS-0142/simulasi",
    title: "Lihat akibatnya sebelum menetapkan.",
    text: "Beban sebelum dan sesudah untuk setiap anggota, plus konflik tenggat dan dependensi. Bandingkan sampai tiga skenario, atau bagi tugas ke dua orang.",
    points: ["Konflik muncul sebelum keputusan, bukan sesudah", "Label tombol menyebut nama penerima"],
    shots: [{ id: "sim-spread", cls: "main" }, { id: "sim-conflict", cls: "side" }],
  },
  {
    sub: "Tetapkan", href: "/dashboard",
    title: "Tetapkan, dan kapasitas tim langsung diperbarui.",
    text: "Pilih kandidat teratas atau orang lain dengan alasan. Karyawan bisa menerima atau menolak, dan setiap keputusan tercatat untuk belajar.",
    points: ["Override dan penolakan tercatat dengan alasan", "Dashboard, Tim, dan Kapasitas ikut berubah"],
    shots: [{ id: "dash-capacity-after", cls: "main" }, { id: "assign-dialog", cls: "side" }],
  },
];

export function LandingSteps() {
  const { ref, step } = useScene<HTMLElement>(STEPS.length);
  return <section ref={ref} id="cara-kerja" className="lp-steps" data-tone="light" data-chapter="2" data-step={step} aria-labelledby="lp-steps-title">
    <div className="lp-stage">
      <div className="lp-steps-head">
        <p className="lp-kicker">Bab 2 <span>Cara kerja</span></p>
        <h2 id="lp-steps-title">Dari tugas baru sampai penugasan, dalam lima langkah.</h2>
        <div className="lp-steps-dots" aria-hidden="true">{STEPS.map((s, i) => <span key={s.sub} className={i === step ? "on" : i < step ? "done" : ""} />)}</div>
      </div>
      <ol className="lp-steps-list">
        {STEPS.map((s, i) => <li key={s.sub} className="lp-step" data-active={step === i ? "" : undefined} data-index={i}>
          <div className="lp-step-copy">
            <p className="lp-step-num">{String(i + 1).padStart(2, "0")} <span>{s.sub}</span></p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul>{s.points.map(p => <li key={p}><Icon icon={Check} size={16} />{p}</li>)}</ul>
          </div>
          <div className={`lp-step-visual n${s.shots.length}`}>
            {s.shots.map(sh => <AppShot key={sh.id} id={sh.id} className={sh.cls} sizes="(max-width: 767px) 90vw, 46vw" />)}
          </div>
        </li>)}
      </ol>
      <ChapterPill chapter="Cara kerja" sub={STEPS[step].sub} href={STEPS[step].href} />
    </div>
  </section>;
}
