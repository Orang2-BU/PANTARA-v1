import type { Metadata } from "next";
import { MemberSettings } from "@/components/pengaturan/settings";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/pengaturan/anggota"].label };

export default function AnggotaPeranPage() {
  return <MemberSettings />;
}
