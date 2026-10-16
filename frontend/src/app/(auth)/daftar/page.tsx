import type { Metadata } from "next";
import { RegisterForm } from "@/components/solo/auth-forms";

export const metadata: Metadata = { title: "Buat ruang kerja" };

export default function DaftarPage() {
  return <RegisterForm />;
}
