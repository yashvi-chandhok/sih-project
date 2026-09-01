# Urjaniti — AI-Powered Renewable Energy Planning & Resilience Platform

Frontend prototype built with React, Vite, Tailwind CSS, Framer Motion, Recharts and React-Leaflet.

This is a **hackathon prototype**. No page controls real grid hardware — every live-looking
value is simulated or demo data, clearly labeled as such throughout the UI.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Reusable UI building blocks (MetricCard, ChartCard, EnergyFlow, IndiaMap, ...)
  pages/        One file per route (Overview, Planning, ResourceMap, GridControl, ...)
  layouts/      Sidebar, Navbar, AppLayout shell
  data/         mockData.js — every mock value lives here, nowhere else
  services/     api.js — service functions the pages call; swap the body of any
                function for a real fetch() to connect a live backend
  hooks/        useCountUp — animated number hook
  utils/        formatting helpers
```

## Story the UI tells

**PLAN → OPTIMIZE → BALANCE → UTILIZE → RESILIENCE → EXPLAIN**

- **Plan** — Resource Map + Planning Engine choose where to build.
- **Optimize** — Energy Mix + AI Explainability choose the right generation mix.
- **Balance** — Grid Control coordinates generation and demand.
- **Utilize** — Surplus Energy, Green Hydrogen and P2P Trading make use of excess power.
- **Resilience** — Disaster Resilience Center simulates recovery from disruption.
- **Explain** — AI Explainability shows why the platform recommended what it did.

## Notes for judges / demo

- The sidebar always shows **Simulation Mode**; Grid Control and P2P Trading carry
  additional inline banners reiterating that no live hardware or financial
  settlement is connected.
- Use the **Demo Scenarios** row on the Overview page to trigger instant walkthroughs.
- All numbers are centralized in `src/data/mockData.js` — edit that file to
  re-theme the demo for a different judge audience without touching components.
