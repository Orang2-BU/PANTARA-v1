import type { Metadata } from "next";
import { ViewTransition } from "react";
import { LandingChrome } from "@/components/marketing/landing-chrome";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingAbout } from "@/components/marketing/landing-about";
import { LandingSteps } from "@/components/marketing/landing-steps";
import { LandingPrinciples } from "@/components/marketing/landing-principles";
import { LandingGoals } from "@/components/marketing/landing-goals";
import { LandingClosing } from "@/components/marketing/landing-closing";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import "lenis/dist/lenis.css";

export const metadata: Metadata = {
  title: { absolute: "Pantara | Tahu siapa yang paling pas, sebelum tugas diberikan" },
  description: "Sistem pendukung keputusan penugasan untuk PM software house dan agensi: urai kebutuhan tugas, bandingkan tiga kandidat teratas, simulasikan dampak beban, lalu kamu yang menetapkan.",
  openGraph: {
    title: "Pantara | Tahu siapa yang paling pas, sebelum tugas diberikan",
    description: "Rekomendasi penugasan dari data tim, simulasi what-if sebelum menetapkan. Keputusan tetap di tangan manajer.",
    locale: "id_ID",
    type: "website",
  },
};

export default function LandingPage() {
  return <ViewTransition enter={{ "leave-login": "page-in", default: "none" }} exit={{ "to-login": "page-out", default: "none" }} default="none"><div className="lp">
    <a className="lp-skip" href="#tentang">Lewati pembuka</a>
    <SmoothScroll />
    <LandingChrome />
    <main>
      <LandingHero />
      <LandingAbout />
      <LandingSteps />
      <LandingPrinciples />
      <LandingGoals />
    </main>
    <LandingClosing />
  </div></ViewTransition>;
}
