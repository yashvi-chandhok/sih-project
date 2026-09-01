const STYLES = {
  operational: { bg: 'bg-emerald-soft', text: 'text-emerald', dot: 'bg-emerald', label: 'Operational' },
  simulation: { bg: 'bg-cyan-soft', text: 'text-cyan', dot: 'bg-cyan', label: 'Simulation Mode' },
  warning: { bg: 'bg-amber-soft', text: 'text-amber', dot: 'bg-amber', label: 'Warning' },
  danger: { bg: 'bg-danger-soft', text: 'text-danger', dot: 'bg-danger', label: 'Critical' },
  neutral: { bg: 'bg-white/5', text: 'text-ink-muted', dot: 'bg-ink-faint', label: 'Idle' },
}

export default function StatusBadge({ kind = 'operational', label, pulse = true }) {
  const s = STYLES[kind] ?? STYLES.neutral
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${s.bg} px-2.5 py-1 text-xs font-medium ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${pulse ? 'animate-pulseSoft' : ''}`} />
      {label ?? s.label}
    </span>
  )
}
