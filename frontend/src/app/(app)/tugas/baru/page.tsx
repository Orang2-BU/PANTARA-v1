import type { Metadata } from "next";
import { TaskForm } from "@/components/tugas/task-form";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tugas/baru"].label };

export default function TugasBaruPage() {
  return <TaskForm />;
}
