"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { BadgeCheck, BellRing, CalendarRange, CircleAlert, Heart, ShieldCheck, ThumbsDown } from "lucide-react";
import { CapacityBar, DataBadge, EmptyState, PageHeading, SectionTitle, StatusBadge } from "@/components/app/parts";
import { Badge, Icon, Modal } from "@/components/ui";
import { PERIOD } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import type { Member } from "@/lib/demo/types";
import { allocatedHours, LEVEL_LABEL } from "@/lib/engine/score";
import { hours, shortDate } from "@/lib/format";

const SOURCE = { klaim: "Klaim anggota", verifikasi: "Diverifikasi manajer", riwayat: "Dari riwayat tugas" } as const;

export function MemberProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const search = useSearchParams();
  const { memberById, tasks, names, dispatch } = useDemo();
  const member = memberById(id);
  const [editing, setEditing] = useState(search.get("lengkapi") === "1");
  const [reminded, setReminded] = useState(false);
  if (!member) return <EmptyState icon={CircleAlert} title="Anggota tidak ditemukan" text="Anggota ini tidak ada di ruang kerja." action={<Link className="button secondary" href="/tim">Kembali ke Tim</Link>} />;
  const allocated = allocatedHours(member.id, tasks);
  const mine = tasks.filter(t => t.assignments.some(a => a.memberId === member.id));
  const active = mine.filter(t => t.status === "berjalan" || t.status === "menunggu");
  const done = mine.filter(t => t.status === "selesai");
  const verify = (cid: string) => dispatch({ type: "upsertMember", member: { ...member, competencies: member.competencies.map(c => c.id === cid ? { ...c, source: "verifikasi" } : c) } });
  return <div className="page-enter">
    <PageHeading title={member.name} subtitle={`${member.role} · ${member.email}`} actions={<>
      {member.availableHours === null && <button className="button secondary" onClick={() => setReminded(true)} disabled={reminded}><Icon icon={BellRing} size={16} />{reminded ? "Pengingat terkirim" : "Ingatkan lengkapi data"}</button>}
      <button className="button primary" onClick={() => setEditing(true)}><Icon icon={CalendarRange} size={16} />Ubah ketersediaan</button>
    </>} />
    {member.availableHours === null && <div className="decision-banner warn"><Icon icon={CircleAlert} /><span><strong>Ketersediaan periode ini belum diisi</strong><span>{member.name.split(" ")[0]} belum ikut rekomendasi sampai data kapasitas lengkap.</span></span></div>}
    <div className="split-detail">
      <div className="stack">
        <section className="card">
          <SectionTitle title="Kompetensi" subtitle="Level 1 Dasar, 2 Mandiri, 3 Mahir. Sumber ditampilkan supaya klaim bisa diverifikasi." />
          <div className="table-scroll stack-table"><table>
            <thead><tr><th>Kompetensi</th><th>Level</th><th>Sumber</th><th className="numeric">Aksi</th></tr></thead>
            <tbody>{member.competencies.map(c => <tr key={c.id}>
              <td><strong>{names[c.id]}</strong></td>
              <td data-label="Level">{LEVEL_LABEL[c.level]}</td>
              <td data-label="Sumber">{c.source === "verifikasi" ? <Badge tone="ok">{SOURCE[c.source]}</Badge> : <Badge>{SOURCE[c.source]}</Badge>}</td>
              <td className="numeric">{c.source !== "verifikasi" && <button className="row-link" onClick={() => verify(c.id)}><Icon icon={BadgeCheck} size={14} />Verifikasi</button>}</td>
            </tr>)}</tbody>
          </table></div>
          {!member.competencies.length && <p className="small muted">Belum ada kompetensi. Anggota mengisinya di Profil kerja saya.</p>}
        </section>
        <section className="card">
          <SectionTitle title="Tugas aktif" subtitle={`${active.length} tugas berjalan atau menunggu jawaban`} />
          {active.length ? active.map(t => <div key={t.id} className="dna-row"><div><h4><Link href={`/tugas/${t.id}`}>{t.title}</Link></h4><p>Tenggat {shortDate(t.dueDate)} · {hours(t.assignments.find(a => a.memberId === member.id)?.hours ?? 0)} di periode ini</p></div><StatusBadge status={t.status} /></div>) : <p className="small muted">Belum ada penugasan aktif.</p>}
        </section>
        <section className="card">
          <SectionTitle title="Riwayat tugas relevan" subtitle="Dipakai untuk faktor R (riwayat & preferensi) di skor kandidat." />
          {done.length ? done.map(t => <div key={t.id} className="dna-row"><div><h4>{t.title}</h4><p>{t.competencyIds.map(c => names[c]).join(", ")} · selesai {shortDate(t.dueDate)}</p></div></div>) : <p className="small muted">Belum ada riwayat tugas.</p>}
        </section>
      </div>
      <div className="stack">
        <section className="card">
          <SectionTitle title="Kapasitas periode" subtitle={PERIOD.label} action={<DataBadge complete={member.availableHours !== null} />} />
          <CapacityBar allocated={allocated} available={member.availableHours} />
          <div className="dna-row spaced"><span className="muted small">Jam tersedia</span><strong>{member.availableHours === null ? "Belum diisi" : hours(member.availableHours)}</strong></div>
          <div className="dna-row"><span className="muted small">Batas kerja mingguan</span><strong>{hours(member.weeklyLimit)}</strong></div>
          <div className="dna-row"><span className="muted small">Cuti</span><strong>{member.leaveDates.length ? member.leaveDates.map(shortDate).join(", ") : "Tidak ada"}</strong></div>
        </section>
        <section className="card">
          <SectionTitle title="Preferensi" />
          <p className="small muted with-icon"><Icon icon={Heart} size={13} />Disukai</p>
          <div className="chips">{member.prefers.length ? member.prefers.map(p => <span key={p} className="chip accent">{names[p]}</span>) : <span className="chip">Belum diisi</span>}</div>
          <p className="small muted with-icon spaced"><Icon icon={ThumbsDown} size={13} />Dihindari</p>
          <div className="chips">{member.avoids.length ? member.avoids.map(p => <span key={p} className="chip">{names[p]}</span>) : <span className="chip">Tidak ada</span>}</div>
        </section>
        <section className="card">
          <p className="small muted with-icon"><Icon icon={ShieldCheck} size={14} />Data jam kerja dipakai untuk membagi tugas, bukan menilai produktivitas. Anggota bisa melihat data yang sama di Profil kerja saya.</p>
        </section>
      </div>
    </div>
    {editing && <AvailabilityModal member={member} onClose={() => setEditing(false)} onSave={m => { dispatch({ type: "upsertMember", member: m }); setEditing(false); }} />}
  </div>;
}

export function AvailabilityModal({ member, onClose, onSave }: { member: Member; onClose: () => void; onSave: (m: Member) => void }) {
  const [available, setAvailable] = useState(String(member.availableHours ?? 32));
  const [limit, setLimit] = useState(String(member.weeklyLimit));
  const [error, setError] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const a = Number(available), l = Number(limit);
    if (!Number.isFinite(a) || a < 0 || a > 60) return setError("Jam tersedia antara 0 dan 60.");
    if (!Number.isFinite(l) || l < a) return setError("Batas kerja tidak boleh lebih kecil dari jam tersedia.");
    onSave({ ...member, availableHours: a, weeklyLimit: l });
  }
  return <Modal title={`Ketersediaan ${member.name.split(" ")[0]}`} onClose={onClose}>
    <form onSubmit={submit} noValidate>
      <p className="dialog-summary">Periode {PERIOD.label}. Di produk, anggota mengisi ini sendiri; manajer mengisi hanya atas persetujuannya.</p>
      <div className="form-grid">
        <label className="field"><span className="field-label">Jam tersedia</span><input className="input" type="number" value={available} onChange={e => { setAvailable(e.target.value); setError(""); }} /></label>
        <label className="field"><span className="field-label">Batas kerja mingguan</span><input className="input" type="number" value={limit} onChange={e => { setLimit(e.target.value); setError(""); }} /></label>
      </div>
      {error && <p className="field-error spaced" role="alert">{error}</p>}
      <div className="dialog-actions"><button type="button" className="button secondary" onClick={onClose}>Batal</button><button type="submit" className="button primary">Simpan</button></div>
    </form>
  </Modal>;
}
