const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export async function fetchJson(path) {
  const res = await fetch(`${API_BASE_URL}${path}`)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status} ${res.statusText} - ${text}`)
  }
  return res.json()
}
