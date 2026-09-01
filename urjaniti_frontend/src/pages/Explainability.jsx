import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react'
import ChartCard from '../components/ChartCard.jsx'
import { getAIExplanation } from '../services/api.js'

export default function Explainability() {
  const [data, setData] = useState(null)
  const [trailOpen, setTrailOpen] = useState(false)

  useEffect(() => { getAIExplanation().then(setData) }, [])
  if (!data) return null

  const maxAbs = Math.max(...data.featureImpact.map((f) => Math.abs(f.impact)))

  return (
    <div className="space-y-6">
      <ChartCard title="AI Decision" subtitle="Explainable AI — understand why Urjaniti made this recommendation">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-soft">
              <BrainCircuit size={20} className="text-emerald" />
            </div>
            <div>
              <div className="font-display text-base font-semibold text-ink">{data.decision}</div>
              <div className="text-xs text-ink-faint">Model confidence</div>
            </div>
          </div>
          <div className="text-right">
            <div className="num-tabular font-display text-3xl font-bold text-emerald">{data.confidence}%</div>
          </div>
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Supporting Factors">
          <ul className="space-y-2.5 text-sm">
            {data.reasons.positive.map((r) => (
              <li key={r} className="flex items-start gap-2 text-ink">
                <ThumbsUp size={14} className="mt-0.5 shrink-0 text-emerald" /> {r}
              </li>
            ))}
            {data.reasons.negative.map((r) => (
              <li key={r} className="flex items-start gap-2 text-ink-muted">
                <ThumbsDown size={14} className="mt-0.5 shrink-0 text-danger" /> {r}
              </li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard title="Feature Impact" subtitle="Contribution of each factor to the final score">
          <div className="space-y-3">
            {data.featureImpact.map((f) => {
              const positive = f.impact >= 0
              const widthPct = (Math.abs(f.impact) / maxAbs) * 100
              return (
                <div key={f.feature} className="flex items-center gap-3 text-sm">
                  <span className="w-36 shrink-0 truncate text-ink-muted">{f.feature}</span>
                  <div className="relative h-2 flex-1 rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: positive ? '#22C55E' : '#EF4444' }}
                    />
                  </div>
                  <span className={`num-tabular w-12 text-right text-xs font-semibold ${positive ? 'text-emerald' : 'text-danger'}`}>
                    {positive ? '+' : ''}{f.impact}%
                  </span>
                </div>
              )
            })}
          </div>
        </ChartCard>
      </div>

      <ChartCard
        title="Decision Trail"
        subtitle="Step-by-step trace of how the recommendation was produced"
        action={
          <button onClick={() => setTrailOpen((v) => !v)} className="flex items-center gap-1 text-xs font-medium text-cyan">
            {trailOpen ? 'Hide' : 'View decision trail'}
            <motion.span animate={{ rotate: trailOpen ? 90 : 0 }}><ChevronRight size={14} /></motion.span>
          </button>
        }
      >
        {trailOpen && (
          <motion.ol initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative space-y-5 border-l border-base-line pl-5">
            {data.decisionTrail.map((step, i) => (
              <li key={step.step} className="relative">
                <span className="absolute -left-[27px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald bg-base text-[10px] font-bold text-emerald">
                  {i + 1}
                </span>
                <div className="text-sm font-semibold text-ink">{step.step}</div>
                <div className="text-xs text-ink-faint">{step.detail}</div>
              </li>
            ))}
          </motion.ol>
        )}
      </ChartCard>
    </div>
  )
}
