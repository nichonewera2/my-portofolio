import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import ThemeTransitionOverlay from '@/components/ThemeTransitionOverlay'

type Theme = 'dark' | 'light'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: (origin?: { x: number; y: number }) => void
}

type TransitionState = { x: number; y: number; fromColor: string } | null

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'nou-theme'

// Matches --c-void / html[data-theme='light'] --c-void in index.css — kept
// here as plain hex since the transition overlay needs a concrete color
// value at the exact moment of the click, not a live CSS variable (which
// would already reflect the *new* theme by the time the overlay reads it).
const VOID_COLORS: Record<Theme, string> = { dark: '#05060d', light: '#eef1fb' }

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored

  // Dark "deep space" is the intended default experience — we don't defer
  // to the OS/browser's prefers-color-scheme here, so first-time visitors
  // (and link-preview crawlers) always see the space theme first. Light
  // mode is opt-in only, via the toggle.
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [transition, setTransition] = useState<TransitionState>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#05060d' : '#eef1fb')
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: (origin) => {
        setTheme((current) => {
          const next = current === 'dark' ? 'light' : 'dark'
          if (origin) {
            setTransition({ x: origin.x, y: origin.y, fromColor: VOID_COLORS[current] })
            window.setTimeout(() => setTransition(null), 680)
          }
          return next
        })
      },
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <ThemeTransitionOverlay transition={transition} />
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
