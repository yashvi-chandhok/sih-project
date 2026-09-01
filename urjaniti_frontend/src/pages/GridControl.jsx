import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { AlertTriangle, ArrowDown, Zap } from 'lucide-react'
import ChartCard from '../components/ChartCard.jsx'
import MetricCard from '../components/MetricCard.jsx'
import ScenarioSelector from '../components/ScenarioSelector.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { getGridStatus, runGridSimulation } from '../services/api.js'
import { frequencyHistory, virtualInertia } from '../data/mockData.js'

const SCENARIOS = [
  { id: 'normal', label: 'Normal Operation' },
  { id: 'peak', label: 'Peak Demand' },
  { id: 'low_renewable', label: 'Low Renewable Generation' },
  { id: 'stress', label: 'Grid Stress' },
  { id: 'emergency', label: 'Emergency Simulation' },
]

export default function GridControl() {
  const [scenario, setScenario] = useState('normal')
  const [status, setStatus] = useState(null)
  const [simRunning, setSimRunning] = useState(false)
  const [simResult, setSimResult] = useState(null)

  useEffect(() => { getGridStatus(scenario).then(setStatus) }, [scenario])

  async function runInertiaSim() {
    setSimRunning(true)
    setSimResult(null)
    const res = await runGridSimulation(scenario)
    setSimResult(res)
    setSimRunning(false)
  }

  if (!status) return null
  const unstable = status.frequency < virtualInertia.threshold

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-cyan/30 bg-cyan-soft px-4 py-2.5 text-sm text-cyan">
        SIMULATION MODE — values below are generated locally and do not reflect a live SCADA connection.
      </div>

      <ChartCard title="Scenario" subtitle="Select an operating condition to update all metrics">
        <ScenarioSelector options={SCENARIOS} value={scenario} onChange={setScenario} />
      </ChartCard>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <MetricCard label="Grid Frequency" value={status.frequency} decimals={2} unit="Hz" accent={unstable ? 'danger' : 'emerald'} />
        <MetricCard label="Load" value={status.load} unit="GW" accent="cyan" />
        <MetricCard label="Renewable Generation" value={status.renewableGen} unit="GW" accent="emerald" />
        <MetricCard label="Grid Stability" value={status.stability} unit="%" accent={status.stability > 90 ? 'emerald' : status.stability > 75 ? 'amber' : 'danger'} />
        <MetricCard label="Reserve" value={status.reserve} unit="GW" accent="cyan" />
      </div>

      <ChartCard title="Frequency Trend" subtitle="Rolling window · Simulation">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={frequencyHistory}>
              <defs>
                <linearGradient id="freqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,178,209,0.08)" vertical={false} />
              <XAxis dataKey="t" hide />
              <YAxis domain={[49.8, 50.2]} tick={{ fill: '#5D7592', fontSize: 11 }} width={40} />
              <Tooltip contentStyle={{ background: '#10243A', border: '1px solid rgba(148,178,209,0.2)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="hz" stroke="#22D3EE" fill="url(#freqGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Virtual Inertia Simulation" subtitle="AI-triggered load response when frequency approaches threshold">
        <div className="mb-5 flex flex-wrap items-center gap-6">
          <div>
            <div className="text-xs text-ink-faint">Current Frequency</div>
            <div className={`num-tabular font-display text-2xl font-bold ${unstable ? 'text-danger' : 'text-ink'}`}>{status.frequency.toFixed(2)} Hz</div>
          </div>
          <div>
            <div className="text-xs text-ink-faint">Threshold</div>
            <div className="num-tabular font-display text-2xl font-bold text-ink-muted">{virtualInertia.threshold} Hz</div>
          </div>
          {unstable && <StatusBadge kind="danger" label="Instability Detected" />}
        </div>

        {unstable && !simResult && (
          <button onClick={runInertiaSim} disabled={simRunning} className="btn-primary inline-flex items-center gap-2">
            <Zap size={15} /> {simRunning ? 'Running response…' : 'Run AI Stabilization Response'}
          </button>
        )}

        {simRunning && (
          <div className="mt-5 space-y-2.5">
            {virtualInertia.steps.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.35 }}
                className="flex items-center gap-2 text-sm text-ink-muted"
              >
                <ArrowDown size={13} className="text-cyan" /> {s}
              </motion.div>
            ))}
          </div>
        )}

        {simResult && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <ScoreBox label="Before" value={`${simResult.before.toFixed(2)} Hz`} tone="danger" />
            <ScoreBox label="After (Simulated)" value={`${simResult.after.toFixed(2)} Hz`} tone="emerald" />
            <div className="col-span-2 flex items-center gap-2 rounded-lg border border-emerald/30 bg-emerald-soft px-3 py-2 text-xs text-emerald sm:col-span-1">
              <AlertTriangle size={13} /> Simulation result — not a live grid command.
            </div>
          </div>
        )}

        {!unstable && !simResult && (
          <p className="text-sm text-ink-faint">Frequency is within nominal range. Switch to a stress scenario above to trigger the response.</p>
        )}
      </ChartCard>
    </div>
  )
}

function ScoreBox({ label, value, tone }) {
  const color = tone === 'danger' ? 'text-danger' : 'text-emerald'
  return (
    <div className="card p-4 text-center">
      <div className="text-xs text-ink-faint">{label}</div>
      <div className={`num-tabular font-display text-xl font-bold ${color}`}>{value}</div>
    </div>
  )
}
