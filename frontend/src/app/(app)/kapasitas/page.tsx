import type { Metadata } from "next";
import { Capacity } from "@/components/kapasitas/capacity";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/kapasitas"].label };

export default function KapasitasPage() {
  return <Capacity />;
}
