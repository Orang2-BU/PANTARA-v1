import type { Metadata } from "next";
import { Account } from "@/components/akun/account";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/akun"].label };

export default function AkunPage() {
  return <Account />;
}
