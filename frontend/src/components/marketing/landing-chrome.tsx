"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui";
import { BrandSymbol, Wordmark } from "@/components/shell/brand";
import { CHAPTERS } from "./chapters";


type Tone = "dark" | "light" | "fade" | "teal";

/**
 * Header tetap + rel progres kanan. Nada header dan bab aktif dibaca dari section yang sedang
 * berada di bawah header (`data-tone`, `data-chapter`).
 */
export function LandingChrome() {
  const [tone, setTone] = useState<Tone>("dark");
  const [chapter, setChapter] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      for (const el of document.querySelectorAll<HTMLElement>("[data-chapter]")) {
        const box = el.getBoundingClientRect();
        if (box.top <= 36 && box.bottom > 36) {
          setTone((el.dataset.tone as Tone) ?? "light");
          setChapter(Number(el.dataset.chapter ?? 0));
          break;
        }
      }
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    // Nada adegan berubah setelah render ulang adegan itu, jadi baca ulang juga saat atributnya berganti.
    const watch = new MutationObserver(request);
    watch.observe(document.body, { subtree: true, attributeFilter: ["data-tone"] });
    request();
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request);
    return () => { cancelAnimationFrame(frame); watch.disconnect(); removeEventListener("scroll", request); removeEventListener("resize", request); };
  }, []);

  return <>
    <header className="lp-header" data-tone={tone}>
      <Link href="#beranda" className="lp-brand" aria-label="Pantara, ke awal halaman"><BrandSymbol /><Wordmark /></Link>
      <nav className="lp-nav" aria-label="Bagian halaman">
        {CHAPTERS.slice(1).map((c, i) => <a key={c.id} href={`#${c.id}`} aria-current={chapter === i + 1 ? "true" : undefined}>{c.label}</a>)}
      </nav>
      <div className="lp-header-actions">
        <Link className="lp-link" href="/masuk" transitionTypes={["to-login"]}>Masuk</Link>
        <Link className="button primary lp-cta" href="/daftar">Buat ruang kerja<Icon icon={ArrowUpRight} size={16} /></Link>
      </div>
    </header>
    <nav className="lp-rail" data-tone={tone} aria-label="Progres cerita">
      {CHAPTERS.map((c, i) => <a key={c.id} href={`#${c.id}`} className={chapter === i ? "on" : chapter > i ? "done" : ""} aria-label={c.label} aria-current={chapter === i ? "step" : undefined}><span /></a>)}
    </nav>
  </>;
}
