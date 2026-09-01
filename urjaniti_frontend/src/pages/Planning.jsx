import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import ChartCard from '../components/ChartCard.jsx'
import LoadingAnalysis from '../components/LoadingAnalysis.jsx'
import Modal from '../components/Modal.jsx'
import { runSiteAnalysis } from '../services/api.js'
import { planningSteps, analysisSequenceSteps, stateResourceData } from '../data/mockData.js'

const MIX_COLORS = { solar: '#F59E0B', wind: '#22D3EE', biomass: '#84CC16', storage: '#38BDF8' }

export default function Planning() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    state: 'Rajasthan', district: 'Jaisalmer', land: 120, gridDistance: 8,
    irradiance: 5.8, windSpeed: 4.6, biomass: 'Medium', envConstraints: 'Low', demand: 320,
  })
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [explainOpen, setExplainOpen] = useState(false)

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  async function runAnalysis() {
    setStep(3)
    setAnalyzing(true)
    const res = await runSiteAnalysis(form)
    setResult(res)
  }

  function onAnalysisComplete() {
    setAnalyzing(false)
    setStep(4)
  }

  return (
    <div className="space-y-6">
      <ChartCard title="Multi-Source Planning Engine" subtitle="Design a renewable deployment for a specific site">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {planningSteps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                  i < step ? 'border-emerald bg-emerald-soft text-emerald' : i === step ? 'border-cyan text-cyan' : 'border-base-line text-ink-faint'
                }`}
              >
                {i < step ? <Check size={13} /> : String(i + 1).padStart(2, '0')}
              </div>
              <span className={`text-xs font-medium ${i === step ? 'text-ink' : 'text-ink-faint'}`}>{s}</span>
              {i < planningSteps.length - 1 && <span className="mx-1 h-px w-6 bg-base-line" />}
            </div>
          ))}
        </div>

        {step < 3 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Select State">
              <select value={form.state} onChange={(e) => update('state', e.target.value)} className="input">
                {Object.keys(stateResourceData).map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </Field>
            <Field label="Select District"><input value={form.district} onChange={(e) => update('district', e.target.value)} className="input" /></Field>
            <Field label="Land Availability (acres)"><input type="number" value={form.land} onChange={(e) => update('land', +e.target.value)} className="input" /></Field>
            <Field label="Grid Distance (km)"><input type="number" value={form.gridDistance} onChange={(e) => update('gridDistance', +e.target.value)} className="input" /></Field>
            <Field label="Solar Irradiance (kWh/m²/day)"><input type="number" step="0.1" value={form.irradiance} onChange={(e) => update('irradiance', +e.target.value)} className="input" /></Field>
            <Field label="Wind Speed (m/s)"><input type="number" step="0.1" value={form.windSpeed} onChange={(e) => update('windSpeed', +e.target.value)} className="input" /></Field>
            <Field label="Biomass Availability">
              <select value={form.biomass} onChange={(e) => update('biomass', e.target.value)} className="input">
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </Field>
            <Field label="Environmental Constraints">
              <select value={form.envConstraints} onChange={(e) => update('envConstraints', e.target.value)} className="input">
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </Field>
            <Field label="Energy Demand (MW)"><input type="number" value={form.demand} onChange={(e) => update('demand', +e.target.value)} className="input" /></Field>
          </div>
        )}

        {step < 3 && (
          <div className="mt-6 flex justify-end gap-3">
            {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="btn-ghost">Back</button>}
            {step < 2 ? (
              <button onClick={() => setStep((s) => s + 1)} className="btn-primary">Continue</button>
            ) : (
              <button onClick={runAnalysis} className="btn-primary">Run AI Site Analysis</button>
            )}
          </div>
        )}

        {step === 3 && analyzing && <LoadingAnalysis steps={analysisSequenceSteps} onComplete={onAnalysisComplete} />}

        {step === 4 && result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Recommended Energy Mix</p>
              <div className="space-y-2.5">
                {Object.entries(result.mix).map(([k, v]) => (
                  <div key={k}>
                    <div className="mb-1 flex justify-between text-sm"><span className="capitalize text-ink">{k}</span><span className="num-tabular text-ink-muted">{v}%</span></div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="h-full rounded-full" style={{ background: MIX_COLORS[k] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              <ScoreTile label="Suitability" value={result.suitability} />
              <ScoreTile label="Reliability" value={result.reliability} />
              <ScoreTile label="Grid Access" value={result.gridAccessibility} />
              <ScoreTile label="Env. Compat." value={result.environmentalCompatibility} />
              <ScoreTile label="Economic Feasibility" value={result.economicFeasibility} />
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => setExplainOpen(true)} className="btn-primary">Why this recommendation?</button>
              <button onClick={() => { setStep(0); setResult(null) }} className="btn-ghost">Plan Another Site</button>
            </div>
          </motion.div>
        )}
      </ChartCard>

      <Modal open={explainOpen} onClose={() => setExplainOpen(false)} title="Why this recommendation?" wide>
        <p className="text-sm text-ink-muted">
          Head to the full <strong className="text-ink">AI Explainability</strong> page from the sidebar for a
          feature-impact breakdown and decision trail for this site. This modal summarizes the top drivers below.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink">
          <li>• High solar irradiance across the selected district</li>
          <li>• Strong grid accessibility within range of substation</li>
          <li>• Agricultural biomass availability nearby</li>
        </ul>
      </Modal>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-faint">{label}</span>
      {children}
    </label>
  )
}

function ScoreTile({ label, value }) {
  return (
    <div className="card p-3.5 text-center">
      <div className="num-tabular font-display text-2xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-[11px] text-ink-faint">{label}</div>
    </div>
  )
}
