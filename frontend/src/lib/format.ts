// Format angka & tanggal Indonesia untuk UI.

const DAY = new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Jakarta" });
const DATE = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" });
const SHORT = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", timeZone: "Asia/Jakarta" });
const TIME = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });

/** "2 Okt 2026" */
export const date = (iso: string) => DATE.format(new Date(iso)).replace(/\./g, "");
/** "2 Okt" */
export const shortDate = (iso: string) => SHORT.format(new Date(iso)).replace(/\./g, "");
/** "Kam, 2 Okt" */
export const dayDate = (iso: string) => DAY.format(new Date(iso)).replace(/\./g, "");
/** "09.15" */
export const time = (iso: string) => TIME.format(new Date(iso)).replace(":", ".");
/** "8 jam" */
export const hours = (value: number) => `${number(value)} jam`;
export const number = (value: number, digits = 0) =>
  new Intl.NumberFormat("id-ID", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
/** "68,8%" */
export const percent = (ratio: number, digits = 0) => `${number(ratio * 100, digits)}%`;
/** "0,82" */
export const score = (value: number) => number(value, 2);
/** "7 menit" / "1j 10m" */
export const minutes = (ms: number) => {
  const m = Math.round(ms / 60_000);
  return m < 60 ? `${m} menit` : `${Math.floor(m / 60)}j ${m % 60}m`;
};

/** Tp: lama keputusan sejak tugas mulai diproses (minimal 1 menit; 5 menit bila awalnya tidak tercatat). */
export const elapsedSince = (start?: number) => Math.max(60_000, start ? Date.now() - start : 5 * 60_000);
