"use client";

import { useRef, useState, type ComponentProps } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/ui";
import { NOW } from "@/lib/demo/seed";
import { addDays, addMonths, dayLabel, monthGrid, monthLabel, WEEKDAYS } from "@/lib/calendar";
import { date } from "@/lib/format";

const TODAY = NOW.slice(0, 10);
const MOVES: Record<string, (iso: string) => string> = {
  ArrowLeft: d => addDays(d, -1), ArrowRight: d => addDays(d, 1), ArrowUp: d => addDays(d, -7), ArrowDown: d => addDays(d, 7),
  PageUp: d => addMonths(d, -1), PageDown: d => addMonths(d, 1),
};

type Props = { value: string; onChange: (iso: string) => void; min?: string; placeholder?: string } & Omit<ComponentProps<"button">, "value" | "onChange" | "min">;

/**
 * Pemilih tanggal kaca: popover top-layer (tidak terpotong kartu), pekan mulai Senin, tanggal terpilih berupa lingkaran teal.
 * Keyboard: panah menggeser hari, PageUp/PageDown bulan, Enter memilih, Esc menutup (bawaan popover).
 */
export function DatePicker({ value, onChange, min, placeholder = "Pilih tanggal", ...trigger }: Props) {
  const pop = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [cursor, setCursor] = useState(value || TODAY);
  const moved = useRef(false);

  const open = () => {
    const el = pop.current, anchor = btn.current;
    if (!el || !anchor) return;
    setCursor(value || TODAY);
    el.showPopover();
    // Tinggi diukur setelah tampil. Prioritas: tepat di bawah kolom; bila tidak muat, halaman digulir agar kolom di tengah layar
    // (tetap di bawah kolom); bila masih tidak muat (layar sangat pendek), di atasnya atau dijepit di dalam layar.
    const h = el.offsetHeight, gap = 6, edge = 16;
    let box = anchor.getBoundingClientRect();
    if (box.bottom + gap + h > window.innerHeight - edge) { anchor.scrollIntoView({ block: "center", behavior: "instant" }); box = anchor.getBoundingClientRect(); }
    const below = box.bottom + gap, above = (anchor.closest(".field") ?? anchor).getBoundingClientRect().top - gap - h; // di atas: label tetap terlihat
    el.style.left = `${Math.max(8, Math.min(box.left, window.innerWidth - el.offsetWidth - 8))}px`;
    el.style.top = `${below + h <= window.innerHeight - edge ? below : above >= edge ? above : Math.max(edge, window.innerHeight - edge - h)}px`;
  };
  const pick = (iso: string) => {
    if (min && iso < min) return;
    onChange(iso);
    pop.current?.hidePopover();
    btn.current?.focus();
  };
  const go = (iso: string) => { moved.current = true; setCursor(iso); };

  return <>
    <button ref={btn} type="button" className="input date-trigger" onClick={open} aria-haspopup="dialog" {...trigger}>
      <span className={value ? "" : "muted"}>{value ? date(value) : placeholder}</span><Icon icon={CalendarDays} size={16} />
    </button>
    <div ref={pop} popover="auto" role="dialog" aria-label="Pilih tanggal" className="date-pop"
      onToggle={e => { if (e.newState === "open") pop.current?.querySelector<HTMLElement>('[tabindex="0"][data-iso]')?.focus({ preventScroll: true }); }}>
      <div className="date-head">
        <strong aria-live="polite">{monthLabel(cursor)}</strong>
        <span>
          <button type="button" className="icon-button subtle" aria-label="Bulan sebelumnya" onClick={() => go(addMonths(cursor, -1))}><Icon icon={ChevronLeft} size={16} /></button>
          <button type="button" className="icon-button subtle" aria-label="Bulan berikutnya" onClick={() => go(addMonths(cursor, 1))}><Icon icon={ChevronRight} size={16} /></button>
        </span>
      </div>
      <div className="date-grid" role="grid" aria-label={monthLabel(cursor)}>
        {WEEKDAYS.map(d => <span key={d} className="date-weekday" aria-hidden="true">{d}</span>)}
        {monthGrid(cursor).map(iso => {
          const out = iso.slice(0, 7) !== cursor.slice(0, 7), off = Boolean(min && iso < min);
          return <button key={iso} type="button" data-iso={iso} tabIndex={iso === cursor ? 0 : -1} aria-label={dayLabel(iso)} aria-pressed={iso === value} aria-disabled={off || undefined} aria-current={iso === TODAY ? "date" : undefined}
            className={`date-day ${iso === value ? "selected" : ""} ${out ? "out" : ""} ${off ? "off" : ""} ${iso === TODAY ? "today" : ""}`}
            onClick={() => pick(iso)}
            ref={el => { if (el && moved.current && iso === cursor && document.activeElement !== el && pop.current?.matches(":popover-open")) { moved.current = false; el.focus({ preventScroll: true }); } }}
            onKeyDown={e => { const next = MOVES[e.key]?.(iso); if (next) { e.preventDefault(); go(next); } }}>{Number(iso.slice(8))}</button>;
        })}
      </div>
      <div className="date-foot"><button type="button" className="text-link" onClick={() => pick(TODAY)}>Hari ini</button></div>
    </div>
  </>;
}
