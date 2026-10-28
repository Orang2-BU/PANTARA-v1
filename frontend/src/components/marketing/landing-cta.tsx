"use client";

import Link from "next/link";
import { ArrowRight, PlusCircle, Sparkles } from "lucide-react";
import { Icon } from "@/components/ui";

export function LandingCta() {
  return (
    <section className="landing-section no-border" style={{ paddingBottom: "112px" }}>
      <div className="landing-cta-box mesh">
        <span className="landing-tag">
          <Icon icon={Sparkles} size={14} />
          Mulai Tanpa Hambatan
        </span>
        <h2>Siap membuat keputusan penugasan yang lebih adil dan terukur?</h2>
        <p>
          Buka dasbor interaktif sekarang dan rasakan bagaimana Pantara mengeliminasi tebak-tebakan dalam alokasi beban kerja tim.
        </p>
        <div className="landing-hero-actions">
          <Link className="button primary" href="/dashboard">
            Buka dashboard demo
            <Icon icon={ArrowRight} size={16} />
          </Link>
          <Link className="button secondary" href="/tugas/baru">
            <Icon icon={PlusCircle} size={16} />
            Buat tugas baru
          </Link>
        </div>
        <p className="landing-hero-note">
          Data contoh Arunika Digital · Bebas time-tracking · Langsung di browsermu
        </p>
      </div>
    </section>
  );
}
