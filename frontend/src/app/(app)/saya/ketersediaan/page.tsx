import type { Metadata } from "next";
import { MyAvailability } from "@/components/saya/member-area";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/saya/ketersediaan"].label };

export default function KetersediaanSayaPage() {
  return <MyAvailability />;
}
