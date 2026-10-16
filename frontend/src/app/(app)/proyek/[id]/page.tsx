import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/app/parts";
import { ProjectDetail } from "@/components/proyek/projects";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/proyek/[id]"].label };

export default function DetailProyekPage({ params }: PageProps<"/proyek/[id]">) {
  return <Suspense fallback={<PageSkeleton />}><ProjectDetail params={params} /></Suspense>;
}
