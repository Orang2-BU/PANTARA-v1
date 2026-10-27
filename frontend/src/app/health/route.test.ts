import { expect, it } from "vitest";

it("menandai frontend demo sehat tanpa koneksi backend", async () => {
  const { GET } = await import("./route");
  const response = GET();

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ status: "ok", service: "pantara-frontend", mode: "demo" });
});
