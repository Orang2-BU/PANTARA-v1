"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ArrowRight, Check, CircleAlert, CircleCheck, Info, Plus, RotateCcw, Trash2 } from "lucide-react";
import { EmptyState, FlowSteps, PageHeading, SectionTitle } from "@/components/app/parts";
import { LEVEL_LABEL } from "@/lib/engine/score";
import { Badge, Icon } from "@/components/ui";
import { mockDna } from "@/lib/demo/mock-dna";
import { useDemo } from "@/lib/demo/store";
import type { EffortSize, Level, Requirement, Task, TaskDna as Dna } from "@/lib/demo/types";
import { percent, shortDate } from "@/lib/format";

// Ambang zona AI (01-PRD §6, 03-ARCHITECTURE §5). Di MVP disimpan di config backend.
const SURE = { competency: 0.8, effort: 0.6, dependency: 0.8 };
const SIZES: Record<EffortSize, number> = { S: 3, M: 6, L: 12, XL: 20 };

export function TaskDnaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { taskById } = useDemo();
  const task = taskById(id);
  if (!task) return <EmptyState icon={CircleAlert} title="Tugas tidak ditemukan" text={`Tidak ada tugas dengan ID ${id}.`} action={<Link className="button secondary" href="/tugas">Kembali ke Tugas</Link>} />;
  return <DnaEditor key={task.id} task={task} />;
}

function DnaEditor({ task }: { task: Task }) {
  const { competencies, names, taskById, dispatch } = useDemo();
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(!task.dna?.confirmed);
  const [dna, setDna] = useState<Dna>(() => task.dna ?? mockDna(task.title, task.description, task.priority));
  const [checked, setChecked] = useState<string[]>([]);
  const [warning, setWarning] = useState("");
  const [adding, setAdding] = useState("");

  useEffect(() => {
    dispatch({ type: "startFlow", id: task.id, at: Date.now() });
    if (!analyzing) return;
    const timer = setTimeout(() => setAnalyzing(false), 1200);
    return () => clearTimeout(timer);
  }, [analyzing, dispatch, task.id]);

  const unsure = [
    ...dna.requirements.filter(r => r.p < SURE.competency).map(r => `req-${r.competencyId}`),
    ...(dna.effortP < SURE.effort ? ["effort"] : []),
    ...dna.dependencies.filter(d => d.p < SURE.dependency).map(d => `dep-${d.taskId}`),
  ];
  const pending = unsure.filter(k => !checked.includes(k));
  const markChecked = (key: string) => { setChecked(c => c.includes(key) ? c : [...c, key]); setWarning(""); };
  const updateReq = (competencyId: string, patch: Partial<Requirement>) => {
    setDna(d => ({ ...d, requirements: d.requirements.map(r => r.competencyId === competencyId ? { ...r, ...patch } : r) }));
    markChecked(`req-${competencyId}`);
  };

  function confirm() {
    if (pending.length) { setWarning(`${pending.length} isian bertanda "Perlu dicek" belum kamu tinjau.`); return; }
    if (!dna.requirements.length) { setWarning("Tambahkan minimal satu kompetensi yang dibutuhkan."); return; }
    dispatch({ type: "updateDna", id: task.id, dna: { ...dna, confirmed: true } });
    if (task.status === "draf") dispatch({ type: "updateTask", id: task.id, patch: { status: "belum" } });
    router.push(`/tugas/${task.id}/kandidat`);
  }

  const quotes = dna.requirements.map(r => r.quote).filter(Boolean);
  const highlighted = quotes.reduce<(string | { mark: string })[]>((parts, q) => parts.flatMap(p => {
    if (typeof p !== "string" || !p.includes(q)) return [p];
    const [before, ...rest] = p.split(q);
    return [before, { mark: q }, rest.join(q)];
  }), [task.description]);

  return <div className="page-enter">
    <PageHeading title="Tinjau kebutuhan tugas" subtitle={`${task.title} · tenggat ${shortDate(task.dueDate)}`} actions={<>
      <button className="button secondary" onClick={() => { setDna(mockDna(task.title, task.description, task.priority)); setChecked([]); setAnalyzing(true); }}><Icon icon={RotateCcw} size={16} />Analisis ulang</button>
      <button className="button primary" onClick={confirm} aria-describedby="confirm-warning">Konfirmasi & cari kandidat<Icon icon={ArrowRight} size={16} /></button>
    </>} />
    <FlowSteps current={1} />
    {warning && <div className="decision-banner warn" id="confirm-warning" role="alert"><Icon icon={CircleAlert} /><span><strong>Belum bisa dikonfirmasi</strong><span>{warning}</span></span></div>}
    {analyzing ? <div className="split-dna"><section className="card"><div className="answer-skeleton" aria-busy="true" aria-label="Menganalisis kebutuhan"><div /><div /><div /></div></section><section className="card"><p className="muted">Menganalisis kebutuhan tugas dengan 5 sampel...</p></section></div> :
    <div className="split-dna">
      <section className="card">
        <SectionTitle title="Deskripsi tugas" subtitle="Kalimat yang dipakai sebagai bukti ditandai." />
        <p className="dna-quote">{highlighted.map((p, i) => typeof p === "string" ? <span key={i}>{p}</span> : <mark key={i}>{p.mark}</mark>)}</p>
        <div className="evidence-note"><Icon icon={Info} size={14} /><span>AI hanya mengurai kebutuhan. Penerima tugas dipilih oleh perhitungan skor dan keputusanmu, bukan oleh AI.</span></div>
      </section>
      <section className="card">
        <SectionTitle title="Task DNA" subtitle={unsure.length ? `${pending.length} dari ${unsure.length} isian ragu belum dicek` : "Semua isian yakin"} action={<Badge tone={pending.length ? "warn" : "ok"}>{pending.length ? "Perlu dicek" : "Siap dikonfirmasi"}</Badge>} />
        <h3>Kompetensi & level minimum</h3>
        <div>{dna.requirements.map(r => {
          const key = `req-${r.competencyId}`;
          const isUnsure = r.p < SURE.competency;
          return <div key={r.competencyId} className={`dna-row ${isUnsure && !checked.includes(key) ? "unsure" : ""}`}>
            <div>
              <h4>{names[r.competencyId] ?? r.competencyId} {isUnsure ? (checked.includes(key) ? <Badge tone="ok">Sudah dicek</Badge> : <Badge tone="warn">Perlu dicek</Badge>) : <Badge tone="ok">Yakin</Badge>}</h4>
              <p>Keyakinan {percent(r.p)} dari 5 sampel · &ldquo;{r.quote}&rdquo;</p>
              <div className="level-select" role="group" aria-label={`Level minimum ${names[r.competencyId]}`}>
                {([1, 2, 3] as Level[]).map(l => <button key={l} className={r.level === l ? "selected" : ""} aria-pressed={r.level === l} onClick={() => updateReq(r.competencyId, { level: l })}>{LEVEL_LABEL[l]}</button>)}
              </div>
            </div>
            <div className="page-actions">
              {isUnsure && !checked.includes(key) && <button className="row-link accent" onClick={() => markChecked(key)}><Icon icon={Check} size={14} />Sudah benar</button>}
              <button className="icon-button subtle" aria-label={`Hapus ${names[r.competencyId]}`} onClick={() => { setDna(d => ({ ...d, requirements: d.requirements.filter(x => x.competencyId !== r.competencyId) })); markChecked(key); }}><Icon icon={Trash2} size={16} /></button>
            </div>
          </div>;
        })}</div>
        <div className="toolbar start spaced">
          <label className="filter-select"><span className="sr-only">Tambah kompetensi</span>
            <select value={adding} onChange={e => setAdding(e.target.value)}>
              <option value="">Tambah kompetensi dari katalog</option>
              {competencies.filter(c => !dna.requirements.some(r => r.competencyId === c.id)).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <button className="button secondary" disabled={!adding} onClick={() => { setDna(d => ({ ...d, requirements: [...d.requirements, { competencyId: adding, level: 1, p: 1, quote: "Ditambahkan manajer" }] })); setAdding(""); }}><Icon icon={Plus} size={16} />Tambah</button>
        </div>

        <h3 className="spaced">Estimasi upaya & kompleksitas</h3>
        <div className={`dna-row ${dna.effortP < SURE.effort && !checked.includes("effort") ? "unsure" : ""}`}>
          <div>
            <h4>Ukuran {dna.effortSize} · {dna.effortHours} jam {dna.effortP < SURE.effort ? (checked.includes("effort") ? <Badge tone="ok">Sudah dicek</Badge> : <Badge tone="warn">Perlu dicek</Badge>) : <Badge tone="ok">Yakin</Badge>}</h4>
            <p>Keyakinan {percent(dna.effortP)} · S ≤ 4 jam, M 4-8, L 8-16, XL &gt; 16 (XL sebaiknya dipecah)</p>
            <div className="level-select" role="group" aria-label="Ukuran upaya">
              {(Object.keys(SIZES) as EffortSize[]).map(s => <button key={s} className={dna.effortSize === s ? "selected" : ""} aria-pressed={dna.effortSize === s} onClick={() => { setDna(d => ({ ...d, effortSize: s, effortHours: SIZES[s] })); markChecked("effort"); }}>{s}</button>)}
            </div>
          </div>
          <div className="page-actions">
            {dna.effortP < SURE.effort && !checked.includes("effort") && <button className="row-link accent" onClick={() => markChecked("effort")}><Icon icon={Check} size={14} />Sudah benar</button>}
            <label className="field compact"><span className="field-label">Jam</span><input className="input" type="number" min={1} max={40} value={dna.effortHours} onChange={e => { setDna(d => ({ ...d, effortHours: Math.max(1, Number(e.target.value)) })); markChecked("effort"); }} /></label>
          </div>
        </div>
        <div className="dna-row">
          <div><h4>Kompleksitas</h4><p>Sebaran antar sampel {dna.complexitySpread} level</p>
            <div className="level-select" role="group" aria-label="Kompleksitas">{([0, 1, 2, 3] as Level[]).map(l => <button key={l} className={dna.complexity === l ? "selected" : ""} aria-pressed={dna.complexity === l} onClick={() => setDna(d => ({ ...d, complexity: l }))}>{["Rendah", "Sedang", "Tinggi", "Sangat tinggi"][l]}</button>)}</div>
          </div>
        </div>

        <h3 className="spaced">Dependensi</h3>
        {dna.dependencies.length ? dna.dependencies.map(d => {
          const dep = taskById(d.taskId);
          const key = `dep-${d.taskId}`;
          return <div key={d.taskId} className={`dna-row ${d.p < SURE.dependency && !checked.includes(key) ? "unsure" : ""}`}>
            <div><h4>{dep?.title ?? d.taskId} {d.p < SURE.dependency ? <Badge tone="warn">Disarankan</Badge> : <Badge tone="ok">Yakin</Badge>}</h4><p>Keyakinan {percent(d.p)} · {dep ? `status ${dep.status}, tenggat ${shortDate(dep.dueDate)}` : ""}</p></div>
            <div className="page-actions">
              <button className="row-link accent" onClick={() => markChecked(key)}><Icon icon={CircleCheck} size={14} />Pertahankan</button>
              <button className="row-link" onClick={() => { setDna(x => ({ ...x, dependencies: x.dependencies.filter(y => y.taskId !== d.taskId) })); markChecked(key); }}>Bukan dependensi</button>
            </div>
          </div>;
        }) : <p className="small muted">Tidak ada dependensi terdeteksi.</p>}
        <p className="meta-line spaced"><span className="mono">{dna.model}</span>·<span className="mono">{dna.prompt}</span>·<span>5 sampel</span>{dna.model.includes("simulasi") && <Badge>Simulasi AI di mockup</Badge>}</p>
      </section>
    </div>}
  </div>;
}
