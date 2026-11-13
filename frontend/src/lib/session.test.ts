import { describe, expect, it } from "vitest";
import { authenticate } from "./session";

describe("authenticate", () => {
  it("mengarahkan manajer ke Dashboard dan karyawan ke Beranda saya", () => {
    expect(authenticate("krisna@pantara.id", "pantara2026")?.home).toBe("/dashboard");
    expect(authenticate("bima@pantara.id", "pantara2026")).toMatchObject({ role: "karyawan", memberId: "bima", home: "/saya" });
  });

  it("tidak membedakan huruf besar dan spasi di email", () => {
    expect(authenticate("  Krisna@Pantara.ID ", "pantara2026")?.name).toBe("Krisna Panca");
  });

  it("menolak sandi salah dan akun lama", () => {
    expect(authenticate("krisna@pantara.id", "salah")).toBeNull();
    expect(authenticate("krisna@arunika.id", "pantara2026")).toBeNull();
  });

  it("tidak membawa sandi keluar dari modul", () => {
    expect(authenticate("bima@pantara.id", "pantara2026")).not.toHaveProperty("password");
  });
});
