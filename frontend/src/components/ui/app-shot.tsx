import Image from "next/image";

// Tangkapan kartu asli aplikasi (alur TGS-0142, data seed), diambil 2x di layar 1440px.
// `cut`: kartu dipotong di bawah, ujungnya dipudarkan lewat CSS.
const SHOTS = {
  "assign-dialog": { w: 520, h: 553, alt: "Dialog Tetapkan penugasan ke Bima dengan dua catatan konflik" },
  "cand-1": { w: 360, h: 488, alt: "Kartu kandidat #1 Bima Pradana, skor 0,78 dengan lima faktor" },
  "cand-2": { w: 360, h: 488, alt: "Kartu kandidat #2 Ayu Pramesti, skor 0,53, beban lebih 2 jam" },
  "cand-3": { w: 360, h: 488, alt: "Kartu kandidat #3 Dimas Saputra, skor 0,43" },
  "cand-highlight": { w: 1112, h: 279, alt: "Kartu sorotan kandidat #1 dengan rumus skor dan tiga alasan" },
  "dash-capacity": { cut: true, w: 704, h: 430, alt: "Kartu Kapasitas karyawan, 63,8% teralokasi" },
  "dash-capacity-after": { cut: true, w: 704, h: 430, alt: "Kartu Kapasitas karyawan setelah penugasan, 64,9% teralokasi" },
  "dash-highlight": { w: 391, h: 250, alt: "Kartu Perlu penugasan: Integrasi autentikasi, tenggat 2 Okt" },
  "dash-notes": { w: 391, h: 322, alt: "Kartu Catatan untuk ditinjau: jadwal ulang dan data belum lengkap" },
  "dash-queue": { w: 391, h: 334, alt: "Kartu Antrean berikutnya berisi tugas yang menunggu penugasan" },
  "dna-analysis": { cut: true, w: 639, h: 520, alt: "Analisis kebutuhan: kompetensi, level, dan isian yang perlu dicek" },
  "metric-data": { w: 266, h: 151, alt: "Metrik data kapasitas lengkap, 18 dari 20 karyawan" },
  "metric-review": { w: 266, h: 151, alt: "Metrik perlu ditinjau, 6 konteks kerja" },
  "metric-unassigned": { w: 266, h: 151, alt: "Metrik tugas belum ditugaskan, 7 tugas" },
  "metric-waiting": { w: 266, h: 151, alt: "Metrik menunggu jawaban karyawan, 2 penugasan" },
  "sim-conflict": { w: 413, h: 292, alt: "Kartu Konflik dan catatan hasil simulasi" },
  "sim-spread": { cut: true, w: 682, h: 470, alt: "Sebaran beban karyawan sebelum dan sesudah penugasan" },
  "skill-risk": { w: 1112, h: 183, alt: "Kompetensi rawan yang hanya dikuasai satu karyawan" },
  "task-form": { w: 760, h: 524, alt: "Form buat tugas: Integrasi pembayaran QRIS di kasir" },
} as const;

export type AppShotId = keyof typeof SHOTS;

/** Satu kartu aplikasi sebagai gambar. `decorative` mengosongkan alt untuk tiruan yang hanya hiasan. */
export function AppShot({ id, className = "", sizes = "(max-width: 767px) 90vw, 40vw", decorative = false, preload = false }: {
  id: AppShotId; className?: string; sizes?: string; decorative?: boolean; preload?: boolean;
}) {
  const s: { w: number; h: number; alt: string; cut?: boolean } = SHOTS[id];
  return <Image className={`app-shot${s.cut ? " cut" : ""} ${className}`} src={`/marketing/cards/${id}.png`} width={s.w} height={s.h} alt={decorative ? "" : s.alt} sizes={sizes} preload={preload} />;
}
