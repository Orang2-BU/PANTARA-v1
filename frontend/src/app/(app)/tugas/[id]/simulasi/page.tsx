import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/app/parts";
import { Simulation } from "@/components/tugas/simulation";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tugas/[id]/simulasi"].label };

export default function TugasSimulasiPage({ params }: PageProps<"/tugas/[id]/simulasi">) {
  return <Suspense fallback={<PageSkeleton />}><Simulation params={params} /></Suspense>;
}
