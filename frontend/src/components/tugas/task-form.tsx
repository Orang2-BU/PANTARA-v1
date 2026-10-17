"use client";

import { DatePicker } from "@/components/ui/date-picker";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, Sparkles } from "lucide-react";
import { FlowSteps, PageHeading } from "@/components/app/parts";
import { Icon } from "@/components/ui";
import { mockDna } from "@/lib/demo/mock-dna";
import { NOW } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import type { Priority, Task } from "@/lib/demo/types";

const TODAY = NOW.slice(0, 10);

interface Errors { title?: string; description?: string; dueDate?: string; projectId?: string }

export function TaskForm() {
  const { projects, tasks, dispatch } = useDemo();
  const router = useRouter();
  const [form, setForm] = useState({ projectId: "klinik", title: "", description: "", dueDate: "2026-10-02", priority: "normal" as Priority });
  const [errors, setErrors] = useState<Errors>({});
  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => { setForm(f => ({ ...f, [key]: value })); setErrors(e => ({ ...e, [key]: undefined })); };

  function validate(draft: boolean): Errors {
    const e: Errors = {};
    if (!form.title.trim()) e.title = "Tulis judul tugas.";
    if (!draft && form.description.trim().length < 20) e.description = "Deskripsi minimal 20 karakter supaya kebutuhan bisa diurai.";
    if (!form.dueDate) e.dueDate = "Pilih tenggat.";
    else if (form.dueDate < TODAY) e.dueDate = "Tenggat sudah lewat. Pilih hari ini atau sesudahnya.";
    return e;
  }

  function submit(draft: boolean) {
    const e = validate(draft);
    setErrors(e);
    if (Object.keys(e).length) return;
    const next = Math.max(...tasks.map(t => Number(t.id.slice(4)))) + 1;
    const id = `TGS-${String(next).padStart(4, "0")}`;
    const task: Task = {
      id, projectId: form.projectId, title: form.title.trim(), description: form.description.trim(), dueDate: form.dueDate,
      priority: form.priority, status: draft ? "draf" : "belum", assignments: [], remainingHours: 0,
      createdAt: NOW, competencyIds: [],
      dna: draft ? undefined : mockDna(form.title, form.description, form.priority),
    };
    dispatch({ type: "createTask", task });
    dispatch({ type: "startFlow", id, at: Date.now() });
    router.push(draft ? "/tugas?status=draf" : `/tugas/${id}/kebutuhan`);
  }

  const field = (key: keyof Errors) => ({ "aria-invalid": errors[key] ? true : undefined, "aria-describedby": errors[key] ? `${key}-error` : undefined });
  return <div className="page-enter">
    <PageHeading title="Buat tugas" subtitle="Tulis tugas seperti biasa. Kebutuhannya diurai di langkah berikutnya dan bisa kamu koreksi." />
    <FlowSteps current={0} />
    <form className="card form-card" noValidate onSubmit={e => { e.preventDefault(); submit(false); }}>
      <div className="form-grid">
        <label className="field full"><span className="field-label">Judul tugas</span>
          <input className="input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Integrasi pembayaran QRIS di kasir" {...field("title")} />
          {errors.title && <span id="title-error" className="field-error">{errors.title}</span>}
        </label>
        <label className="field full"><span className="field-label">Deskripsi</span>
          <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Apa yang dikerjakan, untuk siapa, dan batasannya. Sebut teknologi atau bagian sistem yang terlibat." {...field("description")} />
          {errors.description ? <span id="description-error" className="field-error">{errors.description}</span> : <span className="field-hint">{form.description.trim().length} karakter. Semakin jelas, semakin sedikit isian yang perlu dicek.</span>}
        </label>
        <label className="field"><span className="field-label">Proyek</span>
          <select className="select" value={form.projectId} onChange={e => set("projectId", e.target.value)}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
        </label>
        <label className="field"><span className="field-label">Tenggat</span>
          <DatePicker min={TODAY} value={form.dueDate} onChange={v => set("dueDate", v)} {...field("dueDate")} />
          {errors.dueDate && <span id="dueDate-error" className="field-error">{errors.dueDate}</span>}
        </label>
        <fieldset className="field full"><legend className="field-label">Prioritas</legend>
          <div className="radio-pills">{(["rendah", "normal", "tinggi"] as Priority[]).map(p => <label key={p}><input type="radio" name="priority" checked={form.priority === p} onChange={() => set("priority", p)} />{p[0].toUpperCase() + p.slice(1)}</label>)}</div>
        </fieldset>
      </div>
      <div className="form-actions">
        <button type="button" className="button secondary" onClick={() => submit(true)}><Icon icon={Save} />Simpan draf</button>
        <button type="submit" className="button primary"><Icon icon={Sparkles} />Analisis kebutuhan</button>
      </div>
    </form>
  </div>;
}
