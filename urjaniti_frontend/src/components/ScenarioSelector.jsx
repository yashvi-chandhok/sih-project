export default function ScenarioSelector({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Scenario">
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
              active
                ? 'border-emerald/40 bg-emerald-soft text-emerald shadow-glow'
                : 'border-base-line bg-base-raised/50 text-ink-muted hover:border-white/20 hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
