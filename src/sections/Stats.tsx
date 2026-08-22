import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import BlackHole from '@/components/BlackHole'
import { languageStats, funFacts } from '@/data/stats'

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden py-24 sm:py-32">
      <BlackHole size={130} className="absolute -right-4 top-10 hidden opacity-70 lg:block" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="Flight Data"
          title="By the Numbers"
          description="A snapshot of the languages I write most, plus a few honest, unfiltered stats from the journey so far."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass-panel rounded-bubble-lg p-8 sm:p-10"
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-cyan">
              Language Breakdown
            </p>

            <div className="mt-6 space-y-5">
              {languageStats.map((lang, index) => (
                <div key={lang.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-1">{lang.name}</span>
                    <span className="font-mono text-ink-3">{lang.percent}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface/[0.08]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 1, ease: 'easeOut', delay: index * 0.12 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${lang.color}55, ${lang.color})`,
                        boxShadow: `0 0 12px 0 ${lang.color}80`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {funFacts.map((fact) => (
              <div
                key={fact.label}
                className="glass-panel glass-panel-hover flex flex-col justify-between rounded-bubble p-5"
              >
                <p className="font-display text-3xl font-bold text-gradient">{fact.value}</p>
                <p className="mt-2 text-xs leading-snug text-ink-3">{fact.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
