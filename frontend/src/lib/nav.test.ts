import { describe, expect, it } from "vitest";
import { activeNav, activeSub, isActive, matchPage } from "./nav";

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
    expect(matchPage("/tim/keahlian")?.id).toBe("P40");
    expect(matchPage("/tim/graf")?.id).toBe("P41");
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

describe("activeSub", () => {
  it("memilih sub-menu Tim paling spesifik", () => {
    expect(activeSub("/tim/keahlian")).toBe("/tim/keahlian");
    expect(activeSub("/tim/kompetensi")).toBe("/tim/kompetensi");
  });

  it("profil anggota termasuk sub-menu Anggota", () => {
    expect(activeSub("/tim")).toBe("/tim");
    expect(activeSub("/tim/bima")).toBe("/tim");
  });

  it("memilih sub-menu Pengaturan", () => {
    expect(activeSub("/pengaturan")).toBe("/pengaturan");
    expect(activeSub("/pengaturan/tagihan")).toBe("/pengaturan/tagihan");
  });

  it("tidak ada sub-menu aktif di luar Tim", () => {
    expect(activeSub("/dasbor")).toBeUndefined();
  });
});

