import type { Metadata } from "next";
import Link from "next/link";
import { SoloFrame } from "@/components/solo/solo-frame";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingPainPoints } from "@/components/marketing/landing-pain-points";
import { LandingWorkflow } from "@/components/marketing/landing-workflow";
import { LandingGovernance } from "@/components/marketing/landing-governance";
import { LandingAudience } from "@/components/marketing/landing-audience";
import { LandingPilot } from "@/components/marketing/landing-pilot";
import { LandingFaq } from "@/components/marketing/landing-faq";
import { LandingCta } from "@/components/marketing/landing-cta";

export const metadata: Metadata = {
  title: "Pantara | Tahu siapa yang paling pas, sebelum tugas diberikan",
  description: "Sistem pendukung keputusan penugasan untuk PM software house dan agensi: urai Task DNA, cocokkan kapasitas kerja, simulasikan dampak beban.",
};

function MarketingNav() {
  return (
    <nav className="public-nav" aria-label="Navigasi publik">
      <a className="nav-anchor" href="#alur-kerja">Alur kerja</a>
      <a className="nav-anchor" href="#prinsip">Prinsip</a>
      <a className="nav-anchor" href="#untuk-siapa">Untuk siapa</a>
      <a className="nav-anchor" href="#faq">FAQ</a>
      <Link className="button secondary" href="/harga">Harga</Link>
      <Link className="button primary" href="/dashboard">Coba demo</Link>
    </nav>
  );
}

export default function LandingPage() {
  return (
    <SoloFrame nav={<MarketingNav />}>
      <main className="landing-wrapper">
        <LandingHero />
        <LandingPainPoints />
        <LandingWorkflow />
        <LandingGovernance />
        <LandingAudience />
        <LandingPilot />
        <LandingFaq />
        <LandingCta />
      </main>
    </SoloFrame>
  );
}

