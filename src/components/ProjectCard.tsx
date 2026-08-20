import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'
import TimeAgo from '@/components/TimeAgo'

const statusStyles: Record<Project['status'], string> = {
  Live: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  'In Progress': 'bg-amber-400/10 text-amber-300 border-amber-400/20',
  Prototype: 'bg-sky-400/10 text-sky-300 border-sky-400/20',
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accentGlow = project.accent === 'cyan' ? 'hover:shadow-glow' : 'hover:shadow-glow-violet'
  const accentBorder = project.accent === 'cyan' ? 'group-hover:border-cyan-glow/40' : 'group-hover:border-violet-glow/40'

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
      className={cn(
        'glass-panel glass-panel-hover group relative flex h-full flex-col overflow-hidden rounded-bubble transition-shadow duration-300',
        accentGlow,
      )}
    >
      {/* Cover image — 3:2 landscape */}
      <div
        className={cn(
          'relative aspect-[3/2] w-full overflow-hidden border-b border-hairline/10 transition-colors duration-300',
          accentBorder,
        )}
      >
        <img
          src={project.cover}
          alt={`${project.title} project preview`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
        {/* Fixed dark vignette — the image needs darkening regardless of site theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm',
              statusStyles[project.status],
            )}
          >
            {project.status}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 font-mono text-[10px] text-white/70 backdrop-blur-sm">
            <Clock size={10} />
            <TimeAgo iso={project.addedAt} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-lg font-bold text-starlight">{project.title}</h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-starlight/60">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-hairline/10 bg-surface/[0.03] px-2.5 py-1 font-mono text-[11px] text-starlight/55"
            >
              {tag}
            </span>
          ))}
        </div>

        {(project.link || project.codeLink) && (
          <div className="mt-6 flex items-center gap-4 border-t border-hairline/10 pt-5">
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
      </div>
    </motion.article>
  )
}
