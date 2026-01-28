const rawBase = import.meta.env.VITE_API_BASE_URL ?? "";
export const API_BASE = rawBase.replace(/\/$/, "");

function resolveUrl(path: string) {
    if (/^https?:\/\//i.test(path)) return path;
    return API_BASE ? `${API_BASE}${path}` : path;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(resolveUrl(path), init);
    if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `Request failed: ${res.status}`);
    }
    return res.json() as Promise<T>;
}
