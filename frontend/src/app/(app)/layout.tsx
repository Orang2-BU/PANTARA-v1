import { ViewTransition } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { DemoProvider } from "@/lib/demo/store";

export default function AppLayout({ children }: LayoutProps<"/">) {
  // Layout ini baru terpasang saat datang dari Masuk dan lepas saat Keluar, jadi animasinya hanya di dua titik itu.
  return <ViewTransition enter={{ "auth-in": "app-in", default: "none" }} exit={{ "to-login": "app-out", default: "none" }} default="none">
    <DemoProvider><AppShell>{children}</AppShell></DemoProvider>
  </ViewTransition>;
}
