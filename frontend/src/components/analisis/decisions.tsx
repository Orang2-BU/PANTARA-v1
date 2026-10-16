"use client";

import Link from "next/link";
import { Download, GitCompareArrows, History, Timer, UserCheck } from "lucide-react";
import { MetricCard, PageHeading } from "@/components/app/parts";
import { Badge, Icon } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import { REASON_LABEL } from "@/lib/demo/reasons";
import { decisionStats } from "@/lib/engine/metrics";
import { PRESETS } from "@/lib/engine/score";
import { date, minutes, percent, time } from "@/lib/format";

export function Decisions() {
  const { decisions, taskById, memberById } = useDemo();
  const s = decisionStats(decisions);
  function exportCsv() {
    const header = "id,tugas,dipilih,peringkat,preset,alasan,catatan,lama_menit,konflik,waktu";
    const rows = decisions.map(d => [d.id, taskById(d.taskId)?.title ?? d.taskId, d.memberIds.map(m => memberById(m)?.name).join(" & "), d.rejected ? "ditolak" : d.rank ?? "override", PRESETS[d.preset].label, d.reasonCode ? REASON_LABEL[d.reasonCode] : "", d.note ?? "", Math.round(d.decisionMs / 60_000), d.conflictsSeen, d.decidedAt].map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
    const url = URL.createObjectURL(new Blob([[header, ...rows].join("\n")], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url; a.download = "pantara-riwayat-keputusan.csv"; a.click();
    URL.revokeObjectURL(url);
  }
  return <div className="page-enter">
    <PageHeading title="Riwayat keputusan" subtitle="Setiap keputusan tercatat: kandidat yang dipilih, peringkatnya, dan alasan override atau penolakan. Dipakai untuk mengkalibrasi bobot." actions={<button className="button secondary" onClick={exportCsv}><Icon icon={Download} size={16} />Ekspor CSV</button>} />
    <div className="metrics-grid">
      <MetricCard icon={History} label="Keputusan tercatat" value={String(s.n)} unit="keputusan" note="Sejak awal pilot" />
      <MetricCard icon={UserCheck} label="Memakai rekomendasi" value={s.n ? percent(s.accepted / s.n) : "-"} unit={`${s.accepted} dari ${s.n}`} note="Tingkat penerimaan rekomendasi" tone="brand" />
      <MetricCard icon={GitCompareArrows} label="Override & ditolak" value={String(s.override + s.rejected)} unit="keputusan" note={`${s.override} di luar tiga teratas, ${s.rejected} rekomendasi ditolak`} />
      <MetricCard icon={Timer} label="Rata-rata lama keputusan" value={minutes(s.avgMs)} note="Tp: dari tugas dibuka sampai ditetapkan" />
    </div>
    <section className="card">
      <div className="table-scroll stack-table"><table>
        <thead><tr><th>Tugas</th><th>Dipilih</th><th>Peringkat</th><th>Preset</th><th>Alasan</th><th className="numeric">Lama</th><th className="numeric">Konflik</th><th>Waktu</th></tr></thead>
        <tbody>{decisions.map(d => <tr key={d.id}>
          <td><Link href={`/tugas/${d.taskId}`}><strong>{taskById(d.taskId)?.title ?? d.taskId}</strong></Link><span className="table-sub mono">{d.id}</span></td>
          <td data-label="Dipilih">{d.rejected ? <span className="muted">Belum ada</span> : d.memberIds.map(m => memberById(m)?.name).join(" & ")}</td>
          <td data-label="Peringkat">{d.rejected ? <Badge tone="crit">Ditolak</Badge> : d.rank ? <Badge tone="ok">#{d.rank}</Badge> : <Badge tone="warn">Override</Badge>}</td>
          <td data-label="Preset">{PRESETS[d.preset].label}</td>
          <td data-label="Alasan">{d.reasonCode ? <>{REASON_LABEL[d.reasonCode]}{d.note && <span className="table-sub">{d.note}</span>}</> : <span className="muted">-</span>}</td>
          <td data-label="Lama" className="numeric">{minutes(d.decisionMs)}</td>
          <td data-label="Konflik" className="numeric">{d.conflictsSeen}</td>
          <td data-label="Waktu">{date(d.decidedAt)} {time(d.decidedAt)}</td>
        </tr>)}</tbody>
      </table></div>
      <div className="table-footer"><span>Log keputusan tidak bisa diubah (audit)</span></div>
    </section>
  </div>;
}
