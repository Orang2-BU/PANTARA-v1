"use client";

import { useEffect, type RefObject } from "react";

/**
 * Kartu mengikuti cursor perlahan: posisi pointer (-1..1) dikejar dengan peredam setiap frame
 * dan ditulis ke `--mx`/`--my`; CSS memakai nilainya untuk geser + miring tipis.
 * Hanya untuk pointer presisi dan tanpa reduced-motion.
 */
export function usePointerDrift(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, frame = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const leave = () => { tx = 0; ty = 0; if (!frame) frame = requestAnimationFrame(tick); };
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [ref]);
}
