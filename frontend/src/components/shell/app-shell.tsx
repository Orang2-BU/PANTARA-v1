"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Bell, CalendarDays, ChevronDown, ChevronLeft, ChevronsLeft, ChevronsRight, CircleHelp, Menu, X } from "lucide-react";
import { lockScroll } from "@/lib/scroll-lock";
import { NAVIGATION, PAGES, SUBNAV, activeNav, activeSub, trailOf, type PageRoute } from "@/lib/nav";
import { Badge, Icon, Modal } from "@/components/ui";
import { managerNotices } from "@/lib/demo/notifications";
import { useDemo } from "@/lib/demo/store";
import { BrandLockup, BrandWordmark } from "./brand";

// Port shell template Soft Op Dashboard (acuan: K-DASP/MilkGraph components/shell/app-shell.tsx).

// Akun & periode demo M0 (prototipe proposal); diganti sesi login dan data nyata di M1.
const DEMO_USER = { name: "Krisna Panca", role: "Manajer tim", initials: "KP" };
const PERIOD = { label: "Minggu aktif", range: "28 Sep - 2 Okt 2026" };

type Panel = "period" | "notifications" | "profile" | "help";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const demo = useDemo();
  const notices = managerNotices(demo);
  const unread = notices.filter(n => !demo.readNotifications.includes(n.id));

  useEffect(() => {
    if (!drawer) return;
    const node = drawerRef.current;
    const trigger = menuButton.current;
    const unlock = lockScroll();
    node?.showModal();
    const media = window.matchMedia("(min-width: 768px)");
    const close = () => { if (media.matches) setDrawer(false); };
    media.addEventListener("change", close);
    return () => { node?.close(); unlock(); media.removeEventListener("change", close); trigger?.focus(); };
  }, [drawer]);

  const closeDrawer = () => setDrawer(false);
  const openPanel = (next: Panel) => { setDrawer(false); setPanel(next); };

  function renderNavigation(mobile = false) {
    return <>
      <div className="brand-row">
        <Link href="/dasbor" className="brand" aria-label="Pantara, ke Dasbor" onClick={closeDrawer}>
          <BrandLockup />
        </Link>
        {mobile && <button className="icon-button" aria-label="Tutup menu" onClick={closeDrawer}><Icon icon={X} /></button>}
      </div>
      <Suspense fallback={<NavLinks pathname="" onNavigate={closeDrawer} />}>
        <CurrentNavLinks onNavigate={closeDrawer} />
      </Suspense>
      <div className="sidebar-bottom">
        <button className="nav-item" onClick={() => openPanel("help")} aria-label="Panduan demo">
          <span className="nav-icon"><Icon icon={CircleHelp} size={19} /></span><span className="nav-label">Panduan demo</span>
        </button>
        <button className="account" onClick={() => openPanel("profile")} aria-label={`Lihat akun ${DEMO_USER.name}`}>
          <span className="avatar">{DEMO_USER.initials}</span>
          <span className="account-copy nav-label"><strong>{DEMO_USER.name}</strong><span>{DEMO_USER.role}</span></span>
          <Icon icon={ChevronDown} size={15} className="nav-label" />
        </button>
      </div>
    </>;
  }

  return <div className={`app-frame ${collapsed === null ? "auto-sidebar" : collapsed ? "collapsed" : "expanded"}`}>
    <a className="skip-link" href="#main-content">Lewati ke konten</a>
    <aside className="sidebar" id="desktop-navigation">{renderNavigation()}</aside>
    <div className="workspace">
      <header className="topbar">
        <div className="topbar-start">
          <button className="icon-button desktop-toggle" aria-label="Buka atau ciutkan sidebar" aria-expanded={collapsed === null ? undefined : !collapsed} aria-controls="desktop-navigation" onClick={() => setCollapsed(collapsed === null ? window.innerWidth >= 1200 : !collapsed)}>
            <Icon icon={collapsed === false ? ChevronsLeft : ChevronsRight} />
          </button>
          <button ref={menuButton} className="icon-button mobile-menu" aria-label="Buka menu" aria-expanded={drawer} aria-controls="mobile-navigation" onClick={() => setDrawer(true)}><Icon icon={Menu} /></button>
          <Link href="/dasbor" className="mobile-brand" aria-label="Pantara, ke Dasbor">
            <BrandWordmark />
          </Link>
          <Suspense fallback={<span className="breadcrumb">Ruang kerja</span>}>
            <Breadcrumb />
          </Suspense>
        </div>
        <div className="topbar-actions">
          <button className="shift-button" onClick={() => setPanel("period")}>
            <Icon icon={CalendarDays} size={16} /><span>{PERIOD.label}<span className="period-date">, {PERIOD.range}</span></span><Icon icon={ChevronDown} size={14} />
          </button>
          <button className="icon-button notification" aria-label={`Lihat ${unread.length} notifikasi belum dibaca`} onClick={() => setPanel("notifications")}><Icon icon={Bell} />{unread.length > 0 && <span>{unread.length}</span>}</button>
          <button className="avatar top-avatar" aria-label="Lihat profil" onClick={() => setPanel("profile")}>{DEMO_USER.initials}</button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={null}><BackLink /></Suspense>
        {children}
      </main>
      <footer className="workspace-footer">
        <span>Pantara <span className="footer-divider">/</span> Orkestrasi kerja adaptif</span>
        <span>Diperbarui 09.15 WIB <span className="status-dot" /></span>
      </footer>
    </div>
    {drawer && <dialog ref={drawerRef} id="mobile-navigation" aria-label="Menu navigasi" className="mobile-drawer" onCancel={closeDrawer} onClick={e => { if (e.target === e.currentTarget) closeDrawer(); }}><div className="drawer-content">{renderNavigation(true)}</div></dialog>}
    {panel && <Modal title={{ period: "Pilih periode", notifications: "Notifikasi", profile: "Profil pengguna", help: "Panduan demo" }[panel]} onClose={() => setPanel(null)}>
      {panel === "period" && <>
        <p className="muted">Baru satu periode mingguan yang tersedia.</p>
        <button className="period-choice" onClick={() => setPanel(null)}><strong>{PERIOD.label}</strong><span>{PERIOD.range} · 32 jam per anggota</span><Badge tone="ok">Dipilih</Badge></button>
        <p className="small muted">Periode lain belum tersedia di mockup.</p>
      </>}
      {panel === "notifications" && <div className="notification-list">
        {notices.length ? notices.map(n => <Link key={n.id} href={n.href} onClick={() => { demo.dispatch({ type: "readAll", ids: [n.id] }); setPanel(null); }}><span><strong>{n.title}</strong><span>{n.subtitle}</span></span><Icon icon={ArrowUpRight} /></Link>) : <p className="muted">Tidak ada notifikasi.</p>}
      </div>}
      {panel === "profile" && <div className="profile-info">
        <span className="avatar large">{DEMO_USER.initials}</span>
        <h3>{DEMO_USER.name}</h3>
        <p>{DEMO_USER.role} · Positif & Profesional</p>
        <Badge>Pengguna demo</Badge>
        <p className="muted">Rekomendasi membantu, kamu yang memutuskan. Data jam kerja bukan ukuran produktivitas.</p>
        <div className="profile-links">
          <Link className="button secondary" href="/akun" onClick={() => setPanel(null)}>Akun saya</Link>
          <Link className="button secondary" href="/notifikasi" onClick={() => setPanel(null)}>Semua notifikasi</Link>
          <Link className="button secondary" href="/masuk" onClick={() => setPanel(null)}>Keluar</Link>
        </div>
      </div>}
      {panel === "help" && <>
        <p>Alur penugasan dari tugas baru sampai keputusan.</p>
        <ol className="guide-list">
          <li><strong>Buat tugas</strong><p>Tulis judul, deskripsi, tenggat, dan prioritas seperti biasa.</p></li>
          <li><strong>Tinjau kebutuhan (Task DNA)</strong><p>Periksa kompetensi, estimasi, dan dependensi. Isian yang ragu ditandai untuk dicek.</p></li>
          <li><strong>Bandingkan kandidat</strong><p>Tiga kandidat teratas beserta skor dan alasan per faktor.</p></li>
          <li><strong>Simulasi lalu tetapkan</strong><p>Lihat akibat ke kapasitas anggota sebelum menetapkan. Keputusan tetap di manajer.</p></li>
        </ol>
        <Badge>Semua data adalah contoh</Badge>
        <p className="spaced"><button className="button secondary" onClick={() => { demo.dispatch({ type: "reset" }); setPanel(null); }}>Reset data contoh</button></p>
        <p className="small muted"><Link className="inline-link" href="/bantuan" onClick={() => setPanel(null)}>Buka halaman bantuan</Link></p>
      </>}
    </Modal>}
  </div>;
}

// usePathname butuh Suspense di rute ber-param dinamis (Next 16 cacheComponents).
function CurrentNavLinks({ onNavigate }: { onNavigate: () => void }) {
  return <NavLinks pathname={usePathname()} onNavigate={onNavigate} />;
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const current = activeNav(pathname);
  return <nav aria-label="Navigasi utama">
    {NAVIGATION.map(({ group, routes }) => <div className="nav-group" key={group}>
      <p className="group-title nav-label">{group}</p>
      {routes.map(href => {
        const item = PAGES[href];
        const active = current === href;
        const sub = SUBNAV[href];
        const link = <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`} title={`${item.label} · ${group}`} aria-label={`${item.label}, grup ${group}`} aria-current={active && !sub ? "page" : undefined} onClick={onNavigate}>
          <span className="nav-icon"><Icon icon={item.icon} size={19} /></span>
          <span className="nav-label">{item.label}</span>
        </Link>;
        return sub ? <div key={href}>{link}<NavBranch items={sub} open={active} current={activeSub(pathname)} onNavigate={onNavigate} /></div> : link;
      })}
    </div>)}
  </nav>;
}

// Geometri cabang (px): batang di tengah ikon menu induk, cabang melengkung ke tiap baris anak.
const ROW = 36, PAD = 4, TRUNK = 22, END = 36, R = 8;
const rowY = (k: number) => PAD + k * ROW + ROW / 2;
const branchPath = (k: number) => `M ${TRUNK} ${rowY(k) - R} A ${R} ${R} 0 0 0 ${TRUNK + R} ${rowY(k)} H ${END}`;
const reachPath = (k: number) => `M ${TRUNK} 0 V ${rowY(k) - R} A ${R} ${R} 0 0 0 ${TRUNK + R} ${rowY(k)} H ${END}`;
const reachLength = (k: number) => rowY(k) - R + (Math.PI * R) / 2 + (END - TRUNK - R);

/** Sub-menu bercabang (pola React Bits "BranchedMenu", disesuaikan ke token & lucide; 03-ARCHITECTURE Q21). */
function NavBranch({ items, open, current, onNavigate }: { items: NonNullable<(typeof SUBNAV)[PageRoute]>; open: boolean; current?: string; onNavigate: () => void }) {
  const height = PAD * 2 + items.length * ROW;
  return <div className="nav-branch" data-open={open || undefined} inert={!open}>
    <div className="nav-branch-fold"><div className="nav-branch-tree" style={{ height }}>
      <svg className="nav-branch-lines" width={END + 4} height={height} aria-hidden="true">
        <path className="nav-branch-base" d={`M ${TRUNK} 0 V ${rowY(items.length - 1) - R}`} />
        {items.map((it, k) => <path key={it.href} className="nav-branch-base" d={branchPath(k)} />)}
        {items.map((it, k) => <path key={`${it.href}-on`} className="nav-branch-reach" d={reachPath(k)} style={{ strokeDasharray: reachLength(k), strokeDashoffset: current === it.href ? 0 : reachLength(k) }} />)}
      </svg>
      {items.map(it => <Link key={it.href} href={it.href} className={`nav-sub ${current === it.href ? "active" : ""}`} title={it.label} aria-current={current === it.href ? "page" : undefined} onClick={onNavigate}>
        <span className="nav-sub-icon"><Icon icon={it.icon} size={15} /></span><span className="nav-sub-label">{it.label}</span>
      </Link>)}
    </div></div>
  </div>;
}

function Breadcrumb() {
  const { trail } = trailOf(usePathname());
  const { memberById, projectById } = useDemo();
  const label = (c: (typeof trail)[number]) => {
    if (c.entity?.kind === "tim") return memberById(c.entity.id)?.name ?? c.label;
    if (c.entity?.kind === "proyek") return projectById(c.entity.id)?.name ?? c.label;
    return c.label;
  };
  return <nav className="breadcrumb" aria-label="Posisi halaman"><ol>{trail.map((c, i) => <li key={i}>
    {i > 0 && <span aria-hidden="true">/</span>}
    {i === trail.length - 1 ? <strong aria-current="page">{label(c)}</strong> : c.href ? <Link href={c.href}>{c.entity ? c.label : label(c)}</Link> : <span>{c.label}</span>}
  </li>)}</ol></nav>;
}

/** Tombol kembali ke halaman induk (tidak tampil di halaman tingkat atas dan tab sub-menu). */
function BackLink() {
  const { back } = trailOf(usePathname());
  if (!back?.href) return null;
  return <Link href={back.href} className="back-link"><Icon icon={ChevronLeft} size={16} />Kembali ke {back.label}</Link>;
}
