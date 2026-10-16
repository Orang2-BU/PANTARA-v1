import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/app/parts";
import { IncomingAssignment } from "@/components/saya/member-area";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/saya/tugas/[id]"].label };

export default function PenugasanMasukPage({ params }: PageProps<"/saya/tugas/[id]">) {
  return <Suspense fallback={<PageSkeleton />}><IncomingAssignment params={params} /></Suspense>;
}
