import type { Metadata } from "next";
import { SkillMap } from "@/components/tim/skill-map";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tim/keahlian"].label };

export default function PetaKeahlianPage() {
  return <SkillMap />;
}
