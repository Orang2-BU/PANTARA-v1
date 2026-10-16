import { SoloFrame } from "@/components/solo/solo-frame";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return <SoloFrame><div className="solo-center"><div className="solo-card">{children}</div></div></SoloFrame>;
}
