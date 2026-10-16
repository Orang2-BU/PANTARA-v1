import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/app/parts";
import { TaskDetail } from "@/components/tugas/task-detail";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tugas/[id]"].label };

export default function TugasDetailPage({ params }: PageProps<"/tugas/[id]">) {
  return <Suspense fallback={<PageSkeleton />}><TaskDetail params={params} /></Suspense>;
}
