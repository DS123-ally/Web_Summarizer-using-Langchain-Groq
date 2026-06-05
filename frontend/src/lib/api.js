import { auth } from './firebase'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000'

async function request(path, options = {}) {
  let token = null;
  if (auth.currentUser) {
    token = await auth.currentUser.getIdToken();
  }
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.detail || 'Request failed')
  return data
}

export const api = {
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
  uploadPdf: async (file, strategy, summaryLength) => {
    let token = null;
    if (auth.currentUser) {
      token = await auth.currentUser.getIdToken();
    }
    const formData = new FormData()
    formData.append('file', file)
    let url = `/upload-pdf?strategy=${strategy}&summary_length=${summaryLength}`
    const headers = {}
    if (token) headers.Authorization = `Bearer ${token}`
    
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      body: formData,
      headers
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.detail || 'Request failed')
    return data
  },
}
