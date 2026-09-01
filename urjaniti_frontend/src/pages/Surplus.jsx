import { useEffect, useState } from 'react'
import ChartCard from '../components/ChartCard.jsx'
import MetricCard from '../components/MetricCard.jsx'
import { getSurplusAllocation } from '../services/api.js'
import { Zap, Leaf, TrendingUp, Gauge } from 'lucide-react'

const KEYS = [
  { id: 'hydrogen', label: 'Green Hydrogen', color: '#22C55E' },
  { id: 'storage', label: 'Storage', color: '#38BDF8' },
  { id: 'p2p', label: 'P2P Trading', color: '#A78BFA' },
  { id: 'curtailmentAvoided', label: 'Curtailment Avoided', color: '#F59E0B' },
]

export default function Surplus() {
  const [data, setData] = useState(null)
  const [alloc, setAlloc] = useState(null)

  useEffect(() => { getSurplusAllocation().then((d) => { setData(d); setAlloc(d.allocation) }) }, [])
  if (!data || !alloc) return null

  function updateAlloc(id, value) {
    const others = KEYS.filter((k) => k.id !== id)
    const remaining = 100 - value
    const currentOthersTotal = others.reduce((sum, k) => sum + alloc[k.id], 0) || 1
    const next = { ...alloc, [id]: value }
    others.forEach((k) => {
      next[k.id] = Math.round((alloc[k.id] / currentOthersTotal) * remaining)
    })
    setAlloc(next)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Available Surplus" value={data.availableGWh} unit="GWh" icon={Zap} accent="amber" />
        <MetricCard label="Energy Utilized" value={data.utilizedGWh} unit="GWh" icon={Gauge} accent="emerald" />
        <MetricCard label="Curtailment Avoided" value={data.curtailmentAvoidedGWh} unit="GWh" icon={TrendingUp} accent="cyan" />
        <MetricCard label="CO₂ Avoided" value={data.co2AvoidedTonnes} decimals={0} unit="t" icon={Leaf} accent="emerald" />
      </div>

      <ChartCard title="Interactive Allocation" subtitle="Drag to rebalance where surplus energy is routed — other categories adjust proportionally">
        <div className="space-y-5">
          {KEYS.map((k) => (
            <div key={k.id}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink"><span className="h-2 w-2 rounded-full" style={{ background: k.color }} />{k.label}</span>
                <span className="num-tabular font-semibold text-ink-muted">{alloc[k.id]}%</span>
              </div>
              <input
                type="range" min={0} max={100} value={alloc[k.id]}
                onChange={(e) => updateAlloc(k.id, +e.target.value)}
                className="w-full accent-emerald"
                aria-label={`${k.label} allocation percentage`}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full">
          {KEYS.map((k) => (
            <div key={k.id} style={{ width: `${alloc[k.id]}%`, background: k.color }} className="transition-all duration-300" />
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-base-line bg-base-raised/40 px-3 py-2.5 text-xs text-ink-faint">
          Estimated value at current allocation: <span className="font-semibold text-ink">{data.estimatedValueINR}</span>
        </div>
      </ChartCard>
    </div>
  )
}
