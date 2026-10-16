import type { Metadata } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({ subsets: ["latin"], display: "swap", variable: "--font-onest" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: { default: "Pantara | Orkestrasi kerja adaptif", template: "%s · Pantara" },
  description: "Sistem pendukung keputusan penugasan: tahu siapa yang paling pas, sebelum tugas diberikan. Semua data contoh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="id"><body className={`${onest.variable} ${mono.variable}`}>{children}</body></html>;
}
