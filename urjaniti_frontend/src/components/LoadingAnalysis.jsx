import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

/**
 * Sequenced AI-analysis loader. `steps` is an array of strings; each is
 * marked complete on a staggered timer while a circular progress ring spins.
 */
export default function LoadingAnalysis({ steps, totalDuration = 2200, onComplete }) {
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    const perStep = totalDuration / steps.length
    const timers = steps.map((_, i) =>
      setTimeout(() => setCompletedCount((c) => c + 1), perStep * (i + 1))
    )
    const done = setTimeout(() => onComplete?.(), totalDuration + 200)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(done)
    }
  }, [steps, totalDuration, onComplete])

  const progress = completedCount / steps.length

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
        <svg className="absolute h-28 w-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(148,178,209,0.12)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="44" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={276.5}
            initial={{ strokeDashoffset: 276.5 }}
            animate={{ strokeDashoffset: 276.5 * (1 - progress) }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </svg>
        <Loader2 className="animate-spin text-emerald" size={28} />
      </div>
      <p className="mb-1 font-display text-sm font-semibold uppercase tracking-wide text-emerald">
        AI Analysis in Progress
      </p>
      <div className="mt-4 w-full max-w-xs space-y-2 text-left">
        {steps.map((step, i) => {
          const done = i < completedCount
          const active = i === completedCount
          return (
            <div key={step} className="flex items-center gap-2.5 text-sm">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  done ? 'border-emerald bg-emerald/20' : active ? 'border-cyan' : 'border-white/10'
                }`}
              >
                {done && <Check size={12} className="text-emerald" />}
                {active && !done && <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-cyan" />}
              </span>
              <span className={done ? 'text-ink' : active ? 'text-cyan' : 'text-ink-faint'}>{step}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
