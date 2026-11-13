"use client";

import { useRef } from "react";
import { AppShot } from "@/components/ui/app-shot";
import { usePointerDrift } from "@/components/ui/use-pointer-drift";

/**
 * Tiga kartu panel masuk: jatuh dan berputar ke posisinya satu per satu, lalu melayang pelan.
 * Lapisan luar (.lc-drift) mengikuti cursor dengan kedalaman berbeda, lapisan dalam (.lc-float) melayang.
 */
export function LoginCards() {
  const ref = useRef<HTMLDivElement>(null);
  usePointerDrift(ref);
  return <div ref={ref} className="login-cards">
    <span className="lc c-top" style={{ "--depth": 0.6, "--i": 1 } as React.CSSProperties}><span className="lc-drift"><span className="lc-float"><AppShot id="metric-unassigned" decorative sizes="220px" /></span></span></span>
    <span className="lc c-main" style={{ "--depth": 1, "--i": 0 } as React.CSSProperties}><span className="lc-drift"><span className="lc-float"><AppShot id="cand-1" sizes="300px" preload /></span></span></span>
    <span className="lc c-side" style={{ "--depth": 0.75, "--i": 2 } as React.CSSProperties}><span className="lc-drift"><span className="lc-float"><AppShot id="sim-conflict" decorative sizes="230px" /></span></span></span>
  </div>;
}
