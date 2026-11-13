import { describe, expect, it } from "vitest";
import { clamp01, sceneProgress, stepIndex } from "./scroll";

describe("sceneProgress", () => {
  it("0 sebelum adegan menyentuh atas layar", () => {
    expect(sceneProgress(300, 2000, 800)).toBe(0);
  });
  it("naik linear sepanjang jalur sticky", () => {
    expect(sceneProgress(-600, 2000, 800)).toBeCloseTo(0.5);
  });
  it("berhenti di 1 setelah adegan lewat", () => {
    expect(sceneProgress(-5000, 2000, 800)).toBe(1);
  });
  it("adegan setinggi layar: langsung 0 atau 1", () => {
    expect(sceneProgress(10, 800, 800)).toBe(0);
    expect(sceneProgress(-1, 800, 800)).toBe(1);
  });
});

describe("stepIndex", () => {
  it("membagi progres jadi langkah sama panjang", () => {
    expect(stepIndex(0, 4)).toBe(0);
    expect(stepIndex(0.26, 4)).toBe(1);
    expect(stepIndex(0.74, 4)).toBe(2);
  });
  it("progres 1 tetap di langkah terakhir", () => {
    expect(stepIndex(1, 4)).toBe(3);
  });
  it("satu langkah selalu 0", () => {
    expect(stepIndex(0.9, 1)).toBe(0);
  });
});

describe("clamp01", () => {
  it("menjepit ke 0..1", () => {
    expect(clamp01(-2)).toBe(0);
    expect(clamp01(0.3)).toBe(0.3);
    expect(clamp01(4)).toBe(1);
  });
});
