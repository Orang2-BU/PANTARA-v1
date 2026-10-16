import type { Metadata } from "next";
import { Decisions } from "@/components/analisis/decisions";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/keputusan"].label };

export default function KeputusanPage() {
  return <Decisions />;
}
