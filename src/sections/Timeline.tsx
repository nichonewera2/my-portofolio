import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import Planet from '@/components/Planet'
import { timeline } from '@/data/timeline'

export default function Timeline() {
  return (
    <section id="timeline" className="relative overflow-hidden py-24 sm:py-32">
      <Planet size={70} hue="violet" variant="moon" className="absolute right-6 top-10 hidden opacity-70 lg:block" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="Flight Path"
          title="The Journey So Far"
          description="A short orbit through where this all started, and where it's headed next — updated as the journey continues."
        />

        <div className="relative">
          {/* Orbit path line — hidden on the smallest screens where the layout collapses to a single column */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan-glow/60 via-violet-glow/40 to-transparent sm:block"
          />

          <ol className="space-y-8 sm:space-y-10">
            {timeline.map((entry, index) => {
              const Icon = entry.icon
              return (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
                  className="relative flex gap-5 sm:gap-6"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-glow/40 bg-void shadow-glow sm:h-10 sm:w-10">
                    <Icon size={17} className="text-accent-cyan" strokeWidth={2.25} />
                  </div>

                  <div className="glass-panel glass-panel-hover flex-1 rounded-bubble p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-violet">
                        {entry.year}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-base font-bold text-starlight sm:text-lg">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-3">
                      {entry.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
