"use client";

import { Paged } from "@/components/ui/pager";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { CheckCheck, CircleAlert, CircleCheck, Save, TriangleAlert } from "lucide-react";
import { CapacityBar, EmptyState, FlowSteps, PageHeading, Person, SectionTitle } from "@/components/app/parts";
import { Badge, Icon, Modal } from "@/components/ui";
import { FluidArt } from "@/components/ui/fluid-art";
import { NOW } from "@/lib/demo/seed";
import { OVERRIDE_REASONS } from "@/lib/demo/reasons";
import { useDemo } from "@/lib/demo/store";
import type { Assignment, PresetId } from "@/lib/demo/types";
import { PRESETS, rankCandidates } from "@/lib/engine/score";
import { simulate, splitHours } from "@/lib/engine/whatif";
import { elapsedSince, hours, number, percent, shortDate } from "@/lib/format";


interface Scenario { key: string; label: string; assignments: Assignment[] }

export function Simulation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const search = useSearchParams();
  const router = useRouter();
  const { taskById, members, tasks, settings, names, memberById, flowStart, decisions, dispatch } = useDemo();
  const task = taskById(id);
  const preset = (search.get("preset") as PresetId | null) ?? settings.preset;
  const chosen = search.get("anggota");
  const [active, setActive] = useState<string | null>(null);
  const [dialog, setDialog] = useState(false);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  if (!task?.dna?.confirmed) return <EmptyState icon={CircleAlert} title="Belum ada kandidat untuk disimulasikan" text="Konfirmasi kebutuhan tugas dulu, lalu pilih kandidat." action={<Link className="button secondary" href={task ? `/tugas/${id}/dna` : "/tugas"}>Kembali</Link>} />;
  if (task.status !== "belum") return <EmptyState icon={CircleCheck} title="Tugas ini sudah ditugaskan" text="Simulasi hanya untuk tugas yang belum punya penanggung jawab." action={<Link className="button secondary" href={`/tugas/${id}`}>Buka detail tugas</Link>} />;

  const { candidates, effort } = rankCandidates(task, members, tasks, { ...settings, preset }, names);
  const top = candidates.slice(0, 3);
  const scenarios: Scenario[] = top.map((c, i) => ({ key: c.member.id, label: `#${i + 1} ${c.member.name.split(" ")[0]}`, assignments: [{ memberId: c.member.id, hours: effort }] }));
  if (chosen && !scenarios.some(s => s.key === chosen) && memberById(chosen)) scenarios.push({ key: chosen, label: `${memberById(chosen)!.name.split(" ")[0]} (pilihanmu)`, assignments: [{ memberId: chosen, hours: effort }] });
  if (top.length >= 2) {
    const [a, b] = splitHours(effort);
    scenarios.push({ key: "bagi", label: `Bagi ${top[0].member.name.split(" ")[0]} + ${top[1].member.name.split(" ")[0]}`, assignments: [{ memberId: top[0].member.id, hours: a }, { memberId: top[1].member.id, hours: b }] });
  }
  const current = scenarios.find(s => s.key === (active ?? chosen ?? scenarios[0]?.key)) ?? scenarios[0];
  if (!current) return <EmptyState icon={CircleAlert} title="Tidak ada skenario" text="Tidak ada kandidat yang lolos syarat wajib." action={<Link className="button secondary" href={`/tugas/${id}/kandidat`}>Kembali ke kandidat</Link>} />;

  const sim = simulate(task, current.assignments, members, tasks);
  const people = current.assignments.map(a => memberById(a.memberId)!);
  const firstRank = top.findIndex(c => c.member.id === current.assignments[0].memberId);
  const isOverride = current.key !== "bagi" && firstRank < 0;
  const mainRow = sim.rows.find(r => r.member.id === current.assignments[0].memberId);
  const crit = sim.conflicts.filter(c => c.tone === "crit").length;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isOverride && !reason) { setError("Pilih alasan memilih di luar tiga teratas."); return; }
    if (reason === "lainnya" && !note.trim()) { setError("Tulis alasannya."); return; }
    dispatch({ type: "assign", id, assignments: current.assignments, decision: {
      id: `KPT-${String(26 + decisions.length).padStart(3, "0")}`, taskId: id, memberIds: current.assignments.map(a => a.memberId),
      rank: isOverride ? null : firstRank + 1, preset, reasonCode: reason || undefined, note: note.trim() || undefined,
      decidedAt: new Date(Date.parse(NOW) + elapsedSince(flowStart[id])).toISOString(), decisionMs: elapsedSince(flowStart[id]), conflictsSeen: sim.conflicts.length,
    } });
    router.push(`/tugas/${id}?ditetapkan=1`);
  }

  const names2 = people.map(p => p.name.split(" ")[0]).join(" & ");
  return <div className="page-enter">
    <PageHeading title="Simulasi what-if" subtitle={`${task.title} · ${hours(effort)} · tenggat ${shortDate(task.dueDate)}`} actions={<>
      <button className="button secondary" onClick={() => { dispatch({ type: "updateTask", id, patch: { status: "draf" } }); router.push("/tugas?status=draf"); }}><Icon icon={Save} size={16} />Simpan draf</button>
      <button className="button primary" onClick={() => { setDialog(true); setError(""); }}><Icon icon={CheckCheck} />Tetapkan ke {names2}</button>
    </>} />
    <FlowSteps current={3} />
    <div className="toolbar">
      <div className="toggle" role="group" aria-label="Pilih skenario">{scenarios.map(s => <button key={s.key} className={current.key === s.key ? "selected" : ""} aria-pressed={current.key === s.key} onClick={() => setActive(s.key)}>{s.label}</button>)}</div>
      <span className="small muted">Simulasi tidak mengubah data sampai kamu menetapkan.</span>
    </div>

    <section className="highlight-card" aria-label="Ringkasan simulasi"><FluidArt className="highlight-art" style="streak" seed={19} w={720} h={360} />
      <div className="highlight-top"><span>Kalau ditugaskan ke {names2}</span><Badge tone={crit ? "crit" : sim.conflicts.length ? "warn" : "ok"}>{crit ? "Ada konflik kritis" : sim.conflicts.length ? `${sim.conflicts.length} perlu diperhatikan` : "Aman"}</Badge></div>
      <div className="comparison-grid">
        {mainRow && <Metric label={`Beban ${mainRow.member.name.split(" ")[0]}`} before={percent(mainRow.before / mainRow.available)} after={percent(mainRow.after / mainRow.available)} />}
        <Metric label="Beban tertinggi anggota" before={percent(sim.peakBefore)} after={percent(sim.peakAfter)} />
        <Metric label="Rata-rata semua anggota" before={percent(sim.teamBefore, 1)} after={percent(sim.teamAfter, 1)} />
        <Metric label="Konflik terdeteksi" before="0" after={String(sim.conflicts.length)} />
      </div>
    </section>

    <div className="split-detail spaced">
      <section className="card">
        <SectionTitle title="Sebaran beban anggota" subtitle="Batang atas sebelum, batang bawah sesudah penugasan." />
        <Paged items={sim.rows} unit="anggota">{(paged) => <><div className="table-scroll stack-table"><table>
          <thead><tr><th>Anggota</th><th>Sebelum → sesudah</th><th className="numeric">Perubahan</th></tr></thead>
          <tbody>{paged.map(r => <tr key={r.member.id} className={r.added ? "row-highlight" : ""}>
            <td><Person member={r.member} /></td>
            <td data-label="Beban"><div className="compare-bars"><div className="capacity-bar before"><span style={{ width: `${Math.min(r.before / r.available, 1) * 100}%` }} /></div><CapacityBar allocated={r.before} available={r.available} added={r.added} /></div></td>
            <td data-label="Perubahan" className="numeric">{r.added ? <strong>+{number(r.added)} jam</strong> : <span className="muted">Tetap</span>}</td>
          </tr>)}</tbody>
        </table></div></>}</Paged>
        <div className="legend spaced"><span><span className="legend-square neutral" />Sebelum</span><span><span className="legend-square accent" />Teralokasi</span><span><span className="legend-square added" />Tambahan dari tugas ini</span></div>
      </section>
      <section className="card">
        <SectionTitle title="Konflik & catatan" subtitle="Muncul sebelum keputusan, bukan sesudah tugas berjalan." />
        <ul className="conflict-list">
          {sim.conflicts.length ? sim.conflicts.map(c => <li key={c.text} className={c.tone}><Icon icon={TriangleAlert} size={15} />{c.text}</li>) : <li className="ok"><Icon icon={CircleCheck} size={15} />Tidak ada konflik kapasitas, tenggat, atau dependensi.</li>}
        </ul>
        <p className="small muted spaced">Asumsi: kapasitas {number(32)} jam per anggota per periode, estimasi dari Task DNA yang sudah dikonfirmasi ({hours(effort)}).</p>
      </section>
    </div>

    {dialog && <Modal title="Tetapkan penugasan" onClose={() => setDialog(false)}>
      <form onSubmit={submit}>
        <p className="dialog-summary"><strong>{task.title}</strong> ditugaskan ke {people.map(p => `${p.name} (${hours(current.assignments.find(a => a.memberId === p.id)!.hours)})`).join(" dan ")}. Anggota menerima notifikasi dan bisa menerima atau menolak dengan alasan.</p>
        {sim.conflicts.length > 0 && <div className={`decision-banner ${crit ? "crit" : "warn"}`}><Icon icon={TriangleAlert} /><span><strong>{sim.conflicts.length} catatan konflik</strong><span>Tetap bisa ditetapkan. Keputusan ada di tanganmu.</span></span></div>}
        {isOverride && <fieldset className="field"><legend className="field-label">Alasan memilih di luar tiga teratas (wajib)</legend>
          <div className="radio-pills">{OVERRIDE_REASONS.map(r => <label key={r.value}><input type="radio" name="reason" checked={reason === r.value} onChange={() => { setReason(r.value); setError(""); }} />{r.label}</label>)}</div>
        </fieldset>}
        <label className="field spaced"><span className="field-label">Catatan {reason === "lainnya" ? "(wajib)" : "(opsional)"}</span><textarea value={note} onChange={e => { setNote(e.target.value); setError(""); }} placeholder="Mis. Bima pernah menangani SSO klinik ini." /></label>
        {error && <p className="field-error spaced" role="alert">{error}</p>}
        <div className="dialog-actions"><button type="button" className="button secondary" onClick={() => setDialog(false)}>Batal</button><button type="submit" className="button primary"><Icon icon={CheckCheck} />Tetapkan ke {names2}</button></div>
        <p className="small muted spaced">Dicatat di Riwayat keputusan atas nama manajer, dengan preset {PRESETS[preset].label} dan lama keputusan untuk Laporan dampak.</p>
      </form>
    </Modal>}
  </div>;
}

function Metric({ label, before, after }: { label: string; before: string; after: string }) {
  return <div className="comparison-metric"><div>{label}</div><div className="comparison-values"><span>{before}</span><span aria-hidden="true">→</span><strong>{after}</strong></div></div>;
}
