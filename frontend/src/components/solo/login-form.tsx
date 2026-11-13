"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Icon } from "@/components/ui";
import { authenticate, clearSession, saveSession } from "@/lib/session";

// Masuk statis: akun dicocokkan di browser (lib/session); 5 kali salah = terkunci.
// Membuka halaman masuk berarti keluar: sesi lama dihapus setelah halaman tampil (tombol Keluar cukup menavigasi ke sini).
const MAX_TRIES = 5;
const EMAIL = /^\S+@\S+\.\S+$/;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [tries, setTries] = useState(0);
  const [busy, setBusy] = useState(false);
  const locked = tries >= MAX_TRIES;
  // Halaman disimpan tersembunyi oleh Next (Activity) setelah pindah; kosongkan form saat disembunyikan.
  useEffect(() => {
    clearSession();
    return () => { setBusy(false); setPassword(""); setErrors({}); };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked || busy) return;
    const next: typeof errors = {};
    if (!EMAIL.test(email.trim())) next.email = "Tulis email kerja yang valid.";
    if (!password) next.password = "Sandi wajib diisi.";
    setErrors(next);
    if (next.email || next.password) return;
    const account = authenticate(email, password);
    if (!account) {
      const left = MAX_TRIES - tries - 1;
      setTries(tries + 1);
      setPassword("");
      setErrors({ form: left > 0 ? `Email atau sandi salah. Sisa ${left} percobaan sebelum akun dikunci sementara.` : "Terlalu banyak percobaan. Akun dikunci 15 menit. Pakai Lupa sandi untuk membuka lebih cepat." });
      return;
    }
    setBusy(true);
    saveSession(account.email, remember);
    setTimeout(() => router.push(account.home, { transitionTypes: ["auth-in"] }), 450);
  };

  return <form className="login-form" noValidate onSubmit={submit}>
    {errors.form && <p id="login-form-err" className="login-alert" role="alert"><Icon icon={AlertCircle} size={16} />{errors.form}</p>}
    <label className="field">
      <span className="field-label">Email kerja</span>
      <input className="input" type="email" autoComplete="email" inputMode="email" placeholder="nama@kantor.id" value={email} aria-invalid={errors.email || errors.form ? true : undefined} aria-describedby={errors.email ? "login-email-err" : errors.form ? "login-form-err" : undefined} disabled={locked} onChange={e => { setEmail(e.target.value); setErrors({ ...errors, email: undefined, form: undefined }); }} />
      {errors.email && <span id="login-email-err" className="field-error">{errors.email}</span>}
    </label>
    <label className="field">
      <span className="field-label">Sandi</span>
      <span className="input-affix">
        <input className="input" type={show ? "text" : "password"} autoComplete="current-password" value={password} aria-invalid={errors.password || errors.form ? true : undefined} aria-describedby={errors.password ? "login-pw-err" : errors.form ? "login-form-err" : undefined} disabled={locked} onChange={e => { setPassword(e.target.value); setErrors({ ...errors, password: undefined, form: undefined }); }} />
        <button type="button" className="icon-button subtle" aria-label={show ? "Sembunyikan sandi" : "Tampilkan sandi"} aria-pressed={show} onClick={() => setShow(!show)}><Icon icon={show ? EyeOff : Eye} size={18} /></button>
      </span>
      {errors.password && <span id="login-pw-err" className="field-error">{errors.password}</span>}
    </label>
    <div className="login-row">
      <label><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Ingat saya di perangkat ini</label>
      <Link className="inline-link" href="/lupa-sandi" transitionTypes={["leave-login"]}>Lupa sandi?</Link>
    </div>
    <button className="button primary" type="submit" disabled={locked || busy}>
      {busy ? <><Icon icon={LoaderCircle} size={16} className="spin" />Masuk...</> : <>Masuk<Icon icon={ArrowRight} size={16} /></>}
    </button>
  </form>;
}
