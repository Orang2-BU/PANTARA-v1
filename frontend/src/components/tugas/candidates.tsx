"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ArrowUpRight, Check, CircleAlert, CircleX, GitCompareArrows, UserRoundSearch, UserX } from "lucide-react";
import { CapacityBar, EmptyState, FlowSteps, PageHeading, Person, SectionTitle } from "@/components/app/parts";
import { Badge, Icon, Modal } from "@/components/ui";
import { REJECT_REASONS } from "@/lib/demo/reasons";
import { NOW } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import type { PresetId } from "@/lib/demo/types";
import { PRESETS, rankCandidates, type Candidate } from "@/lib/engine/score";
import { elapsedSince, hours, number, score, shortDate } from "@/lib/format";

const FACTORS: { key: keyof Candidate["factors"]; label: string; minus?: boolean }[] = [
  { key: "k", label: "Kompetensi" },
  { key: "c", label: "Kapasitas setelah" },
  { key: "a", label: "Ketersediaan" },
  { key: "r", label: "Riwayat & preferensi" },
  { key: "f", label: "Risiko konflik", minus: true },
];

export function Candidates({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { taskById, members, tasks, settings, names, flowStart, decisions, dispatch } = useDemo();
  const router = useRouter();
  const task = taskById(id);
  const [preset, setPreset] = useState<PresetId>(settings.preset);
  const [other, setOther] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { dispatch({ type: "startFlow", id, at: Date.now() }); }, [dispatch, id]);
  if (!task) return <EmptyState icon={CircleAlert} title="Tugas tidak ditemukan" text={`Tidak ada tugas dengan ID ${id}.`} action={<Link className="button secondary" href="/tugas">Kembali ke Tugas</Link>} />;
  if (!task.dna?.confirmed) return <EmptyState icon={CircleAlert} title="Kebutuhan belum dikonfirmasi" text="Tinjau Task DNA dulu supaya kandidat dihitung dari kebutuhan yang benar." action={<Link className="button primary" href={`/tugas/${id}/dna`}>Tinjau kebutuhan</Link>} />;

  const { candidates, filtered, effort } = rankCandidates(task, members, tasks, { ...settings, preset }, names);
  const top = candidates.slice(0, 3);
  const best = top[0];
  const simHref = (memberId: string) => `/tugas/${id}/simulasi?anggota=${memberId}&preset=${preset}`;

  function reject(e: React.FormEvent) {
    e.preventDefault();
    if (!reason) { setError("Pilih alasan menolak rekomendasi."); return; }
    if (reason === "lainnya" && !note.trim()) { setError("Tulis alasannya."); return; }
    const ms = elapsedSince(flowStart[id]);
    dispatch({ type: "reject", decision: {
      id: `KPT-${String(26 + decisions.length).padStart(3, "0")}`, taskId: id, memberIds: [], rank: null, rejected: true, preset,
      reasonCode: reason, note: note.trim() || undefined, decidedAt: new Date(Date.parse(NOW) + ms).toISOString(), decisionMs: ms,
      // Konflik dihitung dari skenario yang ditetapkan; penolakan tidak menetapkan apa pun.
      conflictsSeen: 0,
    } });
    if (reason === "tunda") dispatch({ type: "updateTask", id, patch: { status: "draf" } });
    router.push(reason === "kebutuhan" ? `/tugas/${id}/dna` : `/tugas/${id}`);
  }
  return <div className="page-enter">
    <PageHeading title="Rekomendasi kandidat" subtitle={`${task.title} · ${hours(effort)} · tenggat ${shortDate(task.dueDate)}`} actions={<>
      <button className="button secondary" onClick={() => { setRejecting(true); setError(""); }}><Icon icon={CircleX} size={16} />Tolak rekomendasi</button>
      <button className="button secondary" onClick={() => setOther(true)}><Icon icon={UserRoundSearch} size={16} />Pilih orang lain</button>
      {best && <Link className="button primary" href={simHref(best.member.id)}><Icon icon={GitCompareArrows} size={16} />Simulasikan #1</Link>}
    </>} />
    <FlowSteps current={2} />
    <div className="toolbar">
      <div className="toggle" role="group" aria-label="Preset bobot">
        {(Object.keys(PRESETS) as PresetId[]).map(p => <button key={p} className={preset === p ? "selected" : ""} aria-pressed={preset === p} onClick={() => setPreset(p)}>{PRESETS[p].label}</button>)}
      </div>
      <span className="small muted">{PRESETS[preset].when} · bobot K {number(PRESETS[preset].weights.k, 2)}, C {number(PRESETS[preset].weights.c, 2)}, A {number(PRESETS[preset].weights.a, 2)}, R {number(PRESETS[preset].weights.r, 2)}, F {number(PRESETS[preset].weights.f, 2)}</span>
    </div>

    {!best ? <section className="card"><EmptyState icon={UserX} title="Tidak ada kandidat yang lolos syarat wajib" text="Coba pecah tugas jadi lebih kecil, geser tenggat, atau lengkapi data ketersediaan anggota. Rincian syarat yang gagal ada di bawah." /></section> : <>
      <section className="highlight-card" aria-label="Kandidat teratas">
        <div className="highlight-top"><span>Kandidat #1 · preset {PRESETS[preset].label}</span><span className="mono">S = w1K + w2C + w3A + w4R − w5F</span></div>
        <div className="highlight-row">
          <div><h2>{best.member.name}</h2><p>{best.member.role} · beban {number(best.allocated)} → {number(best.allocated + effort)} dari {number(best.available)} jam</p></div>
          <div className="highlight-score" aria-label={`Skor ${score(best.score)}`}>{score(best.score)}</div>
        </div>
        <ul className="highlight-list">{best.reasons.slice(0, 3).map(r => <li key={r}><Icon icon={Check} size={14} />{r}</li>)}</ul>
        <Link className="button inverse" href={simHref(best.member.id)}>Lihat akibatnya sebelum menetapkan<span className="button-circle"><Icon icon={ArrowUpRight} size={16} /></span></Link>
      </section>
      <SectionTitle title={top.length === 1 ? "Satu kandidat lolos syarat" : `${top.length} kandidat teratas`} subtitle={candidates.length > top.length ? `Dari ${candidates.length} anggota yang lolos syarat wajib` : `Semua anggota yang lolos syarat wajib (${filtered.length} tersaring)`} />
      <div className="candidate-grid">{top.map((c, i) => <section key={c.member.id} className="card candidate-card">
        <div className="score-row"><span className="rank-person"><span className="rank">{i + 1}</span><Person member={c.member} /></span><span className="score-value">{score(c.score)}</span></div>
        <div className="factor-bars">{FACTORS.map(f => <div key={f.key} className={`factor-bar ${f.minus ? "minus" : ""}`}><span>{f.label}</span><div><span style={{ width: `${c.factors[f.key] * 100}%` }} /></div><strong>{f.minus ? "−" : ""}{score(c.factors[f.key])}</strong></div>)}</div>
        <CapacityBar allocated={c.allocated} available={c.available} added={effort} />
        <ul className="reason-list">
          {c.reasons.map(r => <li key={r} className="ok-text"><Icon icon={Check} size={13} /><span className="muted">{r}</span></li>)}
          {c.cautions.map(r => <li key={r} className="warn-text"><Icon icon={CircleAlert} size={13} />{r}</li>)}
        </ul>
        <Link className="button secondary" href={simHref(c.member.id)}><Icon icon={GitCompareArrows} size={16} />Simulasikan</Link>
      </section>)}</div>
    </>}

    <section className="card">
      <details className="disclosure" open={!best}>
        <summary>Tidak lolos syarat wajib ({filtered.length})</summary>
        <div className="table-scroll stack-table"><table>
          <thead><tr><th>Anggota</th><th>Syarat yang tidak terpenuhi</th></tr></thead>
          <tbody>{filtered.map(f => <tr key={f.member.id}><td><Person member={f.member} /></td><td data-label="Alasan">{f.failures.join(" · ")}</td></tr>)}</tbody>
        </table></div>
        <p className="small muted spaced">Syarat wajib: ketersediaan terisi, sisa kapasitas ≥ separuh estimasi, level kompetensi ≥ level dibutuhkan − {settings.levelTolerance}, tidak melewati batas kerja mingguan, tidak cuti sebelum tenggat. Atur di <Link className="inline-link" href="/pengaturan/rekomendasi">Aturan rekomendasi</Link>.</p>
      </details>
    </section>

    {other && <Modal title="Pilih orang lain" onClose={() => setOther(false)}>
      <p className="dialog-summary">Memilih di luar kandidat teratas tetap boleh. Alasannya akan diminta saat menetapkan dan dipakai untuk mengkalibrasi bobot.</p>
      <div className="notification-list">{members.filter(m => !top.some(t => t.member.id === m.id)).map(m => {
        const fail = filtered.find(f => f.member.id === m.id);
        return <Link key={m.id} href={simHref(m.id)} onClick={() => setOther(false)}><span><strong>{m.name}</strong><span>{fail ? `Tidak lolos: ${fail.failures[0]}` : "Lolos syarat, di luar tiga teratas"}</span></span>{fail ? <Badge tone="warn">Override</Badge> : <Icon icon={ArrowUpRight} />}</Link>;
      })}</div>
    </Modal>}
    {rejecting && <Modal title="Tolak rekomendasi" onClose={() => setRejecting(false)}>
      <form onSubmit={reject}>
        <p className="dialog-summary">Tugas <strong>{task.title}</strong> tidak ditugaskan sekarang. Penolakan dan alasannya dicatat di Riwayat keputusan dan Laporan dampak untuk mengkalibrasi bobot.</p>
        <fieldset className="field"><legend className="field-label">Alasan (wajib)</legend>
          <div className="radio-pills">{REJECT_REASONS.map(r => <label key={r.value}><input type="radio" name="reject-reason" checked={reason === r.value} onChange={() => { setReason(r.value); setError(""); }} />{r.label}</label>)}</div>
        </fieldset>
        <label className="field spaced"><span className="field-label">Catatan {reason === "lainnya" ? "(wajib)" : "(opsional)"}</span><textarea value={note} onChange={e => { setNote(e.target.value); setError(""); }} placeholder="Mis. Bima sedang ditarik ke proyek klien lain minggu ini." /></label>
        {error && <p className="field-error spaced" role="alert">{error}</p>}
        <div className="dialog-actions"><button type="button" className="button secondary" onClick={() => setRejecting(false)}>Batal</button><button type="submit" className="button primary"><Icon icon={CircleX} size={16} />Tolak rekomendasi</button></div>
        <p className="small muted spaced">{reason === "kebutuhan" ? "Setelah ini kamu diarahkan ke Task DNA untuk mengubah kebutuhan." : reason === "tunda" ? "Tugas dipindah ke draf." : "Tugas tetap di daftar belum ditugaskan."}</p>
      </form>
    </Modal>}
  </div>;
}
