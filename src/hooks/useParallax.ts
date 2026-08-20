import { useRef } from 'react'
import { useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'

/**
 * Attaches to a section wrapper (via the returned ref) and produces a
 * smooth, spring-damped vertical offset driven by scroll progress through
 * that section — used to give decorative background objects a subtle
 * parallax drift as the user scrolls past.
 */
export function useParallax<T extends HTMLElement>(distance = 60) {
  const ref = useRef<T>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], [-distance, distance])
  const y: MotionValue<number> = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 })
  return { ref, y }
}
