"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { EmptyState } from "@/components/app/parts";

export function Forbidden() {
  return <section className="card"><EmptyState icon={ShieldAlert} title="Akses ditolak" text="Halaman ini butuh peran manajer atau admin. Minta admin ruang kerja mengubah peranmu di Karyawan & peran." action={<Link className="button secondary" href="/dashboard">Kembali ke Dashboard</Link>} /></section>;
}
