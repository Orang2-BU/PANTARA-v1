import Image from "next/image";

/** Simbol "Tepat" (docs/brand) dipotong rapat untuk baris brand. */
function BrandSymbol() {
  return <svg className="brand-symbol" viewBox="66 42 124 170" aria-hidden="true">
    <path fill="var(--color-primary)" fillRule="evenodd" d="M68 104A60 60 0 1 1 102 158V193A17 17 0 0 1 68 193Z M154 104A26 26 0 1 0 102 104A26 26 0 1 0 154 104Z" />
    <circle fill="var(--color-primary)" cx="128" cy="104" r="11" />
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
