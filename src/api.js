const BASE =
  (import.meta.env.VITE_BACKEND_URL || "http://localhost:3000").replace(/\/+$/, "");

async function handle(r) {
  if (!r.ok) {
    const txt = await r.text().catch(() => "");
    throw new Error(txt || `HTTP ${r.status}`);
  }
  const ct = r.headers.get("content-type") || "";
  return ct.includes("application/json") ? r.json() : r.text();
}

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, { method: "GET" });
  return handle(res);
}

export async function apiJson(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handle(res);
}