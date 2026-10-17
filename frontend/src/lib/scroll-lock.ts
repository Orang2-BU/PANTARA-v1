/**
 * Kunci scroll halaman saat modal/drawer terbuka tanpa menggeser tata letak: lebar scrollbar yang hilang diganti
 * padding yang sama di body, jadi konten tidak bergeser dan backdrop menutup seluruh lebar layar.
 * Mengembalikan fungsi pembuka kunci.
 */
export function lockScroll(): () => void {
  const { body, documentElement } = document;
  const { overflow, paddingRight } = body.style;
  const gap = window.innerWidth - documentElement.clientWidth;
  body.style.overflow = "hidden";
  if (gap > 0) body.style.paddingRight = `${gap}px`;
  return () => { body.style.overflow = overflow; body.style.paddingRight = paddingRight; };
}
