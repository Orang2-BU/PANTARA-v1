import type { Metadata } from "next";
import { Dasbor } from "@/components/dasbor/dasbor";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/dasbor"].label };

export default function DasborPage() {
  return <Dasbor />;
}
