"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/ui";
import { paginate } from "@/lib/paginate";

/** Baris per halaman untuk semua tabel data (tabel tidak memuat semua baris sekaligus saat data sudah banyak). */
const PAGE_SIZE = 10;

type View = ReturnType<typeof paginate>;

/** Kontrol Sebelumnya/Berikutnya; tidak tampil bila data muat satu halaman. */
function Pager({ view, onPage, unit, compact }: { view: View; onPage: (page: number) => void; unit: string; compact?: boolean }) {
  if (view.pages <= 1) return null;
  if (compact) return <div className="pager compact">
    <span aria-live="polite">{view.from}-{view.to} dari {view.total} {unit}</span>
    <div className="pager-actions" role="group" aria-label={`Halaman ${unit}`}>
      <button type="button" className="icon-button" aria-label="Sebelumnya" disabled={!view.hasPrev} onClick={() => onPage(view.page - 1)}><Icon icon={ChevronLeft} size={16} /></button>
      <span className="small muted">{view.page + 1} / {view.pages}</span>
      <button type="button" className="icon-button" aria-label="Berikutnya" disabled={!view.hasNext} onClick={() => onPage(view.page + 1)}><Icon icon={ChevronRight} size={16} /></button>
    </div>
  </div>;
  return <div className="pager">
    <span aria-live="polite">Menampilkan {view.from}-{view.to} dari {view.total} {unit}</span>
    <div className="pager-actions" role="group" aria-label={`Halaman tabel ${unit}`}>
      <button type="button" className="button secondary" disabled={!view.hasPrev} onClick={() => onPage(view.page - 1)}><Icon icon={ChevronLeft} size={16} />Sebelumnya</button>
      <span className="small muted">{view.page + 1} / {view.pages}</span>
      <button type="button" className="button secondary" disabled={!view.hasNext} onClick={() => onPage(view.page + 1)}>Berikutnya<Icon icon={ChevronRight} size={16} /></button>
    </div>
  </div>;
}

/**
 * Membungkus tabel: memotong `items` jadi 10 baris per halaman (`size` untuk daftar ringkas di kartu samping, `compact` = pager ikon) dan menampilkan pager di bawahnya.
 * Halaman kembali ke awal bila jumlah data berubah (mis. filter atau pencarian). `children` menerima baris halaman ini.
 */
export function Paged<T>({ items, unit, size = PAGE_SIZE, compact, children }: { items: T[]; unit: string; size?: number; compact?: boolean; children: (rows: T[], pageIndex: number) => ReactNode }) {
  const [at, setAt] = useState({ page: 0, total: items.length });
  const view = paginate(items, at.total === items.length ? at.page : 0, size);
  return <>
    {children(view.rows, view.page)}
    <Pager view={view} onPage={page => setAt({ page, total: items.length })} unit={unit} compact={compact} />
  </>;
}
