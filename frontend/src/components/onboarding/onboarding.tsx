"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CircleCheck, FileUp, ShieldAlert } from "lucide-react";
import { PageHeading, SectionTitle } from "@/components/app/parts";
import { Badge, Icon } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import type { Level, Member } from "@/lib/demo/types";

const SAMPLE = `nama,email,peran,kompetensi
Sekar Ayuningtyas,sekar@positifprofesional.id,Pengembang perangkat lunak,react:2;tailwind:2
Fajar Nugroho,fajar@positifprofesional.id,Pengembang perangkat lunak,backend-api:2;sql:3
Wulan Sari,wulan-email-salah,Desainer produk,uiux:3`;

interface Row { line: number; member?: Member; error?: string }

export function Onboarding() {
  const { competencies, members, dispatch } = useDemo();
  const [step, setStep] = useState(0);
  const [csv, setCsv] = useState(SAMPLE);
  const [rows, setRows] = useState<Row[]>([]);
  const [done, setDone] = useState(false);
  const known = new Set(competencies.map(c => c.id));

  function parse(text: string) {
    const lines = text.trim().split(/\r?\n/).slice(1);
    setRows(lines.map((l, i) => {
      const [name, email, role, comp = ""] = l.split(",").map(s => s.trim());
      if (!name || !email || !role) return { line: i + 2, error: "Kolom nama, email, atau peran kosong" };
      if (!/^\S+@\S+\.\S+$/.test(email)) return { line: i + 2, error: `Email "${email}" tidak valid` };
      if (members.some(m => m.email === email)) return { line: i + 2, error: "Email sudah terdaftar" };
      const parsed = comp.split(";").filter(Boolean).map(c => c.split(":"));
      const bad = parsed.find(([id, lv]) => !known.has(id) || !["1", "2", "3"].includes(lv));
      if (bad) return { line: i + 2, error: `Kompetensi "${bad.join(":")}" tidak ada di katalog atau level bukan 1-3` };
      return { line: i + 2, member: { id: email.split("@")[0], name, email, role, initials: name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase(), availableHours: null, leaveDates: [], weeklyLimit: 32, competencies: parsed.map(([id, lv]) => ({ id, level: Number(lv) as Level, source: "klaim" as const })), prefers: [], avoids: [], access: "anggota" } };
    }));
    setStep(2);
  }

  const valid = rows.filter(r => r.member);
  return <div className="page-enter">
    <PageHeading title="Siapkan ruang kerja" subtitle="Tiga langkah supaya rekomendasi punya data: periode, data anggota, undangan." />
    <ol className="toggle flow-steps" aria-label="Langkah onboarding">{["Periode & jam kerja", "Impor anggota (CSV)", "Periksa & undang"].map((s, i) => <li key={s} className={`toggle-item ${i === step ? "selected" : ""} ${i < step ? "done" : ""}`} aria-current={i === step ? "step" : undefined}>{i + 1}. {s}</li>)}</ol>
    {step === 0 && <section className="card form-card">
      <SectionTitle title="Periode & jam kerja" subtitle="Bisa diubah nanti di Pengaturan." />
      <div className="form-grid">
        <label className="field"><span className="field-label">Periode kapasitas</span><select className="select" defaultValue="mingguan"><option value="mingguan">Mingguan</option><option value="2-mingguan">2 mingguan</option></select></label>
        <label className="field"><span className="field-label">Jam proyek default per minggu</span><input className="input" type="number" defaultValue={32} /></label>
      </div>
      <div className="form-actions"><button className="button primary" onClick={() => setStep(1)}>Lanjut<Icon icon={ArrowRight} size={16} /></button></div>
    </section>}
    {step === 1 && <section className="card form-card">
      <SectionTitle title="Impor anggota dari CSV" subtitle="Kolom: nama, email, peran, kompetensi (id:level dipisah titik koma). Contoh sudah diisi, termasuk satu baris salah." />
      <label className="field"><span className="field-label">Isi CSV</span><textarea className="mono" value={csv} onChange={e => setCsv(e.target.value)} rows={7} /></label>
      <label className="field spaced"><span className="field-label">Atau pilih file .csv</span><input className="input" type="file" accept=".csv,text/csv" onChange={async e => { const f = e.target.files?.[0]; if (f) setCsv(await f.text()); }} /></label>
      <div className="form-actions"><button className="button secondary" onClick={() => setStep(0)}>Kembali</button><button className="button primary" onClick={() => parse(csv)}><Icon icon={FileUp} size={16} />Periksa data</button></div>
    </section>}
    {step === 2 && <section className="card">
      <SectionTitle title="Hasil pemeriksaan" subtitle={`${valid.length} baris siap, ${rows.length - valid.length} perlu diperbaiki`} />
      {done ? <div className="decision-banner" role="status"><Icon icon={CircleCheck} /><span><strong>{valid.length} anggota ditambahkan</strong><span>Undangan dikirim (simulasi). Mereka mengisi ketersediaan sendiri sebelum ikut rekomendasi.</span></span><Link className="row-link" href="/tim">Lihat tim</Link></div> : null}
      <div className="table-scroll stack-table"><table>
        <thead><tr><th>Baris</th><th>Anggota</th><th>Kompetensi</th><th>Status</th></tr></thead>
        <tbody>{rows.map(r => <tr key={r.line} className={r.error ? "row-highlight" : ""}>
          <td className="mono">{r.line}</td>
          <td data-label="Anggota">{r.member ? <><strong>{r.member.name}</strong><span className="table-sub">{r.member.email} · {r.member.role}</span></> : <span className="muted">-</span>}</td>
          <td data-label="Kompetensi">{r.member?.competencies.map(c => c.id).join(", ") ?? "-"}</td>
          <td data-label="Status">{r.error ? <span className="warn-text small with-icon"><Icon icon={ShieldAlert} size={13} />{r.error}</span> : <Badge tone="ok">Siap</Badge>}</td>
        </tr>)}</tbody>
      </table></div>
      <div className="form-actions"><button className="button secondary" onClick={() => setStep(1)}>Perbaiki CSV</button><button className="button primary" disabled={!valid.length || done} onClick={() => { valid.forEach(r => dispatch({ type: "upsertMember", member: r.member! })); setDone(true); }}>Tambah {valid.length} anggota & undang</button></div>
    </section>}
  </div>;
}
