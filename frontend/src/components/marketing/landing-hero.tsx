"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { Icon } from "@/components/ui";

const TABS = [
  {
    id: "dashboard",
    label: "Dashboard Tim",
    url: "pantara.app/dashboard",
    src: "/marketing/preview-dashboard.png",
    alt: "Pratinjau Dashboard Pantara",
    caption: "Arunika Digital · Kapasitas total 20 karyawan · Periode 28 Sep - 2 Okt 2026",
  },
  {
    id: "kandidat",
    label: "Top 3 Rekomendasi",
    url: "pantara.app/tugas/TGS-0142/kandidat",
    src: "/marketing/preview-kandidat.png",
    alt: "Pratinjau Rekomendasi Kandidat Pantara",
    caption: "TGS-0142: Integrasi autentikasi · Ayu Pramesti skor 0,94 dengan 5 faktor terhitung",
  },
  {
    id: "simulasi",
    label: "Simulasi What-If",
    url: "pantara.app/tugas/TGS-0142/simulasi",
    src: "/marketing/preview-simulasi.png",
    alt: "Pratinjau Simulasi Beban Pantara",
    caption: "Uji dampak beban sebelum menetapkan · Perbandingan pemanfaatan kapasitas sebelum versus sesudah",
  },
  {
    id: "dna",
    label: "Task DNA Otomatis",
    url: "pantara.app/tugas/TGS-0142/kebutuhan",
    src: "/marketing/preview-dna.png",
    alt: "Pratinjau Task DNA Pantara",
    caption: "AI mengurai deskripsi tugas menjadi tag keahlian terstruktur · Manajer mengonfirmasi asumsi",
  },
];

export function LandingHero() {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab];

  return (
    <section className="landing-section landing-hero no-border">
      <div className="landing-hero-center">
        <span className="landing-tag">
          <Icon icon={Sparkles} size={14} />
          Sistem Pendukung Keputusan Penugasan
        </span>
        <h1>Tahu siapa yang paling pas, sebelum tugas diberikan.</h1>
        <p className="lead">
          Pantara mengurai kebutuhan tugas, mencocokkannya dengan ketersediaan dan keahlian tim, lalu menyajikan tiga rekomendasi objektif beserta konsekuensi beban. Manajer yang memegang keputusan akhir.
        </p>
        <div className="landing-hero-actions">
          <Link className="button primary" href="/dashboard">
            Coba demo langsung
            <Icon icon={ArrowRight} size={16} />
          </Link>
          <a className="button secondary" href="#alur-kerja">
            Pelajari alur kerja
          </a>
        </div>
        <p className="landing-hero-note">
          Tanpa kartu kredit · Dilengkapi data simulasi agensi nyata · Bebas time-tracking
        </p>
      </div>

      <div className="landing-browser">
        <div className="landing-browser-chrome">
          <div className="landing-browser-dots">
            <span className="landing-browser-dot" />
            <span className="landing-browser-dot" />
            <span className="landing-browser-dot" />
          </div>
          <div className="landing-browser-url">
            <span>https://{current.url}</span>
          </div>
          <Link className="text-link with-icon small" href="/dashboard">
            <span>Buka aplikasi</span>
            <Icon icon={ChevronRight} size={12} />
          </Link>
        </div>

        <div className="landing-browser-tabs" role="tablist" aria-label="Tampilan aplikasi">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === idx}
              className={`landing-browser-tab ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="landing-browser-screen">
          <Image
            src={current.src}
            alt={current.alt}
            width={1280}
            height={800}
            priority
            quality={90}
          />
        </div>

        <div className="landing-browser-caption">
          <span>{current.caption}</span>
          <span className="mono">M0 Mockup · Arunika Digital</span>
        </div>
      </div>

      <div className="landing-browser-chips">
        <div className="data-badge-pill with-icon">
          <Icon icon={CheckCircle2} size={14} />
          <span><strong>0,94 Skor Teratas:</strong> Ayu Pramesti (5 faktor terhitung)</span>
        </div>
        <div className="data-badge-pill with-icon">
          <Icon icon={CheckCircle2} size={14} />
          <span><strong>28 / 32 jam:</strong> Beban kapasitas teralokasi sehat</span>
        </div>
        <div className="data-badge-pill with-icon">
          <Icon icon={CheckCircle2} size={14} />
          <span><strong>0 Konflik:</strong> Tenggat dan cuti diverifikasi aman</span>
        </div>
      </div>
    </section>
  );
}
