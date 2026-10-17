/** Kalender murni berbasis string ISO "YYYY-MM-DD" (UTC, tanpa zona waktu) dengan pekan mulai Senin. */

export const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const addDays = (iso: string, days: number) => {
  const d = parse(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

/** Geser bulan; hari dijepit ke akhir bulan tujuan (31 Jan + 1 bulan = 28/29 Feb). */
export const addMonths = (iso: string, months: number) => {
  const d = parse(iso);
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, 1));
  const last = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(d.getUTCDate(), last));
  return target.toISOString().slice(0, 10);
};

/** Label bulan, mis. "Oktober 2026". */
export const monthLabel = (iso: string) => `${MONTHS[parse(iso).getUTCMonth()]} ${parse(iso).getUTCFullYear()}`;

/** 42 tanggal (6 pekan) yang menutupi bulan dari `iso`, mulai Senin. */
export function monthGrid(iso: string): string[] {
  const first = `${iso.slice(0, 7)}-01`;
  const offset = (parse(first).getUTCDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => addDays(first, i - offset));
}

/** "2 Oktober 2026" untuk label aksesibilitas. */
export const dayLabel = (iso: string) => `${parse(iso).getUTCDate()} ${monthLabel(iso)}`;
