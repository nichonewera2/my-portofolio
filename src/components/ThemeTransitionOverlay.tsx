import { AnimatePresence, motion } from 'framer-motion'

type TransitionState = { x: number; y: number; fromColor: string } | null

/**
 * A quick, light-weight circular wipe from the toggle button's position.
 * Kept intentionally simple (one clip-path sweep, no particles) so it
 * stays smooth even on lower-end phones — the theme itself has already
 * switched underneath by the time this plays, so it's purely a soft
 * cosmetic transition, not something the page waits on.
 */
export default function ThemeTransitionOverlay({ transition }: { transition: TransitionState }) {
  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          key="theme-transition"
          className="pointer-events-none fixed inset-0 z-[300] will-change-[clip-path]"
          style={{ backgroundColor: transition.fromColor }}
          initial={{ clipPath: `circle(0% at ${transition.x}px ${transition.y}px)` }}
          animate={{ clipPath: `circle(140% at ${transition.x}px ${transition.y}px)` }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
