import type { Competency, Level, Member, Project, Task } from "@/lib/demo/types";

export type NodeKind = "karyawan" | "kompetensi" | "tugas" | "proyek";
export type EdgeKind = "menguasai" | "membutuhkan" | "dikerjakan" | "milik";

export interface GraphNode { id: string; kind: NodeKind; ref: string; label: string; photo?: string; r: number; x: number; y: number; vx: number; vy: number; pinned?: boolean }
export interface GraphEdge { source: string; target: string; kind: EdgeKind; level?: Level }
export interface Graph { nodes: GraphNode[]; edges: GraphEdge[] }

const RADIUS: Record<NodeKind, number> = { karyawan: 16, kompetensi: 9, tugas: 7, proyek: 15 };
/** Cincin awal per jenis (pecahan dari bingkai) supaya hasil layout deterministik dan cepat mapan. */
const RING: Record<NodeKind, number> = { proyek: 0.12, tugas: 0.3, karyawan: 0.28, kompetensi: 0.44 };

/**
 * Graf relasi ruang kerja (gaya Obsidian): karyawan ─ kompetensi (level), tugas ─ kompetensi (kebutuhan),
 * tugas ─ karyawan (penanggung jawab), tugas ─ proyek. Tugas selesai tidak ikut supaya graf tetap terbaca.
 * Hanya struktur penugasan dan keahlian, bukan aktivitas atau kinerja per orang (01-PRD §8).
 */
export function buildGraph(members: Member[], competencies: Competency[], tasks: Task[], projects: Project[]): Graph {
  const open = tasks.filter(t => t.status !== "selesai");
  const raw: Omit<GraphNode, "x" | "y" | "vx" | "vy" | "r">[] = [
    ...projects.map(p => ({ id: `proyek:${p.id}`, kind: "proyek" as const, ref: p.id, label: p.name })),
    ...members.map(m => ({ id: `karyawan:${m.id}`, kind: "karyawan" as const, ref: m.id, label: m.name.split(" ")[0], photo: m.photo })),
    ...competencies.map(c => ({ id: `kompetensi:${c.id}`, kind: "kompetensi" as const, ref: c.id, label: c.name })),
    ...open.map(t => ({ id: `tugas:${t.id}`, kind: "tugas" as const, ref: t.id, label: t.title })),
  ];
  const byKind = (k: NodeKind) => raw.filter(n => n.kind === k).length;
  const seen: Record<NodeKind, number> = { karyawan: 0, kompetensi: 0, tugas: 0, proyek: 0 };
  const nodes: GraphNode[] = raw.map(n => {
    const angle = (seen[n.kind]++ / byKind(n.kind)) * Math.PI * 2 + (n.kind === "tugas" ? 0.4 : n.kind === "kompetensi" ? 0.2 : 0);
    // Dibulatkan: Math.cos/sin berbeda di digit terakhir antara Node (server) dan browser, yang memicu galat hidrasi.
    const at = (v: number) => Math.round(v * 100) / 100;
    return { ...n, r: RADIUS[n.kind], x: at(Math.cos(angle) * RING[n.kind] * 900), y: at(Math.sin(angle) * RING[n.kind] * 560), vx: 0, vy: 0 };
  });

  const edges: GraphEdge[] = [];
  const known = new Set(nodes.map(n => n.id));
  const link = (source: string, target: string, kind: EdgeKind, level?: Level) => { if (known.has(source) && known.has(target)) edges.push({ source, target, kind, level }); };
  for (const m of members) for (const c of m.competencies) if (c.level > 0) link(`karyawan:${m.id}`, `kompetensi:${c.id}`, "menguasai", c.level);
  for (const t of open) {
    link(`tugas:${t.id}`, `proyek:${t.projectId}`, "milik");
    for (const a of t.assignments) if (a.hours > 0) link(`tugas:${t.id}`, `karyawan:${a.memberId}`, "dikerjakan");
    for (const r of t.dna?.requirements ?? []) link(`tugas:${t.id}`, `kompetensi:${r.competencyId}`, "membutuhkan");
  }
  return { nodes, edges };
}

/** Node tetangga langsung beserta jenis hubungannya. */
export function connections(graph: Graph, id: string): { node: GraphNode; kind: EdgeKind; level?: Level }[] {
  const byId = new Map(graph.nodes.map(n => [n.id, n]));
  return graph.edges.flatMap(e => {
    const other = e.source === id ? e.target : e.target === id ? e.source : undefined;
    const node = other ? byId.get(other) : undefined;
    return node ? [{ node, kind: e.kind, level: e.level }] : [];
  });
}

/**
 * Satu langkah fisika: tolak-menolak antar node, pegas di sisi, tarikan ke pusat, redaman, lalu dijepit ke bingkai.
 * `alpha` (1 → 0) meredam gerak. Mengembalikan energi gerak total; kecil berarti sudah mapan.
 * Koordinat node berpusat di (0,0) pada pemanggilan murni; `size` hanya menentukan batas ±w/2, ±h/2.
 */
export function layoutStep(nodes: GraphNode[], edges: GraphEdge[], size: { w: number; h: number }, alpha: number): number {
  const byId = new Map(nodes.map(n => [n.id, n]));
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      let dx = a.x - b.x, dy = a.y - b.y;
      let d2 = dx * dx + dy * dy;
      if (d2 < 0.01) { dx = (i - j) * 0.1; dy = 0.1; d2 = dx * dx + dy * dy; }
      const d = Math.sqrt(d2);
      const push = (2600 * alpha) / d2 + Math.max(0, a.r + b.r + 10 - d) * 0.5;
      const fx = (dx / d) * push, fy = (dy / d) * push;
      a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy;
    }
  }
  for (const e of edges) {
    const a = byId.get(e.source), b = byId.get(e.target);
    if (!a || !b) continue;
    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
    const rest = e.kind === "milik" ? 70 : e.kind === "menguasai" ? 90 : 80;
    const pull = (d - rest) * 0.012 * alpha;
    a.vx += (dx / d) * pull; a.vy += (dy / d) * pull; b.vx -= (dx / d) * pull; b.vy -= (dy / d) * pull;
  }
  let energy = 0;
  const hx = size.w / 2, hy = size.h / 2;
  for (const n of nodes) {
    if (n.pinned) { n.vx = 0; n.vy = 0; continue; }
    n.vx += -n.x * 0.004 * alpha; n.vy += -n.y * 0.004 * alpha;
    n.vx *= 0.82; n.vy *= 0.82;
    n.x = Math.min(hx - n.r - 4, Math.max(-hx + n.r + 4, n.x + n.vx));
    n.y = Math.min(hy - n.r - 4, Math.max(-hy + n.r + 4, n.y + n.vy));
    energy += n.vx * n.vx + n.vy * n.vy;
  }
  return energy;
}

/** Jalankan langkah fisika sampai mapan (dipakai render pertama, reduced-motion, dan test). */
export function settle(nodes: GraphNode[], edges: GraphEdge[], size: { w: number; h: number }, maxSteps = 320) {
  for (let i = 0; i < maxSteps; i++) {
    if (layoutStep(nodes, edges, size, Math.max(0.05, 1 - i / maxSteps)) < 0.02 && i > 60) break;
  }
}
