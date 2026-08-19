import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'

const statusStyles: Record<Project['status'], string> = {
  Live: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  'In Progress': 'bg-amber-400/10 text-amber-300 border-amber-400/20',
  Prototype: 'bg-sky-400/10 text-sky-300 border-sky-400/20',
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accentGlow = project.accent === 'cyan' ? 'hover:shadow-glow' : 'hover:shadow-glow-violet'

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
      className={cn(
        'glass-panel group relative flex h-full flex-col rounded-3xl p-7 transition-shadow duration-300',
        accentGlow,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-starlight">{project.title}</h3>
        <span
          className={cn(
            'shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider',
            statusStyles[project.status],
          )}
        >
          {project.status}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-starlight/60">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-starlight/55"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.link || project.codeLink) && (
        <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-glow transition-colors hover:text-cyan-bright"
            >
              Visit <ArrowUpRight size={14} />
            </a>
          )}
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-starlight/60 transition-colors hover:text-starlight"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}
