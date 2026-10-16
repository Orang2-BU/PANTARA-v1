"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeading } from "@/components/app/parts";
import { Badge, Icon, Modal } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import { TeamTabs } from "./team";

/** P30: katalog kompetensi tim (dipindah dari Pengaturan, 03-ARCHITECTURE Q16). */
export function Competencies() {
  const { competencies, members, tasks, dispatch } = useDemo();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Backend");
  const [error, setError] = useState("");
  return <div className="page-enter">
    <PageHeading title="Katalog kompetensi" subtitle="Daftar kompetensi ruang kerja yang dipakai Task DNA dan Work Twin. AI hanya memilih dari katalog ini." actions={<button className="button primary" onClick={() => setAdding(true)}><Icon icon={Plus} />Tambah kompetensi</button>} />
    <TeamTabs current="/tim/kompetensi" />
    <section className="card">
      <div className="table-scroll stack-table"><table>
        <thead><tr><th>Kompetensi</th><th>Kategori</th><th className="numeric">Anggota</th><th className="numeric">Dipakai tugas aktif</th></tr></thead>
        <tbody>{competencies.map(c => {
          const usedBy = members.filter(m => m.competencies.some(x => x.id === c.id)).length;
          const inTasks = tasks.filter(t => t.status !== "selesai" && t.dna?.requirements.some(r => r.competencyId === c.id)).length;
          return <tr key={c.id}><td><strong>{c.name}</strong><span className="table-sub mono">{c.id}</span></td><td data-label="Kategori">{c.category}</td><td data-label="Anggota" className="numeric">{usedBy}</td><td data-label="Tugas aktif" className="numeric">{inTasks ? <Badge tone="ok">{inTasks} tugas</Badge> : <span className="muted">-</span>}</td></tr>;
        })}</tbody>
      </table></div>
    </section>
    {adding && <Modal title="Tambah kompetensi" onClose={() => setAdding(false)}>
      <form noValidate onSubmit={e => { e.preventDefault(); const id = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"); if (name.trim().length < 2) return setError("Tulis nama kompetensi."); if (competencies.some(c => c.id === id)) return setError("Kompetensi ini sudah ada di katalog."); dispatch({ type: "addCompetency", competency: { id, name: name.trim(), category } }); setAdding(false); setName(""); }}>
        <div className="form-grid">
          <label className="field"><span className="field-label">Nama</span><input className="input" value={name} onChange={e => { setName(e.target.value); setError(""); }} placeholder="Flutter" /></label>
          <label className="field"><span className="field-label">Kategori</span><select className="select" value={category} onChange={e => setCategory(e.target.value)}>{[...new Set(competencies.map(c => c.category))].map(c => <option key={c}>{c}</option>)}</select></label>
        </div>
        {error && <p className="field-error spaced" role="alert">{error}</p>}
        <div className="dialog-actions"><button type="button" className="button secondary" onClick={() => setAdding(false)}>Batal</button><button type="submit" className="button primary">Tambah</button></div>
      </form>
    </Modal>}
  </div>;
}
