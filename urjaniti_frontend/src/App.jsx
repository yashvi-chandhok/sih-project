import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import Overview from './pages/Overview.jsx'
import Planning from './pages/Planning.jsx'
import ResourceMap from './pages/ResourceMap.jsx'
import EnergyMix from './pages/EnergyMix.jsx'
import GridControl from './pages/GridControl.jsx'
import Surplus from './pages/Surplus.jsx'
import Hydrogen from './pages/Hydrogen.jsx'
import Trading from './pages/Trading.jsx'
import Resilience from './pages/Resilience.jsx'
import Explainability from './pages/Explainability.jsx'
import Analytics from './pages/Analytics.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Overview />} />
        <Route path="planning" element={<Planning />} />
        <Route path="map" element={<ResourceMap />} />
        <Route path="mix" element={<EnergyMix />} />
        <Route path="grid" element={<GridControl />} />
        <Route path="surplus" element={<Surplus />} />
        <Route path="hydrogen" element={<Hydrogen />} />
        <Route path="trading" element={<Trading />} />
        <Route path="resilience" element={<Resilience />} />
        <Route path="explainability" element={<Explainability />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
