import { motion } from 'framer-motion'
import { GraduationCap, Rocket } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { profile } from '@/data/profile'

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Transmission Log"
          title="About Me"
          description="A quick look at who I am and where I'm headed."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass-panel space-y-4 rounded-3xl p-8 sm:p-10"
          >
            {profile.bio.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-starlight/70">
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
            <div className="glass-panel glass-panel-hover rounded-3xl p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-glow/10 text-cyan-glow">
                <GraduationCap size={20} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-starlight/40">
                Education
              </p>
              <p className="mt-1 text-lg font-medium text-starlight">{profile.education}</p>
            </div>

            <div className="glass-panel glass-panel-hover rounded-3xl p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-glow/10 text-violet-glow">
                <Rocket size={20} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-starlight/40">
                Mission
              </p>
              <p className="mt-1 text-lg font-medium text-starlight">
                Learn something new, ship something small — every week.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
