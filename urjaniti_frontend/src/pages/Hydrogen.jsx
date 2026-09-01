import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ChartCard from '../components/ChartCard.jsx'
import MetricCard from '../components/MetricCard.jsx'
import { getHydrogenData } from '../services/api.js'
import { Droplet, Gauge, FlaskConical, Leaf } from 'lucide-react'

const STAGES = ['Renewable Energy', 'Electrolyzer', 'H₂', 'Storage / Industrial Use']

export default function Hydrogen() {
  const [data, setData] = useState(null)
  useEffect(() => { getHydrogenData().then(setData) }, [])
  if (!data) return null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Renewable Input" value={data.renewableInputGWh} unit="GWh" icon={Gauge} accent="cyan" />
        <MetricCard label="Electrolyzer Utilization" value={data.electrolyzerUtilizationPct} unit="%" icon={FlaskConical} accent="emerald" />
        <MetricCard label="Hydrogen Production" value={data.productionKgHr} decimals={0} unit="kg/h" icon={Droplet} accent="emerald" />
        <MetricCard label="CO₂ Avoided" value={data.co2AvoidedTonnesDay} decimals={0} unit="t/day" icon={Leaf} accent="emerald" />
      </div>

      <ChartCard title="Electrolysis Flow" subtitle={`Water requirement: ${data.waterRequirementLHr} L/h · Simulation`}>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          {STAGES.map((stage, i) => (
            <div key={stage} className="flex flex-1 items-center gap-3">
              <div className="relative flex h-16 flex-1 items-center justify-center rounded-xl border border-emerald/25 bg-emerald-soft px-3 text-center text-xs font-semibold text-emerald sm:h-20">
                {stage}
                {i < STAGES.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 sm:block">
                    <FlowArrow />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Renewable surplus powers the electrolyzer, splitting water into hydrogen and oxygen. Hydrogen is compressed for storage or routed to nearby industrial offtake.
        </p>
      </ChartCard>
    </div>
  )
}

function FlowArrow() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16">
      <line x1="0" y1="8" x2="18" y2="8" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
      <polygon points="18,3 24,8 18,13" fill="#22C55E" />
    </svg>
  )
}
