import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Masuk" };

// T15 menambah form email + sandi; di M0 masuk lewat peran demo.
export default function MasukPage() {
  return <>
    <div><h1>Masuk</h1><p>Mockup memakai data contoh. Pilih peran untuk mencoba.</p></div>
    <Link className="button primary" href="/dashboard">Masuk sebagai manajer (demo)</Link>
    <Link className="button secondary" href="/saya">Masuk sebagai karyawan (demo)</Link>
    <p className="small">Belum punya ruang kerja? <Link className="inline-link" href="/daftar">Buat ruang kerja</Link> · <Link className="inline-link" href="/lupa-sandi">Lupa sandi</Link></p>
  </>;
}
