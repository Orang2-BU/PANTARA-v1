import type { Metadata } from "next";
import { Forbidden } from "@/components/shell/forbidden";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/403"].label };

export default function AksesDitolakPage() {
  return <Forbidden />;
}
