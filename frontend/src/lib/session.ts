import { useMemo, useSyncExternalStore } from "react";

// Masuk statis: akun tetap di kode, sesi hanya email yang disimpan di browser (tanpa sandi).
// "Ingat saya" memakai localStorage; tanpa itu sesi hilang saat tab ditutup (sessionStorage).

type Role = "manajer" | "karyawan";

export interface Account {
  email: string;
  name: string;
  title: string;
  initials: string;
  role: Role;
  /** Rute awal setelah masuk. */
  home: "/dashboard" | "/saya";
  /** Karyawan di data tim (khusus peran karyawan). */
  memberId?: string;
}

const ACCOUNTS: (Account & { password: string })[] = [
  { email: "krisna@pantara.id", password: "pantara2026", name: "Krisna Panca", title: "Manajer tim", initials: "KP", role: "manajer", home: "/dashboard" },
  { email: "bima@pantara.id", password: "pantara2026", name: "Bima Pradana", title: "Pengembang backend", initials: "BP", role: "karyawan", home: "/saya", memberId: "bima" },
];

const KEY = "pantara-session";
const EVENT = "pantara-session";

function toAccount(email: string | null): Account | null {
  const found = email ? ACCOUNTS.find(a => a.email === email) : undefined;
  if (!found) return null;
  const { email: e, name, title, initials, role, home, memberId } = found;
  return { email: e, name, title, initials, role, home, ...(memberId && { memberId }) };
}

/** Cocokkan email (tanpa beda huruf besar) dan sandi ke akun yang terdaftar. */
export function authenticate(email: string, password: string): Account | null {
  const found = ACCOUNTS.find(a => a.email === email.trim().toLowerCase() && a.password === password);
  return found ? toAccount(found.email) : null;
}

function readEmail(): string | null {
  try { return localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY); } catch { return null; }
}

export function saveSession(email: string, remember: boolean) {
  try {
    clearStorage();
    (remember ? localStorage : sessionStorage).setItem(KEY, email);
  } catch { /* penyimpanan diblokir: sesi tidak bisa dibuat */ }
  dispatchEvent(new Event(EVENT));
}

function clearStorage() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
}

export function clearSession() {
  try { clearStorage(); } catch { /* abaikan */ }
  dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  addEventListener(EVENT, onChange);
  addEventListener("storage", onChange);
  return () => { removeEventListener(EVENT, onChange); removeEventListener("storage", onChange); };
}

/** Akun yang sedang masuk: `undefined` selama render server/hidrasi, `null` bila belum masuk. */
export function useSession(): Account | null | undefined {
  const email = useSyncExternalStore(subscribe, readEmail, () => undefined);
  return useMemo(() => email === undefined ? undefined : toAccount(email), [email]);
}
