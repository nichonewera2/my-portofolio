import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const MIN_DISPLAY_MS = 1100
const SAFETY_TIMEOUT_MS = 4000

/**
 * A short, cinematic loading screen: an orbiting planet with a counting
 * percentage, shown for a minimum duration (so it never just flashes) and
 * dismissed once the window has finished loading — with a hard safety
 * timeout so it can never get stuck open if the load event misbehaves.
 * Skips straight through (no animation, near-instant) for users who
 * prefer reduced motion.
 */
export default function LoadingScreen() {
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100)
      setDone(true)
      const t = setTimeout(() => setMounted(false), 150)
      return () => clearTimeout(t)
    }

    document.body.style.overflow = 'hidden'
    const start = performance.now()

    let raf = 0
    const tick = (now: number) => {
      const elapsed = now - start
      // Ease toward ~92% while waiting, then snap to 100 on finish below.
      const eased = Math.min(92, (elapsed / MIN_DISPLAY_MS) * 92)
      setProgress(eased)
      if (elapsed < MIN_DISPLAY_MS) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      const elapsed = performance.now() - start
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
      window.setTimeout(() => {
        setProgress(100)
        window.setTimeout(() => setDone(true), 220)
      }, remaining)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish)
    }
    const safety = window.setTimeout(finish, SAFETY_TIMEOUT_MS)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', finish)
      window.clearTimeout(safety)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!done) return
    document.body.style.overflow = ''
    const t = setTimeout(() => setMounted(false), 600)
    return () => clearTimeout(t)
  }, [done])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-void"
          role="status"
          aria-live="polite"
          aria-label="Memuat halaman"
        >
          <div className="relative flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-hairline/15" />
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
              className="absolute inset-0"
            >
              <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-glow shadow-glow" />
            </motion.span>
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
              className="absolute inset-2 rounded-full border border-dashed border-violet-glow/30"
            />
            <span className="font-display text-lg font-bold text-gradient">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <p className="font-display text-sm font-semibold tracking-[0.08em] text-starlight/90">
              N. Orlando
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-starlight/40">
              Entering the universe…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
