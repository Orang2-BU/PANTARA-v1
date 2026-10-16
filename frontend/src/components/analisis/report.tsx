"use client";

import { GitCompareArrows, ShieldAlert, Timer, UserCheck, Users } from "lucide-react";
import { MetricCard, PageHeading, SectionTitle } from "@/components/app/parts";
import { Badge, Icon } from "@/components/ui";
import { BASELINE_MINUTES } from "@/lib/demo/seed";
import { useDemo } from "@/lib/demo/store";
import { decisionStats } from "@/lib/engine/metrics";
import { minutes, number, percent, shortDate } from "@/lib/format";

/** Indikator dampak proposal §4.1, dihitung dari data (tanpa klaim persen sebelum diuji). */
export function Report() {
  const { decisions, members, taskById } = useDemo();
  const s = decisionStats(decisions);
  const tb = BASELINE_MINUTES * 60_000;
  const efficiency = s.assigned ? (tb - s.avgMs) / tb : 0;
  const complete = members.filter(m => m.availableHours !== null).length;
  const ordered = decisions.filter(d => !d.rejected).sort((a, b) => a.decidedAt.localeCompare(b.decidedAt));
  // Ruang 10% supaya garis acuan manual tidak menempel di ujung trek.
  const max = Math.max(tb, ...ordered.map(d => d.decisionMs)) * 1.1;
  return <div className="page-enter">
    <PageHeading title="Laporan dampak" subtitle="Mengukur dampak pilot dengan membandingkan proses manual (baseline) dan proses berbantuan Pantara." />
    <section className="highlight-card" aria-label="Efisiensi waktu keputusan">
      <div className="highlight-top"><span>Efisiensi waktu keputusan</span><Badge tone="warn">{s.n < 10 ? `Belum cukup data (${s.n} keputusan, minimal 10)` : `${s.n} keputusan`}</Badge></div>
      <div className="highlight-row">
        <div><h2>(Tb − Tp) / Tb × 100%</h2><p>Tb {BASELINE_MINUTES} menit dari observasi manual sebelum pilot [asumsi data contoh] · Tp rata-rata {minutes(s.avgMs)} tercatat otomatis</p></div>
        <div className="highlight-score">{percent(efficiency)}</div>
      </div>
      <p>Angka ini dari data contoh, bukan hasil pilot. Persentase akhir baru dicantumkan setelah pengujian supaya punya dasar empiris.</p>
    </section>
    <div className="metrics-grid spaced">
      <MetricCard icon={ShieldAlert} label="Konflik terdeteksi sebelum penugasan" value={String(s.conflicts)} unit="peringatan" note="Kapasitas, tenggat berdekatan, dependensi" />
      <MetricCard icon={UserCheck} label="Tingkat penerimaan rekomendasi" value={s.n ? percent(s.accepted / s.n) : "-"} note={`Target pilot ≥ 50% (hipotesis H2)`} tone="brand" />
      <MetricCard icon={GitCompareArrows} label="Frekuensi override" value={s.n ? percent(s.override / s.n) : "-"} note={`${s.rejected} rekomendasi ditolak · alasan dipakai mengkalibrasi bobot`} />
      <MetricCard icon={Users} label="Kelengkapan Work Twin" value={percent(complete / members.length)} unit={`${complete} dari ${members.length}`} note="Target ≥ 80% setelah minggu pertama (H1)" tone={complete / members.length >= 0.8 ? "brand" : "warn"} />
    </div>
    <section className="card">
      <SectionTitle title="Lama keputusan per penugasan" subtitle={`Tp tiap keputusan dibanding cara manual (${BASELINE_MINUTES} menit). Makin pendek makin cepat.`} />
      <div className="bar-list" role="list" aria-label="Lama keputusan per penugasan" style={{ "--ref": tb / max } as React.CSSProperties}>
        <span className="bar-ref" aria-hidden="true"><span>Manual {BASELINE_MINUTES} menit</span></span>
        {ordered.map(d => {
          const ratio = d.decisionMs / max;
          const saved = Math.round((tb - d.decisionMs) / 60_000);
          const task = taskById(d.taskId);
          return <div key={d.id} className="bar-row" role="listitem" tabIndex={0} aria-label={`${task?.title ?? d.taskId}: ${minutes(d.decisionMs)}, ${saved >= 0 ? `${saved} menit lebih cepat` : `${-saved} menit lebih lama`} dari manual`}>
            <span className="bar-label"><strong>{task?.title ?? d.taskId}</strong><small>{shortDate(d.decidedAt)} · {d.rank ? `kandidat #${d.rank}` : "override"}</small></span>
            <span className="bar-track">
              <span className="bar-fill" style={{ width: `${ratio * 100}%` }} />
              <span className={`bar-tip ${ratio > 0.6 ? "flip" : ""}`} style={{ left: `${ratio * 100}%` }} role="tooltip">
                <strong>{minutes(d.decisionMs)}</strong> · {saved >= 0 ? `${saved} menit lebih cepat dari manual` : `${-saved} menit lebih lama dari manual`}
              </span>
            </span>
            <span className="bar-value">{number(Math.round(d.decisionMs / 60_000))} mnt</span>
          </div>;
        })}
      </div>
      <p className="small muted spaced with-icon"><Icon icon={Timer} size={13} />Tb diukur dengan stopwatch pada 10 keputusan sebelum pilot; Tp dicatat sistem dari tugas dibuka sampai ditetapkan.</p>
    </section>
  </div>;
}
