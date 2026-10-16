"use client";

import Link from "next/link";
import { use, useState } from "react";
import { CalendarClock, CircleAlert, FolderPlus, ListTodo } from "lucide-react";
import { EmptyState, PageHeading, Person, PriorityBadge, SectionTitle, StatusBadge } from "@/components/app/parts";
import { Icon, Modal } from "@/components/ui";
import { NOW } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import { hours, shortDate } from "@/lib/format";

export function Projects() {
  const { projects, tasks, memberById, dispatch } = useDemo();
  const [adding, setAdding] = useState(false);
  return <div className="page-enter">
    <PageHeading title="Proyek" subtitle="Kelompokkan tugas per proyek atau klien untuk melihat beban dan tenggat bersama." actions={<button className="button primary" onClick={() => setAdding(true)}><Icon icon={FolderPlus} />Buat proyek</button>} />
    <div className="candidate-grid">{projects.map(p => {
      const own = tasks.filter(t => t.projectId === p.id && t.assignments.every(a => a.hours > 0));
      const open = own.filter(t => t.status !== "selesai");
      const people = [...new Set(own.flatMap(t => t.assignments.map(a => a.memberId)))].map(memberById).filter(m => m !== undefined);
      return <Link key={p.id} href={`/proyek/${p.id}`} className="card candidate-card">
        <div><h2>{p.name}</h2><p className="small muted">{p.client}</p></div>
        <div className="dna-row"><span className="muted small with-icon"><Icon icon={CalendarClock} size={13} />Tenggat proyek</span><strong>{shortDate(p.dueDate)}</strong></div>
        <div className="dna-row"><span className="muted small with-icon"><Icon icon={ListTodo} size={13} />Tugas terbuka</span><strong>{open.length} dari {own.length}</strong></div>
        <div className="chips">{people.map(m => <span key={m.id} className="chip">{m.name}</span>)}</div>
      </Link>;
    })}</div>
    {adding && <AddProject onClose={() => setAdding(false)} onSave={(name, client, dueDate) => { dispatch({ type: "addProject", project: { id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, client, dueDate } }); setAdding(false); }} />}
  </div>;
}

function AddProject({ onClose, onSave }: { onClose: () => void; onSave: (name: string, client: string, due: string) => void }) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [due, setDue] = useState("2026-11-30");
  const [error, setError] = useState("");
  return <Modal title="Buat proyek" onClose={onClose}>
    <form noValidate onSubmit={e => { e.preventDefault(); if (name.trim().length < 3) return setError("Tulis nama proyek."); if (due < NOW.slice(0, 10)) return setError("Tenggat sudah lewat."); onSave(name.trim(), client.trim() || "Internal", due); }}>
      <div className="form-grid">
        <label className="field full"><span className="field-label">Nama proyek</span><input className="input" value={name} onChange={e => { setName(e.target.value); setError(""); }} placeholder="Aplikasi reservasi Homestay Ijen" /></label>
        <label className="field"><span className="field-label">Klien</span><input className="input" value={client} onChange={e => setClient(e.target.value)} placeholder="CV Kawah Biru Banyuwangi" /></label>
        <label className="field"><span className="field-label">Tenggat</span><input className="input" type="date" value={due} onChange={e => { setDue(e.target.value); setError(""); }} /></label>
      </div>
      {error && <p className="field-error spaced" role="alert">{error}</p>}
      <div className="dialog-actions"><button type="button" className="button secondary" onClick={onClose}>Batal</button><button type="submit" className="button primary">Buat proyek</button></div>
    </form>
  </Modal>;
}

export function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { projectById, tasks, memberById } = useDemo();
  const project = projectById(id);
  if (!project) return <EmptyState icon={CircleAlert} title="Proyek tidak ditemukan" text="Proyek ini tidak ada." action={<Link className="button secondary" href="/proyek">Kembali ke Proyek</Link>} />;
  const own = tasks.filter(t => t.projectId === id && t.assignments.every(a => a.hours > 0));
  return <div className="page-enter">
    <PageHeading title={project.name} subtitle={`${project.client} · tenggat ${shortDate(project.dueDate)}`} actions={<Link className="button primary" href="/tugas/baru">Buat tugas</Link>} />
    <section className="card">
      <SectionTitle title="Tugas proyek" subtitle={`${own.length} tugas`} />
      <div className="table-scroll stack-table"><table>
        <thead><tr><th>Tugas</th><th>Prioritas</th><th>Status</th><th>Penanggung jawab</th><th className="numeric">Estimasi</th><th>Tenggat</th></tr></thead>
        <tbody>{own.map(t => <tr key={t.id}>
          <td><Link href={`/tugas/${t.id}`}><strong>{t.title}</strong></Link><span className="table-sub mono">{t.id}</span></td>
          <td data-label="Prioritas"><PriorityBadge priority={t.priority} /></td>
          <td data-label="Status"><StatusBadge status={t.status} /></td>
          <td data-label="Penanggung jawab">{t.assignments.length ? t.assignments.map(a => { const m = memberById(a.memberId); return m ? <Person key={m.id} member={m} /> : null; }) : <span className="muted">Belum ada</span>}</td>
          <td data-label="Estimasi" className="numeric">{hours(t.dna?.effortHours ?? t.assignments.reduce((s, a) => s + a.hours, 0))}</td>
          <td data-label="Tenggat">{shortDate(t.dueDate)}</td>
        </tr>)}</tbody>
      </table></div>
    </section>
  </div>;
}
