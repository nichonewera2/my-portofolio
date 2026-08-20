import { motion } from 'framer-motion'
import { Radio, Quote } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import Asteroid from '@/components/Asteroid'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-32">
      <Asteroid size={18} className="absolute left-8 top-16 hidden opacity-60 lg:block" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="Incoming Transmissions"
          title="What Others Are Saying"
          description="A few signals picked up from people along the way — friends, teachers, and collaborators."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
              className="glass-panel glass-panel-hover flex h-full flex-col rounded-bubble p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline/10 bg-surface/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-glow/80">
                  <Radio size={11} className="animate-pulse-glow" />
                  Live Signal
                </span>
                <Quote size={18} className="text-violet-glow/40" />
              </div>

              <blockquote className="flex-1 text-sm leading-relaxed text-starlight/75">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline/10 pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-glow/70 via-violet-glow/50 to-navy font-display text-xs font-bold text-[#05060d]">
                  {item.name.trim().charAt(0) || '?'}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-starlight">{item.name}</p>
                  <p className="text-xs text-starlight/50">{item.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-starlight/30">
          Placeholder transmissions — swap these for real testimonials any time.
        </p>
      </div>
    </section>
  )
}
