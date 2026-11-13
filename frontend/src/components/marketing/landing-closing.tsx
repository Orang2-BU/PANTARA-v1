import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandSymbol, Wordmark } from "@/components/shell/brand";
import { CHAPTERS } from "./chapters";

/** Penutup: CTA + footer hijau dengan wordmark selebar layar. */
export function LandingClosing() {
  return <footer className="lp-footer" data-tone="teal" data-chapter="4">
    <div className="lp-footer-top">
      <div className="lp-footer-cta">
        <h2>Putuskan penugasan berikutnya dengan data, bukan tebakan.</h2>
        <p>Buat ruang kerja untuk timmu, impor karyawan dari CSV, dan mulai dari tugas pertama.</p>
        <div className="lp-footer-actions">
          <Link className="button lp-on-teal" href="/daftar">Buat ruang kerja<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" /></Link>
          <Link className="lp-link" href="/masuk" transitionTypes={["to-login"]}>Masuk ke ruang kerja</Link>
        </div>
      </div>
      <nav className="lp-footer-nav" aria-label="Peta halaman">
        {CHAPTERS.map(c => <a key={c.id} href={`#${c.id}`}>{c.label}</a>)}
      </nav>
      <nav className="lp-footer-nav" aria-label="Tautan lain">
        <Link href="/harga">Harga</Link>
        <Link href="/privasi">Kebijakan privasi</Link>
        <Link href="/syarat">Syarat layanan</Link>
      </nav>
    </div>
    <div className="lp-footer-mark"><BrandSymbol /><Wordmark className="giant" /></div>
    <div className="lp-footer-bottom">
      <span>Tim Positif dan Profesional, Politeknik Negeri Jember</span>
      <span>Duluin Innovation Summit 2026</span>
    </div>
  </footer>;
}
