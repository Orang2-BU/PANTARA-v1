import type { Metadata } from "next";
import { Dasbor } from "@/components/dasbor/dasbor";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/dashboard"].label };

export default function DasborPage() {
  return <Dasbor />;
}
