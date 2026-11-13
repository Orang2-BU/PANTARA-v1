import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui";

/** Tombol pil bawah tengah: bab / sub-bab aktif, sekaligus pintasan ke layar aplikasi terkait. */
export function ChapterPill({ chapter, sub, href }: { chapter: string; sub: string; href: string }) {
  return <Link className="lp-pill" href={href} aria-live="polite">
    <span>{chapter}</span><span className="lp-pill-sep" aria-hidden="true">/</span><span key={sub} className="lp-pill-sub">{sub}</span>
    <span className="lp-pill-arrow"><Icon icon={ArrowUpRight} size={16} /></span>
  </Link>;
}
