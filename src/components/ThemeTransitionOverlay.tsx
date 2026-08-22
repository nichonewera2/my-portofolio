import { AnimatePresence, motion } from 'framer-motion'

type TransitionState = { x: number; y: number; fromColor: string } | null

// A handful of particles that burst outward from the click point, adding
// a little "supernova flash" flourish on top of the circular color sweep.
const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2
  const distance = 90 + (i % 3) * 40
  return {
    id: i,
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance,
    delay: (i % 4) * 0.02,
  }
})

export default function ThemeTransitionOverlay({ transition }: { transition: TransitionState }) {
  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          key="theme-transition"
          className="pointer-events-none fixed inset-0 z-[300] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {/* Expanding color sweep — starts as a pinpoint at the toggle
              button, washes across the whole screen, then dissolves to
              reveal the new theme underneath (which has already switched). */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${transition.fromColor} 0%, ${transition.fromColor} 55%, transparent 100%)`,
            }}
            initial={{
              clipPath: `circle(0px at ${transition.x}px ${transition.y}px)`,
            }}
            animate={{
              clipPath: [
                `circle(0px at ${transition.x}px ${transition.y}px)`,
                `circle(140vmax at ${transition.x}px ${transition.y}px)`,
              ],
            }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Ring flash + starburst particles at the origin point */}
          <motion.div
            className="absolute rounded-full border-2 border-cyan-glow"
            style={{ left: transition.x, top: transition.y, width: 0, height: 0 }}
            initial={{ opacity: 0.9 }}
            animate={{
              width: [0, 260],
              height: [0, 260],
              x: [0, -130],
              y: [0, -130],
              opacity: [0.9, 0],
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow"
              style={{ left: transition.x, top: transition.y }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.55, delay: p.delay, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
