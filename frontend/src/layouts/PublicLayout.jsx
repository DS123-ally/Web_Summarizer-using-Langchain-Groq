import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function PublicLayout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="orb absolute -left-10 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="orb absolute right-0 top-56 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="orb absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
