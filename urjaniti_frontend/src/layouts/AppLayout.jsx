import { useState } from 'react'
import { Outlet, useLocation, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Leaf } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'

const PAGE_META = {
  '/app': { title: 'Energy Command Center', subtitle: 'National renewable-energy intelligence overview' },
  '/app/planning': { title: 'Planning Engine', subtitle: 'Multi-source site planning workflow' },
  '/app/map': { title: 'Resource Map', subtitle: 'Renewable potential across India' },
  '/app/mix': { title: 'Energy Mix', subtitle: 'AI-recommended generation mix' },
  '/app/grid': { title: 'Grid Control', subtitle: 'Simulation environment' },
  '/app/surplus': { title: 'Surplus Energy', subtitle: 'Allocation and utilization' },
  '/app/hydrogen': { title: 'Green Hydrogen', subtitle: 'Electrolysis and production' },
  '/app/trading': { title: 'P2P Trading', subtitle: 'Peer-to-peer exchange simulation' },
  '/app/resilience': { title: 'Disaster Resilience', subtitle: 'Scenario response planning' },
  '/app/explainability': { title: 'AI Explainability', subtitle: 'Understand every recommendation' },
  '/app/analytics': { title: 'Analytics', subtitle: 'Historical performance' },
  '/app/reports': { title: 'Reports', subtitle: 'Energy intelligence reporting' },
  '/app/settings': { title: 'Settings', subtitle: 'Platform preferences' },
}

const NAV_MOBILE = [
  ['/app', 'Overview'], ['/app/planning', 'Planning Engine'], ['/app/map', 'Resource Map'],
  ['/app/mix', 'Energy Mix'], ['/app/grid', 'Grid Control'], ['/app/surplus', 'Surplus Energy'],
  ['/app/hydrogen', 'Green Hydrogen'], ['/app/trading', 'P2P Trading'], ['/app/resilience', 'Disaster Resilience'],
  ['/app/explainability', 'AI Explainability'], ['/app/analytics', 'Analytics'], ['/app/reports', 'Reports'],
  ['/app/settings', 'Settings'],
]

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const meta = PAGE_META[location.pathname] ?? { title: 'Urjaniti', subtitle: '' }

  return (
    <div className="flex h-screen bg-base bg-grid-fade">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40 flex md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ duration: 0.25 }}
              className="relative z-10 flex h-full w-72 flex-col bg-base-surface p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf size={18} className="text-emerald" />
                  <span className="font-display font-bold text-ink">URJANITI</span>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} className="text-ink-muted" /></button>
              </div>
              <nav className="space-y-1 overflow-y-auto">
                {NAV_MOBILE.map(([to, label]) => (
                  <NavLink
                    key={to} to={to} end={to === '/app'} onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `block rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-emerald-soft text-emerald' : 'text-ink-muted hover:bg-white/5'}`}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar title={meta.title} subtitle={meta.subtitle} onMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
