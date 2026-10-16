"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";
import { CalendarClock, CircleAlert, CircleCheck, ClipboardCheck, FolderKanban, History, RotateCcw, UserRoundSearch } from "lucide-react";
import { EmptyState, PageHeading, Person, PriorityBadge, SectionTitle, StatusBadge, statusLabel } from "@/components/app/parts";
import { Badge, Icon } from "@/components/ui";
import { REASON_LABEL } from "@/lib/demo/reasons";
import { useDemo } from "@/lib/demo/store";
import type { TaskStatus } from "@/lib/demo/types";
import { LEVEL_LABEL, PRESETS } from "@/lib/engine/score";
import { date, hours, minutes, shortDate, time } from "@/lib/format";

const NEXT_STATUS: Partial<Record<TaskStatus, TaskStatus[]>> = { menunggu: ["berjalan"], berjalan: ["selesai"] };

export function TaskDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const search = useSearchParams();
  const router = useRouter();
  const { taskById, memberById, projectById, decisions, names, dispatch } = useDemo();
  const task = taskById(id);
  if (!task) return <EmptyState icon={CircleAlert} title="Tugas tidak ditemukan" text={`Tidak ada tugas dengan ID ${id}.`} action={<Link className="button secondary" href="/tugas">Kembali ke Tugas</Link>} />;
  const log = decisions.filter(d => d.taskId === id);
  const assignees = task.assignments.map(a => ({ member: memberById(a.memberId), hours: a.hours })).filter(a => a.member);
  const project = projectById(task.projectId);
  const justAssigned = search.get("ditetapkan") === "1" && task.status === "menunggu";
  return <div className="page-enter">
    <PageHeading title={task.title} subtitle={`${task.id} · ${project?.name ?? ""}`} actions={<>
      {(task.status === "menunggu" || task.status === "berjalan") && <button className="button secondary" onClick={() => { dispatch({ type: "setStatus", id, status: "belum" }); router.push(`/tugas/${id}/kandidat`); }}><Icon icon={RotateCcw} size={16} />Tugaskan ulang</button>}
      {task.status === "belum" && <Link className="button primary" href={task.dna?.confirmed ? `/tugas/${id}/kandidat` : `/tugas/${id}/dna`}><Icon icon={UserRoundSearch} size={16} />Cari kandidat</Link>}
      {task.status === "draf" && <Link className="button primary" href={`/tugas/${id}/dna`}>Lanjutkan analisis</Link>}
      {NEXT_STATUS[task.status]?.map(s => <button key={s} className="button primary" onClick={() => dispatch({ type: "setStatus", id, status: s })}><Icon icon={CircleCheck} size={16} />Tandai {statusLabel(s).toLowerCase()}</button>)}
    </>} />
    {justAssigned && <div className="decision-banner" role="status"><Icon icon={CircleCheck} /><span><strong>Penugasan ditetapkan</strong><span>{assignees.map(a => a.member!.name).join(" dan ")} menerima notifikasi. Kapasitas tim sudah diperbarui di Dasbor, Tim, dan Kapasitas.</span></span><Link className="row-link" href="/dasbor">Lihat dasbor</Link></div>}
    {task.status === "belum" && task.responseReason && <div className="decision-banner warn"><Icon icon={CircleAlert} /><span><strong>Penugasan sebelumnya ditolak anggota</strong><span>{task.responseReason}</span></span></div>}
    <div className="split-detail">
      <div className="stack">
        <section className="card">
          <SectionTitle title="Deskripsi" />
          <p className="dna-quote">{task.description}</p>
        </section>
        <section className="card">
          <SectionTitle title="Task DNA" subtitle={task.dna?.confirmed ? `Dikonfirmasi · ${task.dna.model} · ${task.dna.prompt}` : "Belum dikonfirmasi"} />
          {task.dna ? <>
            <div className="chips">{task.dna.requirements.map(r => <span key={r.competencyId} className="chip accent">{names[r.competencyId]} · {LEVEL_LABEL[r.level]}</span>)}</div>
            <p className="small muted spaced">Estimasi {hours(task.dna.effortHours)} (ukuran {task.dna.effortSize}) · kompleksitas {["rendah", "sedang", "tinggi", "sangat tinggi"][task.dna.complexity]} · dependensi {task.dna.dependencies.length ? task.dna.dependencies.map(d => d.taskId).join(", ") : "tidak ada"}</p>
          </> : <p className="small muted">Tugas lama, dibuat sebelum Task DNA.{task.competencyIds.length ? ` Kompetensi: ${task.competencyIds.map(c => names[c]).join(", ")}.` : ""}</p>}
        </section>
        <section className="card">
          <SectionTitle title="Riwayat keputusan" subtitle="Tercatat dan tidak bisa diubah." />
          {log.length ? log.map(d => <div key={d.id} className="history-item"><Icon icon={History} size={15} /><div>
            <strong>{d.rejected ? `Rekomendasi ditolak · ${REASON_LABEL[d.reasonCode ?? "lainnya"]}` : `${d.memberIds.map(m => memberById(m)?.name).join(" & ")} · ${d.rank ? `kandidat #${d.rank}` : "di luar tiga teratas"}`}</strong>
            <p>{date(d.decidedAt)} {time(d.decidedAt)} · preset {PRESETS[d.preset].label} · {d.rejected ? "tidak ada yang ditetapkan" : `lama keputusan ${minutes(d.decisionMs)} · ${d.conflictsSeen} konflik terlihat`}{d.note ? ` · "${d.note}"` : ""}</p>
          </div></div>) : <p className="small muted">Belum ada keputusan untuk tugas ini.</p>}
        </section>
      </div>
      <section className="card">
        <SectionTitle title="Ringkasan" />
        <div className="dna-row"><span className="muted small">Status</span><StatusBadge status={task.status} /></div>
        <div className="dna-row"><span className="muted small">Prioritas</span><PriorityBadge priority={task.priority} /></div>
        <div className="dna-row"><span className="muted small with-icon"><Icon icon={CalendarClock} size={13} />Tenggat</span><strong>{shortDate(task.dueDate)}</strong></div>
        <div className="dna-row"><span className="muted small with-icon"><Icon icon={ClipboardCheck} size={13} />{task.status === "berjalan" ? "Sisa estimasi" : "Estimasi"}</span><strong>{hours(task.status === "berjalan" ? task.remainingHours : task.dna?.effortHours ?? task.assignments.reduce((s, a) => s + a.hours, 0))}</strong></div>
        <div className="dna-row"><span className="muted small with-icon"><Icon icon={FolderKanban} size={13} />Proyek</span>{project && <Link className="text-link" href={`/proyek/${project.id}`}>{project.name}</Link>}</div>
        <h3 className="spaced">Penanggung jawab</h3>
        {assignees.length ? assignees.map(a => <div key={a.member!.id} className="dna-row"><Link href={`/tim/${a.member!.id}`}><Person member={a.member!} /></Link><span className="small">{hours(a.hours)}</span></div>) : <p className="small muted">Belum ada penanggung jawab.</p>}
        {task.status === "menunggu" && <p className="small muted spaced"><Badge>Menunggu jawaban anggota</Badge> <Link className="inline-link" href={`/saya/tugas/${task.id}`}>Lihat sebagai anggota</Link></p>}
      </section>
    </div>
  </div>;
}
