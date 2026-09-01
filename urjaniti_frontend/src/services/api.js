import * as mock from '../data/mockData.js'

const API_URL = "http://127.0.0.1:8000/api"

const wait = (ms) => new Promise((res) => setTimeout(res, ms))


// =====================================================
// DASHBOARD
// =====================================================

export async function getEnergyOverview() {
  try {
    const response = await fetch(`${API_URL}/dashboard/`)
    const data = await response.json()

    return {
      kpis: {
        renewableShare: data.renewable_share,
        solarGeneration: data.solar_generation,
        windGeneration: data.wind_generation,
        totalGeneration: data.total_generation,
        demand: data.demand,
        surplus: data.surplus
      },
      sources: mock.energySources
    }
  } catch (error) {
    console.error("Dashboard API error:", error)

    return {
      kpis: mock.overviewKPIs,
      sources: mock.energySources
    }
  }
}


// =====================================================
// RESOURCE POTENTIAL
// Keep mock for now
// =====================================================

export async function getResourcePotential(stateKey) {
  await wait(150)
  return mock.stateResourceData[stateKey] ?? null
}


export async function getAllStates() {
  await wait(100)
  return mock.stateResourceData
}


// =====================================================
// SITE ANALYSIS
// Connect to Django prediction API
// =====================================================

export async function runSiteAnalysis(params) {

  try {

    const response = await fetch(`${API_URL}/prediction/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })

    const data = await response.json()

    return {
      ...mock.recommendationResult,
      prediction: data.prediction,
      model: data.model,
      params
    }

  } catch (error) {

    console.error("Prediction API error:", error)

    return {
      ...mock.recommendationResult,
      params
    }
  }
}


// =====================================================
// ENERGY MIX
// Connect to Django
// =====================================================

export async function getEnergyMix(data = {}) {

  try {

    const response = await fetch(`${API_URL}/energy-mix/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    return await response.json()

  } catch (error) {

    console.error("Energy mix API error:", error)

    return mock.recommendationResult.mix
  }
}


// =====================================================
// GRID STATUS
// Keep mock for now
// =====================================================

export async function getGridStatus(scenario = 'normal') {
  await wait(200)
  return mock.gridScenarios[scenario] ?? mock.gridScenarios.normal
}


// =====================================================
// GRID SIMULATION
// Keep mock for now
// =====================================================

export async function runGridSimulation(scenario) {

  await wait(1400)

  return {
    before: mock.virtualInertia.currentFrequency,
    after: mock.virtualInertia.restoredFrequency,
    steps: mock.virtualInertia.steps,
    scenario
  }
}


// =====================================================
// SURPLUS
// Keep mock for now
// =====================================================

export async function getSurplusAllocation() {
  await wait(150)
  return mock.surplusData
}


// =====================================================
// HYDROGEN
// Keep mock for now
// =====================================================

export async function getHydrogenData() {
  await wait(150)
  return mock.hydrogenData
}


// =====================================================
// P2P TRADING
// Keep mock for now
// =====================================================

export async function getTradingData() {
  await wait(150)
  return mock.p2pData
}


// =====================================================
// DISASTER SIMULATION
// Connect to Django
// =====================================================

export async function runDisasterSimulation(scenarioKey) {

  try {

    const response = await fetch(`${API_URL}/disaster/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event: scenarioKey
      })
    })

    return await response.json()

  } catch (error) {

    console.error("Disaster API error:", error)

    return (
      mock.disasterScenarios[scenarioKey] ??
      mock.disasterScenarios.cyclone
    )
  }
}


// =====================================================
// AI EXPLANATION
// Keep mock for now
// =====================================================

export async function getAIExplanation() {
  await wait(200)
  return mock.explainability
}


// =====================================================
// ANALYTICS
// Keep mock for now
// =====================================================

export async function getAnalytics() {
  await wait(200)
  return mock.analyticsSeries
}


// =====================================================
// REPORT
// Keep mock for now
// =====================================================

export async function generateReport(params) {
  await wait(1600)
  return {
    ...mock.reportTemplate,
    ...params
  }
}


// =====================================================
// GRID SIMULATION / SURPLUS BACKEND
// =====================================================

export async function runBackendSimulation(data) {

  try {

    const response = await fetch(`${API_URL}/simulation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    return await response.json()

  } catch (error) {

    console.error("Simulation API error:", error)

    return null
  }
}