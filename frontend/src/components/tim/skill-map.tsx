"use client";

import { Paged } from "@/components/ui/pager";
import Link from "next/link";
import { ArrowRight, ShieldCheck, TriangleAlert } from "lucide-react";
import { PageHeading, Person, SectionTitle } from "@/components/app/parts";
import { Badge, Icon } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import { LEVEL_LABEL, memberLevel } from "@/lib/engine/score";
import { atRiskCompetencies } from "@/lib/engine/skills";

/** P40: siapa bisa apa untuk semua anggota, plus kompetensi rawan (konsentrasi pengetahuan, 01-PRD R4). */
export function SkillMap() {
  const { members, competencies } = useDemo();
  const categories = [...new Set(competencies.map(c => c.category))];
  const ordered = categories.flatMap(cat => competencies.filter(c => c.category === cat));
  const risky = atRiskCompetencies(competencies, members);
  return <div className="page-enter">
    <PageHeading title="Peta keahlian" subtitle="Siapa menguasai apa, untuk semua anggota. Level dari profil kerja masing-masing, bukan penilaian kinerja." />

    <section className="card">
      <SectionTitle title="Kompetensi rawan" subtitle="Dikuasai paling banyak 1 anggota di level Mandiri ke atas. Berisiko bila orang itu cuti, penuh, atau keluar." action={<Link className="text-link" href="/pengaturan/rekomendasi">Preset Sebar pengetahuan<Icon icon={ArrowRight} size={14} /></Link>} />
      {risky.length ? <ul className="risk-list">{risky.map(({ competency, holders }) => <li key={competency.id}>
        <span><strong>{competency.name}</strong><small>{competency.category}</small></span>
        {holders.length
          ? <Badge tone="warn">Hanya {holders[0].name} ({LEVEL_LABEL[memberLevel(holders[0], competency.id)]})</Badge>
          : <Badge tone="crit">Belum ada yang Mandiri</Badge>}
      </li>)}</ul> : <p className="small muted with-icon"><Icon icon={ShieldCheck} size={14} />Semua kompetensi dikuasai minimal 2 anggota di level Mandiri.</p>}
    </section>

    <section className="card spaced">
      <SectionTitle title="Matriks keahlian" subtitle={`${members.length} anggota × ${competencies.length} kompetensi. Klik nama untuk membuka profil kerja.`} />
      <Paged items={members} unit="anggota">{(paged) => <><div className="table-scroll skill-map"><table>
        <thead>
          <tr><th rowSpan={2}>Anggota</th>{categories.map(cat => <th key={cat} colSpan={competencies.filter(c => c.category === cat).length} className="skill-cat">{cat}</th>)}</tr>
          <tr>{ordered.map(c => <th key={c.id} scope="col"><span className="skill-head">{risky.some(r => r.competency.id === c.id) && <><Icon icon={TriangleAlert} size={12} className="warn-text" /><span className="sr-only">Rawan: </span></>}<span>{c.name}</span></span></th>)}</tr>
        </thead>
        <tbody>{paged.map(m => <tr key={m.id}>
          <th scope="row"><Link href={`/tim/${m.id}`}><Person member={m} /></Link></th>
          {ordered.map(c => {
            const level = memberLevel(m, c.id);
            return <td key={c.id}><span className={`skill-level l${level}`}>{level ? LEVEL_LABEL[level] : "-"}</span></td>;
          })}
        </tr>)}</tbody>
      </table></div></>}</Paged>
      <p className="legend spaced"><span><span className="skill-level l3">Mahir</span></span><span><span className="skill-level l2">Mandiri</span></span><span><span className="skill-level l1">Dasar</span></span><span><span className="skill-level l0">-</span> belum ada</span></p>
    </section>
  </div>;
}
