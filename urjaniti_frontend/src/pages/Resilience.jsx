import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ShieldAlert, PlayCircle } from 'lucide-react'
import ChartCard from '../components/ChartCard.jsx'
import ScenarioSelector from '../components/ScenarioSelector.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { runDisasterSimulation } from '../services/api.js'
import { disasterScenarios, disasterResponseSteps } from '../data/mockData.js'

const OPTIONS = Object.entries(disasterScenarios).map(([id, v]) => ({ id, label: v.label }))

export default function Resilience() {
  const [scenarioId, setScenarioId] = useState('cyclone')
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(null)
  const [completedSteps, setCompletedSteps] = useState(0)

  const scenario = disasterScenarios[scenarioId]

  async function run() {
    setRunning(true)
    setResult(null)
    setCompletedSteps(0)
    disasterResponseSteps.forEach((_, i) => {
      setTimeout(() => setCompletedSteps((c) => c + 1), (i + 1) * 320)
    })
    const res = await runDisasterSimulation(scenarioId)
    setResult(res)
    setRunning(false)
  }

  return (
    <div className="space-y-6">
      <ChartCard title="Scenario" subtitle="Select a disruption to simulate the platform's response">
        <ScenarioSelector options={OPTIONS} value={scenarioId} onChange={(id) => { setScenarioId(id); setResult(null) }} />
      </ChartCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title={`${scenario.label} Warning`} subtitle="Demo Data">
          <div className="space-y-3 text-sm">
            <Row label="Risk Level"><StatusBadge kind={scenario.riskLevel === 'HIGH' ? 'danger' : 'warning'} label={scenario.riskLevel} /></Row>
            <Row label="Affected Region"><span className="text-ink">{scenario.region}</span></Row>
            <div>
              <div className="mb-1.5 text-ink-faint">Threatened Assets</div>
              <div className="flex flex-wrap gap-2">
                {scenario.assets.map((a) => (
                  <span key={a} className="rounded-md border border-danger/30 bg-danger-soft px-2.5 py-1 text-xs text-danger">{a}</span>
                ))}
              </div>
            </div>
          </div>
          <button onClick={run} disabled={running} className="btn-primary mt-5 inline-flex items-center gap-2">
            <PlayCircle size={15} /> {running ? 'Responding…' : 'Run Resilience Simulation'}
          </button>
        </ChartCard>

        <ChartCard title="Urjaniti Response" subtitle="Automated sequence · Simulation">
          <div className="space-y-3">
            {disasterResponseSteps.map((step, i) => {
              const done = i < completedSteps
              const active = i === completedSteps && running
              return (
                <motion.div
                  key={step}
                  animate={{ opacity: done || active ? 1 : 0.4 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    done ? 'border-emerald bg-emerald-soft text-emerald' : active ? 'border-cyan text-cyan' : 'border-base-line text-ink-faint'
                  }`}>
                    {done ? <Check size={12} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={done ? 'text-ink' : 'text-ink-muted'}>{step}</span>
                </motion.div>
              )
            })}
          </div>

          {result && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="card p-4 text-center">
                <div className="text-xs text-ink-faint">Grid Stability — Before</div>
                <div className="num-tabular font-display text-2xl font-bold text-danger">{result.stabilityBefore}%</div>
              </div>
              <div className="card p-4 text-center">
                <div className="text-xs text-ink-faint">Grid Stability — After (Simulated)</div>
                <div className="num-tabular font-display text-2xl font-bold text-emerald">{result.stabilityAfter}%</div>
              </div>
              <div className="col-span-2 flex items-center gap-2 rounded-lg border border-cyan/30 bg-cyan-soft px-3 py-2 text-xs text-cyan">
                <ShieldAlert size={13} /> Simulation Result — decision support only, not a live control action.
              </div>
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-faint">{label}</span>
      {children}
    </div>
  )
}
