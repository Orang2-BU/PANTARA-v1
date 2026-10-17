import { describe, expect, it } from "vitest";
import { addDays, addMonths, dayLabel, monthGrid, monthLabel } from "./calendar";

describe("calendar", () => {
  it("grid Oktober 2026 mulai Senin 28 Sep dan 42 hari", () => {
    const grid = monthGrid("2026-10-17");
    expect(grid).toHaveLength(42);
    expect(grid[0]).toBe("2026-09-28");
    expect(grid[3]).toBe("2026-10-01");
    expect(grid[41]).toBe("2026-11-08");
  });

  it("bulan yang dimulai Senin tidak punya hari sebelumnya", () => {
    expect(monthGrid("2026-06-10")[0]).toBe("2026-06-01");
  });

  it("addDays melewati batas bulan dan tahun", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("addMonths menjepit hari ke akhir bulan tujuan", () => {
    expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
    expect(addMonths("2026-12-15", 1)).toBe("2027-01-15");
    expect(addMonths("2026-01-15", -1)).toBe("2025-12-15");
  });

  it("label bahasa Indonesia", () => {
    expect(monthLabel("2026-10-02")).toBe("Oktober 2026");
    expect(dayLabel("2026-10-02")).toBe("2 Oktober 2026");
  });
});
