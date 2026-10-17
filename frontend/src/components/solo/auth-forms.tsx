"use client";

import Link from "next/link";
import { use, useState } from "react";
import { CircleCheck } from "lucide-react";
import { Icon } from "@/components/ui";

// Halaman akun mockup: validasi jalan, tanpa server (tidak ada data yang dikirim).

const EMAIL = /^\S+@\S+\.\S+$/;

function Done({ title, text }: { title: string; text: string }) {
  return <>
    <div className="decision-banner" role="status"><Icon icon={CircleCheck} /><span><strong>{title}</strong><span>{text}</span></span></div>
    <Link className="button primary" href="/masuk">Ke halaman masuk</Link>
  </>;
}

export function RegisterForm() {
  const [f, setF] = useState({ org: "", name: "", email: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <Done title="Ruang kerja dibuat (simulasi)" text={`${f.org} siap. Langkah berikutnya: isi periode dan data karyawan.`} />;
  return <form noValidate onSubmit={e => {
    e.preventDefault();
    if (f.org.trim().length < 3) return setError("Tulis nama organisasi.");
    if (f.name.trim().length < 3) return setError("Tulis nama lengkap admin.");
    if (!EMAIL.test(f.email)) return setError("Email belum valid.");
    if (f.password.length < 8) return setError("Sandi minimal 8 karakter.");
    if (!agree) return setError("Setujui syarat layanan dan kebijakan privasi.");
    setDone(true);
  }}>
    <div><h1>Buat ruang kerja</h1><p>Satu ruang kerja untuk satu organisasi. Kamu jadi admin pertama.</p></div>
    <div className="form-grid spaced">
      <label className="field full"><span className="field-label">Nama organisasi</span><input className="input" value={f.org} onChange={e => { setF({ ...f, org: e.target.value }); setError(""); }} placeholder="CV Sinar Digital Jember" /></label>
      <label className="field full"><span className="field-label">Nama lengkap</span><input className="input" autoComplete="name" value={f.name} onChange={e => { setF({ ...f, name: e.target.value }); setError(""); }} /></label>
      <label className="field full"><span className="field-label">Email kerja</span><input className="input" type="email" autoComplete="email" value={f.email} onChange={e => { setF({ ...f, email: e.target.value }); setError(""); }} /></label>
      <label className="field full"><span className="field-label">Sandi</span><input className="input" type="password" autoComplete="new-password" value={f.password} onChange={e => { setF({ ...f, password: e.target.value }); setError(""); }} /></label>
      <label className="field full with-icon"><input type="checkbox" checked={agree} onChange={e => { setAgree(e.target.checked); setError(""); }} /><span className="small">Saya setuju dengan <Link className="inline-link" href="/syarat">syarat layanan</Link> dan <Link className="inline-link" href="/privasi">kebijakan privasi</Link></span></label>
    </div>
    {error && <p className="field-error spaced" role="alert">{error}</p>}
    <div className="form-actions"><button className="button primary" type="submit">Buat ruang kerja</button></div>
    <p className="small spaced">Sudah punya akun? <Link className="inline-link" href="/masuk">Masuk</Link></p>
  </form>;
}

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <Done title="Tautan dikirim (simulasi)" text={`Jika ${email} terdaftar, tautan buat sandi baru berlaku 30 menit.`} />;
  return <form noValidate onSubmit={e => { e.preventDefault(); if (!EMAIL.test(email)) return setError("Email belum valid."); setDone(true); }}>
    <div><h1>Lupa sandi</h1><p>Masukkan email akunmu. Kami kirim tautan untuk membuat sandi baru.</p></div>
    <label className="field spaced"><span className="field-label">Email</span><input className="input" type="email" autoComplete="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} /></label>
    {error && <p className="field-error spaced" role="alert">{error}</p>}
    <div className="form-actions"><Link className="button secondary" href="/masuk">Batal</Link><button className="button primary" type="submit">Kirim tautan</button></div>
  </form>;
}

export function ResetForm() {
  const [pw, setPw] = useState("");
  const [again, setAgain] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <Done title="Sandi baru tersimpan (simulasi)" text="Masuk dengan sandi barumu." />;
  return <form noValidate onSubmit={e => { e.preventDefault(); if (pw.length < 8) return setError("Sandi minimal 8 karakter."); if (pw !== again) return setError("Konfirmasi sandi tidak sama."); setDone(true); }}>
    <div><h1>Buat sandi baru</h1><p>Tautan ini berlaku 30 menit sejak dikirim.</p></div>
    <label className="field spaced"><span className="field-label">Sandi baru</span><input className="input" type="password" autoComplete="new-password" value={pw} onChange={e => { setPw(e.target.value); setError(""); }} /></label>
    <label className="field spaced"><span className="field-label">Ulangi sandi baru</span><input className="input" type="password" autoComplete="new-password" value={again} onChange={e => { setAgain(e.target.value); setError(""); }} /></label>
    {error && <p className="field-error spaced" role="alert">{error}</p>}
    <div className="form-actions"><button className="button primary" type="submit">Simpan sandi</button></div>
  </form>;
}

export function InviteForm({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <Done title={`Selamat bergabung, ${name.split(" ")[0]}`} text="Isi kompetensi dan ketersediaanmu supaya ikut rekomendasi." />;
  return <form noValidate onSubmit={e => { e.preventDefault(); if (name.trim().length < 3) return setError("Tulis nama lengkap."); if (pw.length < 8) return setError("Sandi minimal 8 karakter."); setDone(true); }}>
    <div><h1>Terima undangan</h1><p>Krisna Panca mengundangmu ke ruang kerja <strong>Arunika Digital</strong> sebagai karyawan.</p></div>
    <p className="small muted mono spaced">Kode undangan {token}</p>
    <label className="field spaced"><span className="field-label">Nama lengkap</span><input className="input" autoComplete="name" value={name} onChange={e => { setName(e.target.value); setError(""); }} /></label>
    <label className="field spaced"><span className="field-label">Buat sandi</span><input className="input" type="password" autoComplete="new-password" value={pw} onChange={e => { setPw(e.target.value); setError(""); }} /></label>
    {error && <p className="field-error spaced" role="alert">{error}</p>}
    <div className="form-actions"><button className="button primary" type="submit">Gabung ke ruang kerja</button></div>
  </form>;
}
