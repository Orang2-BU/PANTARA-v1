import { describe, expect, it } from "vitest";
import { activeNav, isActive, matchPage } from "./nav";

describe("isActive", () => {
  it("menandai link aktif pada halamannya sendiri", () => {
    expect(isActive("/tugas", "/tugas")).toBe(true);
  });

  it("menandai link aktif pada sub-halaman", () => {
    expect(isActive("/tugas/TGS-0142/kandidat", "/tugas")).toBe(true);
  });

  it("tidak menandai rute lain yang hanya berawalan sama", () => {
    expect(isActive("/tugasku", "/tugas")).toBe(false);
  });
});

describe("matchPage", () => {
  it("mencocokkan rute statis", () => {
    expect(matchPage("/kapasitas")?.id).toBe("P21");
  });

  it("mencocokkan rute dengan param dinamis", () => {
    expect(matchPage("/tugas/TGS-0142/kandidat")?.id).toBe("P14");
  });

  it("mendahulukan segmen statis bila panjangnya sama", () => {
    expect(matchPage("/tugas/baru")?.id).toBe("P12");
    expect(matchPage("/tim/kompetensi")?.id).toBe("P30");
  });

  it("mengembalikan undefined untuk rute yang tidak ada", () => {
    expect(matchPage("/tidak-ada")).toBeUndefined();
  });
});

describe("activeNav", () => {
  it("memilih menu paling spesifik", () => {
    expect(activeNav("/tugas/alokasi-batch")).toBe("/tugas/alokasi-batch");
    expect(activeNav("/tugas/TGS-0142/kandidat")).toBe("/tugas");
  });

  it("tidak menandai apa pun untuk halaman di luar menu", () => {
    expect(activeNav("/saya")).toBeUndefined();
  });
});
