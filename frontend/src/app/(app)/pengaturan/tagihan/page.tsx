import type { Metadata } from "next";
import { Billing } from "@/components/pengaturan/settings";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/pengaturan/tagihan"].label };

export default function TagihanPage() {
  return <Billing />;
}
