import type { Metadata } from "next";
import { BatchAllocation } from "@/components/tugas/batch";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tugas/alokasi-batch"].label };

export default function AlokasiBatchPage() {
  return <BatchAllocation />;
}
