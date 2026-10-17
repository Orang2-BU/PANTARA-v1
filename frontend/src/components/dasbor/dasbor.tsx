"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, ArrowUpRight, CalendarClock, ClipboardList, Hourglass, Inbox, Plus, UserCheck } from "lucide-react";
import { CapacityBar, DataBadge, MetricCard, PageHeading, Person, PriorityBadge, SectionTitle } from "@/components/app/parts";
import { Icon } from "@/components/ui";
import { FluidArt } from "@/components/ui/fluid-art";
import { PERIOD, NOW } from "@/lib/demo/seed";
import { replanMessage } from "@/lib/demo/notifications";
import { useDemo } from "@/lib/demo/store";
import { replanRisks } from "@/lib/engine/capacity";
import { allocatedHours, clashingDeadline } from "@/lib/engine/score";
import { dayDate, hours, number, percent, shortDate } from "@/lib/format";
import { Paged } from "@/components/ui/pager";

/** Daftar di kolom kanan dipotong supaya tinggi kolom kanan sejajar 10 baris tabel kapasitas. */
const QUEUE_SIZE = 2;
const NOTES_SIZE = 2;

export function Dasbor() {
  const { tasks, members, names } = useDemo();
  const open = tasks.filter(t => t.status === "belum").sort((a, b) => (a.priority === "tinggi" ? -1 : 0) - (b.priority === "tinggi" ? -1 : 0) || a.dueDate.localeCompare(b.dueDate));
  const complete = members.filter(m => m.availableHours !== null);
  const notes = [
    ...replanRisks(tasks, members, NOW.slice(0, 10)).map(r => ({ id: `ulang-${r.task.id}-${r.member.id}`, name: `Perlu jadwal ulang: ${r.task.title}`, text: replanMessage(r), href: `/tugas/${r.task.id}` })),
    ...members.filter(m => m.availableHours === null).map(m => ({ id: m.id, name: m.name, text: "Ketersediaan belum diisi untuk periode ini.", href: `/tim/${m.id}` })),
    ...members.filter(m => m.availableHours !== null).flatMap(m => {
      const near = clashingDeadline(m.id, tasks);
      return near ? [{ id: m.id, name: m.name, text: `Dua tugas aktif bertenggat berdekatan sekitar ${shortDate(near)}.`, href: `/tim/${m.id}` }] : [];
    }),
  ];
  const waiting = tasks.filter(t => t.status === "menunggu").length;
  const rejected = open.filter(t => t.responseReason).length;
  const teamCapacity = complete.reduce((s, m) => s + (m.availableHours ?? 0), 0);
  const teamAllocated = complete.reduce((s, m) => s + allocatedHours(m.id, tasks), 0);
  const next = open[0];
  return <div className="page-enter">
    <PageHeading title="Dashboard" subtitle={`${dayDate(NOW)} · Gambaran kerja semua karyawan, sebelum keputusan berikutnya.`} actions={<Link className="button primary" href="/tugas/baru"><Icon icon={Plus} />Buat tugas</Link>} />
    <div className="metrics-grid">
      <MetricCard icon={ClipboardList} label="Tugas belum ditugaskan" value={String(open.length)} unit="tugas" note="Menunggu keputusan penugasan" tone={open.length ? "warn" : undefined} href="/tugas?status=belum" />
      <MetricCard icon={UserCheck} label="Data kapasitas lengkap" value={String(complete.length)} unit={`dari ${members.length} karyawan`} note="Kompetensi dan ketersediaan tercatat" tone="brand" href="/tim" />
      <MetricCard icon={AlertTriangle} label="Perlu ditinjau" value={String(notes.length)} unit="konteks kerja" note="Kelengkapan data dan potensi konflik" tone={notes.length ? "warn" : undefined} href="#catatan" />
      <MetricCard icon={Inbox} label="Menunggu jawaban karyawan" value={String(waiting)} unit="penugasan" note={rejected ? `${rejected} ditolak karyawan, perlu ditugaskan ulang` : "Belum ada penugasan yang ditolak"} tone={rejected ? "warn" : undefined} href={rejected ? "/tugas?status=belum" : "/tugas?status=menunggu"} />
    </div>
    <div className="split-main">
      <section className="card capacity-card">
        <SectionTitle title="Kapasitas karyawan" subtitle={`Alokasi waktu semua karyawan di semua proyek, periode ${PERIOD.label}. Jam kerja, bukan ukuran produktivitas.`} action={<Link className="text-link" href="/kapasitas">Lihat semua<Icon icon={ArrowRight} size={14} /></Link>} />
        <div className="team-total" aria-label="Total kapasitas semua karyawan">
          <div><span>Total semua karyawan</span><strong>{percent(teamAllocated / teamCapacity, 1)}</strong><span>teralokasi, dari {number(complete.length)} karyawan dengan data lengkap</span></div>
          <CapacityBar allocated={teamAllocated} available={teamCapacity} />
        </div>
        <Paged items={members} unit="karyawan">{(paged) => <div className="table-scroll stack-table"><table>
          <thead><tr><th>Karyawan</th><th>Kapasitas teralokasi</th><th className="numeric">Data</th></tr></thead>
          <tbody>{paged.map(m => <tr key={m.id} className={m.availableHours === null ? "row-highlight" : ""}>
            <td><Link href={`/tim/${m.id}`}><Person member={m} /></Link></td>
            <td data-label="Kapasitas"><CapacityBar allocated={allocatedHours(m.id, tasks)} available={m.availableHours} /></td>
            <td data-label="Data" className="numeric"><DataBadge complete={m.availableHours !== null} /></td>
          </tr>)}</tbody>
        </table></div>}</Paged>
      </section>
      <div className="stack">
        {next ? <section className="highlight-card" aria-label="Penugasan berikutnya"><FluidArt className="highlight-art" style="streak" seed={3} w={720} h={360} />
          <div className="highlight-top"><span>Perlu penugasan · {open.length} tugas</span><span className="mono">{next.id}</span></div>
          <h2>{next.title}</h2>
          <div className="highlight-row">
            <span className="inverse-muted small with-icon"><Icon icon={CalendarClock} size={14} />Tenggat {shortDate(next.dueDate)} · {hours(next.dna?.effortHours ?? next.remainingHours)}</span>
            <PriorityBadge priority={next.priority} />
          </div>
          <p>Kebutuhan: {(next.dna?.requirements ?? []).map(r => names[r.competencyId]).join(", ") || "belum dianalisis"}.</p>
          <Link className="button inverse" href={next.dna?.confirmed ? `/tugas/${next.id}/kandidat` : `/tugas/${next.id}/kebutuhan`}>Tinjau kandidat<span className="button-circle"><Icon icon={ArrowUpRight} size={16} /></span></Link>
        </section> : <section className="card"><SectionTitle title="Semua tugas sudah ditugaskan" subtitle="Tidak ada keputusan yang menunggu." /></section>}
        {open.length > 1 && <section className="card mesh mesh-1">
          <SectionTitle title="Antrean berikutnya" />
          <Paged items={open.slice(1)} unit="tugas" size={QUEUE_SIZE} compact>{(paged) => <div className="side-list">{paged.map(t => <div key={t.id} className="dna-row">
            <div><h4>{t.title}</h4><p className="with-icon"><Icon icon={Hourglass} size={12} />{shortDate(t.dueDate)} · {hours(t.dna?.effortHours ?? t.remainingHours)}</p></div>
            <Link className="row-link" href={`/tugas/${t.id}/kandidat`}>Tinjau kandidat</Link>
          </div>)}</div>}</Paged>
        </section>}
        <section className="card mesh mesh-2" id="catatan">
          <SectionTitle title="Catatan untuk ditinjau" />
          {notes.length ? <Paged items={notes} unit="catatan" size={NOTES_SIZE} compact>{(paged) => <div className="side-list">{paged.map(n => <div key={n.id} className="dna-row">
            <div><h4>{n.name}</h4><p>{n.text}</p></div>
            <Link className="row-link" href={n.href}>Lihat konteks</Link>
          </div>)}</div>}</Paged> : <p className="muted small">Tidak ada catatan.</p>}
        </section>
      </div>
    </div>
  </div>;
}
