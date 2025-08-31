const BASE = (import.meta.env.VITE_BACKEND_URL || "http://localhost:3000")
  .replace(/\/+$/, "");

async function handle(res) {
  try {
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `HTTP ${res.status}`);
    }
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json") ? res.json() : res.text();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
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

export async function apiDelete(path) {
  return apiJson("DELETE", path);
}