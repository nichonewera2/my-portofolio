export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'Live' | 'In Progress' | 'Prototype'
  link?: string
  codeLink?: string
  accent: 'cyan' | 'violet'
  cover: string
  /** ISO 8601 timestamp — when the project was added. Powers the
   *  "added X hours ago" label. Set automatically by the Telegram bot. */
  addedAt: string
}

import sitelensCover from '@/assets/covers/sitelens-cover.jpg'
import universeCover from '@/assets/covers/universe-cover.jpg'

/**
 * Local fallback shown only if the live data fetch (see
 * src/hooks/useProjects.ts) fails — e.g. no internet connection, or the
 * data file hasn't been published yet. Keeps the section from ever
 * rendering empty. The Telegram bot does NOT edit this file — it edits
 * data/projects.json in the GitHub repo instead.
 */
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'sitelens',
    title: 'SiteLens',
    description:
      'A tool that captures a live visual snapshot of any website — just paste a URL and get an instant screenshot. Built to practice browser automation and clean, fast UI.',
    tags: ['Next.js', 'React', 'TypeScript', 'Playwright', 'Tailwind CSS'],
    status: 'In Progress',
    accent: 'cyan',
    cover: sitelensCover,
    addedAt: '2026-06-01T09:00:00.000Z',
  },
  {
    id: 'digital-universe',
    title: "Nicholas' Digital Universe",
    description:
      'This very portfolio — a cinematic, space-themed site built to push my skills in animation, layout systems, and interactive design beyond a basic template.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    accent: 'violet',
    cover: universeCover,
    codeLink: 'https://github.com/nichonewera2/my-portofolio',
    addedAt: '2026-08-20T09:00:00.000Z',
  },
]
