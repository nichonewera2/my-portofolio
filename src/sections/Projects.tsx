import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import Spaceship from '@/components/Spaceship'
import Asteroid from '@/components/Asteroid'
import Planet from '@/components/Planet'
import { useParallax } from '@/hooks/useParallax'
import { projects } from '@/data/projects'

export default function Projects() {
  const { ref, y } = useParallax<HTMLDivElement>(35)

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <Spaceship size={56} tilt={20} className="absolute right-4 top-4 hidden lg:block" />
        <Asteroid size={20} className="absolute left-8 bottom-10 hidden lg:block" />
        <Planet size={36} hue="neptune" variant="plain" className="absolute left-[46%] -top-6 hidden lg:block" />
      </motion.div>

      <div className="section-shell">
        <SectionHeading
          eyebrow="Mission Log"
          title="Projects"
          description="Small builds and bigger experiments — each one a step further into the universe of code."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
