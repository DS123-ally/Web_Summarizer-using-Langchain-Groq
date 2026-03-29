const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

async function request(path, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (res.status === 401) {
    localStorage.removeItem('token')
  }
  if (!res.ok) throw new Error(data.detail || 'Request failed')
  return data
}

export const api = {
  signup: (email, username, password) =>
    request('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
    }),
  login: (email, password) =>
    request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  summarize: (payload) =>
    request('/summarize', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  chat: (payload) =>
    request('/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  chatHistory: () => request('/chat/history'),
}
