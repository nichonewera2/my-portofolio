import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import Satellite from '@/components/Satellite'
import Planet from '@/components/Planet'
import { skillGroups } from '@/data/skills'

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      <Satellite size={64} className="absolute right-6 top-10 hidden lg:block" />
      <Planet size={40} hue="cyan" variant="plain" className="absolute left-4 bottom-16 hidden lg:block" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="Sistem Onboard"
          title="Skill & Tools"
          description="Teknologi yang aku pakai untuk mewujudkan ide dari konsep sampai jadi sesuatu yang benar-benar jalan di browser."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: groupIndex * 0.08 }}
              className="glass-panel glass-panel-hover rounded-bubble p-6"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-violet-glow/80">
                {group.label}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5 text-sm text-starlight/70">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-cyan-glow" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
