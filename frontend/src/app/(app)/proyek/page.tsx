import type { Metadata } from "next";
import { Projects } from "@/components/proyek/projects";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/proyek"].label };

export default function ProyekPage() {
  return <Projects />;
}
