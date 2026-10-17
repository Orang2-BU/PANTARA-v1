import Image from "next/image";

/** Simbol "Cincin Tepat" (docs/brand): cincin kapasitas terbuka, titik penugasan pas di celahnya. */
function BrandSymbol() {
  return <svg className="brand-symbol" viewBox="28 28 200 200" aria-hidden="true">
    <path fill="var(--color-primary)" d="M222.37 101.56A98 98 0 1 1 154.44 33.63A16 16 0 0 1 145.81 64.45A66 66 0 1 0 191.55 110.19A16 16 0 0 1 222.37 101.56Z" />
    <circle fill="var(--color-primary)" cx="185.98" cy="70.02" r="17" />
  </svg>;
}

export function BrandWordmark({ priority = false }: { priority?: boolean }) {
  return <Image className="brand-wordmark" src="/brand/pantara-wordmark.svg" alt="" width={76} height={22} unoptimized priority={priority} />;
}

/** Isi baris brand: simbol + wordmark + caption (label disembunyikan saat sidebar ciut). */
export function BrandLockup() {
  return <>
    <BrandSymbol />
    <span className="nav-label">
      <BrandWordmark priority />
      <span className="brand-caption">Orkestrasi kerja adaptif</span>
    </span>
  </>;
}
