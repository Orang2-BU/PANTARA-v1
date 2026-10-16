import { describe, expect, it } from "vitest";
import type { Competency, Member } from "@/lib/demo/types";
import { atRiskCompetencies } from "./skills";

const member = (id: string, competencies: Member["competencies"]): Member => ({
  id, name: id, initials: id.slice(0, 2).toUpperCase(), role: "Pengembang", email: `${id}@contoh.id`, availableHours: 32,
  leaveDates: [], weeklyLimit: 40, competencies, prefers: [], avoids: [], access: "anggota",
});
const catalog: Competency[] = [
  { id: "api", name: "Backend API", category: "Backend" },
  { id: "data", name: "Arsitektur data", category: "Data" },
  { id: "qa", name: "QA testing", category: "QA" },
];
const team = [
  member("ayu", [{ id: "api", level: 3, source: "verifikasi" }, { id: "data", level: 3, source: "verifikasi" }]),
  member("bima", [{ id: "api", level: 2, source: "riwayat" }, { id: "data", level: 1, source: "klaim" }]),
];

describe("atRiskCompetencies", () => {
  it("menandai kompetensi yang hanya dikuasai satu orang di level Mandiri ke atas", () => {
    expect(atRiskCompetencies(catalog, team).find(r => r.competency.id === "data")?.holders.map(m => m.id)).toEqual(["ayu"]);
  });

  it("menandai kompetensi yang belum dikuasai siapa pun di level Mandiri", () => {
    expect(atRiskCompetencies(catalog, team).find(r => r.competency.id === "qa")?.holders).toEqual([]);
  });

  it("tidak menandai kompetensi yang dikuasai dua orang atau lebih", () => {
    expect(atRiskCompetencies(catalog, team).some(r => r.competency.id === "api")).toBe(false);
  });

  it("mengurutkan yang belum dikuasai siapa pun lebih dulu", () => {
    expect(atRiskCompetencies(catalog, team).map(r => r.competency.id)).toEqual(["qa", "data"]);
  });
});
