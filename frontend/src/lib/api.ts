/**
 * Client untuk komunikasi dengan Pantara Django REST API.
 * Menggunakan NEXT_PUBLIC_API_URL (default http://localhost:8000).
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${cleanEndpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    const status = res.status;

    if (!res.ok) {
      const errText = await res.text();
      return { data: null, error: errText || `HTTP ${status}`, status };
    }

    if (status === 204) {
      return { data: null, error: null, status };
    }

    const data = (await res.json()) as T;
    return { data, error: null, status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { data: null, error: message, status: 0 };
  }
}

// Endpoints helper
export const api = {
  health: () => apiFetch<{ status: string; service: string }>("/api/health/"),
  workspaces: () => apiFetch<Array<{ id: string; name: string }>>("/api/workspaces/"),
  teams: () => apiFetch<Array<{ id: string; name: string }>>("/api/teams/"),
  members: () => apiFetch<Array<{ id: string; name: string; role: string }>>("/api/members/"),
  projects: () => apiFetch<Array<{ id: string; name: string }>>("/api/projects/"),
  tasks: () => apiFetch<Array<{ id: string; title: string; status: string }>>("/api/tasks/"),
  adaptiveAnalyses: () => apiFetch("/api/adaptive-analyses/"),
};
