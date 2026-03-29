import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setEmail('')
    setUsername('')
    setPassword('')
    setError('')
    setSuccess('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (isLogin) {
        // Login
        const data = await api.login(email, password)
        localStorage.setItem('token', data.access_token)
        handleClose()
        navigate('/app')
      } else {
        // Signup
        const data = await api.signup(email, username, password)
        setSuccess('✓ Account created successfully! Please log in.')
        setTimeout(() => {
          setIsLogin(true)
          setUsername('')
          setEmail('')
          setPassword('')
        }, 2000)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glow-card w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
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
            {loading ? (
              isLogin ? 'Logging in...' : 'Creating account...'
            ) : (
              isLogin ? 'Login' : 'Create account'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-300">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
              setSuccess('')
            }}
            className="font-medium text-blue-600 hover:underline"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}