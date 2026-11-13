"use client";

import { useEffect, useRef, useState } from "react";
import { sceneProgress, stepIndex } from "@/lib/landing/scroll";

/**
 * Adegan cerita scroll: menulis progres 0..1 ke `--p` di elemen (tanpa render ulang) dan
 * mengembalikan langkah aktif. Tanpa JS atau saat reduced-motion, `data-live` tidak dipasang
 * dan adegan tampil statis.
 */
export function useScene<T extends HTMLElement>(steps = 1) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const p = sceneProgress(box.top, box.height, innerHeight);
      el.style.setProperty("--p", p.toFixed(4));
      setStep(stepIndex(p, steps));
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    el.dataset.live = "";
    request();
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", request);
      removeEventListener("resize", request);
      delete el.dataset.live;
      el.style.removeProperty("--p");
    };
  }, [steps]);
  return { ref, step };
}
