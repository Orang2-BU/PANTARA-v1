import type { Metadata } from "next";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/app/parts";
import { MemberProfile } from "@/components/tim/member-profile";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tim/[id]"].label };

export default function ProfilAnggotaPage({ params }: PageProps<"/tim/[id]">) {
  return <Suspense fallback={<PageSkeleton />}><MemberProfile params={params} /></Suspense>;
}
