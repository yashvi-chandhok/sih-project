import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Sun, Wind, Sprout, Radio, ShieldCheck } from 'lucide-react'

const ROLES = [
  { id: 'planner', label: 'Energy Planner', desc: 'Site selection & resource mix planning', icon: Sun },
  { id: 'operator', label: 'Grid Operator', desc: 'Live simulation & stability monitoring', icon: Radio },
  { id: 'admin', label: 'Administrator', desc: 'Platform configuration & reporting', icon: ShieldCheck },
]

function NetworkBackground() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
      })),
    []
  )
  const links = useMemo(() => {
    const arr = []
    for (let i = 0; i < nodes.length; i++) {
      const j = (i + 1 + Math.floor(Math.random() * 3)) % nodes.length
      arr.push([nodes[i], nodes[j]])
    }
    return arr
  }, [nodes])

  return (
    <svg className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none" viewBox="0 0 100 100">
      {links.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#22C55E" strokeOpacity="0.12" strokeWidth="0.15" />
      ))}
      {nodes.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r="0.4" fill={n.id % 3 === 0 ? '#22D3EE' : '#22C55E'}>
          <animate attributeName="opacity" values="0.2;1;0.2" dur={`${3 + n.delay}s`} begin={`${n.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}

export default function Landing() {
  const [role, setRole] = useState('planner')
  const [stage, setStage] = useState('hero') // hero | login
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden bg-base">
      <div className="absolute inset-0 bg-grid-fade" />
      <NetworkBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {stage === 'hero' ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-2xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft">
                <Leaf className="text-emerald" size={20} />
              </div>
            </div>
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
              URJANITI
            </h1>
            <p className="mt-4 font-display text-lg font-medium text-ink sm:text-xl">
              Intelligence for a Resilient Renewable Future
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted sm:text-base">
              Plan smarter. Balance better. Utilize more. Recover faster.
            </p>

            <div className="mt-10 flex justify-center gap-3">
              {[Sun, Wind, Sprout].map((Icon, i) => (
                <span key={i} className="flex h-9 w-9 items-center justify-center rounded-full border border-base-line bg-base-surface/60">
                  <Icon size={16} className="text-ink-muted" />
                </span>
              ))}
            </div>

            <button
              onClick={() => setStage('login')}
              className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-emerald px-6 py-3.5 font-display text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
            >
              Enter Energy Command Center
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass w-full max-w-md rounded-2xl p-7 shadow-card"
          >
            <h2 className="font-display text-xl font-bold text-ink">Sign in to Urjaniti</h2>
            <p className="mt-1 text-sm text-ink-faint">Demo authentication — no real credentials required.</p>

            <div className="mt-6 space-y-3">
              <label className="block text-xs font-medium uppercase tracking-wide text-ink-faint">Select your role</label>
              {ROLES.map((r) => {
                const Icon = r.icon
                const active = role === r.id
                return (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      active ? 'border-emerald/40 bg-emerald-soft' : 'border-base-line bg-base-raised/40 hover:border-white/20'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-emerald' : 'text-ink-muted'} />
                    <div>
                      <div className={`text-sm font-semibold ${active ? 'text-emerald' : 'text-ink'}`}>{r.label}</div>
                      <div className="text-xs text-ink-faint">{r.desc}</div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 space-y-3">
              <input
                type="text"
                placeholder="Email or ID (any value)"
                className="w-full rounded-lg border border-base-line bg-base-raised/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-emerald"
              />
              <button
                onClick={() => navigate('/app')}
                className="w-full rounded-lg bg-emerald py-2.5 font-display text-sm font-semibold text-base transition-opacity hover:opacity-90"
              >
                Continue as {ROLES.find((r) => r.id === role).label}
              </button>
              <button onClick={() => setStage('hero')} className="w-full text-center text-xs text-ink-faint hover:text-ink-muted">
                ← Back
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
