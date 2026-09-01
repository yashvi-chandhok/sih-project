import { useEffect, useState } from 'react'
import ChartCard from '../components/ChartCard.jsx'
import MetricCard from '../components/MetricCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { getTradingData } from '../services/api.js'
import { Users, Zap, TrendingUp, IndianRupee } from 'lucide-react'

export default function Trading() {
  const [data, setData] = useState(null)
  useEffect(() => { getTradingData().then(setData) }, [])
  if (!data) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg border border-cyan/30 bg-cyan-soft px-4 py-2.5 text-sm text-cyan">
        <span>P2P TRADING SIMULATION — no financial settlement or blockchain integration is active.</span>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Active Prosumers" value={data.activeProsumers} decimals={0} icon={Users} accent="cyan" />
        <MetricCard label="Energy Available" value={data.energyAvailableMWh} unit="MWh" icon={Zap} accent="emerald" />
        <MetricCard label="Energy Demand" value={data.energyDemandMWh} unit="MWh" icon={TrendingUp} accent="amber" />
        <MetricCard label="Average Price" value={data.avgPriceINR} decimals={2} unit="₹/kWh" icon={IndianRupee} accent="emerald" />
      </div>

      <ChartCard title="Marketplace" subtitle="Live-style listings · Simulation">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.listings.map((l, i) => (
            <div key={i} className="card flex items-center justify-between p-4">
              <div>
                <StatusBadge kind={l.type === 'seller' ? 'operational' : 'warning'} label={l.type === 'seller' ? 'SELLER' : 'BUYER'} pulse={false} />
                <div className="mt-2 text-sm font-semibold text-ink">{l.name}</div>
                <div className="text-xs text-ink-faint">{l.volume} · ₹{l.price.toFixed(2)}/kWh</div>
              </div>
              <button className={`btn-ghost ${l.type === 'seller' ? 'hover:border-emerald/50 hover:text-emerald' : 'hover:border-amber/50 hover:text-amber'}`}>
                {l.type === 'seller' ? 'Buy Energy' : 'Sell Energy'}
              </button>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}
