"use client";

import { Paged } from "@/components/ui/pager";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Layers, Plus, Search, SearchX } from "lucide-react";
import { EmptyState, PageHeading, Person, PriorityBadge, StatusBadge } from "@/components/app/parts";
import { Icon } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import type { Priority, TaskStatus } from "@/lib/demo/types";
import { date, hours, shortDate } from "@/lib/format";

const FILTERS: { value: TaskStatus | "semua"; label: string }[] = [
  { value: "semua", label: "Semua status" },
  { value: "belum", label: "Belum ditugaskan" },
  { value: "menunggu", label: "Menunggu jawaban" },
  { value: "berjalan", label: "Berjalan" },
  { value: "selesai", label: "Selesai" },
  { value: "draf", label: "Draf" },
];

export function TaskList() {
  const { tasks, names, memberById, projectById } = useDemo();
  const params = useSearchParams();
  const router = useRouter();
  const status = (params.get("status") ?? "semua") as TaskStatus | "semua";
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<Priority | "semua">("semua");
  const current = tasks.filter(t => t.status !== "selesai" || t.assignments.some(a => a.hours > 0));
  const shown = current.filter(t =>
    (status === "semua" || t.status === status) &&
    (priority === "semua" || t.priority === priority) &&
    `${t.title} ${t.description} ${t.id}`.toLowerCase().includes(query.toLowerCase()),
  );
  const count = (s: TaskStatus | "semua") => s === "semua" ? current.length : current.filter(t => t.status === s).length;
  return <div className="page-enter">
    <PageHeading title="Tugas" subtitle="Kelola daftar tugas, alokasi kerja anggota, dan status penugasan adaptif." actions={<>
      <Link className="button secondary" href="/tugas/alokasi-batch"><Icon icon={Layers} />Alokasi batch</Link>
      <Link className="button primary" href="/tugas/baru"><Icon icon={Plus} />Buat tugas</Link>
    </>} />
    <section className="card">
      <div className="toolbar">
        <label className="search-field"><Icon icon={Search} size={16} /><span className="sr-only">Cari tugas</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama tugas atau deskripsi" /></label>
        <label className="filter-select"><span className="sr-only">Prioritas</span>
          <select value={priority} onChange={e => setPriority(e.target.value as Priority | "semua")}>
            <option value="semua">Semua prioritas</option><option value="tinggi">Tinggi</option><option value="normal">Normal</option><option value="rendah">Rendah</option>
          </select>
        </label>
      </div>
      <div className="toggle" role="group" aria-label="Filter status">
        {FILTERS.filter(f => f.value === "semua" || count(f.value)).map(f => <button key={f.value} className={status === f.value ? "selected" : ""} aria-pressed={status === f.value} onClick={() => router.replace(f.value === "semua" ? "/tugas" : `/tugas?status=${f.value}`, { scroll: false })}>{f.label} ({count(f.value)})</button>)}
      </div>
      {shown.length ? <Paged items={shown} unit="tugas">{(paged) => <><div className="table-scroll stack-table spaced"><table>
        <thead><tr><th>Tugas & kebutuhan</th><th>Prioritas</th><th>Status</th><th>Penanggung jawab</th><th className="numeric">Sisa estimasi</th><th>Tenggat</th><th className="numeric">Aksi</th></tr></thead>
        <tbody>{paged.map(t => {
          const assignees = t.assignments.map(a => memberById(a.memberId)).filter(m => m !== undefined);
          const need = t.dna ? t.dna.requirements.map(r => names[r.competencyId]).join(", ") : t.competencyIds.map(c => names[c]).join(", ") || "Belum dianalisis";
          return <tr key={t.id}>
            <td><Link href={`/tugas/${t.id}`}><strong>{t.title}</strong></Link><span className="table-sub"><span className="mono">{t.id}</span> · {projectById(t.projectId)?.name}</span><span className="table-sub">Kebutuhan: {need}</span></td>
            <td data-label="Prioritas"><PriorityBadge priority={t.priority} /></td>
            <td data-label="Status"><StatusBadge status={t.status} /></td>
            <td data-label="Penanggung jawab">{assignees.length ? assignees.map(m => <Person key={m.id} member={m} />) : <span className="muted">Belum ada penanggung jawab</span>}</td>
            <td data-label="Sisa estimasi" className="numeric">{t.status === "selesai" ? <span className="muted">0 jam ({hours(t.assignments.reduce((s, a) => s + a.hours, 0))})</span> : t.status === "berjalan" ? `${hours(t.remainingHours)} tersisa` : hours(t.dna?.effortHours ?? t.remainingHours)}</td>
            <td data-label="Tenggat" title={date(t.dueDate)}>{shortDate(t.dueDate)}</td>
            <td className="numeric">{t.status === "belum" ? <Link className="row-link accent" href={t.dna?.confirmed ? `/tugas/${t.id}/kandidat` : `/tugas/${t.id}/dna`}>Cari kandidat</Link> : t.status === "draf" ? <Link className="row-link" href={`/tugas/${t.id}/dna`}>Lanjutkan</Link> : <Link className="row-link" href={`/tugas/${t.id}`}>Buka tugas</Link>}</td>
          </tr>;
        })}</tbody>
      </table></div></>}</Paged> : <EmptyState icon={SearchX} title="Tidak ada tugas yang cocok" text="Ubah kata kunci atau filter status dan prioritas." action={<button className="button secondary" onClick={() => { setQuery(""); setPriority("semua"); router.replace("/tugas"); }}>Hapus filter</button>} />}
      <div className="table-footer"><span>Menampilkan {shown.length} dari {current.length} tugas periode ini</span><span>Diperbarui 09.15 WIB</span></div>
    </section>
  </div>;
}
