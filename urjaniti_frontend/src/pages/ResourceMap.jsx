import { useState } from 'react'
import IndiaMap from '../components/IndiaMap.jsx'
import ChartCard from '../components/ChartCard.jsx'
import { resourceLayers, stateResourceData } from '../data/mockData.js'

const LAYER_LABEL = {
  solar: 'Solar', wind: 'Wind', biomass: 'Biomass', hydro: 'Hydro',
  geothermal: 'Geothermal', tidal: 'Tidal / Wave', grid: 'Grid Infrastructure', demand: 'Demand',
}

export default function ResourceMap() {
  const [layer, setLayer] = useState('solar')
  const [selected, setSelected] = useState('Rajasthan')
  const s = stateResourceData[selected]

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <ChartCard
        title="India Renewable Resource Map"
        subtitle="Marker size and color reflect potential for the selected layer · Demo Data"
        className="xl:col-span-2"
        action={
          <select value={layer} onChange={(e) => setLayer(e.target.value)} className="input w-auto text-xs">
            {resourceLayers.map((l) => <option key={l} value={l}>{LAYER_LABEL[l]}</option>)}
          </select>
        }
      >
        <div className="h-[420px] w-full sm:h-[520px]">
          <IndiaMap states={stateResourceData} layer={layer} onStateClick={setSelected} selectedState={selected} />
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-ink-faint">
          <Legend color="#22C55E" label="High" />
          <Legend color="#F59E0B" label="Medium" />
          <Legend color="#5D7592" label="Low" />
        </div>
      </ChartCard>

      <ChartCard title={selected.replace(/_/g, ' ')} subtitle="Resource assessment & recommended mix">
        {s ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="Solar Potential" value={s.solar} />
              <Stat label="Wind Potential" value={s.wind} />
              <Stat label="Biomass Potential" value={s.biomass} />
              <Stat label="Grid Accessibility" value={s.gridAccess} />
              <Stat label="Estimated Demand" value={s.demand} />
              <Stat label="Suitability Score" value={`${s.score}/100`} strong />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Recommended Mix</p>
              <div className="space-y-2">
                {Object.entries(s.mix).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 text-sm">
                    <span className="w-16 shrink-0 capitalize text-ink-muted">{k}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-emerald" style={{ width: `${v}%` }} />
                    </div>
                    <span className="num-tabular w-9 text-right text-ink-faint">{v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink-faint">Select a state marker on the map.</p>
        )}
      </ChartCard>
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} /> {label}
    </span>
  )
}

function Stat({ label, value, strong }) {
  return (
    <div>
      <div className="text-ink-faint">{label}</div>
      <div className={strong ? 'num-tabular text-lg font-bold text-emerald' : 'font-medium text-ink'}>{value}</div>
    </div>
  )
}
