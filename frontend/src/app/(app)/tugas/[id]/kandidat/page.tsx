import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/app/parts";
import { Candidates } from "@/components/tugas/candidates";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tugas/[id]/kandidat"].label };

export default function TugasKandidatPage({ params }: PageProps<"/tugas/[id]/kandidat">) {
  return <Suspense fallback={<PageSkeleton />}><Candidates params={params} /></Suspense>;
}
