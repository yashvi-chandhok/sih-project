import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutGrid, Compass, Map, PieChart, Radio, Zap, FlaskConical, ArrowLeftRight,
  ShieldAlert, BrainCircuit, LineChart, FileText, Settings, ChevronsLeft, Leaf,
} from 'lucide-react'

const NAV = [
  { to: '/app', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/app/planning', label: 'Planning Engine', icon: Compass },
  { to: '/app/map', label: 'Resource Map', icon: Map },
  { to: '/app/mix', label: 'Energy Mix', icon: PieChart },
  { to: '/app/grid', label: 'Grid Control', icon: Radio },
  { to: '/app/surplus', label: 'Surplus Energy', icon: Zap },
  { to: '/app/hydrogen', label: 'Green Hydrogen', icon: FlaskConical },
  { to: '/app/trading', label: 'P2P Trading', icon: ArrowLeftRight },
  { to: '/app/resilience', label: 'Disaster Resilience', icon: ShieldAlert },
  { to: '/app/explainability', label: 'AI Explainability', icon: BrainCircuit },
  { to: '/app/analytics', label: 'Analytics', icon: LineChart },
  { to: '/app/reports', label: 'Reports', icon: FileText },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 248 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative hidden shrink-0 border-r border-base-line bg-base-surface md:flex md:flex-col"
    >
      <div className="flex h-16 items-center gap-2 border-b border-base-line px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-soft">
          <Leaf size={17} className="text-emerald" />
        </div>
        {!collapsed && <span className="font-display text-base font-bold tracking-tight text-ink">URJANITI</span>}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-emerald-soft text-emerald' : 'text-ink-muted hover:bg-white/5 hover:text-ink'
                  }`
                }
                title={collapsed ? label : undefined}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-emerald"
                      />
                    )}
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && <span className="truncate">{label}</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-base-line p-3">
        {!collapsed && (
          <div className="mb-2 rounded-lg bg-base-raised px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-cyan">
              <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-cyan" />
              Simulation Mode
            </div>
            <div className="mt-1 text-[11px] text-ink-faint">Last updated: 10:42 AM</div>
          </div>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-ink-faint transition-colors hover:bg-white/5 hover:text-ink"
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronsLeft size={16} />
          </motion.span>
        </button>
      </div>
    </motion.aside>
  )
}
