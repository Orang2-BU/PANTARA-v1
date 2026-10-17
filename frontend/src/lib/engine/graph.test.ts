import { describe, expect, it } from "vitest";
import { COMPETENCIES, MEMBERS, PROJECTS, TASKS } from "@/lib/demo/seed";
import { buildGraph, connections, layoutStep, settle } from "./graph";

const graph = buildGraph(MEMBERS, COMPETENCIES, TASKS, PROJECTS);
const has = (a: string, b: string) => graph.edges.some(e => (e.source === a && e.target === b) || (e.source === b && e.target === a));

describe("buildGraph", () => {
  it("membuat node untuk semua anggota, kompetensi, proyek, dan tugas yang belum selesai", () => {
    const open = TASKS.filter(t => t.status !== "selesai").length;
    expect(graph.nodes.filter(n => n.kind === "anggota")).toHaveLength(MEMBERS.length);
    expect(graph.nodes.filter(n => n.kind === "kompetensi")).toHaveLength(COMPETENCIES.length);
    expect(graph.nodes.filter(n => n.kind === "proyek")).toHaveLength(PROJECTS.length);
    expect(graph.nodes.filter(n => n.kind === "tugas")).toHaveLength(open);
  });

  it("tugas selesai tidak masuk graf", () => {
    const done = TASKS.find(t => t.status === "selesai")!;
    expect(graph.nodes.some(n => n.id === `tugas:${done.id}`)).toBe(false);
  });

  it("menghubungkan anggota ke kompetensi yang dikuasai (level ≥ Dasar) lengkap dengan level", () => {
    const ayu = MEMBERS.find(m => m.id === "ayu")!;
    const c = ayu.competencies.find(x => x.level > 0)!;
    expect(graph.edges.find(e => e.source === "anggota:ayu" && e.target === `kompetensi:${c.id}`)?.level).toBe(c.level);
  });

  it("menghubungkan tugas ke penanggung jawab, proyek, dan kompetensi yang dibutuhkan", () => {
    const t = TASKS.find(x => x.id === "TGS-0131")!;
    expect(has("tugas:TGS-0131", "anggota:ayu")).toBe(true);
    expect(has("tugas:TGS-0131", `proyek:${t.projectId}`)).toBe(true);
  });

  it("tidak ada sisi yang menunjuk node yang tidak ada", () => {
    const ids = new Set(graph.nodes.map(n => n.id));
    expect(graph.edges.every(e => ids.has(e.source) && ids.has(e.target))).toBe(true);
  });
});

describe("posisi awal", () => {
  it("dibulatkan supaya render server dan browser identik (cos/sin beda di digit terakhir antar mesin)", () => {
    const decimals = (v: number) => (String(v).split(".")[1] ?? "").length;
    expect(graph.nodes.every(n => decimals(n.x) <= 2 && decimals(n.y) <= 2)).toBe(true);
  });
});

describe("connections", () => {
  it("mengembalikan node tetangga dengan jenis hubungannya", () => {
    const list = connections(graph, "anggota:ayu");
    expect(list.length).toBeGreaterThan(0);
    expect(list.every(c => c.node.id !== "anggota:ayu")).toBe(true);
  });
});

describe("layoutStep", () => {
  const sim = buildGraph(MEMBERS, COMPETENCIES, TASKS, PROJECTS).nodes;
  const size = { w: 900, h: 560 };
  settle(sim, graph.edges, size);

  it("deterministik untuk data yang sama", () => {
    const again = buildGraph(MEMBERS, COMPETENCIES, TASKS, PROJECTS).nodes;
    settle(again, graph.edges, size);
    expect(again.map(n => [Math.round(n.x), Math.round(n.y)])).toEqual(sim.map(n => [Math.round(n.x), Math.round(n.y)]));
  });

  it("semua node tetap di dalam bingkai", () => {
    expect(sim.every(n => Math.abs(n.x) <= size.w / 2 && Math.abs(n.y) <= size.h / 2)).toBe(true);
  });

  it("node tidak saling menumpuk", () => {
    let min = Infinity;
    for (let i = 0; i < sim.length; i++) for (let j = i + 1; j < sim.length; j++) min = Math.min(min, Math.hypot(sim[i].x - sim[j].x, sim[i].y - sim[j].y));
    expect(min).toBeGreaterThan(14);
  });

  it("node yang di-pin tidak bergeser", () => {
    const nodes = buildGraph(MEMBERS, COMPETENCIES, TASKS, PROJECTS).nodes;
    nodes[0].pinned = true;
    const [x, y] = [nodes[0].x, nodes[0].y];
    layoutStep(nodes, graph.edges, size, 1);
    expect([nodes[0].x, nodes[0].y]).toEqual([x, y]);
  });
});
