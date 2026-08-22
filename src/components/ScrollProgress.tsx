import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const RADIUS = 19
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Two synced readouts of scroll progress:
 *  1. A slim gradient bar pinned to the very top edge of the viewport.
 *  2. A small "orbit" ring, bottom-right, whose arc fills in as the planet
 *     dot travels around it — a back-to-top button once there's progress
 *     to jump back from.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 1000 : 120,
    damping: 30,
    restDelta: 0.001,
  })
  const barScaleX = useTransform(smoothProgress, (v) => v)
  const dashOffset = useTransform(smoothProgress, (v) => CIRCUMFERENCE * (1 - v))
  const rotation = useTransform(smoothProgress, (v) => v * 360)

  const [showRing, setShowRing] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => setShowRing(v > 0.04))
    return () => unsubscribe()
  }, [scrollYProgress])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <>
      {/* Top edge bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <motion.div
          style={{ scaleX: barScaleX }}
          className="h-full w-full origin-left bg-gradient-to-r from-cyan-glow via-violet-glow to-amber-glow"
        />
      </div>

      {/* Orbit ring / back-to-top */}
      <motion.button
        type="button"
        onClick={scrollTop}
        aria-label="Kembali ke atas halaman"
        initial={false}
        animate={{
          opacity: showRing ? 1 : 0,
          scale: showRing ? 1 : 0.6,
          pointerEvents: showRing ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="glass-panel fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full sm:bottom-6 sm:right-6"
      >
        <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-hairline/15"
          />
          <motion.circle
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            stroke="url(#orbit-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{ strokeDashoffset: dashOffset }}
          />
          <defs>
            <linearGradient id="orbit-gradient" x1="0" y1="0" x2="44" y2="44">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        {/* Little planet dot riding the ring */}
        <motion.span
          style={{ rotate: rotation }}
          className="absolute inset-0 flex items-start justify-center"
        >
          <span className="mt-[1px] h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow" />
        </motion.span>
        <span className="relative z-10 text-[10px] font-bold uppercase tracking-wider text-ink-2">
          Up
        </span>
      </motion.button>
    </>
  )
}
