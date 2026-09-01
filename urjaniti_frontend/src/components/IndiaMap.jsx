import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'

const LEVEL_SCORE = { HIGH: 3, MEDIUM: 2, LOW: 1 }
const LEVEL_COLOR = { HIGH: '#22C55E', MEDIUM: '#F59E0B', LOW: '#5D7592' }

/**
 * `states` is the mockData.stateResourceData object.
 * `layer` selects which resource drives marker size/color: solar | wind | biomass | hydro | grid | demand
 */
export default function IndiaMap({ states, layer = 'solar', onStateClick, selectedState }) {
  return (
    <MapContainer
      center={[22.9, 79.5]}
      zoom={4.4}
      minZoom={4}
      maxZoom={7}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_matter/{z}/{x}/{y}{r}.png"
      />
      {Object.entries(states).map(([name, s]) => {
        let colorKey, score
        if (layer === 'grid') {
          colorKey = s.gridAccess; score = LEVEL_SCORE[s.gridAccess]
        } else if (layer === 'demand') {
          colorKey = s.demand === 'High' ? 'HIGH' : s.demand === 'Medium' ? 'MEDIUM' : 'LOW'
          score = LEVEL_SCORE[colorKey]
        } else if (s[layer]) {
          colorKey = s[layer]; score = LEVEL_SCORE[s[layer]]
        } else {
          colorKey = 'LOW'; score = 1
        }
        const color = LEVEL_COLOR[colorKey] ?? '#5D7592'
        const radius = 6 + score * 4
        const isSelected = selectedState === name

        return (
          <CircleMarker
            key={name}
            center={[s.lat, s.lng]}
            radius={radius}
            pathOptions={{
              color: isSelected ? '#F4F8FB' : color,
              weight: isSelected ? 2.5 : 1,
              fillColor: color,
              fillOpacity: 0.55,
            }}
            eventHandlers={{ click: () => onStateClick?.(name) }}
          >
            <Tooltip direction="top" offset={[0, -radius]} opacity={1}>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                <strong>{name.replace(/_/g, ' ')}</strong><br />
                Solar: {s.solar} · Wind: {s.wind} · Biomass: {s.biomass}<br />
                Suitability: {s.score}/100
              </div>
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
