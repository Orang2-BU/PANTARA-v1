import type { Metadata } from "next";
import { Notifications } from "@/components/akun/account";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/notifikasi"].label };

export default function NotifikasiPage() {
  return <Notifications />;
}
