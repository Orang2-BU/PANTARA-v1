import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/app/parts";
import { TaskDnaPage } from "@/components/tugas/task-dna";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tugas/[id]/dna"].label };

export default function TugasDnaPage({ params }: PageProps<"/tugas/[id]/dna">) {
  return <Suspense fallback={<PageSkeleton />}><TaskDnaPage params={params} /></Suspense>;
}
