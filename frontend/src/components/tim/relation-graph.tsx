"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Pin } from "lucide-react";
import { PageHeading } from "@/components/app/parts";
import { Badge, Icon } from "@/components/ui";
import { useDemo } from "@/lib/demo/store";
import { LEVEL_LABEL } from "@/lib/engine/score";
import { buildGraph, connections, layoutStep, settle, type EdgeKind, type Graph, type GraphNode, type NodeKind } from "@/lib/engine/graph";

const SIZE = { w: 900, h: 560 };
const KINDS: { kind: NodeKind; label: string }[] = [
  { kind: "anggota", label: "Anggota" }, { kind: "kompetensi", label: "Kompetensi" }, { kind: "tugas", label: "Tugas" }, { kind: "proyek", label: "Proyek" },
];
const EDGE_LABEL: Record<EdgeKind, string> = { menguasai: "menguasai", membutuhkan: "membutuhkan", dikerjakan: "dikerjakan oleh", milik: "bagian dari" };

const hrefOf = (n: GraphNode) => n.kind === "anggota" ? `/tim/${n.ref}` : n.kind === "tugas" ? `/tugas/${n.ref}` : n.kind === "proyek" ? `/proyek/${n.ref}` : "/tim/kompetensi";

/** Bentuk node berbeda per jenis (bukan hanya warna): anggota lingkaran, kompetensi belah ketupat, tugas lingkaran kecil, proyek kotak. */
function Shape({ node }: { node: GraphNode }) {
  const r = node.r;
  if (node.kind === "kompetensi") return <rect className="kg-shape" x={-r} y={-r} width={r * 2} height={r * 2} rx={2} transform="rotate(45)" />;
  if (node.kind === "proyek") return <rect className="kg-shape" x={-r} y={-r} width={r * 2} height={r * 2} rx={5} />;
  return <circle className="kg-shape" r={r} />;
}

function useRelationGraph(): Graph {
  const { members, competencies, tasks, projects } = useDemo();
  return useMemo(() => buildGraph(members, competencies, tasks, projects), [members, competencies, tasks, projects]);
}

/**
 * Kanvas graf: simulasi fisika hidup (node meredam menuju mapan, bisa diseret) + SVG.
 * `onPick` dipanggil saat node diklik/Enter (bukan setelah diseret). Reduced-motion: layout statis hasil `settle`.
 */
function GraphCanvas({ graph, hidden, picked, onPick }: { graph: Graph; hidden: Set<NodeKind>; picked: string | null; onPick: (id: string) => void }) {
  const sim = useRef<GraphNode[]>([]);
  const [view, setView] = useState<GraphNode[]>(() => graph.nodes);
  const [hover, setHover] = useState<string | null>(null);
  const drag = useRef<{ id: string; moved: boolean } | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const alpha = useRef(1);
  const raf = useRef(0);
  const tick = useRef<() => void>(() => {});

  useEffect(() => {
    tick.current = () => {
      alpha.current = Math.max(0.02, alpha.current * 0.985);
      const energy = layoutStep(sim.current, graph.edges, SIZE, alpha.current);
      setView(sim.current.map(n => ({ ...n })));
      raf.current = energy > 0.05 || drag.current || alpha.current > 0.05 ? requestAnimationFrame(() => tick.current()) : 0;
    };
    sim.current = graph.nodes.map(n => ({ ...n }));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle(sim.current, graph.edges, SIZE);
      raf.current = requestAnimationFrame(() => { raf.current = 0; setView(sim.current.map(n => ({ ...n }))); });
    } else {
      alpha.current = 1;
      raf.current = requestAnimationFrame(() => tick.current());
    }
    return () => cancelAnimationFrame(raf.current);
  }, [graph]);

  const wake = () => {
    alpha.current = Math.max(alpha.current, 0.5);
    if (!raf.current) raf.current = requestAnimationFrame(() => tick.current());
  };
  const point = (e: React.PointerEvent) => {
    const box = svg.current!.getBoundingClientRect();
    return { x: ((e.clientX - box.left) / box.width - 0.5) * SIZE.w, y: ((e.clientY - box.top) / box.height - 0.5) * SIZE.h };
  };
  const start = (e: React.PointerEvent, id: string) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    drag.current = { id, moved: false };
    const n = sim.current.find(x => x.id === id);
    if (n) n.pinned = true;
    wake();
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const n = sim.current.find(x => x.id === d.id);
    if (!n) return;
    const p = point(e);
    n.x = Math.max(-SIZE.w / 2 + n.r, Math.min(SIZE.w / 2 - n.r, p.x));
    n.y = Math.max(-SIZE.h / 2 + n.r, Math.min(SIZE.h / 2 - n.r, p.y));
    d.moved = true;
    wake();
  };
  const end = (id: string) => {
    const d = drag.current;
    drag.current = null;
    const n = sim.current.find(x => x.id === id);
    if (n) n.pinned = false;
    if (d && !d.moved) onPick(id);
    wake();
  };

  const focus = hover ?? picked;
  const near = new Set(focus ? [focus, ...connections(graph, focus).map(c => c.node.id)] : []);
  const shown = (n: GraphNode) => !hidden.has(n.kind);
  const live = new Map(view.map(n => [n.id, n]));

  return <div className="kg-scroll"><svg ref={svg} className="kg" viewBox={`${-SIZE.w / 2} ${-SIZE.h / 2} ${SIZE.w} ${SIZE.h}`} role="group" aria-label="Graf relasi. Daftar hubungan setara tersedia lewat pilihan node." onPointerMove={move}>
    <g className="kg-edges">{graph.edges.map((e, i) => {
      const a = live.get(e.source), b = live.get(e.target);
      if (!a || !b || !shown(a) || !shown(b)) return null;
      const on = focus && (e.source === focus || e.target === focus);
      return <line key={i} className={`kg-edge kg-e-${e.kind} ${on ? "on" : focus ? "dim" : ""}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={e.level ? 0.8 + e.level * 0.5 : 1} />;
    })}</g>
    <g>{view.filter(shown).map(n => {
      const dim = focus && !near.has(n.id);
      const labelled = n.kind === "anggota" || n.kind === "proyek" || (!!focus && near.has(n.id)) || picked === n.id;
      return <g key={n.id} className={`kg-node kg-${n.kind} ${dim ? "dim" : ""} ${picked === n.id ? "picked" : ""}`} transform={`translate(${n.x} ${n.y})`}
        tabIndex={0} role="button" aria-pressed={picked === n.id} aria-label={`${n.label}, ${n.kind}`}
        onPointerDown={e => start(e, n.id)} onPointerUp={() => end(n.id)} onPointerCancel={() => end(n.id)}
        onPointerEnter={() => setHover(n.id)} onPointerLeave={() => setHover(null)} onFocus={() => setHover(n.id)} onBlur={() => setHover(null)}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(n.id); } }}>
        <circle className="kg-hit" r={Math.max(n.r + 6, 16)} />
        <Shape node={n} />
        {labelled && <text className="kg-label" y={n.r + 13} textAnchor="middle">{n.label.length > 26 ? `${n.label.slice(0, 25)}…` : n.label}</text>}
      </g>;
    })}</g>
  </svg></div>;
}

/** P41: graf relasi gaya Obsidian — node anggota, kompetensi, tugas, proyek yang saling terhubung. */
export function RelationGraph() {
  const graph = useRelationGraph();
  const [hidden, setHidden] = useState<Set<NodeKind>>(new Set());
  const [picked, setPicked] = useState<string | null>(null);
  const sel = picked ? graph.nodes.find(n => n.id === picked) : undefined;
  const list = picked ? connections(graph, picked) : [];

  return <div className="page-enter">
    <PageHeading title="Graf relasi" subtitle="Anggota, kompetensi, tugas, dan proyek yang saling terhubung. Seret node untuk menggeser, klik untuk melihat hubungannya. Menunjukkan struktur keahlian dan penugasan, bukan kinerja." />
    <section className="card">
      <div className="kg-toolbar">
        <div className="toggle" role="group" aria-label="Tampilkan jenis node">
          {KINDS.map(k => <button key={k.kind} type="button" aria-pressed={!hidden.has(k.kind)} className={hidden.has(k.kind) ? "" : "selected"} onClick={() => setHidden(h => { const next = new Set(h); if (next.has(k.kind)) next.delete(k.kind); else next.add(k.kind); return next; })}>
            <span className={`kg-key kg-${k.kind}`} aria-hidden="true" />{k.label} ({graph.nodes.filter(n => n.kind === k.kind).length})
          </button>)}
        </div>
        <span className="small muted">{graph.nodes.length} node · {graph.edges.length} hubungan</span>
      </div>
      <div className="kg-layout">
        <GraphCanvas graph={graph} hidden={hidden} picked={picked} onPick={id => setPicked(p => (p === id ? null : id))} />
        <aside className="kg-detail" aria-live="polite">
          {sel ? <>
            <div className="kg-detail-top"><Badge>{KINDS.find(k => k.kind === sel.kind)?.label}</Badge><Link className="text-link" href={hrefOf(sel)}>Buka<Icon icon={ArrowUpRight} size={14} /></Link></div>
            <h2>{sel.label}</h2>
            <p className="small muted">{list.length} hubungan</p>
            <ul className="kg-list">{list.map(c => <li key={`${c.node.id}-${c.kind}`}>
              <button type="button" onClick={() => setPicked(c.node.id)}>
                <span className={`kg-key kg-${c.node.kind}`} aria-hidden="true" /><span><strong>{c.node.label}</strong><small>{EDGE_LABEL[c.kind]}{c.level ? ` · ${LEVEL_LABEL[c.level]}` : ""}</small></span>
              </button>
            </li>)}</ul>
          </> : <>
            <p className="small with-icon"><Icon icon={Pin} size={14} />Pilih node untuk melihat hubungannya.</p>
            <ul className="kg-legend">{KINDS.map(k => <li key={k.kind}><span className={`kg-key kg-${k.kind}`} aria-hidden="true" />{k.label}</li>)}</ul>
            <p className="small muted">Garis tebal = level kompetensi lebih tinggi. Node yang hanya terhubung ke satu anggota adalah titik rawan konsentrasi pengetahuan.</p>
          </>}
        </aside>
      </div>
    </section>
  </div>;
}
