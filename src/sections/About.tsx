import { motion } from 'framer-motion'
import { GraduationCap, Rocket } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import Astronaut from '@/components/Astronaut'
import Ufo from '@/components/Ufo'
import Planet from '@/components/Planet'
import Asteroid from '@/components/Asteroid'
import Alien from '@/components/Alien'
import SolarSystemStrip from '@/components/SolarSystemStrip'
import { useParallax } from '@/hooks/useParallax'
import { profile } from '@/data/profile'

export default function About() {
  const { ref, y } = useParallax<HTMLDivElement>(40)

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <Astronaut size={90} pose="float" className="absolute -right-2 top-8 hidden opacity-90 md:block" />
        <Ufo size={64} className="absolute left-2 bottom-24 hidden lg:block" />
        <Planet size={44} hue="amber" variant="moon" className="absolute left-[42%] -top-4 hidden lg:block" />
        <Planet size={50} hue="earth" variant="plain" className="absolute right-[8%] bottom-4 hidden lg:block" />
        <Asteroid size={22} className="absolute right-[30%] bottom-10 hidden lg:block" />
        <Alien size={40} className="absolute left-[8%] top-4 hidden lg:block" />
      </motion.div>

      <div className="section-shell">
        <SectionHeading
          eyebrow="Transmission Log"
          title="About Me"
          titleClassName="font-chewy tracking-wide"
          description="A quick look at who I am and where I'm headed."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass-panel space-y-4 rounded-bubble-lg p-8 sm:p-10"
          >
            {profile.bio.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-ink-2">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-panel glass-panel-hover rounded-bubble p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-glow/10 text-accent-cyan">
                <GraduationCap size={20} />
              </div>
              <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink-4">
                Education
              </p>
              <p className="mt-1 text-lg font-semibold text-starlight">{profile.education}</p>
            </div>

            <div className="glass-panel glass-panel-hover rounded-bubble p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-glow/10 text-accent-violet">
                <Rocket size={20} />
              </div>
              <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink-4">
                Mission
              </p>
              <p className="mt-1 text-lg font-semibold text-starlight">
                Learn something new, ship something small — every week.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <SolarSystemStrip />
        </div>
      </div>
    </section>
  )
}
