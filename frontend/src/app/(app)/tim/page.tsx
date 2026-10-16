import type { Metadata } from "next";
import { Team } from "@/components/tim/team";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tim"].label };

export default function TimPage() {
  return <Team />;
}
