import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/app/parts";
import { TaskList } from "@/components/tugas/task-list";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tugas"].label };

export default function TugasPage() {
  return <Suspense fallback={<PageSkeleton />}><TaskList /></Suspense>;
}
