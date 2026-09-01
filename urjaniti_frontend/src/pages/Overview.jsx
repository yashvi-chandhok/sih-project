import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Wind, Sprout, Droplets, Gauge, Zap, PlayCircle } from 'lucide-react'
import MetricCard from '../components/MetricCard.jsx'
import ChartCard from '../components/ChartCard.jsx'
import EnergyFlow from '../components/EnergyFlow.jsx'
import EnergySourceCard from '../components/EnergySourceCard.jsx'
import Modal from '../components/Modal.jsx'
import { getEnergyOverview } from '../services/api.js'
import { demoScenarios } from '../data/mockData.js'

export default function Overview() {
  const [data, setData] = useState(null)
  const [selectedSource, setSelectedSource] = useState('solar')
  const [runningScenario, setRunningScenario] = useState(null)

  useEffect(() => {
    getEnergyOverview().then(setData)
  }, [])

  if (!data) {
    return <div className="flex h-64 items-center justify-center text-ink-faint">Loading command center…</div>
  }

  const source = data.sources.find((s) => s.id === selectedSource)

  return (
    <div className="space-y-6">
      {/* Story strip */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink-faint">
        {['PLAN', 'OPTIMIZE', 'BALANCE', 'UTILIZE', 'RESILIENCE', 'EXPLAIN'].map((s, i, arr) => (
          <span key={s} className="flex items-center gap-2">
            <span className="rounded-full border border-base-line px-2.5 py-1 text-ink-muted">{s}</span>
            {i < arr.length - 1 && <span className="text-ink-faint">→</span>}
          </span>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Total Capacity" value={data.kpis.totalCapacityGW} unit="GW" icon={Gauge} accent="emerald" delay={0} />
        <MetricCard label="Solar" value={data.kpis.solarGW} unit="GW" icon={Sun} accent="amber" delay={0.05} />
        <MetricCard label="Wind" value={data.kpis.windGW} unit="GW" icon={Wind} accent="cyan" delay={0.1} />
        <MetricCard label="Utilization" value={data.kpis.utilizationPct} unit="%" icon={Sprout} accent="emerald" delay={0.15} />
        <MetricCard label="Grid Stability" value={data.kpis.gridStabilityPct} unit="%" icon={Gauge} accent="cyan" delay={0.2} />
        <MetricCard label="Surplus Energy" value={data.kpis.surplusGWh} unit="GWh" icon={Zap} accent="amber" delay={0.25} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Energy flow - centerpiece */}
        <ChartCard
          title="Live Energy Flow"
          subtitle="Sources route through the grid to demand, storage, hydrogen and the P2P market · Simulation"
          className="xl:col-span-2"
        >
          <EnergyFlow sources={data.sources} selected={selectedSource} onSelect={setSelectedSource} />
        </ChartCard>

        {/* Selected source detail */}
        <ChartCard title="Source Detail" subtitle="Click a source in the flow diagram">
          <div className="space-y-3">
            {data.sources.map((s) => (
              <EnergySourceCard key={s.id} source={s} active={s.id === selectedSource} onClick={() => setSelectedSource(s.id)} />
            ))}
          </div>
          {source && (
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-base-line pt-4 text-sm">
              <div><div className="text-ink-faint">Efficiency</div><div className="num-tabular font-semibold text-ink">{source.efficiency}%</div></div>
              <div><div className="text-ink-faint">Availability</div><div className="num-tabular font-semibold text-ink">{source.availability}%</div></div>
              <div className="col-span-2"><div className="text-ink-faint">Forecast</div><div className="text-ink">{source.forecastNote}</div></div>
            </div>
          )}
        </ChartCard>
      </div>

      {/* Demo scenarios */}
      <ChartCard title="Demo Scenarios" subtitle="Trigger instantly for a live walkthrough · Simulation Mode">
        <div className="flex flex-wrap gap-3">
          {demoScenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setRunningScenario(s)}
              className="inline-flex items-center gap-2 rounded-lg border border-base-line bg-base-raised/50 px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-emerald/40 hover:text-emerald"
            >
              <PlayCircle size={15} />
              {s.label}
            </button>
          ))}
        </div>
      </ChartCard>

      <Modal open={!!runningScenario} onClose={() => setRunningScenario(null)} title={runningScenario?.label ?? ''}>
        <ScenarioResult scenario={runningScenario} />
      </Modal>
    </div>
  )
}

function ScenarioResult({ scenario }) {
  if (!scenario) return null
  const notes = {
    peak: 'Load rises to 91.2 GW. Reserve margin tightens to 6.8 GW. Grid stability holds at 92.1%.',
    renewable_drop: 'Renewable generation falls to 31.2 GW. AI shifts reserve dispatch to compensate.',
    surplus: 'Surplus climbs to 12.4 GWh. 40% is routed to green hydrogen, 30% to storage.',
    cyclone: 'Wind and solar assets in coastal Gujarat are isolated. Critical loads stay protected.',
    ai_recommendation: 'AI re-evaluates the current site and proposes a 55/25/15/5 solar-led mix.',
  }
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">{notes[scenario.id]}</p>
      <div className="rounded-lg border border-cyan/30 bg-cyan-soft px-3 py-2 text-xs text-cyan">
        This is a simulated event using demo data — no live grid hardware is connected.
      </div>
    </div>
  )
}
