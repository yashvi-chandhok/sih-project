import { useState } from 'react'
import { Search, Bell, Menu } from 'lucide-react'
import StatusBadge from '../components/StatusBadge.jsx'

export default function Navbar({ title, subtitle, onMobileMenu }) {
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-base-line bg-base/80 px-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onMobileMenu} className="rounded-lg p-2 text-ink-muted hover:bg-white/5 md:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-display text-base font-semibold text-ink">{title}</h1>
          {subtitle && <p className="truncate text-xs text-ink-faint">{subtitle}</p>}
        </div>
      </div>

      <div className="hidden flex-1 max-w-sm items-center gap-2 rounded-lg border border-base-line bg-base-raised/50 px-3 py-2 lg:flex">
        <Search size={15} className="text-ink-faint" />
        <input
          type="text"
          placeholder="Search sites, states, reports..."
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          aria-label="Search"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <StatusBadge kind="operational" label="All Systems Operational" />
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-lg p-2 text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-11 z-20 w-64 rounded-xl border border-base-line bg-base-surface p-3 shadow-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Recent</p>
              <div className="space-y-2 text-sm text-ink-muted">
                <p>Surplus threshold reached in Gujarat cluster.</p>
                <p>AI recommendation generated for Jaisalmer site.</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-cyan text-xs font-bold text-base">
          EP
        </div>
      </div>
    </header>
  )
}
