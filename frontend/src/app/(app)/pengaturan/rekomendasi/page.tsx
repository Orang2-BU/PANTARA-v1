import type { Metadata } from "next";
import { RecommendationSettings } from "@/components/pengaturan/settings";
import { PAGES } from "@/lib/nav";

export const metadata: Metadata = { title: PAGES["/pengaturan/rekomendasi"].label };

export default function AturanRekomendasiPage() {
  return <RecommendationSettings />;
}
