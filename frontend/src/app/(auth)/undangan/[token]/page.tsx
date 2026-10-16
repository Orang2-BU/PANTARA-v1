import type { Metadata } from "next";
import { Suspense } from "react";
import { InviteForm } from "@/components/solo/auth-forms";

export const metadata: Metadata = { title: "Terima undangan" };

export default function UndanganPage({ params }: PageProps<"/undangan/[token]">) {
  return <Suspense fallback={null}><InviteForm params={params} /></Suspense>;
}
