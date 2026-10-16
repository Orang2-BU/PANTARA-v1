import type { Metadata } from "next";
import { Help } from "@/components/akun/account";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/bantuan"].label };

export default function BantuanPage() {
  return <Help />;
}
