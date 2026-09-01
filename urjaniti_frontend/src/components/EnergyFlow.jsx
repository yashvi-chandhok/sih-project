import { useState } from 'react'
import { motion } from 'framer-motion'

// Node layout in a 0-800 x 0-360 coordinate space.
const SOURCES = [
  { id: 'solar', label: 'Solar', x: 60, y: 60, color: '#F59E0B' },
  { id: 'wind', label: 'Wind', x: 60, y: 160, color: '#22D3EE' },
  { id: 'biomass', label: 'Biomass', x: 60, y: 260, color: '#84CC16' },
]
const HUB = { id: 'grid', label: 'Grid', x: 340, y: 160 }
const OUTPUTS = [
  { id: 'demand', label: 'Demand', x: 620, y: 60, color: '#F4F8FB' },
  { id: 'storage', label: 'Storage', x: 620, y: 140, color: '#38BDF8' },
  { id: 'hydrogen', label: 'Green H\u2082', x: 620, y: 220, color: '#22C55E' },
  { id: 'p2p', label: 'P2P Market', x: 620, y: 300, color: '#A78BFA' },
]

function FlowPath({ d, color, active }) {
  return (
    <g>
      <path d={d} stroke={color} strokeOpacity={0.18} strokeWidth={2} fill="none" />
      {active && (
        <path
          d={d}
          stroke={color}
          strokeWidth={2}
          fill="none"
          strokeDasharray="6 10"
          className="animate-dash"
        />
      )}
    </g>
  )
}

export default function EnergyFlow({ sources, onSelect, selected }) {
  const [hoverOut, setHoverOut] = useState(null)

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 700 340" className="w-full min-w-[560px]" role="img" aria-label="Live energy flow from sources through the grid to demand, storage, hydrogen and P2P market">
        {SOURCES.map((s) => (
          <FlowPath key={s.id} d={`M ${s.x + 46} ${s.y} C ${(s.x + HUB.x) / 2} ${s.y}, ${(s.x + HUB.x) / 2} ${HUB.y}, ${HUB.x - 40} ${HUB.y}`} color={s.color} active />
        ))}
        {OUTPUTS.map((o) => (
          <FlowPath key={o.id} d={`M ${HUB.x + 40} ${HUB.y} C ${(HUB.x + o.x) / 2} ${HUB.y}, ${(HUB.x + o.x) / 2} ${o.y}, ${o.x - 46} ${o.y}`} color={o.color} active={hoverOut === null || hoverOut === o.id} />
        ))}

        {SOURCES.map((s) => {
          const meta = sources.find((m) => m.id === s.id)
          const isSelected = selected === s.id
          return (
            <g key={s.id} transform={`translate(${s.x},${s.y})`} className="cursor-pointer" onClick={() => onSelect(s.id)}>
              <circle r={30} fill="#0D1B2A" stroke={s.color} strokeWidth={isSelected ? 3 : 1.5} opacity={isSelected ? 1 : 0.85} />
              <circle r={4} fill={s.color} className="animate-pulseSoft" />
              <text textAnchor="middle" y={48} fontSize="12" fontWeight="600" fill="#F4F8FB">{s.label}</text>
              <text textAnchor="middle" y={62} fontSize="10" fill="#8CA3BE">{meta ? `${meta.current.toFixed(1)} GW` : ''}</text>
            </g>
          )
        })}

        <g transform={`translate(${HUB.x},${HUB.y})`}>
          <circle r={40} fill="#10243A" stroke="#22C55E" strokeWidth={2} />
          <text textAnchor="middle" y={-2} fontSize="13" fontWeight="700" fill="#F4F8FB">GRID</text>
          <text textAnchor="middle" y={16} fontSize="10" fill="#22C55E">98.7% stable</text>
        </g>

        {OUTPUTS.map((o) => (
          <g
            key={o.id}
            transform={`translate(${o.x},${o.y})`}
            className="cursor-pointer"
            onMouseEnter={() => setHoverOut(o.id)}
            onMouseLeave={() => setHoverOut(null)}
          >
            <circle r={26} fill="#0D1B2A" stroke={o.color} strokeWidth={1.5} opacity={hoverOut === null || hoverOut === o.id ? 1 : 0.4} />
            <text textAnchor="middle" y={42} fontSize="11" fontWeight="600" fill="#F4F8FB" opacity={hoverOut === null || hoverOut === o.id ? 1 : 0.4}>{o.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
