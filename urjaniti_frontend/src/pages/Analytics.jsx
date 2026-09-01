import { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import { getAnalytics } from '../services/api.js'

const RANGES = ['24H', '7D', '30D', '1Y']

export default function Analytics() {
  const [data, setData] = useState(null)
  const [range, setRange] = useState('24H')

  useEffect(() => { getAnalytics().then(setData) }, [])
  if (!data) return null

  return (
    <div className="space-y-6">
      <ChartCard title="Date Range" subtitle="Applies to generation and demand charts below">
        <div className="flex gap-2">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                range === r ? 'border-emerald/40 bg-emerald-soft text-emerald' : 'border-base-line text-ink-muted hover:text-ink'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </ChartCard>

      <ChartCard title="Generation vs Demand" subtitle={`Window: ${range} · Simulation`}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.generation}>
              <CartesianGrid stroke="rgba(148,178,209,0.08)" vertical={false} />
              <XAxis dataKey="t" tick={{ fill: '#5D7592', fontSize: 10 }} interval={3} />
              <YAxis tick={{ fill: '#5D7592', fontSize: 11 }} width={36} />
              <Tooltip contentStyle={{ background: '#10243A', border: '1px solid rgba(148,178,209,0.2)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#8CA3BE' }} />
              <Line type="monotone" dataKey="solar" stroke="#F59E0B" dot={false} strokeWidth={2} name="Solar" />
              <Line type="monotone" dataKey="wind" stroke="#22D3EE" dot={false} strokeWidth={2} name="Wind" />
              <Line type="monotone" dataKey="demand" stroke="#F4F8FB" dot={false} strokeWidth={2} strokeDasharray="4 3" name="Demand" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="CO₂ Avoidance" subtitle="Monthly cumulative">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.co2}>
                <CartesianGrid stroke="rgba(148,178,209,0.08)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#5D7592', fontSize: 11 }} />
                <YAxis tick={{ fill: '#5D7592', fontSize: 11 }} width={40} />
                <Tooltip contentStyle={{ background: '#10243A', border: '1px solid rgba(148,178,209,0.2)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="tonnes" fill="#22C55E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Resource Utilization" subtitle="Share of total generation">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.mix} dataKey="value" nameKey="name" outerRadius={90} paddingAngle={2}>
                  {data.mix.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#10243A', border: '1px solid rgba(148,178,209,0.2)', borderRadius: 8, fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: '#8CA3BE' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
