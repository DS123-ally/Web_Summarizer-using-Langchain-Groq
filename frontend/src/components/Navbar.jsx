import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false)

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-blue-400' : 'text-slate-300 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold text-white">
          Website Summarizer
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/features" className={linkClass}>
            Features
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          {token ? (
            <>
              <NavLink to="/app" className={linkClass}>
                Dashboard
              </NavLink>
              <button
                onClick={logout}
                className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
            >
              Login
            </NavLink>
          )}
          <button
            onClick={toggleTheme}
            className="rounded-md border border-white/20 p-2 text-slate-200 hover:bg-white/10 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-white/20 px-2 py-1 text-sm text-slate-200 md:hidden"
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/features" className={linkClass} onClick={() => setOpen(false)}>
              Features
            </NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
              About
            </NavLink>
            {token && (
              <NavLink to="/app" className={linkClass} onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
            )}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-left text-xs text-slate-200"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
              Switch to {theme === 'dark' ? 'light' : 'dark'} theme
            </button>
            {token ? (
              <button
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="rounded-md bg-white/10 px-3 py-1.5 text-left text-sm text-white"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  )
}