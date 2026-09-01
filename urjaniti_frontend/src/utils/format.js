export function formatNumber(n, decimals = 1) {
  if (n === null || n === undefined) return '—'
  return n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max)
}
