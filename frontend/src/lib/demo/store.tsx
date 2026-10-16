"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { DEFAULT_SETTINGS, type EngineSettings } from "@/lib/engine/score";
import { COMPETENCIES, DECISIONS, MEMBERS, PROJECTS, TASKS } from "./seed";
import type { Assignment, Competency, Decision, Member, Project, Task, TaskDna, TaskStatus } from "./types";

// State mockup M0 di browser. Disimpan di sessionStorage supaya pindah halaman/muat ulang
// tidak menghapus keputusan demo; "Reset data contoh" mengembalikan seed.

export interface DemoState {
  tasks: Task[];
  members: Member[];
  projects: Project[];
  competencies: Competency[];
  decisions: Decision[];
  settings: EngineSettings;
  readNotifications: string[];
  /** Waktu nyata (ms) manajer mulai memproses tugas, untuk Tp. */
  flowStart: Record<string, number>;
}

type Action =
  | { type: "load"; state: DemoState }
  | { type: "reset" }
  | { type: "createTask"; task: Task }
  | { type: "updateTask"; id: string; patch: Partial<Task> }
  | { type: "updateDna"; id: string; dna: TaskDna }
  | { type: "assign"; id: string; assignments: Assignment[]; decision: Decision }
  | { type: "reject"; decision: Decision }
  | { type: "setStatus"; id: string; status: TaskStatus; reason?: string }
  | { type: "upsertMember"; member: Member }
  | { type: "addCompetency"; competency: Competency }
  | { type: "addProject"; project: Project }
  | { type: "settings"; settings: EngineSettings }
  | { type: "readAll"; ids: string[] }
  | { type: "startFlow"; id: string; at: number };

const INITIAL: DemoState = {
  tasks: TASKS, members: MEMBERS, projects: PROJECTS, competencies: COMPETENCIES, decisions: DECISIONS,
  settings: DEFAULT_SETTINGS, readNotifications: [], flowStart: {},
};

const mapTask = (s: DemoState, id: string, fn: (t: Task) => Task) => ({ ...s, tasks: s.tasks.map(t => t.id === id ? fn(t) : t) });

function reducer(s: DemoState, a: Action): DemoState {
  switch (a.type) {
    case "load": return a.state;
    case "reset": return INITIAL;
    case "createTask": return { ...s, tasks: [a.task, ...s.tasks] };
    case "updateTask": return mapTask(s, a.id, t => ({ ...t, ...a.patch }));
    case "updateDna": return mapTask(s, a.id, t => ({ ...t, dna: a.dna, remainingHours: a.dna.effortHours }));
    case "reject": return { ...s, decisions: [a.decision, ...s.decisions] };
    case "assign": return { ...mapTask(s, a.id, t => ({ ...t, status: "menunggu", assignments: a.assignments })), decisions: [a.decision, ...s.decisions] };
    case "setStatus": return mapTask(s, a.id, t => ({ ...t, status: a.status, responseReason: a.reason ?? t.responseReason, assignments: a.status === "belum" ? [] : t.assignments, remainingHours: a.status === "selesai" ? 0 : t.remainingHours }));
    case "upsertMember": return { ...s, members: s.members.some(m => m.id === a.member.id) ? s.members.map(m => m.id === a.member.id ? a.member : m) : [...s.members, a.member] };
    case "addCompetency": return { ...s, competencies: [...s.competencies, a.competency] };
    case "addProject": return { ...s, projects: [...s.projects, a.project] };
    case "settings": return { ...s, settings: a.settings };
    case "readAll": return { ...s, readNotifications: [...new Set([...s.readNotifications, ...a.ids])] };
    case "startFlow": return s.flowStart[a.id] ? s : { ...s, flowStart: { ...s.flowStart, [a.id]: a.at } };
  }
}

const KEY = "pantara-demo-v1";

const DemoContext = createContext<{ state: DemoState; dispatch: (a: Action) => void } | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved) dispatch({ type: "load", state: JSON.parse(saved) as DemoState });
    } catch { /* sessionStorage tidak tersedia: tetap pakai seed */ }
  }, []);
  useEffect(() => {
    // State awal tidak disimpan: efek dev (strict mode) berjalan dua kali dan
    // akan menimpa data tersimpan sebelum sempat dimuat. Reset menghapus storage sendiri.
    if (state === INITIAL) return;
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch { /* abaikan */ }
  }, [state]);
  const send = useCallback((action: Action) => {
    if (action.type === "reset") { try { sessionStorage.removeItem(KEY); } catch { /* abaikan */ } }
    dispatch(action);
  }, []);
  const value = useMemo(() => ({ state, dispatch: send }), [state, send]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo harus dipakai di dalam DemoProvider");
  const { state, dispatch } = ctx;
  const names = useMemo(() => Object.fromEntries(state.competencies.map(c => [c.id, c.name])), [state.competencies]);
  const memberById = useCallback((id: string) => state.members.find(m => m.id === id), [state.members]);
  const taskById = useCallback((id: string) => state.tasks.find(t => t.id === id), [state.tasks]);
  const projectById = useCallback((id: string) => state.projects.find(p => p.id === id), [state.projects]);
  return { ...state, dispatch, names, memberById, taskById, projectById };
}
