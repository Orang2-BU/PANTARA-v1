import type { Metadata } from "next";
import { Onboarding } from "@/components/onboarding/onboarding";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/mulai"].label };

export default function MulaiPage() {
  return <Onboarding />;
}
