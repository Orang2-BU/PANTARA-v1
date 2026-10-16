import { AppShell } from "@/components/shell/app-shell";
import { DemoProvider } from "@/lib/demo/store";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return <DemoProvider><AppShell>{children}</AppShell></DemoProvider>;
}
