// Motif "ruang terang" (landing dan halaman masuk): langit-langit berlampu digambar 2D (tanpa WebGL), titik hilang di tengah.
// Titik dihitung sekali di modul supaya markup server dan klien sama.

const W = 1600, H = 900;
const BACK = { x0: 560, x1: 1040, y0: 300, y1: 600 };

/** Titik di bidang langit-langit: d = kedalaman (0 depan, 1 dinding belakang), u = posisi lateral -1..1. */
function ceil(d: number, u: number): [number, number] {
  const half = (W / 2) * (1 - d) + ((BACK.x1 - BACK.x0) / 2) * d;
  return [W / 2 + u * half, BACK.y0 * d];
}

const ROWS: [number, number][] = [[0.22, 0.3], [0.37, 0.44], [0.5, 0.55]];
const COLS: [number, number][] = [[-0.78, -0.4], [-0.2, 0.2], [0.4, 0.78]];
const pts = (list: [number, number][]) => list.map(p => p.map(n => Math.round(n)).join(",")).join(" ");

const PANELS = ROWS.flatMap(([d0, d1]) => COLS.map(([u0, u1]) => pts([ceil(d0, u0), ceil(d0, u1), ceil(d1, u1), ceil(d1, u0)])));
const CONE = pts([ceil(0.36, -0.2), ceil(0.36, 0.2), [W / 2 + 300, 720], [W / 2 - 300, 720]]);

export function Ceiling({ className = "" }: { className?: string }) {
  return <svg className={`ceiling ${className}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="ceiling-cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--color-on-inverse)" stopOpacity=".1" />
        <stop offset="1" stopColor="var(--color-on-inverse)" stopOpacity="0" />
      </linearGradient>
      <filter id="ceiling-soft" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
    <g stroke="var(--color-on-inverse-muted)" strokeOpacity=".14" strokeWidth="1.5" fill="none">
      <rect x={BACK.x0} y={BACK.y0} width={BACK.x1 - BACK.x0} height={BACK.y1 - BACK.y0} />
      <path d={`M0 0L${BACK.x0} ${BACK.y0}M${W} 0L${BACK.x1} ${BACK.y0}M0 ${H}L${BACK.x0} ${BACK.y1}M${W} ${H}L${BACK.x1} ${BACK.y1}`} />
    </g>
    <polygon points={CONE} fill="url(#ceiling-cone)" />
    <g className="ceiling-lights" fill="var(--color-on-inverse)">
      <g filter="url(#ceiling-soft)" opacity=".3">{PANELS.map(p => <polygon key={p} points={p} />)}</g>
      <g opacity=".42">{PANELS.map(p => <polygon key={p} points={p} />)}</g>
    </g>
  </svg>;
}
