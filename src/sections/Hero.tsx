import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import IdentityFrame from '@/components/IdentityFrame'
import Planet from '@/components/Planet'
import { profile } from '@/data/profile'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <Planet size={90} hue="violet" className="absolute -left-6 top-28 hidden lg:block" />
      <Planet size={60} hue="cyan" className="absolute right-10 bottom-24 hidden lg:block" />

      <div className="section-shell grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="order-2 lg:order-1"
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan-glow" />
            {profile.status}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-starlight sm:text-5xl lg:text-6xl">
            {profile.name.split(' ')[0]}{' '}
            <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="mt-3 text-lg font-medium text-cyan-glow/90">{profile.role}</p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-starlight/65 sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="rounded-full bg-cyan-glow px-7 py-3 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-105 active:scale-95"
            >
              View Projects
            </button>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="glass-panel glass-panel-hover rounded-full px-7 py-3 text-sm font-semibold text-starlight"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="order-1 lg:order-2"
        >
          <IdentityFrame />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <ArrowDown className="text-starlight/30" size={20} />
      </motion.div>
    </section>
  )
}
