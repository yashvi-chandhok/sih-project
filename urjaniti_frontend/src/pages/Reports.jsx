import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'
import ChartCard from '../components/ChartCard.jsx'
import { generateReport } from '../services/api.js'

export default function Reports() {
  const [generating, setGenerating] = useState(false)
  const [report, setReport] = useState(null)

  async function handleGenerate() {
    setGenerating(true)
    const r = await generateReport({})
    setReport(r)
    setGenerating(false)
  }

  return (
    <div className="space-y-6">
      <ChartCard title="Energy Intelligence Report" subtitle="Compile the latest planning, grid and resilience outputs into a shareable report">
        <button onClick={handleGenerate} disabled={generating} className="btn-primary inline-flex items-center gap-2">
          <FileText size={15} /> {generating ? 'Generating report…' : 'Generate Report'}
        </button>
      </ChartCard>

      {report && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <ChartCard
            title="Report Preview"
            subtitle="Demo Data"
            action={
              <button className="flex items-center gap-1.5 text-xs font-medium text-cyan hover:underline">
                <Download size={13} /> Export PDF
              </button>
            }
          >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <Row term="Selected Location" def={report.location} />
              <Row term="Resource Assessment" def={report.resourceAssessment} />
              <Row term="AI Confidence" def={`${report.aiConfidence}%`} />
              <Row term="Grid Risk" def={report.gridRisk} />
              <Row term="Hydrogen Potential" def={report.hydrogenPotential} />
              <Row term="Resilience Score" def={`${report.resilienceScore}/100`} />
              <Row term="Surplus Strategy" def={report.surplusStrategy} full />
            </dl>
            <div className="mt-5 border-t border-base-line pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Recommended Energy Mix</p>
              <div className="flex gap-4 text-sm">
                {Object.entries(report.recommendedMix).map(([k, v]) => (
                  <span key={k} className="capitalize text-ink">{k}: <span className="num-tabular font-semibold">{v}%</span></span>
                ))}
              </div>
            </div>
          </ChartCard>
        </motion.div>
      )}
    </div>
  )
}

function Row({ term, def, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <dt className="text-xs text-ink-faint">{term}</dt>
      <dd className="mt-0.5 text-ink">{def}</dd>
    </div>
  )
}
