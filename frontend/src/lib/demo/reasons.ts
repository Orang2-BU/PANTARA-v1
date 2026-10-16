/** Alasan memilih di luar tiga teratas (override). */
export const OVERRIDE_REASONS = [
  { value: "klien", label: "Pertimbangan klien" },
  { value: "pengembangan", label: "Pengembangan anggota" },
  { value: "info", label: "Info yang tidak ada di sistem" },
  { value: "lainnya", label: "Lainnya" },
];

/** Alasan menolak semua rekomendasi. */
export const REJECT_REASONS = [
  { value: "tidak-sesuai", label: "Kandidat tidak sesuai kondisi nyata" },
  { value: "kebutuhan", label: "Kebutuhan tugas perlu diubah" },
  { value: "tunda", label: "Tugas ditunda" },
  { value: "lainnya", label: "Lainnya" },
];

export const REASON_LABEL: Record<string, string> = Object.fromEntries([...OVERRIDE_REASONS, ...REJECT_REASONS].map(r => [r.value, r.label]));
