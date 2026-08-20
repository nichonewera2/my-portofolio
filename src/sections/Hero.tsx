import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import IdentityFrame from '@/components/IdentityFrame'
import Planet from '@/components/Planet'
import Astronaut from '@/components/Astronaut'
import Spaceship from '@/components/Spaceship'
import Ufo from '@/components/Ufo'
import Satellite from '@/components/Satellite'
import Asteroid from '@/components/Asteroid'
import Galaxy from '@/components/Galaxy'
import Alien from '@/components/Alien'
import MeteorShower from '@/components/MeteorShower'
import { useParallax } from '@/hooks/useParallax'
import { profile } from '@/data/profile'

export default function Hero() {
  const { ref, y } = useParallax<HTMLDivElement>(50)

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-24"
    >
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <Planet size={110} hue="violet" variant="saturn" className="absolute -left-10 top-24 hidden lg:block" />
        <Planet size={56} hue="cyan" variant="moon" className="absolute right-24 bottom-40 hidden lg:block" />
        <Planet size={40} hue="amber" variant="plain" className="absolute left-[16%] bottom-14 hidden md:block" />
        <Planet size={64} hue="mars" variant="ring" className="absolute right-[4%] bottom-10 hidden lg:block" />
        <Galaxy size={190} className="absolute -right-16 top-4 hidden xl:block" />
        <Spaceship size={70} tilt={-30} className="absolute right-[10%] top-24 hidden lg:block" />
        <Ufo size={82} className="absolute left-[5%] top-40 hidden lg:block" />
        <Satellite size={60} className="absolute right-[22%] top-14 hidden md:block" />
        <Alien size={46} className="absolute left-[26%] top-16 hidden lg:block" />
        <Asteroid size={26} className="absolute left-[34%] top-28 hidden lg:block" />
        <Asteroid size={18} className="absolute right-[38%] bottom-28 hidden lg:block" />
      </motion.div>
      <MeteorShower />

      <div className="section-shell grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan-glow" />
            {profile.status}
          </span>

          <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.12] text-starlight sm:text-5xl lg:text-[3.6rem]">
            {profile.name.split(' ')[0]}{' '}
            <span className="text-gradient drop-shadow-[0_0_28px_rgba(94,234,212,0.35)]">
              {profile.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <p className="mt-4 flex items-center justify-center gap-2 text-lg font-semibold text-cyan-glow/90 lg:justify-start">
            <Sparkles size={16} className="shrink-0" />
            {profile.role}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-starlight/65 sm:text-lg lg:mx-0">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <button
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-bubble bg-cyan-glow px-8 py-3.5 text-sm font-bold text-[#05060d] shadow-glow hover:shadow-[0_0_55px_-4px_rgba(94,234,212,0.6)]"
            >
              View Projects
            </button>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-bubble glass-panel px-8 py-3.5 text-sm font-bold text-starlight hover:border-violet-glow/50 hover:shadow-glow-violet"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <div className="relative">
            <IdentityFrame />
            <Astronaut
              size={112}
              pose="wave"
              className="absolute -right-8 -top-6 sm:-right-10 sm:-top-8"
            />
            <Astronaut
              size={72}
              pose="float"
              flip
              className="absolute -bottom-4 -left-10 hidden sm:block"
            />
          </div>
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
