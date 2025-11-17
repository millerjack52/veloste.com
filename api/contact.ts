type ContactPayload = { name: string; email: string; message: string };

const BASE = import.meta.env.VITE_API_BASE_URL;

export async function submitContact(payload: ContactPayload) {
  if (!BASE) throw new Error('VITE_API_BASE_URL is not defined');

  const res = await fetch(`${String(BASE).replace(/\/+$/, '')}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return res.json(); // { ok: true }
}
