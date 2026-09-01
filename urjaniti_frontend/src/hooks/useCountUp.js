import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 to `value` over `duration` ms using an eased curve.
export function useCountUp(value, duration = 1200, decimals = 1) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    startRef.current = null
    const target = Number(value) || 0

    function tick(ts) {
      if (startRef.current === null) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(target * eased)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(target)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [value, duration])

  return display.toFixed(decimals)
}
