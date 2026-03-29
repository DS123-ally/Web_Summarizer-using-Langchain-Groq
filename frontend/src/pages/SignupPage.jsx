import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const data = await api.signup(email, username, password)
      setSuccess('✓ Account created successfully! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
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
        <h1 className="text-2xl font-semibold text-white">Sign up</h1>
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        {success && <p className="text-sm text-green-400 font-medium">{success}</p>}
        <button
          className="neon-btn w-full disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p className="text-sm text-slate-300">
          Already have an account?{' '}
          <Link className="font-medium text-blue-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  )
}
