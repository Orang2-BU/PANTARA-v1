"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { CalendarRange, Check, CircleAlert, CircleCheck, Copy, Inbox, MessageSquareWarning, ShieldCheck, UserRound, X } from "lucide-react";
import { CapacityBar, EmptyState, PageHeading, PriorityBadge, SectionTitle, StatusBadge } from "@/components/app/parts";
import { Badge, Icon, Modal } from "@/components/ui";
import { PERIOD } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import type { Level } from "@/lib/demo/types";
import { allocatedHours, LEVEL_LABEL, rankCandidates } from "@/lib/engine/score";
import { hours, shortDate } from "@/lib/format";

/** Anggota demo untuk sisi karyawan (P24-P27). */
const DEMO_MEMBER_ID = "bima";

function DemoNotice() {
  return <div className="decision-banner"><Icon icon={UserRound} /><span><strong>Tampilan anggota (demo)</strong><span>Kamu melihat Pantara sebagai Bima Pradana. Menu sidebar tetap milik manajer.</span></span><Link className="row-link" href="/dasbor">Kembali ke manajer</Link></div>;
}

export function MyHome() {
  const { tasks, memberById } = useDemo();
  const me = memberById(DEMO_MEMBER_ID)!;
  const mine = tasks.filter(t => t.assignments.some(a => a.memberId === me.id));
  const waiting = mine.filter(t => t.status === "menunggu");
  const running = mine.filter(t => t.status === "berjalan");
  return <div className="page-enter">
    <PageHeading title="Beranda saya" subtitle={`Halo, ${me.name.split(" ")[0]}. Penugasan baru, tugas berjalan, dan kapasitasmu periode ${PERIOD.label}.`} />
    <DemoNotice />
    <div className="split-main">
      <div className="stack">
        <section className="card">
          <SectionTitle title="Penugasan baru" subtitle="Terima atau tolak dengan alasan. Manajer melihat jawabanmu." action={<Badge tone={waiting.length ? "warn" : "neutral"}>{waiting.length} menunggu</Badge>} />
          {waiting.length ? waiting.map(t => <div key={t.id} className="dna-row"><div><h4>{t.title}</h4><p>Tenggat {shortDate(t.dueDate)} · {hours(t.assignments.find(a => a.memberId === me.id)!.hours)}</p></div><Link className="row-link accent" href={`/saya/tugas/${t.id}`}>Buka penugasan</Link></div>)
            : <EmptyState icon={Inbox} title="Tidak ada penugasan baru" text="Penugasan dari manajer akan muncul di sini." />}
        </section>
        <section className="card">
          <SectionTitle title="Tugas berjalan" />
          {running.length ? running.map(t => <div key={t.id} className="dna-row"><div><h4>{t.title}</h4><p>Tenggat {shortDate(t.dueDate)} · sisa {hours(t.remainingHours)}</p></div><StatusBadge status={t.status} /></div>) : <p className="small muted">Belum ada tugas berjalan.</p>}
        </section>
      </div>
      <div className="stack">
        <section className="card">
          <SectionTitle title="Kapasitas saya" subtitle={PERIOD.label} />
          <CapacityBar allocated={allocatedHours(me.id, tasks)} available={me.availableHours} />
          <div className="page-actions spaced"><Link className="button secondary" href="/saya/ketersediaan"><Icon icon={CalendarRange} size={16} />Ubah ketersediaan</Link></div>
        </section>
        <section className="card"><p className="small muted with-icon"><Icon icon={ShieldCheck} size={14} />Jam kerjamu dipakai untuk membagi tugas dengan adil, bukan untuk menilai produktivitas.</p></section>
      </div>
    </div>
  </div>;
}

export function MyAvailability() {
  const { memberById, dispatch } = useDemo();
  const me = memberById(DEMO_MEMBER_ID)!;
  const [available, setAvailable] = useState(String(me.availableHours ?? 32));
  const [limit, setLimit] = useState(String(me.weeklyLimit));
  const [leave, setLeave] = useState<string[]>(me.leaveDates);
  const [newLeave, setNewLeave] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  function save(e: React.FormEvent) {
    e.preventDefault();
    const a = Number(available), l = Number(limit);
    if (!Number.isFinite(a) || a < 0 || a > 60) return setError("Jam tersedia antara 0 dan 60.");
    if (l < a) return setError("Batas kerja tidak boleh lebih kecil dari jam tersedia.");
    dispatch({ type: "upsertMember", member: { ...me, availableHours: a, weeklyLimit: l, leaveDates: leave } });
    setSaved(true);
  }
  return <div className="page-enter">
    <PageHeading title="Ketersediaan saya" subtitle={`Isi jam tersedia dan cuti untuk periode ${PERIOD.label}.`} />
    <DemoNotice />
    <form className="card form-card" onSubmit={save} noValidate>
      {saved && <div className="decision-banner" role="status"><Icon icon={CircleCheck} /><span><strong>Ketersediaan tersimpan</strong><span>Rekomendasi berikutnya memakai data ini.</span></span></div>}
      <div className="form-grid">
        <label className="field"><span className="field-label">Jam tersedia periode ini</span><input className="input" type="number" value={available} onChange={e => { setAvailable(e.target.value); setSaved(false); setError(""); }} /><span className="field-hint">Jam yang bisa dipakai untuk tugas proyek.</span></label>
        <label className="field"><span className="field-label">Batas kerja mingguan</span><input className="input" type="number" value={limit} onChange={e => { setLimit(e.target.value); setSaved(false); setError(""); }} /><span className="field-hint">Rekomendasi tidak akan melewati batas ini.</span></label>
        <div className="field full"><span className="field-label">Tanggal cuti</span>
          <div className="toolbar"><input className="input" type="date" min={PERIOD.start} value={newLeave} onChange={e => setNewLeave(e.target.value)} aria-label="Tambah tanggal cuti" /><button type="button" className="button secondary" disabled={!newLeave} onClick={() => { setLeave(l => [...new Set([...l, newLeave])].sort()); setNewLeave(""); setSaved(false); }}>Tambah cuti</button></div>
          <div className="chips">{leave.length ? leave.map(d => <button key={d} type="button" className="chip" onClick={() => setLeave(l => l.filter(x => x !== d))} aria-label={`Hapus cuti ${shortDate(d)}`}>{shortDate(d)} <Icon icon={X} size={12} /></button>) : <span className="chip">Tidak ada cuti</span>}</div>
        </div>
      </div>
      {error && <p className="field-error spaced" role="alert">{error}</p>}
      <div className="form-actions">
        <button type="button" className="button secondary" onClick={() => { setAvailable("32"); setLimit("36"); setSaved(false); }}><Icon icon={Copy} size={16} />Salin dari periode lalu</button>
        <button type="submit" className="button primary">Simpan ketersediaan</button>
      </div>
    </form>
  </div>;
}

export function IncomingAssignment({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { taskById, members, tasks, settings, names, dispatch } = useDemo();
  const task = taskById(id);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  if (!task) return <EmptyState icon={CircleAlert} title="Penugasan tidak ditemukan" text="Penugasan ini tidak ada." action={<Link className="button secondary" href="/saya">Kembali ke Beranda saya</Link>} />;
  const mine = task.assignments.find(a => a.memberId === DEMO_MEMBER_ID);
  const why = rankCandidates({ ...task, status: "belum", assignments: [] }, members, tasks.map(t => t.id === id ? { ...t, status: "belum" as const, assignments: [] } : t), settings, names).candidates.find(c => c.member.id === DEMO_MEMBER_ID);
  return <div className="page-enter">
    <PageHeading title="Penugasan masuk" subtitle={task.title} actions={task.status === "menunggu" && mine ? <>
      <button className="button secondary" onClick={() => setRejecting(true)}><Icon icon={X} size={16} />Tolak dengan alasan</button>
      <button className="button primary" onClick={() => { dispatch({ type: "setStatus", id, status: "berjalan" }); router.push("/saya"); }}><Icon icon={Check} />Terima penugasan</button>
    </> : undefined} />
    <DemoNotice />
    {task.status !== "menunggu" && <div className="decision-banner"><Icon icon={CircleCheck} /><span><strong>Penugasan sudah dijawab</strong><span>Status sekarang: {task.status === "belum" ? "dikembalikan ke manajer" : task.status}.</span></span></div>}
    <div className="split-detail">
      <section className="card">
        <SectionTitle title="Detail tugas" />
        <p className="dna-quote">{task.description}</p>
        <div className="chips spaced">{task.dna?.requirements.map(r => <span key={r.competencyId} className="chip accent">{names[r.competencyId]} · {LEVEL_LABEL[r.level]}</span>)}</div>
      </section>
      <section className="card">
        <SectionTitle title="Ringkasan" />
        <div className="dna-row"><span className="muted small">Prioritas</span><PriorityBadge priority={task.priority} /></div>
        <div className="dna-row"><span className="muted small">Tenggat</span><strong>{shortDate(task.dueDate)}</strong></div>
        <div className="dna-row"><span className="muted small">Jam untukmu</span><strong>{mine ? hours(mine.hours) : "-"}</strong></div>
        {why && <><h3 className="spaced">Kenapa kamu dipilih</h3><ul className="reason-list">{why.reasons.map(r => <li key={r} className="ok-text"><Icon icon={Check} size={13} /><span className="muted">{r}</span></li>)}</ul></>}
      </section>
    </div>
    {rejecting && <Modal title="Tolak penugasan" onClose={() => setRejecting(false)}>
      <form onSubmit={e => { e.preventDefault(); if (reason.trim().length < 10) return setError("Tulis alasan minimal 10 karakter supaya manajer bisa menyesuaikan."); dispatch({ type: "setStatus", id, status: "belum", reason: `Ditolak Bima Pradana: ${reason.trim()}` }); router.push("/saya"); }}>
        <p className="dialog-summary">Tugas kembali ke manajer untuk dicarikan kandidat lain. Alasanmu ditampilkan di detail tugas.</p>
        <label className="field"><span className="field-label">Alasan (wajib)</span><textarea value={reason} onChange={e => { setReason(e.target.value); setError(""); }} placeholder="Minggu ini saya fokus menutup webhook WhatsApp koperasi, belum bisa ambil tambahan 8 jam." /></label>
        {error && <p className="field-error spaced" role="alert">{error}</p>}
        <div className="dialog-actions"><button type="button" className="button secondary" onClick={() => setRejecting(false)}>Batal</button><button type="submit" className="button primary"><Icon icon={MessageSquareWarning} size={16} />Kirim penolakan</button></div>
      </form>
    </Modal>}
  </div>;
}

export function MyProfile() {
  const { memberById, competencies, names, dispatch } = useDemo();
  const me = memberById(DEMO_MEMBER_ID)!;
  const [draft, setDraft] = useState(me);
  const [saved, setSaved] = useState(false);
  const setLevel = (id: string, level: Level) => { setSaved(false); setDraft(d => ({ ...d, competencies: level === 0 ? d.competencies.filter(c => c.id !== id) : d.competencies.some(c => c.id === id) ? d.competencies.map(c => c.id === id ? { ...c, level, source: c.level === level ? c.source : "klaim" } : c) : [...d.competencies, { id, level, source: "klaim" }] })); };
  const togglePref = (id: string) => { setSaved(false); setDraft(d => ({ ...d, prefers: d.prefers.includes(id) ? d.prefers.filter(x => x !== id) : [...d.prefers, id], avoids: d.avoids.filter(x => x !== id) })); };
  return <div className="page-enter">
    <PageHeading title="Profil kerja saya" subtitle="Kompetensi, preferensi, dan batas kerja yang dipakai rekomendasi. Kamu yang mengisi, manajer bisa memverifikasi." actions={<button className="button primary" onClick={() => { dispatch({ type: "upsertMember", member: draft }); setSaved(true); }}>Simpan profil</button>} />
    <DemoNotice />
    {saved && <div className="decision-banner" role="status"><Icon icon={CircleCheck} /><span><strong>Profil tersimpan</strong><span>Klaim baru ditandai &ldquo;Klaim anggota&rdquo; sampai diverifikasi manajer.</span></span></div>}
    <section className="card">
      <div className="table-scroll stack-table"><table>
        <thead><tr><th>Kompetensi</th><th>Level saya</th><th>Sumber</th><th className="numeric">Saya suka mengerjakan</th></tr></thead>
        <tbody>{competencies.map(c => {
          const mine = draft.competencies.find(x => x.id === c.id);
          return <tr key={c.id}>
            <td><strong>{names[c.id]}</strong><span className="table-sub">{c.category}</span></td>
            <td data-label="Level"><div className="level-select" role="group" aria-label={`Level ${c.name}`}>{([0, 1, 2, 3] as Level[]).map(l => <button key={l} type="button" className={(mine?.level ?? 0) === l ? "selected" : ""} aria-pressed={(mine?.level ?? 0) === l} onClick={() => setLevel(c.id, l)}>{LEVEL_LABEL[l]}</button>)}</div></td>
            <td data-label="Sumber">{mine ? <Badge tone={mine.source === "verifikasi" ? "ok" : "neutral"}>{mine.source === "verifikasi" ? "Diverifikasi" : mine.source === "riwayat" ? "Riwayat" : "Klaim"}</Badge> : <span className="muted">-</span>}</td>
            <td data-label="Suka mengerjakan" className="numeric"><input type="checkbox" checked={draft.prefers.includes(c.id)} onChange={() => togglePref(c.id)} aria-label={`Suka mengerjakan ${c.name}`} /></td>
          </tr>;
        })}</tbody>
      </table></div>
    </section>
  </div>;
}
