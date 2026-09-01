import { useState } from 'react'
import ChartCard from '../components/ChartCard.jsx'

export default function Settings() {
  const [demoMode, setDemoMode] = useState(true)
  const [units, setUnits] = useState('GW')

  return (
    <div className="max-w-xl space-y-6">
      <ChartCard title="Demo / Simulation Mode" subtitle="When enabled, Urjaniti uses realistic mock data and simulated events">
        <div className="flex items-center justify-between">
          <div className="text-sm text-ink">Demo mode is currently {demoMode ? 'on' : 'off'}.</div>
          <button
            onClick={() => setDemoMode((v) => !v)}
            aria-pressed={demoMode}
            aria-label="Toggle demo mode"
            className={`relative h-7 w-12 rounded-full transition-colors ${demoMode ? 'bg-emerald' : 'bg-white/10'}`}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${demoMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </ChartCard>

      <ChartCard title="Display Preferences">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-faint">Preferred capacity unit</span>
          <select value={units} onChange={(e) => setUnits(e.target.value)} className="input">
            <option>GW</option>
            <option>MW</option>
          </select>
        </label>
      </ChartCard>

      <ChartCard title="About Urjaniti" subtitle="Hackathon prototype">
        <p className="text-sm text-ink-muted">
          This build is a frontend prototype. It is not connected to live SCADA hardware or India's real power grid.
          All data shown is simulated or demo data unless otherwise stated.
        </p>
      </ChartCard>
    </div>
  )
}
