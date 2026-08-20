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
}

import sitelensCover from '@/assets/covers/sitelens-cover.jpg'
import universeCover from '@/assets/covers/universe-cover.jpg'

export const projects: Project[] = [
  {
    id: 'sitelens',
    title: 'SiteLens',
    description:
      'A tool that captures a live visual snapshot of any website — just paste a URL and get an instant screenshot. Built to practice browser automation and clean, fast UI.',
    tags: ['Next.js', 'React', 'TypeScript', 'Playwright', 'Tailwind CSS'],
    status: 'In Progress',
    accent: 'cyan',
    cover: sitelensCover,
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
  },
]
