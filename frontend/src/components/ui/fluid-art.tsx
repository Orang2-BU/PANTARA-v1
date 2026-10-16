"use client";

import * as React from "react";

/**
 * Motif cair Pantara (diambil dari komponen 21st.dev "Glass Folder Cards", 03-ARCHITECTURE Q19-Q20):
 * medan noise di-warp dua kali lalu diberi cahaya seperti permukaan cairan, warnanya dari token merek.
 * Dipakai panel belakang folder proyek dan latar kartu sorotan.
 */

type Recipe = { style: "marble" | "streak"; colors: string[]; scale: number; warp: number; angle: number; gloss: number; veins: number };

/** Palet motif dari token merek (urutan gelap-terang mengalir), dibaca saat dijalankan. */
const TOKEN_PALETTE = ["--color-surface", "--color-accent-soft", "--color-accent-fill", "--color-primary", "--color-surface-inverse", "--color-primary-hover", "--color-accent-soft"];

function recipeFor(style: Recipe["style"]): Recipe {
  const css = getComputedStyle(document.documentElement);
  const colors = TOKEN_PALETTE.map(v => css.getPropertyValue(v).trim() || "#888888");
  return style === "streak"
    ? { style, colors, scale: 0.7, warp: 1.4, angle: -0.62, gloss: 0.2, veins: 0 }
    : { style, colors, scale: 0.68, warp: 3.3, angle: 0.8, gloss: 0.5, veins: 0.45 };
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = /^[0-9a-f]{6}$/i.test(h) ? parseInt(h, 16) : 0x808080;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** PRNG kecil yang bisa di-seed (mulberry32). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


/** Noise gradien ber-seed, dijumlah jadi oktaf fraktal dengan rotasi tiap oktaf. */
function makeFbm(seed: number): (x: number, y: number, octaves: number) => number {
  const r = rng(seed);
  const perm = new Uint8Array(512);
  const grad = new Float32Array(512);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  for (let i = 0; i < 256; i++) {
    const a = r() * Math.PI * 2;
    grad[i * 2] = Math.cos(a);
    grad[i * 2 + 1] = Math.sin(a);
  }
  const noise = (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const X = xi & 255, Y = yi & 255;
    const h00 = perm[X + perm[Y]] * 2, h10 = perm[X + 1 + perm[Y]] * 2;
    const h01 = perm[X + perm[Y + 1]] * 2, h11 = perm[X + 1 + perm[Y + 1]] * 2;
    const d00 = grad[h00] * xf + grad[h00 + 1] * yf;
    const d10 = grad[h10] * (xf - 1) + grad[h10 + 1] * yf;
    const d01 = grad[h01] * xf + grad[h01 + 1] * (yf - 1);
    const d11 = grad[h11] * (xf - 1) + grad[h11 + 1] * (yf - 1);
    const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10);
    const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
    return d00 + u * (d10 - d00) + v * (d01 - d00 + u * (d11 - d01 - d10 + d00));
  };
  return (x, y, octaves) => {
    let sum = 0, amp = 0.5;
    for (let i = 0; i < octaves; i++) {
      sum += amp * noise(x, y);
      const nx = 1.6 * x + 1.2 * y + 7.1;
      y = -1.2 * x + 1.6 * y + 3.3;
      x = nx;
      amp *= 0.5;
    }
    return sum;
  };
}

type ArtJob = { width: number; height: number; pixels: Uint8ClampedArray<ArrayBuffer>; step: (rows: number) => boolean };

/** Motif cair: medan noise di-warp dua kali, diberi cahaya seperti permukaan cairan. Dicicil per frame. */
function createArtJob(width: number, height: number, recipe: Recipe, seed: number): ArtJob {
  const w = Math.max(1, Math.round(width)), h = Math.max(1, Math.round(height));
  const stops = recipe.colors.map((c, i) => ({ t: i / (recipe.colors.length - 1), c: hexToRgb(c) }));
  const { scale, warp, gloss, veins } = recipe;
  const streak = recipe.style === "streak";
  const fbm = makeFbm(seed * 977 + 13);
  const r = rng(seed + 1);
  const ox = r() * 50, oy = r() * 50;
  const angle = recipe.angle + (r() - 0.5) * 0.5;
  const ca = Math.cos(angle), sa = Math.sin(angle);
  const m = Math.min(w, h);
  const gw = Math.ceil(w / 2) + 3, gh = Math.ceil(h / 2) + 3;
  const G = new Float32Array(gw * gh), GQ = new Float32Array(gw * gh);
  const F = new Float32Array(w * h), Q = new Float32Array(w * h);
  const pixels = new Uint8ClampedArray(new ArrayBuffer(w * h * 4));
  let row = 0;

  const field = (gy: number) => {
    for (let gx = 0; gx < gw; gx++) {
      const u = ((gx - 1) * 2 - w / 2) / m, v = ((gy - 1) * 2 - h / 2) / m;
      let px = (u * ca - v * sa) * scale, py = (u * sa + v * ca) * scale;
      if (streak) { px *= 0.14; py *= 2.2; }
      px += ox; py += oy;
      const qx = fbm(px, py, 3), qy = fbm(px + 5.2, py + 1.3, 3);
      const rx = fbm(px + warp * qx + 1.7, py + warp * qy + 9.2, 3);
      const ry = fbm(px + warp * qx + 8.3, py + warp * qy + 2.8, 3);
      G[gy * gw + gx] = fbm(px + warp * rx, py + warp * ry, 4);
      GQ[gy * gw + gx] = Math.sqrt(qx * qx + qy * qy);
    }
  };

  const upsample = () => {
    const cr = (a: number, b: number, c: number, d: number) => (-a + 9 * b + 9 * c - d) / 16;
    const T = new Float32Array(w * gh);
    for (let gy = 0; gy < gh; gy++) {
      const o = gy * gw;
      for (let x = 0; x < w; x++) {
        const c = (x >> 1) + 1;
        T[gy * w + x] = x & 1 ? cr(G[o + c - 1], G[o + c], G[o + c + 1], G[o + c + 2]) : G[o + c];
      }
    }
    for (let y = 0; y < h; y++) {
      const c = (y >> 1) + 1;
      for (let x = 0; x < w; x++) {
        F[y * w + x] = y & 1 ? cr(T[(c - 1) * w + x], T[c * w + x], T[(c + 1) * w + x], T[(c + 2) * w + x]) : T[c * w + x];
        const gx = (x >> 1) + 1;
        const q0 = GQ[c * gw + gx];
        const qx = x & 1 ? (q0 + GQ[c * gw + gx + 1]) / 2 : q0;
        const q1 = y & 1 ? (x & 1 ? (GQ[(c + 1) * gw + gx] + GQ[(c + 1) * gw + gx + 1]) / 2 : GQ[(c + 1) * gw + gx]) : qx;
        Q[y * w + x] = (qx + q1) / 2;
      }
    }
  };

  const colorize = () => {
    const sample: number[] = [];
    const stride = Math.max(1, Math.floor(F.length / 4096));
    for (let i = 0; i < F.length; i += stride) sample.push(F[i]);
    sample.sort((a, b) => a - b);
    const lo = sample[Math.floor(sample.length * 0.02)], hi = sample[Math.floor(sample.length * 0.98)];
    const k = 1 / (hi - lo || 1);
    const lx = -0.55, ly = -0.65, lz = 0.52, slope = k * m * 0.012;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const t = Math.min(1, Math.max(0, (F[i] - lo) * k));
        let j = 1;
        while (j < stops.length - 1 && stops[j].t < t) j++;
        const a = stops[j - 1], b = stops[j];
        let f = Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t || 1)));
        f = f * f * (3 - 2 * f);
        const gx = (F[x < w - 1 ? i + 1 : i] - F[x > 0 ? i - 1 : i]) * slope;
        const gy = (F[y < h - 1 ? i + w : i] - F[y > 0 ? i - w : i]) * slope;
        const nd = (-gx * lx - gy * ly + lz) / Math.sqrt(gx * gx + gy * gy + 1);
        const spec = Math.pow(nd > 0 ? nd : 0, 24) * gloss * 255;
        const silk = 1 + 0.035 * Math.sin(t * 150 + Q[i] * 24);
        const vein = veins * Math.max(0, 1 - Math.abs(Q[i] - 0.42) * 14) * 0.6;
        const lit = (0.82 + 0.28 * nd) * silk * (1 - vein);
        for (let ch = 0; ch < 3; ch++) pixels[i * 4 + ch] = (a.c[ch] + (b.c[ch] - a.c[ch]) * f) * lit + spec;
        pixels[i * 4 + 3] = 255;
      }
    }
  };

  const step = (rows: number) => {
    if (row >= gh) return true;
    const end = Math.min(gh, row + Math.max(1, rows));
    while (row < end) field(row++);
    if (row < gh) return false;
    upsample();
    colorize();
    return true;
  };
  return { width: w, height: h, pixels, step };
}

// Satu antrean pelukis untuk semua motif di halaman: beberapa ms per frame supaya tidak tersendat.
const artCache = new Map<string, Promise<HTMLCanvasElement>>();
const queue: { job: ArtJob; done: (c: HTMLCanvasElement) => void }[] = [];
let pumping = false;

function pump() {
  if (pumping) return;
  pumping = true;
  const tick = () => {
    const until = performance.now() + 7;
    while (queue.length && performance.now() < until) {
      const head = queue[0];
      if (head.job.step(4)) {
        queue.shift();
        const c = document.createElement("canvas");
        c.width = head.job.width;
        c.height = head.job.height;
        c.getContext("2d")?.putImageData(new ImageData(head.job.pixels, c.width, c.height), 0, 0);
        head.done(c);
      }
    }
    if (queue.length) requestAnimationFrame(tick);
    else pumping = false;
  };
  requestAnimationFrame(tick);
}

function paint(recipe: Recipe, seed: number, w: number, h: number) {
  const key = JSON.stringify([recipe, seed, w, h]);
  let p = artCache.get(key);
  if (!p) {
    p = new Promise(done => { queue.push({ job: createArtJob(w, h, recipe, seed), done }); pump(); });
    artCache.set(key, p);
  }
  return p;
}

/**
 * Motif cair dari palet token merek. Ukuran gambar `w × h` (px CSS), dicat sekali per resep lalu dibagi
 * ke semua pemakai. Tanpa `className` kanvas berukuran tetap; dengan `className` ukurannya diatur CSS.
 */
export function FluidArt({ style, seed, w, h, scale = 1, className }: { style: Recipe["style"]; seed: number; w: number; h: number; scale?: number; className: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    let live = true;
    // Kepadatan piksel mengikuti layar (maks 1,5×) dan skala pemakai.
    const density = Math.min(1.5, Math.max(1, window.devicePixelRatio || 1)) * scale;
    paint(recipeFor(style), seed, Math.round(w * density), Math.round(h * density)).then(src => {
      const c = ref.current;
      if (!live || !c) return;
      c.width = src.width;
      c.height = src.height;
      c.getContext("2d")?.drawImage(src, 0, 0);
      setReady(true);
    });
    return () => { live = false; };
  }, [style, seed, w, h, scale]);
  return <canvas ref={ref} aria-hidden="true" className={className} data-ready={ready || undefined} />;
}
