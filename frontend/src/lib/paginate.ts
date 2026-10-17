/** Potong daftar jadi satu halaman (indeks halaman mulai dari 0; di luar rentang dijepit). */
export function paginate<T>(items: T[], page: number, size: number) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const at = Math.min(Math.max(0, page), pages - 1);
  const rows = items.slice(at * size, at * size + size);
  return { rows, page: at, pages, total: items.length, from: rows.length ? at * size + 1 : 0, to: at * size + rows.length, hasPrev: at > 0, hasNext: at < pages - 1 };
}

/**
 * Berapa baris yang muat di tinggi `free` (area tabel termasuk jatah pager, sudah dikurangi header).
 * Semua baris muat tanpa pager → `total`; kalau tidak, sisakan ruang untuk pager. Minimal 1.
 */
export function fitRows(free: number, rowHeight: number, pagerHeight: number, total: number) {
  if (Math.floor(free / rowHeight) >= total) return total;
  return Math.max(1, Math.floor((free - pagerHeight) / rowHeight));
}
