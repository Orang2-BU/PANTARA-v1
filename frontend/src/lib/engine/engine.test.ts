import { describe, expect, it } from "vitest";
import { MEMBERS, TASKS } from "@/lib/demo/seed";
import type { Member, Task } from "@/lib/demo/types";
import { allocateBatch } from "./batch";
import { DEFAULT_SETTINGS, allocatedHours, clashingDeadline, effectiveWeights, PRESETS, rankCandidates } from "./score";
import { simulate, utilTone } from "./whatif";

const auth = TASKS.find(t => t.id === "TGS-0142") as Task;
/** Skenario demo: manajer mengoreksi estimasi Analisis kebutuhan dari 6 ke 8 jam. */
const authCorrected: Task = { ...auth, dna: { ...auth.dna!, effortHours: 8, confirmed: true } };

describe("seed", () => {
  it("memuat kondisi kerja nyata: 20 karyawan, profil belum lengkap, karyawan baru, dan cuti", () => {
    expect(MEMBERS).toHaveLength(20);
    expect(MEMBERS.filter(m => m.availableHours === null).map(m => m.id)).toEqual(["salsabila", "rafi"]);
    expect(MEMBERS.find(m => m.id === "bayu")?.competencies).toEqual([]);
    expect(MEMBERS.find(m => m.id === "dewi")?.leaveDates).toHaveLength(3);
  });

  it("jam teralokasi per karyawan dihitung dari tugas menunggu dan berjalan", () => {
    expect(["ayu", "bima", "dimas", "citra", "andre", "bayu"].map(id => allocatedHours(id, TASKS))).toEqual([28, 16, 22, 30, 30, 0]);
  });
});

describe("clashingDeadline", () => {
  it("menandai karyawan yang memegang dua tugas aktif bertenggat berdekatan", () => {
    expect(clashingDeadline("ayu", TASKS)).toBe("2026-09-30");
    expect(clashingDeadline("citra", TASKS)).toBe("2026-10-01");
    expect(clashingDeadline("bima", TASKS)).toBeUndefined();
  });
});

describe("rankCandidates", () => {
  it("menyaring karyawan yang ketersediaannya belum diisi", () => {
    const { filtered } = rankCandidates(authCorrected, MEMBERS, TASKS);
    expect(filtered.find(f => f.member.id === "rafi")?.failures[0]).toMatch(/belum diisi/);
  });

  it("menyaring karyawan yang level kompetensinya di bawah minimum", () => {
    const { filtered } = rankCandidates(authCorrected, MEMBERS, TASKS);
    expect(filtered.map(f => f.member.id)).toEqual(expect.arrayContaining(["citra", "nadia"]));
    const named = rankCandidates(authCorrected, MEMBERS, TASKS, DEFAULT_SETTINGS, { "backend-api": "Backend API" });
    expect(named.filtered.find(f => f.member.id === "citra")?.failures).toContain("Backend API belum dimiliki, butuh minimal Dasar");
  });

  it("memeringkat Bima di atas karena kompetensi, kapasitas, dan riwayat", () => {
    const { candidates } = rankCandidates(authCorrected, MEMBERS, TASKS);
    expect(candidates.map(c => c.member.id)).toEqual(["bima", "ayu", "dimas"]);
    // Kompleksitas 2 di Seimbang: bobot K 0,45 · C 0,20 · A 0,15 · R 0,10 · F 0,10.
    // K = (0,96·1 + 0,92·0,9 + 0,66·0,9) / 2,54 (oauth2 & integrasi API bersumber riwayat = keyakinan 0,9);
    // C = skor beban cembung di utilisasi 75%; A = 1 (jam kosong 20,6 ≥ 8); R = 1; F = 0,5 (tenggat berdekatan).
    const k = (0.96 + 0.92 * 0.9 + 0.66 * 0.9) / 2.54;
    expect(candidates[0].score).toBeCloseTo(0.45 * k + 0.2 * (1.15 * 0.25 / 0.4) + 0.15 + 0.1 - 0.1 * 0.5, 6);
  });

  it("preset Sebar pengetahuan menaikkan karyawan tanpa riwayat sejenis", () => {
    const { candidates } = rankCandidates(authCorrected, MEMBERS, TASKS, { ...DEFAULT_SETTINGS, preset: "sebar" });
    expect(candidates.map(c => c.member.id)).toEqual(["bima", "dimas", "ayu"]);
  });

  it("beban melebihi kapasitas membuat skor beban nol dan memberi peringatan", () => {
    const ayu = rankCandidates(authCorrected, MEMBERS, TASKS).candidates.find(c => c.member.id === "ayu")!;
    expect(ayu.utilAfter).toBeCloseTo(1.125);
    expect(ayu.factors.c).toBe(0);
    expect(ayu.cautions.join(" ")).toMatch(/melebihi kapasitas/);
  });

  it("alasan sesuai angka faktor", () => {
    const bima = rankCandidates(authCorrected, MEMBERS, TASKS).candidates[0];
    expect(bima.reasons).toContain("Memenuhi semua level kompetensi yang dibutuhkan");
    expect(bima.reasons).toContain("Beban setelah penugasan 75%, masih aman");
  });
});

describe("simulate", () => {
  it("menghitung beban sebelum dan sesudah tanpa mengubah data", () => {
    const sim = simulate(authCorrected, [{ memberId: "bima", hours: 8 }], MEMBERS, TASKS);
    const bima = sim.rows.find(r => r.member.id === "bima")!;
    expect([bima.before, bima.after]).toEqual([16, 24]);
    expect(allocatedHours("bima", TASKS)).toBe(16);
  });

  it("memunculkan konflik kapasitas, tenggat, dan dependensi", () => {
    const sim = simulate(authCorrected, [{ memberId: "ayu", hours: 8 }], MEMBERS, TASKS);
    expect(sim.conflicts.map(c => c.tone)).toContain("crit");
    expect(sim.conflicts.some(c => /berdekatan/.test(c.text))).toBe(true);
    expect(sim.conflicts.some(c => /Bergantung/.test(c.text))).toBe(true);
  });

  it("memberi nada sesuai ambang utilisasi", () => {
    expect([utilTone(0.5), utilTone(0.86), utilTone(1.1)]).toEqual(["ok", "warn", "crit"]);
  });
});

describe("allocateBatch", () => {
  it("mengalokasikan tiap tugas terbuka dan menjelaskan yang tidak bisa", () => {
    const open = TASKS.filter(t => t.status === "belum");
    const pairs = allocateBatch(open, MEMBERS, TASKS, DEFAULT_SETTINGS);
    expect(pairs).toHaveLength(open.length);
    expect(pairs[0].task.id).toBe("TGS-0142");
    // Satu-satunya pengembang Flutter yang lolos sudah hampir penuh, junior belum mengisi ketersediaan.
    const mobile = pairs.find(p => p.task.id === "TGS-0168")!;
    expect(mobile.memberId).toBeNull();
    expect(mobile.reason).toMatch(/Tidak ada yang lolos/);
    // Karyawan baru tanpa kompetensi tidak dipilih hanya karena jamnya kosong.
    expect(pairs.some(p => p.memberId === "bayu")).toBe(false);
  });
});

describe("rankCandidates: waktu, keyakinan, dan ketidakpastian", () => {
  const TODAY = "2026-09-29";
  const withMember = (id: string, patch: Partial<Member>) => MEMBERS.map(m => m.id === id ? { ...m, ...patch } : m);
  const find = (list: ReturnType<typeof rankCandidates>, id: string) => list.candidates.find(c => c.member.id === id);

  it("satu hari cuti sebelum tenggat tidak menyingkirkan, tapi mengurangi jam kosong dan diberi peringatan", () => {
    const base = find(rankCandidates(authCorrected, MEMBERS, TASKS, DEFAULT_SETTINGS, {}, TODAY), "dimas")!;
    const leave = find(rankCandidates(authCorrected, withMember("dimas", { leaveDates: ["2026-09-30"] }), TASKS, DEFAULT_SETTINGS, {}, TODAY), "dimas")!;
    expect(leave).toBeDefined();
    expect(leave.free).toBeLessThan(base.free);
    expect(leave.cautions.join(" ")).toMatch(/cuti/);
  });

  it("cuti di semua hari kerja sampai tenggat menyingkirkan karyawan", () => {
    const res = rankCandidates(authCorrected, withMember("bima", { leaveDates: ["2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02"] }), TASKS, DEFAULT_SETTINGS, {}, TODAY);
    expect(res.filtered.find(f => f.member.id === "bima")?.failures.join(" ")).toMatch(/hari kerja/);
  });

  it("cuti yang sudah lewat tidak berpengaruh", () => {
    const base = find(rankCandidates(authCorrected, MEMBERS, TASKS, DEFAULT_SETTINGS, {}, TODAY), "bima")!;
    const past = find(rankCandidates(authCorrected, withMember("bima", { leaveDates: ["2026-09-20"] }), TASKS, DEFAULT_SETTINGS, {}, TODAY), "bima")!;
    expect(past.score).toBe(base.score);
  });

  it("level dari klaim bernilai lebih rendah daripada yang terverifikasi, dan diberi peringatan", () => {
    const bima = MEMBERS.find(m => m.id === "bima")!;
    const claimed = withMember("bima", { competencies: bima.competencies.map(c => ({ ...c, source: "klaim" as const })) });
    const verified = find(rankCandidates(authCorrected, MEMBERS, TASKS, DEFAULT_SETTINGS, {}, TODAY), "bima")!;
    const claim = find(rankCandidates(authCorrected, claimed, TASKS, DEFAULT_SETTINGS, {}, TODAY), "bima")!;
    expect(claim.factors.k).toBeLessThan(verified.factors.k);
    expect(claim.cautions.join(" ")).toMatch(/klaim/);
  });

  it("K dirata-rata berbobot keyakinan p tiap kebutuhan", () => {
    const tester: Member = { id: "uji", name: "Uji Coba", initials: "UC", role: "Pengembang", email: "uji@contoh.id", availableHours: 32, leaveDates: [], weeklyLimit: 40,
      competencies: [{ id: "a", level: 3, source: "verifikasi" }, { id: "b", level: 1, source: "verifikasi" }], prefers: [], avoids: [], access: "anggota" };
    const job: Task = { ...authCorrected, id: "UJI", dna: { ...authCorrected.dna!, complexity: 1, dependencies: [], requirements: [
      { competencyId: "a", level: 2, p: 0.9, quote: "" }, { competencyId: "b", level: 2, p: 0.5, quote: "" }] } };
    const k = rankCandidates(job, [tester], [], DEFAULT_SETTINGS, {}, TODAY).candidates[0].factors.k;
    expect(k).toBeCloseTo((0.9 * 1 + 0.5 * 0.5) / 1.4, 4);
  });

  it("kompleksitas ≥ 2 di preset Seimbang menaikkan bobot kompetensi tanpa mengubah total bobot", () => {
    const w = effectiveWeights("seimbang", 2);
    expect(w.k).toBeGreaterThan(PRESETS.seimbang.weights.k);
    expect(w.k + w.c + w.a + w.r).toBeCloseTo(0.9);
    expect(effectiveWeights("tenggat", 3)).toEqual(PRESETS.tenggat.weights);
  });

  it("A memakai jam kosong sampai tenggat, bukan sisa kapasitas sepanjang periode", () => {
    const ayu = rankCandidates(authCorrected, MEMBERS, TASKS, DEFAULT_SETTINGS, {}, TODAY).candidates.find(c => c.member.id === "ayu")!;
    expect(ayu.free).toBeCloseTo(25.6 - 19);
    expect(ayu.factors.a).toBeCloseTo((25.6 - 19) / 8);
  });

  it("beban tidak dihitung ganda: F hanya memuat risiko tenggat berdekatan", () => {
    const ayu = rankCandidates(authCorrected, MEMBERS, TASKS, DEFAULT_SETTINGS, {}, TODAY).candidates.find(c => c.member.id === "ayu")!;
    expect(ayu.factors.c).toBe(0);
    expect(ayu.factors.f).toBe(0.5);
  });

  it("memperingatkan bila estimasi molor seperti biasanya akan membuat beban lewat kapasitas", () => {
    const dimas = rankCandidates(authCorrected, MEMBERS, TASKS, DEFAULT_SETTINGS, {}, TODAY).candidates.find(c => c.member.id === "dimas")!;
    expect(dimas.utilAfter).toBeLessThan(1);
    expect(dimas.utilAfterHigh).toBeGreaterThanOrEqual(1);
    expect(dimas.cautions.join(" ")).toMatch(/molor/);
  });

  it("menandai kandidat yang skornya praktis setara dengan kandidat di atasnya", () => {
    const bima = MEMBERS.find(m => m.id === "bima")!;
    const twin = { ...bima, id: "bima-2", name: "Bima Kembar" };
    const res = rankCandidates(authCorrected, [bima, twin], TASKS, DEFAULT_SETTINGS, {}, TODAY);
    expect(res.candidates[1].tiedWithPrev).toBe(true);
    expect(res.candidates[0].tiedWithPrev).toBe(false);
  });
});

