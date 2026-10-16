import type { Metadata } from "next";
import { ResetForm } from "@/components/solo/auth-forms";

export const metadata: Metadata = { title: "Buat sandi baru" };

export default function ResetSandiPage() {
  return <ResetForm />;
}
