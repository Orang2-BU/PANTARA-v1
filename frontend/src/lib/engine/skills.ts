import type { Competency, Member } from "@/lib/demo/types";
import { memberLevel } from "./score";

/** Level minimum dianggap "menguasai": Mandiri (bisa mengerjakan tanpa didampingi). */
const MASTERY = 2;

/**
 * Kompetensi rawan: dikuasai paling banyak satu karyawan di level Mandiri ke atas
 * (konsentrasi pengetahuan / truck factor, 01-PRD R4). Yang belum dikuasai siapa pun didahulukan.
 */
export function atRiskCompetencies(competencies: Competency[], members: Member[]) {
  return competencies
    .map(competency => ({ competency, holders: members.filter(m => memberLevel(m, competency.id) >= MASTERY) }))
    .filter(r => r.holders.length <= 1)
    .sort((a, b) => a.holders.length - b.holders.length);
}
