import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import { getEnergyMix } from '../services/api.js'
import { recommendationResult } from '../data/mockData.js'

const COLORS = { solar: '#F59E0B', wind: '#22D3EE', biomass: '#84CC16', storage: '#38BDF8' }

export default function EnergyMix() {
  const [mix, setMix] = useState(null)

  useEffect(() => { getEnergyMix().then(setMix) }, [])
  if (!mix) return null

  const chartData = Object.entries(mix).map(([name, value]) => ({ name, value, color: COLORS[name] }))

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ChartCard title="Recommended Energy Mix" subtitle="Output of the most recent AI site analysis">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
                {chartData.map((d) => <Cell key={d.name} fill={d.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#10243A', border: '1px solid rgba(148,178,209,0.2)', borderRadius: 8, fontSize: 12 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: '#8CA3BE' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Composite Scores" subtitle="How the mix performs across key criteria">
        <div className="space-y-4">
          {Object.entries({
            Suitability: recommendationResult.suitability,
            Reliability: recommendationResult.reliability,
            'Grid Accessibility': recommendationResult.gridAccessibility,
            'Environmental Compatibility': recommendationResult.environmentalCompatibility,
            'Economic Feasibility': recommendationResult.economicFeasibility,
          }).map(([label, v]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-sm"><span className="text-ink">{label}</span><span className="num-tabular text-ink-muted">{v}/100</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald to-cyan" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}
