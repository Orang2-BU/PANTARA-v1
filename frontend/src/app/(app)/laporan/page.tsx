import type { Metadata } from "next";
import { Report } from "@/components/analisis/report";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/laporan"].label };

export default function LaporanPage() {
  return <Report />;
}
