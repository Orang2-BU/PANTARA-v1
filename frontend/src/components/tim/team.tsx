"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldAlert, UserPlus, Users, UserCheck, Search, SearchX } from "lucide-react";
import { CapacityBar, DataBadge, EmptyState, MetricCard, PageHeading, Person } from "@/components/app/parts";
import { Badge, Icon, Modal } from "@/components/ui";
import { PERIOD } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import type { Member } from "@/lib/demo/types";
import { allocatedHours, nearbyDeadlines } from "@/lib/engine/score";
import { shortDate } from "@/lib/format";

export function Team() {
  const { members, tasks, names, dispatch } = useDemo();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("semua");
  const [data, setData] = useState<"semua" | "lengkap" | "belum">("semua");
  const [adding, setAdding] = useState(false);
  const roles = [...new Set(members.map(m => m.role))];
  const complete = members.filter(m => m.availableHours !== null);
  const shown = members.filter(m =>
    (role === "semua" || m.role === role) &&
    (data === "semua" || (data === "lengkap") === (m.availableHours !== null)) &&
    `${m.name} ${m.role} ${m.competencies.map(c => names[c.id]).join(" ")}`.toLowerCase().includes(query.toLowerCase()),
  );
  const incomplete = members.filter(m => m.availableHours === null);
  return <div className="page-enter">
    <PageHeading title="Tim" subtitle="Kelola profil kerja (Work Twin), verifikasi kompetensi, dan status kelengkapan data kapasitas anggota." actions={<button className="button primary" onClick={() => setAdding(true)}><Icon icon={UserPlus} />Tambah anggota</button>} />
    <div className="metrics-grid three">
      <MetricCard icon={Users} label="Total anggota" value={String(members.length)} unit="anggota" note={roles.map(r => `${members.filter(m => m.role === r).length} ${r.split(" ")[0].toLowerCase()}`).join(", ")} />
      <MetricCard icon={UserCheck} label="Kelengkapan data kapasitas" value={String(complete.length)} unit={`dari ${members.length} terverifikasi`} note="Ketersediaan dan beban aktif tercatat" tone="brand" />
      <MetricCard icon={ShieldAlert} label="Perhatian operasional" value={String(incomplete.length)} unit="profil belum lengkap" note={incomplete.length ? `Ketersediaan ${incomplete.map(m => m.name).join(", ")} belum diisi` : "Semua profil lengkap"} tone={incomplete.length ? "warn" : undefined} />
    </div>
    <section className="card">
      <div className="toolbar">
        <label className="search-field"><Icon icon={Search} size={16} /><span className="sr-only">Cari anggota</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama, peran, atau keahlian" /></label>
        <label className="filter-select"><span className="sr-only">Peran</span><select value={role} onChange={e => setRole(e.target.value)}><option value="semua">Semua peran</option>{roles.map(r => <option key={r}>{r}</option>)}</select></label>
      </div>
      <div className="toggle" role="group" aria-label="Filter kelengkapan">
        {([["semua", `Semua status (${members.length})`], ["lengkap", `Data lengkap (${complete.length})`], ["belum", `Perlu dilengkapi (${incomplete.length})`]] as const).map(([v, l]) => <button key={v} className={data === v ? "selected" : ""} aria-pressed={data === v} onClick={() => setData(v)}>{l}</button>)}
      </div>
      {shown.length ? <div className="table-scroll stack-table spaced"><table>
        <thead><tr><th>Anggota & keahlian</th><th>Peran</th><th>Alokasi kapasitas ({PERIOD.label})</th><th>Tugas aktif</th><th>Status data</th><th className="numeric">Aksi</th></tr></thead>
        <tbody>{shown.map(m => {
          const active = tasks.filter(t => (t.status === "berjalan" || t.status === "menunggu") && t.assignments.some(a => a.memberId === m.id));
          const near = m.availableHours !== null && nearbyDeadlines(m.id, "2026-10-02", tasks).length > 0;
          return <tr key={m.id} className={m.availableHours === null ? "row-highlight" : ""}>
            <td><Link href={`/tim/${m.id}`}><Person member={m} sub={m.competencies.slice(0, 3).map(c => names[c.id]).join(", ")} /></Link></td>
            <td data-label="Peran">{m.role}</td>
            <td data-label="Kapasitas"><CapacityBar allocated={allocatedHours(m.id, tasks)} available={m.availableHours} /></td>
            <td data-label="Tugas aktif">{active.length ? <>{active.slice(0, 1).map(t => <Link key={t.id} className="text-link" href={`/tugas/${t.id}`}>{t.title}</Link>)}{active.length > 1 && <span className="table-sub">+{active.length - 1} tugas lain</span>}{near && m.id === "citra" && <span className="table-sub"><Badge tone="warn">Tenggat berdekatan ({shortDate("2026-10-02")})</Badge></span>}</> : <span className="muted">Belum ada penugasan aktif</span>}</td>
            <td data-label="Status data"><DataBadge complete={m.availableHours !== null} /></td>
            <td className="numeric">{m.availableHours === null ? <Link className="row-link accent" href={`/tim/${m.id}?lengkapi=1`}>Lengkapi data</Link> : <Link className="row-link" href={`/tim/${m.id}`}>Buka profil</Link>}</td>
          </tr>;
        })}</tbody>
      </table></div> : <EmptyState icon={SearchX} title="Tidak ada anggota yang cocok" text="Ubah kata kunci atau filter." />}
      <div className="table-footer"><span>Menampilkan {shown.length} dari {members.length} anggota tim</span><span>Jam kerja, bukan ukuran produktivitas</span></div>
    </section>
    {adding && <AddMember onClose={() => setAdding(false)} onSave={m => { dispatch({ type: "upsertMember", member: m }); setAdding(false); }} />}
  </div>;
}

function AddMember({ onClose, onSave }: { onClose: () => void; onSave: (m: Member) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Pengembang perangkat lunak");
  const [error, setError] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 3) return setError("Tulis nama lengkap anggota.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Email belum valid.");
    const initials = name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
    onSave({ id: name.trim().toLowerCase().replace(/[^a-z]+/g, "-"), name: name.trim(), initials, role, email, availableHours: null, leaveDates: [], weeklyLimit: 32, competencies: [], prefers: [], avoids: [], access: "anggota" });
  }
  return <Modal title="Tambah anggota" onClose={onClose}>
    <form onSubmit={submit} noValidate>
      <p className="dialog-summary">Anggota baru menerima undangan untuk mengisi kompetensi dan ketersediaannya sendiri. Sampai diisi, ia tidak ikut rekomendasi.</p>
      <div className="form-grid">
        <label className="field full"><span className="field-label">Nama lengkap</span><input className="input" value={name} onChange={e => { setName(e.target.value); setError(""); }} placeholder="Sekar Ayuningtyas" /></label>
        <label className="field full"><span className="field-label">Email kerja</span><input className="input" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="sekar@positifprofesional.id" /></label>
        <label className="field full"><span className="field-label">Peran</span><select className="select" value={role} onChange={e => setRole(e.target.value)}><option>Pengembang perangkat lunak</option><option>Desainer produk</option><option>Penguji perangkat lunak / QA</option></select></label>
      </div>
      {error && <p className="field-error spaced" role="alert">{error}</p>}
      <div className="dialog-actions"><button type="button" className="button secondary" onClick={onClose}>Batal</button><button type="submit" className="button primary"><Icon icon={UserPlus} />Tambah & undang</button></div>
    </form>
  </Modal>;
}
