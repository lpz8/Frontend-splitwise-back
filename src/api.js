export const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error("Error GET " + path);
  return res.json();
}

export async function apiJson(method, path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Error ${method} ${path}: ${res.status} ${txt}`);
  }
  return res.json();
}