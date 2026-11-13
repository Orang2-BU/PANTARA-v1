// Matematika cerita scroll landing: fungsi murni, dipakai hook di components/marketing/story.tsx.

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Progres 0..1 sebuah adegan sticky: 0 saat atasnya menyentuh atas layar, 1 saat bawahnya menyentuh bawah layar. */
export function sceneProgress(top: number, height: number, viewport: number): number {
  const track = height - viewport;
  if (track <= 0) return top <= 0 ? 1 : 0;
  return clamp01(-top / track);
}

/** Langkah aktif dari progres untuk adegan dengan `count` langkah sama panjang. */
export function stepIndex(progress: number, count: number): number {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.floor(clamp01(progress) * count));
}
