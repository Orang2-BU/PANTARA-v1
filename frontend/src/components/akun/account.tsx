"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, BellOff, CircleCheck, Lock, RotateCcw, ShieldAlert } from "lucide-react";
import { EmptyState, PageHeading, SectionTitle } from "@/components/app/parts";
import { Icon } from "@/components/ui";
import { managerNotices } from "@/lib/demo/notifications";
import { useDemo } from "@/lib/demo/store";

export function Account() {
  const [saved, setSaved] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", again: "" });
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [prefs, setPrefs] = useState({ assigned: true, rejected: true, reminder: false });
  return <div className="page-enter">
    <PageHeading title="Akun saya" subtitle="Profil, sandi, dan preferensi notifikasi." />
    <div className="split-even">
      <form className="card" onSubmit={e => { e.preventDefault(); setSaved(true); }}>
        <SectionTitle title="Profil" />
        {saved && <div className="decision-banner" role="status"><Icon icon={CircleCheck} /><span><strong>Profil tersimpan</strong></span></div>}
        <div className="form-grid">
          <label className="field full"><span className="field-label">Nama</span><input className="input" defaultValue="Krisna Panca Dewa" onChange={() => setSaved(false)} /></label>
          <label className="field full"><span className="field-label">Email</span><input className="input" type="email" defaultValue="krisna@arunika.id" onChange={() => setSaved(false)} /></label>
        </div>
        <div className="form-actions"><button className="button primary" type="submit">Simpan profil</button></div>
      </form>
      <form className="card" noValidate onSubmit={e => {
        e.preventDefault();
        if (!pw.current) return setPwMsg({ ok: false, text: "Isi sandi saat ini." });
        if (pw.next.length < 8) return setPwMsg({ ok: false, text: "Sandi baru minimal 8 karakter." });
        if (pw.next !== pw.again) return setPwMsg({ ok: false, text: "Konfirmasi sandi tidak sama." });
        setPwMsg({ ok: true, text: "Sandi diganti (simulasi mockup)." }); setPw({ current: "", next: "", again: "" });
      }}>
        <SectionTitle title="Ganti sandi" action={<Icon icon={Lock} />} />
        <div className="form-grid">
          <label className="field full"><span className="field-label">Sandi saat ini</span><input className="input" type="password" autoComplete="current-password" value={pw.current} onChange={e => setPw(p => ({ ...p, current: e.target.value }))} /></label>
          <label className="field"><span className="field-label">Sandi baru</span><input className="input" type="password" autoComplete="new-password" value={pw.next} onChange={e => setPw(p => ({ ...p, next: e.target.value }))} /></label>
          <label className="field"><span className="field-label">Ulangi sandi baru</span><input className="input" type="password" autoComplete="new-password" value={pw.again} onChange={e => setPw(p => ({ ...p, again: e.target.value }))} /></label>
        </div>
        {pwMsg && <p className={`${pwMsg.ok ? "ok-text" : "field-error"} spaced`} role={pwMsg.ok ? "status" : "alert"}>{pwMsg.text}</p>}
        <div className="form-actions"><button className="button primary" type="submit">Ganti sandi</button></div>
      </form>
    </div>
    <section className="card">
      <SectionTitle title="Notifikasi" />
      {([["assigned", "Penugasan dijawab karyawan", "Saat karyawan menerima atau menolak penugasan."], ["rejected", "Penugasan ditolak", "Dengan alasan dari karyawan."], ["reminder", "Pengingat data belum lengkap", "Ringkasan tiap Senin pagi."]] as const).map(([k, t, d]) => <label key={k} className="switch-row"><span><strong>{t}</strong><p>{d}</p></span><input type="checkbox" checked={prefs[k]} onChange={() => setPrefs(p => ({ ...p, [k]: !p[k] }))} /></label>)}
    </section>
  </div>;
}

export function Notifications() {
  const demo = useDemo();
  const notices = managerNotices(demo);
  const unread = notices.filter(n => !demo.readNotifications.includes(n.id));
  return <div className="page-enter">
    <PageHeading title="Notifikasi" subtitle={`${unread.length} belum dibaca`} actions={<button className="button secondary" disabled={!unread.length} onClick={() => demo.dispatch({ type: "readAll", ids: notices.map(n => n.id) })}>Tandai semua dibaca</button>} />
    <section className="card">
      {notices.length ? <div className="notification-list">{notices.map(n => <Link key={n.id} href={n.href}><span><strong>{n.title} {!demo.readNotifications.includes(n.id) && <span className="status-dot brand-text" aria-label="Belum dibaca" />}</strong><span>{n.subtitle}</span></span><Icon icon={ArrowUpRight} /></Link>)}</div>
        : <EmptyState icon={BellOff} title="Tidak ada notifikasi" text="Penugasan baru, penolakan, dan pengingat akan muncul di sini." />}
    </section>
  </div>;
}

export function Help() {
  const { dispatch } = useDemo();
  const [reset, setReset] = useState(false);
  return <div className="page-enter">
    <PageHeading title="Bantuan" subtitle="Panduan singkat alur penugasan dan cara kandidat dihitung." />
    <div className="split-even">
      <section className="card">
        <SectionTitle title="Alur penugasan" />
        <ol className="steps-list">
          <li><strong>Buat tugas</strong><p>Tulis judul, deskripsi, tenggat, dan prioritas.</p></li>
          <li><strong>Tinjau Analisis kebutuhan</strong><p>AI mengurai kompetensi, level, estimasi, dan dependensi. Isian ragu ditandai dan wajib dicek.</p></li>
          <li><strong>Bandingkan kandidat</strong><p>Karyawan yang gagal syarat wajib dibuang; tiga teratas ditampilkan dengan skor dan alasan.</p></li>
          <li><strong>Simulasi lalu tetapkan</strong><p>Lihat akibatnya ke beban karyawan. Memilih di luar tiga teratas boleh, dengan alasan.</p></li>
          <li><strong>Karyawan menjawab</strong><p>Karyawan menerima atau menolak dengan alasan. Kapasitas karyawan langsung diperbarui.</p></li>
        </ol>
      </section>
      <section className="card">
        <SectionTitle title="Cara skor dihitung" />
        <p className="mono">S = w1·K + w2·C + w3·A + w4·R − w5·F</p>
        <ul className="factor-list spaced">
          {[["K", "Kesesuaian kompetensi", "Rata-rata level karyawan dibanding level dibutuhkan."], ["C", "Kapasitas setelah penugasan", "1 dikurangi beban sesudah tugas ini."], ["A", "Ketersediaan", "Jam tersisa dibanding estimasi sampai tenggat."], ["R", "Riwayat & preferensi", "Tugas sejenis yang pernah selesai (70%) dan preferensi karyawan (30%)."], ["F", "Risiko konflik", "Beban ≥ ambang dan tenggat lain yang berdekatan."]].map(([k, t, d]) => <li key={k}><span className="factor-number">{k}</span><div><h4>{t}</h4><p>{d}</p></div></li>)}
        </ul>
        <p className="small muted spaced with-icon"><Icon icon={ShieldAlert} size={13} />AI tidak pernah memilih penerima tugas. Keputusan akhir selalu di manajer.</p>
      </section>
    </div>
    <section className="card">
      <SectionTitle title="Data contoh" subtitle="Semua perubahan di mockup tersimpan di browser ini sampai tab ditutup." action={<button className="button secondary" onClick={() => { dispatch({ type: "reset" }); setReset(true); }}><Icon icon={RotateCcw} size={16} />Reset data contoh</button>} />
      {reset && <p className="ok-text small" role="status">Data contoh dikembalikan ke awal.</p>}
    </section>
  </div>;
}
