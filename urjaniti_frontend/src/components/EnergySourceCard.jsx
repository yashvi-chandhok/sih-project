import { motion } from 'framer-motion'

export default function EnergySourceCard({ source, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`card flex w-full items-center justify-between p-4 text-left transition-colors ${
        active ? 'border-white/30' : ''
      }`}
      style={active ? { boxShadow: `0 0 0 1px ${source.color}66, 0 0 20px ${source.color}33` } : undefined}
      aria-pressed={active}
    >
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: source.color }} />
        <div>
          <div className="text-sm font-semibold text-ink">{source.label}</div>
          <div className="text-xs text-ink-faint">{source.current.toFixed(1)} GW live</div>
        </div>
      </div>
      <div className="text-right">
        <div className="num-tabular text-sm font-semibold text-ink">{source.capacity.toFixed(1)} GW</div>
        <div className="text-xs text-ink-faint">capacity</div>
      </div>
    </motion.button>
  )
}
