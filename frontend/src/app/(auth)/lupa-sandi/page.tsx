import type { Metadata } from "next";
import { ForgotForm } from "@/components/solo/auth-forms";

export const metadata: Metadata = { title: "Lupa sandi" };

export default function LupaSandiPage() {
  return <ForgotForm />;
}
