import type { Metadata } from "next";
import { GeneralSettings } from "@/components/pengaturan/settings";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/pengaturan"].label };

export default function PengaturanPage() {
  return <GeneralSettings />;
}
