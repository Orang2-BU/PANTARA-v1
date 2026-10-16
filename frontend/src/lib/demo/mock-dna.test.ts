import { describe, expect, it } from "vitest";
import { mockDna } from "./mock-dna";

describe("mockDna", () => {
  it("mengutip kalimat dari deskripsi, bukan judul, bila kata kuncinya ada di deskripsi", () => {
    const dna = mockDna("Integrasi autentikasi SSO", "Hubungkan login staf lewat OAuth2. Perlu integrasi ke API kepegawaian.", "normal");
    expect(dna.requirements.find(r => r.competencyId === "integrasi-api")?.quote).toBe("Perlu integrasi ke API kepegawaian");
  });
});
