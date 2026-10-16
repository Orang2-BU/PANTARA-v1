import type { Metadata } from "next";
import { Competencies } from "@/components/tim/competencies";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tim/kompetensi"].label };

export default function KompetensiPage() {
  return <Competencies />;
}
