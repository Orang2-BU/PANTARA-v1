import type { Metadata } from "next";
import Link from "next/link";
import { BrandSymbol, Wordmark } from "@/components/shell/brand";
import { LoginCards } from "@/components/solo/login-cards";
import { LoginForm } from "@/components/solo/login-form";
import { Ceiling } from "@/components/ui/ceiling";

export const metadata: Metadata = { title: "Masuk" };

// Di luar grup (auth) karena tata letaknya dua kolom, bukan kartu tengah.
// Animasi masuk/keluar halaman ini diatur CSS "Transisi halaman" per jenis navigasi (bukan <ViewTransition>):
// Next menyimpan halaman yang pernah dibuka dalam keadaan tersembunyi, jadi enter/exit di sini tidak selalu terpicu.
export default function MasukPage() {
  return <div className="login">
    <div className="login-side">
        <Link href="/" className="lp-brand" aria-label="Pantara, ke beranda" transitionTypes={["leave-login"]}><BrandSymbol /><Wordmark /></Link>
        <main className="login-main">
          <h1>Masuk ke ruang kerja</h1>
          <p>Lanjutkan keputusan penugasan timmu.</p>
          <LoginForm />
        </main>
        <p className="login-foot">Belum punya ruang kerja? <Link className="inline-link" href="/daftar" transitionTypes={["leave-login"]}>Buat ruang kerja</Link></p>
    </div>
    <aside className="login-visual" aria-label="Cuplikan aplikasi">
        <Ceiling />
        <div className="login-visual-top"><span>Minggu aktif, 28 Sep - 2 Okt 2026</span></div>
        <LoginCards />
        <p className="login-quote">Tahu siapa yang paling pas,<br /><span>sebelum</span> tugas diberikan.</p>
    </aside>
  </div>;
}
