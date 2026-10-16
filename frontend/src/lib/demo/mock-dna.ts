import type { EffortSize, Level, Priority, Requirement, TaskDna } from "./types";

// Simulasi Task DNA untuk mockup M0 (tanpa LLM): pencocokan kata kunci deterministik.
// MVP menggantinya dengan primitif AI di docs/03-ARCHITECTURE.md §5.

const KEYWORDS: Record<string, string[]> = {
  "backend-api": ["api", "endpoint", "backend", "server"],
  oauth2: ["oauth", "login", "autentikasi", "sso", "sesi"],
  "arsitektur-data": ["skema", "arsitektur", "model data", "migrasi"],
  sql: ["sql", "postgres", "query", "indeks", "database", "basis data"],
  "integrasi-api": ["integrasi", "webhook", "pihak ketiga", "whatsapp"],
  "technical-writing": ["dokumentasi", "panduan", "manual"],
  react: ["react", "frontend", "halaman", "komponen"],
  tailwind: ["tailwind", "css", "tampilan"],
  aksesibilitas: ["aksesibilitas", "wcag", "kontras", "pembaca layar"],
  uiux: ["desain", "ux", "alur pengguna", "wireframe", "onboarding"],
  "design-system": ["design system", "token"],
  qa: ["uji", "test", "qa", "bug"],
  e2e: ["end-to-end", "e2e", "skenario"],
  devops: ["deploy", "docker", "ci/cd", "pipeline"],
};

const sentences = (text: string) => text.split(/(?<=[.!?])\s+/).filter(Boolean);

export function mockDna(title: string, description: string, priority: Priority): TaskDna {
  const text = `${title}. ${description}`;
  const lower = text.toLowerCase();
  const requirements: Requirement[] = [];
  for (const [competencyId, words] of Object.entries(KEYWORDS)) {
    const hits = words.filter(w => lower.includes(w));
    if (!hits.length) continue;
    const quote = [...sentences(description), title].find(s => hits.some(h => s.toLowerCase().includes(h))) ?? title;
    const p = Math.min(0.97, 0.58 + 0.13 * hits.length);
    const level: Level = /aman|kompleks|migrasi|arsitektur|produksi/.test(lower) ? 2 : 1;
    requirements.push({ competencyId, level, p: Math.round(p * 100) / 100, quote: quote.replace(/[.!?]$/, "") });
  }
  requirements.sort((a, b) => b.p - a.p);
  const words = description.trim().split(/\s+/).length;
  const [effortSize, effortHours, effortP]: [EffortSize, number, number] =
    words < 25 ? ["S", 3, 0.72] : words < 60 ? ["M", 6, 0.64] : ["L", 12, 0.58];
  const complexity: Level = priority === "tinggi" ? 2 : 1;
  return {
    requirements: requirements.slice(0, 4), effortSize, effortHours, effortP, complexity, complexitySpread: 1,
    dependencies: [], model: "simulasi-ai (mockup)", prompt: "taskdna-v1", confirmed: false,
  };
}
