"use client";

import Link from "next/link";
import { useState } from "react";
import { CircleCheck, ReceiptText, RotateCcw, UserPlus } from "lucide-react";
import { EmptyState, MetricCard, PageHeading, SectionTitle } from "@/components/app/parts";
import { Badge, Icon, Modal } from "@/components/ui";
import { WORKSPACE } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import type { Member, PresetId } from "@/lib/demo/types";
import { DEFAULT_SETTINGS, PRESETS } from "@/lib/engine/score";
import { number } from "@/lib/format";

function Saved({ show, text }: { show: boolean; text: string }) {
  return show ? <div className="decision-banner" role="status"><Icon icon={CircleCheck} /><span><strong>Tersimpan</strong><span>{text}</span></span></div> : null;
}

export function GeneralSettings() {
  const [period, setPeriod] = useState("mingguan");
  const [hoursPerWeek, setHours] = useState(String(WORKSPACE.hoursPerWeek));
  const [days, setDays] = useState(["Sen", "Sel", "Rab", "Kam", "Jum"]);
  const [saved, setSaved] = useState(false);
  return <div className="page-enter">
    <PageHeading title="Pengaturan" subtitle={`Ruang kerja ${WORKSPACE.name}`} />
    <form className="card form-card" onSubmit={e => { e.preventDefault(); setSaved(true); }}>
      <Saved show={saved} text="Periode dan jam kerja default dipakai untuk anggota baru." />
      <div className="form-grid">
        <label className="field"><span className="field-label">Nama ruang kerja</span><input className="input" defaultValue={WORKSPACE.name} onChange={() => setSaved(false)} /></label>
        <label className="field"><span className="field-label">Zona waktu</span><select className="select" defaultValue="Asia/Jakarta"><option value="Asia/Jakarta">WIB (Asia/Jakarta)</option><option value="Asia/Makassar">WITA (Asia/Makassar)</option><option value="Asia/Jayapura">WIT (Asia/Jayapura)</option></select></label>
        <fieldset className="field"><legend className="field-label">Periode kapasitas</legend><div className="radio-pills">{["mingguan", "2 mingguan"].map(p => <label key={p}><input type="radio" name="period" checked={period === p} onChange={() => { setPeriod(p); setSaved(false); }} />{p[0].toUpperCase() + p.slice(1)}</label>)}</div></fieldset>
        <label className="field"><span className="field-label">Jam proyek default per minggu</span><input className="input" type="number" value={hoursPerWeek} onChange={e => { setHours(e.target.value); setSaved(false); }} /></label>
        <fieldset className="field full"><legend className="field-label">Hari kerja</legend><div className="radio-pills">{["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(d => <label key={d}><input type="checkbox" checked={days.includes(d)} onChange={() => { setDays(x => x.includes(d) ? x.filter(y => y !== d) : [...x, d]); setSaved(false); }} />{d}</label>)}</div></fieldset>
      </div>
      <div className="form-actions"><button type="submit" className="button primary">Simpan pengaturan</button></div>
    </form>
  </div>;
}

export function RecommendationSettings() {
  const { settings, dispatch } = useDemo();
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  const w = PRESETS[draft.preset].weights;
  return <div className="page-enter">
    <PageHeading title="Aturan rekomendasi" subtitle="Preset bobot dan syarat wajib kandidat. Bobot bukan angka universal: dikalibrasi dari data override di pilot." />
    <Saved show={saved} text="Rekomendasi berikutnya memakai aturan ini." />
    <div className="split-detail">
      <section className="card">
        <SectionTitle title="Preset bobot default" subtitle="S = w1·K + w2·C + w3·A + w4·R − w5·F" />
        <div className="table-scroll stack-table"><table>
          <thead><tr><th>Preset</th><th>Kapan dipakai</th><th className="numeric">K</th><th className="numeric">C</th><th className="numeric">A</th><th className="numeric">R</th><th className="numeric">F</th></tr></thead>
          <tbody>{(Object.keys(PRESETS) as PresetId[]).map(p => <tr key={p} className={draft.preset === p ? "row-highlight" : ""}>
            <td><label className="with-icon"><input type="radio" name="preset" checked={draft.preset === p} onChange={() => { setDraft(d => ({ ...d, preset: p })); setSaved(false); }} /><strong>{PRESETS[p].label}</strong></label></td>
            <td data-label="Kapan">{PRESETS[p].when}{PRESETS[p].spreadBonus ? " · bonus 0,20 untuk anggota tanpa riwayat sejenis" : ""}</td>
            {(["k", "c", "a", "r", "f"] as const).map(k => <td key={k} data-label={k.toUpperCase()} className="numeric">{number(PRESETS[p].weights[k], 2)}</td>)}
          </tr>)}</tbody>
        </table></div>
        <p className="small muted spaced">K kompetensi · C kapasitas setelah penugasan · A ketersediaan sampai tenggat · R riwayat relevan (70%) & preferensi (30%) · F risiko konflik. Preset terpilih: K {number(w.k, 2)}, C {number(w.c, 2)}, A {number(w.a, 2)}, R {number(w.r, 2)}, F {number(w.f, 2)}.</p>
      </section>
      <section className="card">
        <SectionTitle title="Syarat wajib & ambang" />
        <label className="field"><span className="field-label">Toleransi level kompetensi</span>
          <select className="select" value={draft.levelTolerance} onChange={e => { setDraft(d => ({ ...d, levelTolerance: Number(e.target.value) })); setSaved(false); }}>
            <option value={0}>Harus sama dengan level dibutuhkan</option><option value={1}>Boleh 1 level di bawah</option><option value={2}>Boleh 2 level di bawah</option>
          </select><span className="field-hint">Anggota di bawah batas ini tidak ikut diperingkat.</span>
        </label>
        <label className="field spaced"><span className="field-label">Ambang risiko beban: {Math.round(draft.overloadAt * 100)}%</span>
          <input type="range" min={70} max={100} step={5} value={draft.overloadAt * 100} onChange={e => { setDraft(d => ({ ...d, overloadAt: Number(e.target.value) / 100 })); setSaved(false); }} aria-label="Ambang risiko beban" />
          <span className="field-hint">Utilisasi sesudah penugasan di atas ini menambah faktor risiko F.</span>
        </label>
        <div className="form-actions">
          <button type="button" className="button secondary" onClick={() => { setDraft(DEFAULT_SETTINGS); setSaved(false); }}><Icon icon={RotateCcw} size={16} />Kembalikan default</button>
          <button type="button" className="button primary" onClick={() => { dispatch({ type: "settings", settings: draft }); setSaved(true); }}>Simpan aturan</button>
        </div>
      </section>
    </div>
  </div>;
}

const ACCESS: Record<Member["access"], string> = { admin: "Admin", manajer: "Manajer", anggota: "Anggota" };

export function MemberSettings() {
  const { members, dispatch } = useDemo();
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const [error, setError] = useState("");
  return <div className="page-enter">
    <PageHeading title="Anggota & peran" subtitle="Atur siapa yang bisa menugaskan dan siapa yang hanya menerima penugasan." actions={<button className="button primary" onClick={() => setInviting(true)}><Icon icon={UserPlus} />Undang anggota</button>} />
    <section className="card">
      <div className="table-scroll stack-table"><table>
        <thead><tr><th>Nama</th><th>Email</th><th>Peran akses</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td><strong>Krisna Panca</strong></td><td data-label="Email">krisna@positifprofesional.id</td><td data-label="Peran"><Badge tone="ok">Admin</Badge></td><td data-label="Status">Aktif</td></tr>
          {members.map(m => <tr key={m.id}>
            <td><strong>{m.name}</strong></td>
            <td data-label="Email">{m.email}</td>
            <td data-label="Peran"><div className="level-select" role="group" aria-label={`Peran akses ${m.name}`}>{(Object.keys(ACCESS) as Member["access"][]).map(a => <button key={a} type="button" className={m.access === a ? "selected" : ""} aria-pressed={m.access === a} onClick={() => dispatch({ type: "upsertMember", member: { ...m, access: a } })}>{ACCESS[a]}</button>)}</div></td>
            <td data-label="Status">{m.availableHours === null ? <Badge tone="warn">Undangan belum diselesaikan</Badge> : "Aktif"}</td>
          </tr>)}
          {sent.map(s => <tr key={s}><td><span className="muted">Menunggu</span></td><td data-label="Email">{s}</td><td data-label="Peran">Anggota</td><td data-label="Status"><Badge>Undangan terkirim</Badge></td></tr>)}
        </tbody>
      </table></div>
    </section>
    {inviting && <Modal title="Undang anggota" onClose={() => setInviting(false)}>
      <form noValidate onSubmit={e => { e.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Email belum valid."); setSent(s => [...s, email]); setEmail(""); setInviting(false); }}>
        <p className="dialog-summary">Undangan berlaku 7 hari. Di mockup, email tidak benar-benar dikirim.</p>
        <label className="field"><span className="field-label">Email</span><input className="input" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="wulan@positifprofesional.id" /></label>
        {error && <p className="field-error spaced" role="alert">{error}</p>}
        <div className="dialog-actions"><button type="button" className="button secondary" onClick={() => setInviting(false)}>Batal</button><button type="submit" className="button primary">Kirim undangan</button></div>
      </form>
    </Modal>}
  </div>;
}

/** P32: paket dan harga menunggu rancangan bisnis tim (00-BRIEF P8); jumlah kursi dihitung dari data. */
export function Billing() {
  const { members } = useDemo();
  const seats = members.length + 1;
  return <div className="page-enter">
    <PageHeading title="Tagihan" subtitle="Paket, jumlah kursi, dan riwayat invoice ruang kerja." />
    <div className="metrics-grid three">
      <MetricCard icon={UserPlus} label="Kursi terpakai" value={String(seats)} unit="pengguna" note={`Admin + ${members.length} anggota`} />
      <MetricCard icon={ReceiptText} label="Paket" value="Belum dipilih" note="Pilihan paket menyusul rancangan bisnis" />
      <MetricCard icon={CircleCheck} label="Status langganan" value="Belum aktif" note="Belum ada tagihan berjalan" />
    </div>
    <section className="card">
      <SectionTitle title="Riwayat invoice" />
      <EmptyState icon={ReceiptText} title="Belum ada invoice" text="Invoice muncul di sini setelah paket dipilih. Harga dan cara bayar sedang dirancang tim." action={<Link className="button secondary" href="/harga">Lihat halaman harga</Link>} />
    </section>
  </div>;
}
