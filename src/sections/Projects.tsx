import { motion } from 'framer-motion'
import { RefreshCw, WifiOff } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import Spaceship from '@/components/Spaceship'
import Asteroid from '@/components/Asteroid'
import Planet from '@/components/Planet'
import { useParallax } from '@/hooks/useParallax'
import { useProjects } from '@/hooks/useProjects'

function ProjectCardSkeleton() {
  return (
    <div className="glass-panel flex h-full animate-pulse flex-col overflow-hidden rounded-bubble">
      <div className="aspect-[3/2] w-full bg-surface/[0.06]" />
      <div className="flex flex-1 flex-col gap-3 p-7">
        <div className="h-4 w-2/3 rounded bg-surface/[0.08]" />
        <div className="h-3 w-full rounded bg-surface/[0.05]" />
        <div className="h-3 w-5/6 rounded bg-surface/[0.05]" />
        <div className="mt-2 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-surface/[0.06]" />
          <div className="h-6 w-16 rounded-full bg-surface/[0.06]" />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, y } = useParallax<HTMLDivElement>(35)
  const { projects, loading, isFallback, refresh } = useProjects()

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

        {isFallback && !loading && (
          <button
            type="button"
            onClick={refresh}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline/15 bg-surface/[0.04] px-3.5 py-1.5 font-mono text-[11px] text-starlight/50 transition-colors hover:text-starlight/80"
          >
            <WifiOff size={12} />
            Showing offline data — couldn't reach the live project list
            <RefreshCw size={12} />
          </button>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => <ProjectCardSkeleton key={i} />)
            : projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
        </div>
      </div>
    </section>
  )
}
