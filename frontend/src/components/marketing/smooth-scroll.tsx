"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Scroll halus khusus landing (Area Landing). Mati sendiri saat reduced-motion (respectReducedMotion bawaan Lenis). */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.85, anchors: { offset: 0, duration: 1.6 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
