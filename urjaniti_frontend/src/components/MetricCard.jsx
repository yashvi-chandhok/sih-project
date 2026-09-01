import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp.js'

/**
 * A single metric tile. Pass `value` as a number; it will animate on mount.
 * `accent` controls the thin top glow line: 'emerald' | 'cyan' | 'amber' | 'danger' | 'none'.
 */
export default function MetricCard({ label, value, unit, decimals = 1, icon: Icon, accent = 'emerald', sublabel, delay = 0 }) {
  const display = useCountUp(value, 1100, decimals)

  const accentColor = {
    emerald: '#22C55E',
    cyan: '#22D3EE',
    amber: '#F59E0B',
    danger: '#EF4444',
    none: 'transparent',
  }[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3 }}
      className="card relative overflow-hidden p-5 shadow-card transition-shadow hover:shadow-glow"
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-ink-muted">{label}</span>
        {Icon && (
          <div className="rounded-lg p-1.5" style={{ background: `${accentColor}1F` }}>
            <Icon size={16} color={accentColor} strokeWidth={2} />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="num-tabular font-display text-3xl font-bold text-ink">{display}</span>
        {unit && <span className="text-sm font-medium text-ink-faint">{unit}</span>}
      </div>
      {sublabel && <div className="mt-1 text-xs text-ink-faint">{sublabel}</div>}
    </motion.div>
  )
}
