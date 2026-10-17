import type { Metadata } from "next";
import { RelationGraph } from "@/components/tim/relation-graph";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/tim/graf"].label };

export default function GrafRelasiPage() {
  return <RelationGraph />;
}
