// Centralized mock data. All demo values live here so components never hardcode numbers.

export const overviewKPIs = {
  totalCapacityGW: 288.58,
  solarGW: 162.15,
  windGW: 57.44,
  biomassGW: 11.62,
  hydroGW: 46.9,
  utilizationPct: 94.2,
  gridStabilityPct: 98.7,
  surplusGWh: 12.4,
}

export const energySources = [
  { id: 'solar', label: 'Solar', color: '#F59E0B', capacity: 162.15, current: 118.4, efficiency: 92, availability: 96, forecastNote: 'Peak output expected 11:00–15:00' },
  { id: 'wind', label: 'Wind', color: '#22D3EE', capacity: 57.44, current: 34.1, efficiency: 78, availability: 81, forecastNote: 'Moderate gusts through the evening' },
  { id: 'biomass', label: 'Biomass', color: '#84CC16', capacity: 11.62, current: 8.9, efficiency: 88, availability: 99, forecastNote: 'Stable baseload, minimal variance' },
  { id: 'hydro', label: 'Hydro', color: '#38BDF8', capacity: 46.9, current: 29.3, efficiency: 90, availability: 94, forecastNote: 'Reservoir levels nominal' },
]

export const stateResourceData = {
  Rajasthan: { solar: 'HIGH', wind: 'MEDIUM', biomass: 'LOW', hydro: 'LOW', gridAccess: 'HIGH', demand: 'Medium', mix: { solar: 65, wind: 25, biomass: 10 }, score: 92, lat: 27.0, lng: 74.2 },
  Gujarat: { solar: 'HIGH', wind: 'HIGH', biomass: 'MEDIUM', hydro: 'LOW', gridAccess: 'HIGH', demand: 'High', mix: { solar: 50, wind: 40, biomass: 10 }, score: 95, lat: 22.6, lng: 71.6 },
  Tamil_Nadu: { solar: 'MEDIUM', wind: 'HIGH', biomass: 'MEDIUM', hydro: 'MEDIUM', gridAccess: 'HIGH', demand: 'High', mix: { solar: 35, wind: 50, biomass: 15 }, score: 89, lat: 11.1, lng: 78.6 },
  Maharashtra: { solar: 'MEDIUM', wind: 'MEDIUM', biomass: 'MEDIUM', hydro: 'MEDIUM', gridAccess: 'HIGH', demand: 'High', mix: { solar: 45, wind: 35, biomass: 20 }, score: 86, lat: 19.5, lng: 75.7 },
  Karnataka: { solar: 'HIGH', wind: 'MEDIUM', biomass: 'MEDIUM', hydro: 'MEDIUM', gridAccess: 'MEDIUM', demand: 'Medium', mix: { solar: 55, wind: 30, biomass: 15 }, score: 87, lat: 15.3, lng: 75.7 },
  Madhya_Pradesh: { solar: 'HIGH', wind: 'LOW', biomass: 'HIGH', hydro: 'LOW', gridAccess: 'MEDIUM', demand: 'Medium', mix: { solar: 60, wind: 10, biomass: 30 }, score: 81, lat: 23.5, lng: 78.6 },
  Andhra_Pradesh: { solar: 'HIGH', wind: 'MEDIUM', biomass: 'LOW', hydro: 'LOW', gridAccess: 'MEDIUM', demand: 'Medium', mix: { solar: 60, wind: 30, biomass: 10 }, score: 85, lat: 15.9, lng: 79.7 },
  Punjab: { solar: 'MEDIUM', wind: 'LOW', biomass: 'HIGH', hydro: 'LOW', gridAccess: 'HIGH', demand: 'Medium', mix: { solar: 45, wind: 5, biomass: 50 }, score: 78, lat: 31.1, lng: 75.3 },
  West_Bengal: { solar: 'LOW', wind: 'LOW', biomass: 'MEDIUM', hydro: 'MEDIUM', gridAccess: 'MEDIUM', demand: 'High', mix: { solar: 30, wind: 10, biomass: 40 }, score: 68, lat: 22.9, lng: 87.8 },
  Uttar_Pradesh: { solar: 'MEDIUM', wind: 'LOW', biomass: 'HIGH', hydro: 'LOW', gridAccess: 'MEDIUM', demand: 'High', mix: { solar: 50, wind: 5, biomass: 45 }, score: 74, lat: 26.8, lng: 80.9 },
  Kerala: { solar: 'MEDIUM', wind: 'LOW', biomass: 'MEDIUM', hydro: 'HIGH', gridAccess: 'HIGH', demand: 'Medium', mix: { solar: 35, wind: 5, biomass: 20 }, score: 79, lat: 10.5, lng: 76.3 },
  Odisha: { solar: 'MEDIUM', wind: 'MEDIUM', biomass: 'MEDIUM', hydro: 'MEDIUM', gridAccess: 'LOW', demand: 'Medium', mix: { solar: 40, wind: 30, biomass: 30 }, score: 71, lat: 20.9, lng: 84.8 },
}

export const resourceLayers = ['solar', 'wind', 'biomass', 'hydro', 'geothermal', 'tidal', 'grid', 'demand']

export const planningSteps = ['Location', 'Resources', 'Constraints', 'AI Analysis', 'Recommendation']

export const analysisSequenceSteps = [
  'Collecting geospatial data',
  'Analyzing renewable potential',
  'Evaluating infrastructure',
  'Running optimization model',
  'Comparing energy mixes',
  'Generating recommendation',
]

export const recommendationResult = {
  mix: { solar: 55, wind: 25, biomass: 15, storage: 5 },
  suitability: 94,
  reliability: 91,
  gridAccessibility: 88,
  environmentalCompatibility: 93,
  economicFeasibility: 87,
}

export const explainability = {
  decision: 'Recommended Solar + Wind + Biomass mix',
  confidence: 92,
  reasons: {
    positive: [
      'High solar irradiance across the selected district',
      'Strong grid accessibility within 12 km of substation',
      'Agricultural biomass availability from nearby crop residue',
      'Moderate wind potential in shoulder seasons',
    ],
    negative: ['Seasonal rainfall variation affecting biomass supply chain'],
  },
  featureImpact: [
    { feature: 'Solar Irradiance', impact: 32 },
    { feature: 'Grid Proximity', impact: 21 },
    { feature: 'Wind Speed', impact: 17 },
    { feature: 'Biomass Availability', impact: 14 },
    { feature: 'Land Suitability', impact: 11 },
    { feature: 'Weather Variability', impact: -8 },
  ],
  decisionTrail: [
    { step: 'Geospatial ingestion', detail: 'Loaded 42 satellite and land-use layers for the district.' },
    { step: 'Resource scoring', detail: 'Solar irradiance scored 8.7/10, wind 6.1/10, biomass 7.3/10.' },
    { step: 'Constraint filtering', detail: 'Removed 3 candidate sites inside protected forest buffer.' },
    { step: 'Optimization', detail: 'Ran multi-objective optimizer balancing cost, reliability, land use.' },
    { step: 'Mix selection', detail: 'Solar-led hybrid mix returned the highest composite score.' },
  ],
}

export const gridScenarios = {
  normal: { frequency: 50.02, load: 72.4, renewableGen: 61.8, stability: 98.7, reserve: 14.2 },
  peak: { frequency: 49.94, load: 91.2, renewableGen: 58.6, stability: 92.1, reserve: 6.8 },
  low_renewable: { frequency: 49.88, load: 74.5, renewableGen: 31.2, stability: 84.6, reserve: 9.4 },
  stress: { frequency: 49.79, load: 96.8, renewableGen: 42.1, stability: 71.3, reserve: 3.2 },
  emergency: { frequency: 49.61, load: 99.4, renewableGen: 28.7, stability: 54.8, reserve: 1.1 },
}

export const frequencyHistory = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  hz: +(50 + Math.sin(i / 3) * 0.06 + (Math.random() - 0.5) * 0.02).toFixed(3),
}))

export const virtualInertia = {
  currentFrequency: 49.87,
  threshold: 49.9,
  restoredFrequency: 50.01,
  steps: [
    'AI detects instability',
    'Non-critical load identified',
    'EV charging reduced',
    'HVAC load reduced',
    'Grid frequency restored',
  ],
}

export const surplusData = {
  availableGWh: 12.4,
  allocation: { hydrogen: 40, storage: 30, p2p: 20, curtailmentAvoided: 10 },
  utilizedGWh: 11.2,
  curtailmentAvoidedGWh: 1.2,
  estimatedValueINR: '₹4.9 Cr',
  co2AvoidedTonnes: 5860,
}

export const hydrogenData = {
  renewableInputGWh: 4.8,
  electrolyzerUtilizationPct: 82,
  productionKgHr: 96,
  waterRequirementLHr: 864,
  co2AvoidedTonnesDay: 42,
}

export const p2pData = {
  activeProsumers: 1284,
  energyAvailableMWh: 8.7,
  energyDemandMWh: 6.2,
  avgPriceINR: 5.42,
  listings: [
    { type: 'seller', name: 'Solar Farm — Gujarat', volume: '2.4 MWh', price: 5.1 },
    { type: 'buyer', name: 'Industrial Cluster — Gujarat', volume: '1.8 MWh', price: 5.4 },
    { type: 'seller', name: 'Rooftop Cooperative — Pune', volume: '0.9 MWh', price: 5.25 },
    { type: 'buyer', name: 'Commercial Complex — Bengaluru', volume: '1.3 MWh', price: 5.5 },
    { type: 'seller', name: 'Wind Cluster — Tamil Nadu', volume: '3.1 MWh', price: 4.95 },
    { type: 'buyer', name: 'Data Center — Hyderabad', volume: '2.2 MWh', price: 5.6 },
  ],
}

export const disasterScenarios = {
  flood: {
    label: 'Flood', riskLevel: 'HIGH', region: 'Coastal Andhra Pradesh',
    assets: ['Solar Farms', 'Substation 7', 'Transmission Line 4'],
    stabilityBefore: 79, stabilityAfter: 95,
  },
  cyclone: {
    label: 'Cyclone', riskLevel: 'HIGH', region: 'Coastal Gujarat',
    assets: ['Solar Farms', 'Wind Farms', 'Transmission Line 12'],
    stabilityBefore: 82, stabilityAfter: 96,
  },
  extreme_heat: {
    label: 'Extreme Heat', riskLevel: 'MEDIUM', region: 'Vidarbha, Maharashtra',
    assets: ['Substation 3', 'Distribution Feeder 9'],
    stabilityBefore: 88, stabilityAfter: 97,
  },
  transmission_failure: {
    label: 'Transmission Failure', riskLevel: 'HIGH', region: 'Northern Grid Corridor',
    assets: ['Transmission Line 2', 'Transmission Line 6'],
    stabilityBefore: 75, stabilityAfter: 93,
  },
}

export const disasterResponseSteps = [
  'Detect risk',
  'Assess vulnerable assets',
  'Isolate affected section',
  'Protect critical loads',
  'Switch available generation',
  'Restore stable operation',
]

export const analyticsSeries = {
  generation: Array.from({ length: 24 }, (_, i) => ({ t: `${i}:00`, solar: Math.max(0, Math.sin((i - 6) / 12 * Math.PI) * 120), wind: 30 + Math.sin(i / 4) * 20, demand: 90 + Math.sin((i - 3) / 12 * Math.PI) * 40 })),
  co2: Array.from({ length: 12 }, (_, i) => ({ month: new Date(2026, i, 1).toLocaleString('en', { month: 'short' }), tonnes: 4200 + i * 180 + Math.random() * 300 })),
  mix: [
    { name: 'Solar', value: 56, color: '#F59E0B' },
    { name: 'Wind', value: 20, color: '#22D3EE' },
    { name: 'Hydro', value: 16, color: '#38BDF8' },
    { name: 'Biomass', value: 8, color: '#84CC16' },
  ],
}

export const reportTemplate = {
  location: 'Jaisalmer, Rajasthan',
  resourceAssessment: 'High solar irradiance, medium wind, low biomass availability',
  recommendedMix: { solar: 65, wind: 25, biomass: 10 },
  aiConfidence: 92,
  gridRisk: 'Low',
  surplusStrategy: 'Route 40% to hydrogen, 30% to storage, remainder to P2P market',
  hydrogenPotential: '96 kg/h at 82% electrolyzer utilization',
  resilienceScore: 91,
}

export const demoScenarios = [
  { id: 'peak', label: 'Simulate Peak Demand' },
  { id: 'renewable_drop', label: 'Simulate Renewable Drop' },
  { id: 'surplus', label: 'Simulate Surplus' },
  { id: 'cyclone', label: 'Simulate Cyclone' },
  { id: 'ai_recommendation', label: 'Run AI Recommendation' },
]
