import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { BrandLockup } from "@/components/shell/brand";

/** Bingkai halaman di luar shell aplikasi (masuk, akun, publik) dengan gaya template yang sama. */
export function SoloFrame({ children, nav }: { children: ReactNode; nav?: ReactNode }) {
  return <ViewTransition enter={{ "leave-login": "page-in", default: "none" }} exit={{ "to-login": "page-out", default: "none" }} default="none"><div className="solo-frame">
    <header className="public-header">
      <Link href="/" className="brand" aria-label="Pantara, ke beranda">
        <BrandLockup />
      </Link>
      {nav}
    </header>
    {children}
    <footer className="public-footer">
      <span>Pantara <span className="footer-divider">/</span> Tim Positif dan Profesional, Politeknik Negeri Jember</span>
      <span><Link href="/privasi" className="inline-link">Kebijakan privasi</Link> <span className="footer-divider">/</span> <Link href="/syarat" className="inline-link">Syarat layanan</Link></span>
    </footer>
  </div></ViewTransition>;
}

export function PublicNav() {
  return <nav className="public-nav" aria-label="Navigasi publik">
    <Link className="button secondary" href="/harga">Harga</Link>
    <Link className="button primary" href="/masuk" transitionTypes={["to-login"]}>Masuk</Link>
  </nav>;
}
