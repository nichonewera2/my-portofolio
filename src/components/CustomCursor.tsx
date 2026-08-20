import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [tabindex]'

/**
 * A small comet-style cursor: a tight core dot that tracks the mouse
 * exactly, with a soft trailing glow that eases behind it. Automatically
 * disabled on touch devices and when the user prefers reduced motion —
 * the OS cursor is left untouched in both of those cases.
 */
export default function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const trailX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const trailY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine && !reducedMotion)
  }, [reducedMotion])

  useEffect(() => {
    if (!enabled) return

    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) setVisible(true)

      const target = event.target as Element | null
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)))
    }

    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease' }}
    >
      {/* Trailing glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 44 : 30,
          height: hovering ? 44 : 30,
          background:
            'radial-gradient(circle, rgba(94,234,212,0.35) 0%, rgba(167,139,250,0.18) 55%, transparent 75%)',
          transition: 'width 0.25s ease, height 0.25s ease',
        }}
      />
      {/* Core dot */}
      <motion.div
        className="absolute rounded-full bg-cyan-glow"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: pressed ? 5 : 7,
          height: pressed ? 5 : 7,
          boxShadow: '0 0 10px 1px rgba(94,234,212,0.8)',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
    </div>
  )
}
