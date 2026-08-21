import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'timeline', label: 'Journey' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'stats', label: 'Stats' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(NAV_ITEMS.map((item) => item.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-void/70 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="section-shell flex items-center justify-between py-5">
        <button
          onClick={() => scrollTo('home')}
          className="font-display text-base font-bold text-starlight"
        >
          N<span className="text-cyan-glow">.</span>Orlando
        </button>

        <div className="flex items-center gap-3">
          {/* Desktop nav — lg+ only; 9 items need more room than md gives */}
          <nav className="glass-panel hidden max-w-[46vw] items-center gap-1 overflow-x-auto rounded-full px-2 py-2 no-scrollbar lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'relative shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors xl:px-4',
                  active === item.id
                    ? 'text-[#05060d]'
                    : 'text-starlight/70 hover:text-starlight',
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-cyan-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <ThemeToggle className="hidden lg:flex" />

          {/* Toggle group for everything below lg (phones + tablets) */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="glass-panel flex h-10 w-10 items-center justify-center rounded-full"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="section-shell lg:hidden"
          >
            <div className="glass-panel mb-4 grid grid-cols-2 gap-1 rounded-[28px] p-3 sm:grid-cols-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors',
                    active === item.id
                      ? 'bg-cyan-glow text-[#05060d]'
                      : 'text-starlight/70 hover:bg-surface/5 hover:text-starlight',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
