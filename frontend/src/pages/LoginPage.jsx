import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await api.login(email, password)
      localStorage.setItem('token', data.access_token)
      navigate('/app')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-140px)] max-w-6xl place-items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="glow-card w-full max-w-md space-y-4 p-6"
      >
        <h1 className="text-2xl font-semibold text-white">Login</h1>

        <input
          className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          className="neon-btn w-full disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-slate-300">
          New user?{' '}
          <Link className="font-medium text-blue-600 hover:underline" to="/signup">
            Create account
          </Link>
        </p>
      </form>
    </main>
  )
}
