import type { Metadata } from "next";
import { Familjen_Grotesk, JetBrains_Mono, Onest } from "next/font/google";
import Script from "next/script";
import { BOOT_SKIP, BootLoader } from "@/components/ui/boot-loader";
import "./globals.css";

const onest = Onest({ subsets: ["latin"], display: "swap", variable: "--font-onest" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });
// Judul landing & halaman masuk saja (Area Landing); aplikasi tetap Onest.
const display = Familjen_Grotesk({ subsets: ["latin"], weight: "700", display: "swap", variable: "--font-familjen" });

export const metadata: Metadata = {
  title: { default: "Pantara | Orkestrasi kerja adaptif", template: "%s · Pantara" },
  description: "Sistem pendukung keputusan penugasan: tahu siapa yang paling pas, sebelum tugas diberikan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // suppressHydrationWarning: skrip BootLoader menandai <html> sebelum hidrasi.
  return <html lang="id" data-scroll-behavior="smooth" suppressHydrationWarning><body className={`${onest.variable} ${mono.variable} ${display.variable}`}><Script id="boot-skip" strategy="beforeInteractive">{BOOT_SKIP}</Script><BootLoader />{children}</body></html>;
}
