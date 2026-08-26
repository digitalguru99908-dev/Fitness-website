const raw = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
export const API_BASE = raw ? raw.replace(/\/+$/, "") : "";
