import type { Metadata } from "next";
import { MyHome } from "@/components/saya/member-area";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/saya"].label };

export default function SayaPage() {
  return <MyHome />;
}
