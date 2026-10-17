import { describe, expect, it } from "vitest";
import { activeNav, activeSub, isActive, matchPage, trailOf } from "./nav";

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
    expect(activeNav("/tugas/massal")).toBe("/tugas/massal");
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

  it("profil karyawan termasuk sub-menu Karyawan", () => {
    expect(activeSub("/tim")).toBe("/tim");
    expect(activeSub("/tim/bima")).toBe("/tim");
  });

  it("memilih sub-menu Pengaturan", () => {
    expect(activeSub("/pengaturan")).toBe("/pengaturan");
    expect(activeSub("/pengaturan/tagihan")).toBe("/pengaturan/tagihan");
  });

  it("tidak ada sub-menu aktif di luar Tim", () => {
    expect(activeSub("/dashboard")).toBeUndefined();
  });
});

describe("trailOf", () => {
  it("halaman tingkat atas tanpa induk", () => {
    expect(trailOf("/tugas")).toEqual({ trail: [{ label: "Ruang kerja" }, { label: "Tugas" }], back: undefined });
    expect(trailOf("/tugas/massal").back).toBeUndefined();
  });

  it("Buat tugas berinduk Tugas", () => {
    const { trail, back } = trailOf("/tugas/baru");
    expect(trail.map(c => c.label)).toEqual(["Ruang kerja", "Tugas", "Buat tugas"]);
    expect(back).toEqual({ label: "Tugas", href: "/tugas" });
  });

  it("langkah alur tugas berinduk detail tugas yang berinduk Tugas", () => {
    const { trail, back } = trailOf("/tugas/TGS-0143/kandidat");
    expect(trail.map(c => c.label)).toEqual(["Ruang kerja", "Tugas", "TGS-0143", "Rekomendasi kandidat"]);
    expect(back?.href).toBe("/tugas/TGS-0143");
    expect(trailOf("/tugas/TGS-0143").trail.at(-1)?.label).toBe("Detail tugas");
  });

  it("detail tugas berinduk Tugas, bukan dirinya sendiri", () => {
    const { trail, back } = trailOf("/tugas/TGS-0143");
    expect(trail.map(c => c.label)).toEqual(["Ruang kerja", "Tugas", "Detail tugas"]);
    expect(back).toEqual({ label: "Tugas", href: "/tugas" });
  });

  it("profil karyawan dan detail proyek membawa entitasnya", () => {
    expect(trailOf("/tim/ayu").trail.at(-1)?.entity).toEqual({ kind: "tim", id: "ayu" });
    expect(trailOf("/proyek/klinik").back?.href).toBe("/proyek");
  });

  it("tab sub-menu tampil di jejak tapi tanpa tombol kembali", () => {
    const { trail, back } = trailOf("/tim/keahlian");
    expect(trail.map(c => c.label)).toEqual(["Ruang kerja", "Tim", "Peta keahlian"]);
    expect(back).toBeUndefined();
    expect(trailOf("/pengaturan/rekomendasi").back).toBeUndefined();
  });
});
