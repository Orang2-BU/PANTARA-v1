"use client";

import Link from "next/link";
import * as React from "react";
import { FluidArt, rng } from "./fluid-art";

/**
 * Glass Folder: port dari komponen 21st.dev "Glass Folder Cards", disesuaikan ke Pantara
 * (03-ARCHITECTURE Q19). Tiga lapis: panel belakang bermotif cair, lembar tugas, panel kaca depan.
 * Hover/fokus = kaca condong; klik/Enter = folder terbuka dan lembar tugas mengipas (tiap lembar tautan).
 * Warna motif dan UI dibaca dari token 08-DESIGN, bukan hex; tanpa dependency selain React & Next.
 */

export type FolderFile = { name: string; meta?: string; href: string };
export type FolderMenuItem = { label: string; href: string };

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

// Geometri dalam satuan folder (340 × 272), diskalakan ke `width`.
const W = 340, H = 272, HEADROOM = 54, FRONT_TOP = 74, FRONT_H = H - FRONT_TOP, MAX_VISIBLE = 4;
const BACK_PATH = "M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z";
const FRONT_PATH = `M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 ${FRONT_H - 22}A22 22 0 0 1 318 ${FRONT_H}L22 ${FRONT_H}A22 22 0 0 1 0 ${FRONT_H - 22}Z`;
const fanSlot = (i: number, n: number) => (n <= 1 ? 0 : (i / (n - 1)) * 2 - 1);

export function GlassFolder({ label, meta, seed, art, files, menu, width = 320 }: {
  label: string; meta: string; seed: number; art: "marble" | "streak"; files: FolderFile[]; menu: FolderMenuItem[]; width?: number;
}) {
  const uid = React.useId().replace(/:/g, "");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const filesRef = React.useRef<HTMLDivElement>(null);
  const hitRef = React.useRef<HTMLButtonElement>(null);
  const keyRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  const [k, setK] = React.useState(width / W);

  // Skala mengikuti lebar kolom (maksimal `width`), jadi folder mengecil di layar sempit.
  React.useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const fit = () => setK(Math.min(width, el.offsetWidth || width) / W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  // Folder menyusun diri saat pertama kali terlihat.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { io.disconnect(); setEntered(true); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cahaya dan paralaks mengikuti kursor tanpa render ulang.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0, px = 0, py = 0;
    const write = () => { raf = 0; el.style.setProperty("--gf-px", px.toFixed(3)); el.style.setProperty("--gf-py", py.toFixed(3)); };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(write);
    };
    const leave = () => { px = 0; py = 0; if (!raf) raf = requestAnimationFrame(write); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);

  // Lembar tugas di folder tertutup keluar dari urutan Tab.
  React.useEffect(() => { filesRef.current?.toggleAttribute("inert", !open); }, [open]);

  // Escape dan klik di luar menutup menu / folder.
  React.useEffect(() => {
    if (!open && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) { setMenuOpen(false); keyRef.current?.focus(); } else { setOpen(false); hitRef.current?.focus(); }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (menuOpen && !menuRef.current?.contains(t) && !keyRef.current?.contains(t)) setMenuOpen(false);
      if (open && !menuOpen && !rootRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open, menuOpen]);

  React.useEffect(() => { if (menuOpen) menuRef.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus(); }, [menuOpen]);

  const onMenuKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? []);
    const at = items.indexOf(document.activeElement as HTMLElement);
    const go = (i: number) => { e.preventDefault(); items[(i + items.length) % items.length]?.focus(); };
    if (e.key === "ArrowDown") go(at + 1);
    else if (e.key === "ArrowUp") go(at - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(items.length - 1);
    else if (e.key === "Tab") setMenuOpen(false);
  };

  const start = Math.max(0, files.length - MAX_VISIBLE);
  const visible = files.slice(start);

  return <div ref={rootRef} className="gf-root" data-open={open || undefined} data-entered={entered || undefined} style={{ width: "100%", maxWidth: width, height: (H + HEADROOM) * k }}>
    <div className="gf-stage" style={{ transform: `translateY(${HEADROOM * k}px) scale(${k})` }}>
      <div className="gf-tilt">
        <div className="gf-shadow" aria-hidden="true" />
        <div className="gf-back" style={{ clipPath: `path('${BACK_PATH}')` }} aria-hidden="true">
          <FluidArt className="gf-art" style={art} seed={seed} w={W + 24} h={H + 24} scale={width / W} />
          <div className="gf-back-sheen" />
        </div>
        <svg className="gf-rim gf-back-rim" viewBox={`0 0 ${W} ${H}`} aria-hidden="true"><path d={BACK_PATH} /></svg>

        <div className="gf-front" style={{ clipPath: `path('${FRONT_PATH}')` }}>
          <div className="gf-tint" aria-hidden="true" />
          <div className="gf-spec" aria-hidden="true" />
          <svg className="gf-rim gf-front-rim" viewBox={`0 0 ${W} ${FRONT_H}`} aria-hidden="true">
            <defs><linearGradient id={`gf-rim-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" className="gf-rim-stop" stopOpacity="0.95" />
              <stop offset="0.35" className="gf-rim-stop" stopOpacity="0.35" />
              <stop offset="1" className="gf-rim-stop" stopOpacity="0.12" />
            </linearGradient></defs>
            <path d={FRONT_PATH} stroke={`url(#gf-rim-${uid})`} />
          </svg>
          <button ref={hitRef} type="button" className="gf-hit" aria-expanded={open} aria-label={`${open ? "Tutup" : "Buka"} folder ${label}, ${files.length} tugas terbuka`}
            onClick={() => { setMenuOpen(false); setOpen(!open); }} />
          <div className="gf-label"><span className="gf-title">{label}</span><span className="gf-meta">{meta}</span></div>
        </div>

        <div ref={filesRef} className="gf-files" role="list" aria-label={`Tugas terbuka ${label}`}>
          {visible.map((file, v) => {
            const jitter = rng(hashString(file.name));
            return <div key={file.href} role="listitem" className="gf-sheet-slot">
              <Link href={file.href} className="gf-sheet" style={{
                "--gf-slot": fanSlot(v, visible.length), "--gf-depth": visible.length - 1 - v,
                "--gf-jx": `${((jitter() - 0.5) * 10).toFixed(2)}px`, "--gf-jr": `${((jitter() - 0.5) * 3.2).toFixed(2)}deg`, zIndex: v + 1,
              } as React.CSSProperties}>
                <span className="gf-lines" aria-hidden="true"><i style={{ width: "86%" }} /><i style={{ width: "92%" }} /><i style={{ width: "64%" }} /><i style={{ width: "88%" }} /><i style={{ width: "42%" }} /></span>
                <span className="gf-sheet-head"><span className="gf-sheet-name">{file.name}</span>{file.meta && <span className="gf-sheet-meta">{file.meta}</span>}</span>
              </Link>
            </div>;
          })}
        </div>

        <button ref={keyRef} type="button" className="gf-key" aria-label={`Pilihan untuk ${label}`} aria-haspopup="menu" aria-expanded={menuOpen} aria-controls={`gf-menu-${uid}`} onClick={() => setMenuOpen(m => !m)}>
          <svg className="gf-glyph" viewBox="0 0 30 12" aria-hidden="true"><rect x="1" y="1.5" width="8" height="9" rx="3.4" /><rect x="11" y="1.5" width="8" height="9" rx="3.4" /><rect x="21" y="1.5" width="8" height="9" rx="3.4" /></svg>
        </button>
        <div ref={menuRef} id={`gf-menu-${uid}`} role="menu" aria-label={`Pilihan ${label}`} className="gf-menu" data-open={menuOpen || undefined} onKeyDown={onMenuKey}>
          <button type="button" role="menuitem" tabIndex={-1} disabled={!menuOpen} className="gf-menu-item" onClick={() => { setMenuOpen(false); setOpen(!open); }}>{open ? "Tutup folder" : "Buka folder"}</button>
          {menu.map(item => <Link key={item.href} href={item.href} role="menuitem" tabIndex={menuOpen ? -1 : undefined} aria-disabled={!menuOpen} className="gf-menu-item">{item.label}</Link>)}
        </div>
      </div>
    </div>
  </div>;
}
