"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Badge, Icon, type Tone } from "@/components/ui";
import type { Member, Priority, TaskStatus } from "@/lib/demo/types";
import { utilTone } from "@/lib/engine/whatif";
import { number, percent } from "@/lib/format";

// Potongan UI area aplikasi yang dipakai banyak layar (pola K-DASP).

export function PageHeading({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return <div className="page-heading"><div><h1>{title}</h1><p>{subtitle}</p></div>{actions && <div className="page-actions">{actions}</div>}</div>;
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="section-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

export function MetricCard({ icon, label, value, unit, note, tone, href }: { icon: LucideIcon; label: string; value: string; unit?: string; note: string; tone?: "brand" | "warn"; href?: string }) {
  const body = <>
    <div className="metric-label"><span className="metric-icon"><Icon icon={icon} size={16} /></span>{label}{href && <Icon icon={ArrowUpRight} size={15} className="metric-arrow" />}</div>
    <div className="metric-bottom"><div className="metric-value">{value}{unit && <span>{unit}</span>}</div></div>
    <div className={`metric-delta ${tone ? `${tone}-text` : ""}`}>{note}</div>
  </>;
  return href ? <Link href={href} className="card metric-card">{body}</Link> : <section className="card metric-card">{body}</section>;
}

function Avatar({ member, large = false }: { member: Pick<Member, "initials" | "availableHours">; large?: boolean }) {
  return <span className={`avatar ${large ? "large" : ""}`}>{member.initials}</span>;
}

export function Person({ member, sub }: { member: Member; sub?: string }) {
  return <span className="person"><Avatar member={member} /><span><strong>{member.name}</strong><small>{sub ?? member.role}</small></span></span>;
}

/** Batang kapasitas dengan teks angka (status tidak hanya lewat warna). */
export function CapacityBar({ allocated, available, added = 0 }: { allocated: number; available: number | null; added?: number }) {
  if (available === null) return <div className="capacity-cell"><div className="capacity-top"><span className="muted">0 jam teralokasi</span><span className="warn-text">Belum diisi</span></div><div className="capacity-empty" /></div>;
  const util = (allocated + added) / available;
  const tone = utilTone(util);
  const left = available - allocated - added;
  return <div className="capacity-cell">
    <div className="capacity-top"><strong>{number(allocated + added)} / {number(available)} jam</strong><span className={tone === "ok" ? "muted" : `${tone}-text`}>{left >= 0 ? `Sisa ${number(left)} jam` : `Lebih ${number(-left)} jam`}</span></div>
    <div className={`capacity-bar ${tone === "ok" ? "" : tone}`} role="img" aria-label={`Terisi ${percent(util)}`}>
      <span style={{ width: `${Math.min(allocated / available, 1) * 100}%` }} />
      {added > 0 && <span className="added" style={{ width: `${Math.max(0, Math.min((allocated + added) / available, 1) - allocated / available) * 100}%` }} />}
    </div>
  </div>;
}

const STATUS: Record<TaskStatus, { label: string; tone: Tone }> = {
  draf: { label: "Draf", tone: "neutral" },
  belum: { label: "Belum ditugaskan", tone: "warn" },
  menunggu: { label: "Menunggu jawaban", tone: "neutral" },
  berjalan: { label: "Berjalan", tone: "ok" },
  selesai: { label: "Selesai", tone: "neutral" },
};
export const statusLabel = (s: TaskStatus) => STATUS[s].label;
export function StatusBadge({ status }: { status: TaskStatus }) {
  return <Badge tone={STATUS[status].tone}>{STATUS[status].label}</Badge>;
}

const PRIORITY: Record<Priority, { label: string; tone: Tone }> = {
  tinggi: { label: "Tinggi", tone: "crit" },
  normal: { label: "Normal", tone: "neutral" },
  rendah: { label: "Rendah", tone: "neutral" },
};
export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge tone={PRIORITY[priority].tone}>{PRIORITY[priority].label}</Badge>;
}

export function DataBadge({ complete }: { complete: boolean }) {
  return complete ? <Badge tone="ok">Lengkap</Badge> : <Badge tone="warn">Belum lengkap</Badge>;
}

export function EmptyState({ icon, title, text, action }: { icon: LucideIcon; title: string; text: string; action?: ReactNode }) {
  return <div className="empty-state"><span className="placeholder-symbol"><Icon icon={icon} size={28} /></span><h3>{title}</h3><p>{text}</p>{action}</div>;
}

/** Fallback Suspense halaman klien (rute ber-param / query). */
export function PageSkeleton() {
  return <div className="answer-skeleton" aria-busy="true" aria-label="Memuat halaman"><div /><div /><div /></div>;
}

/** Stepper alur inti P12-P15 (gaya .toggle template). */
export function FlowSteps({ current }: { current: 0 | 1 | 2 | 3 }) {
  const steps = ["Tugas", "Kebutuhan", "Kandidat", "Simulasi"];
  return <ol className="toggle flow-steps" aria-label="Langkah penugasan">
    {steps.map((step, i) => <li key={step} className={`toggle-item ${i === current ? "selected" : ""} ${i < current ? "done" : ""}`} aria-current={i === current ? "step" : undefined}>{i + 1}. {step}</li>)}
  </ol>;
}
