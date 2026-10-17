import { describe, expect, it } from "vitest";
import { paginate } from "./paginate";

const items = [1, 2, 3, 4, 5, 6];

describe("paginate", () => {
  it("memotong halaman pertama", () => {
    expect(paginate(items, 0, 4)).toMatchObject({ rows: [1, 2, 3, 4], from: 1, to: 4, total: 6, pages: 2, hasPrev: false, hasNext: true });
  });

  it("halaman terakhir berisi sisa baris", () => {
    expect(paginate(items, 1, 4)).toMatchObject({ rows: [5, 6], from: 5, to: 6, hasPrev: true, hasNext: false });
  });

  it("halaman di luar rentang dijepit ke halaman terakhir (mis. data berkurang)", () => {
    expect(paginate(items, 9, 4).page).toBe(1);
    expect(paginate(items, -3, 4).page).toBe(0);
  });

  it("daftar kosong tidak menghasilkan halaman negatif", () => {
    expect(paginate([], 0, 4)).toMatchObject({ rows: [], from: 0, to: 0, total: 0, pages: 1, hasPrev: false, hasNext: false });
  });

  it("ukuran halaman tepat sama dengan jumlah data = satu halaman", () => {
    expect(paginate(items, 0, 6)).toMatchObject({ pages: 1, hasNext: false });
  });
});

