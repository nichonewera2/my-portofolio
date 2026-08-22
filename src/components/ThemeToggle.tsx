import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const reducedMotion = useReducedMotion()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={(e) => toggleTheme(reducedMotion ? undefined : { x: e.clientX, y: e.clientY })}
      aria-label={isLight ? 'Aktifkan mode malam' : 'Aktifkan mode siang'}
      title={isLight ? 'Mode Malam' : 'Mode Siang'}
      className={`glass-panel relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 hover:border-cyan-glow/40 ${className ?? ''}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center justify-center text-amber-glow"
          >
            <Sun size={17} strokeWidth={2.25} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center justify-center text-cyan-glow"
          >
            <Moon size={16} strokeWidth={2.25} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
