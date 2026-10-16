import type { Metadata } from "next";
import { MyProfile } from "@/components/saya/member-area";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/saya/profil"].label };

export default function ProfilSayaPage() {
  return <MyProfile />;
}
