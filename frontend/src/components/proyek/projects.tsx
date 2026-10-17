"use client";

import { DatePicker } from "@/components/ui/date-picker";
import Link from "next/link";
import { use, useState } from "react";
import { ArrowRight, CircleAlert, FolderPlus } from "lucide-react";
import { EmptyState, PageHeading, Person, PriorityBadge, SectionTitle, StatusBadge } from "@/components/app/parts";
import { Icon, Modal } from "@/components/ui";
import { GlassFolder } from "@/components/ui/glass-folder";
import { NOW } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import { hours, shortDate } from "@/lib/format";

export function Projects() {
  const { projects, tasks, dispatch } = useDemo();
  const [adding, setAdding] = useState(false);
  return <div className="page-enter">
    <PageHeading title="Proyek" subtitle="Kelompokkan tugas per proyek atau klien untuk melihat beban dan tenggat bersama." actions={<button className="button primary" onClick={() => setAdding(true)}><Icon icon={FolderPlus} />Buat proyek</button>} />
    <div className="project-folders">{projects.map((p, i) => {
      const own = tasks.filter(t => t.projectId === p.id && t.assignments.every(a => a.hours > 0));
      const open = own.filter(t => t.status !== "selesai").sort((a, b) => a.dueDate.localeCompare(b.dueDate));
      return <div key={p.id} className="project-folder">
        <div className="project-folder-art"><GlassFolder label={p.name} meta={`${open.length} tugas terbuka · tenggat ${shortDate(p.dueDate)}`} seed={i * 7 + 3} art={i % 2 ? "streak" : "marble"}
          files={open.map(t => ({ name: t.title, meta: shortDate(t.dueDate), href: `/tugas/${t.id}` }))}
          menu={[{ label: "Lihat detail proyek", href: `/proyek/${p.id}` }, { label: "Buat tugas", href: "/tugas/baru" }]} />
          <Link className="project-folder-cover" href={`/proyek/${p.id}`} aria-hidden="true" tabIndex={-1} /></div>
        <div className="project-folder-caption"><strong>{p.name}</strong><span>{open.length} tugas terbuka · tenggat {shortDate(p.dueDate)}</span></div>
        <div className="project-folder-info"><span>{p.client}</span><Link className="text-link" href={`/proyek/${p.id}`}>Detail proyek<Icon icon={ArrowRight} size={14} /></Link></div>
      </div>;
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
        <label className="field"><span className="field-label">Tenggat</span><DatePicker value={due} onChange={v => { setDue(v); setError(""); }} /></label>
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
