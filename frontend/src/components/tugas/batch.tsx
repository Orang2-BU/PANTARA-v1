"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCheck, CircleAlert } from "lucide-react";
import { CapacityBar, EmptyState, PageHeading, Person, PriorityBadge } from "@/components/app/parts";
import { Badge, Icon } from "@/components/ui";
import { NOW } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import { allocateBatch } from "@/lib/engine/batch";
import { allocatedHours } from "@/lib/engine/score";
import { hours, score, shortDate } from "@/lib/format";

export function BatchAllocation() {
  const { tasks, members, settings, names, memberById, decisions, dispatch } = useDemo();
  const router = useRouter();
  const open = tasks.filter(t => t.status === "belum" && t.dna?.confirmed);
  const unconfirmed = tasks.filter(t => t.status === "belum" && !t.dna?.confirmed);
  const pairs = allocateBatch(open, members, tasks, settings, names);
  const [picked, setPicked] = useState<string[]>(() => pairs.filter(p => p.memberId).map(p => p.task.id));
  const added: Record<string, number> = {};
  for (const p of pairs) if (p.memberId && picked.includes(p.task.id)) added[p.memberId] = (added[p.memberId] ?? 0) + (p.task.dna?.effortHours ?? 0);

  function assignPicked() {
    let n = decisions.length;
    for (const p of pairs) {
      if (!p.memberId || !picked.includes(p.task.id)) continue;
      n += 1;
      dispatch({ type: "assign", id: p.task.id, assignments: [{ memberId: p.memberId, hours: p.task.dna?.effortHours ?? 0 }], decision: {
        id: `KPT-${String(26 + n).padStart(3, "0")}`, taskId: p.task.id, memberIds: [p.memberId], rank: 1, preset: settings.preset,
        note: "Alokasi batch", decidedAt: NOW, decisionMs: 3 * 60_000, conflictsSeen: 0,
      } });
    }
    router.push("/tugas?status=menunggu");
  }

  return <div className="page-enter">
    <PageHeading title="Alokasi batch" subtitle="Usulan pasangan untuk semua tugas yang belum ditugaskan, dengan kapasitas diperbarui setiap pasangan." actions={<button className="button primary" disabled={!picked.length} onClick={assignPicked}><Icon icon={CheckCheck} />Tetapkan {picked.length} terpilih</button>} />
    {unconfirmed.length > 0 && <p className="small muted">{unconfirmed.length} tugas belum ikut karena Task DNA-nya belum dikonfirmasi: {unconfirmed.map(t => <Link key={t.id} className="inline-link" href={`/tugas/${t.id}/dna`}>{t.title}</Link>)}</p>}
    {pairs.length ? <section className="card spaced">
      <div className="table-scroll stack-table"><table>
        <thead><tr><th>Pilih</th><th>Tugas</th><th>Usulan penanggung jawab</th><th className="numeric">Skor</th><th>Beban setelah semua pasangan</th></tr></thead>
        <tbody>{pairs.map(p => {
          const m = p.memberId ? memberById(p.memberId) : undefined;
          return <tr key={p.task.id}>
            <td><input type="checkbox" aria-label={`Pilih ${p.task.title}`} disabled={!m} checked={picked.includes(p.task.id)} onChange={e => setPicked(x => e.target.checked ? [...x, p.task.id] : x.filter(i => i !== p.task.id))} /></td>
            <td data-label="Tugas"><Link href={`/tugas/${p.task.id}`}><strong>{p.task.title}</strong></Link><span className="table-sub"><PriorityBadge priority={p.task.priority} /> · {hours(p.task.dna?.effortHours ?? 0)} · tenggat {shortDate(p.task.dueDate)}</span></td>
            <td data-label="Usulan">{m ? <Person member={m} /> : <span className="warn-text small with-icon"><Icon icon={CircleAlert} size={13} />{p.reason}</span>}</td>
            <td data-label="Skor" className="numeric">{m ? score(p.score) : "-"}</td>
            <td data-label="Beban">{m ? <CapacityBar allocated={allocatedHours(m.id, tasks)} available={m.availableHours} added={added[m.id] ?? 0} /> : <Badge tone="warn">Tidak teralokasi</Badge>}</td>
          </tr>;
        })}</tbody>
      </table></div>
    </section> : <EmptyState icon={CheckCheck} title="Tidak ada tugas terbuka" text="Semua tugas yang dikonfirmasi sudah ditugaskan." action={<Link className="button secondary" href="/tugas">Kembali ke Tugas</Link>} />}
  </div>;
}
