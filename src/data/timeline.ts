import type { LucideIcon } from 'lucide-react'
import { Rocket, Code2, Sparkles, GraduationCap, Orbit } from 'lucide-react'

export type TimelineEntry = {
  id: string
  year: string
  title: string
  description: string
  icon: LucideIcon
}

// Placeholder journey milestones in the same "still learning, no fake
// titles" voice as the rest of the site (see src/data/profile.ts). Swap
// in real dates/milestones any time — the Timeline section re-flows
// automatically for any number of entries.
export const timeline: TimelineEntry[] = [
  {
    id: 'liftoff',
    year: 'Year 0',
    title: 'First "Hello, World"',
    description:
      'Wrote the first line of code that actually ran without crashing — and got hooked immediately.',
    icon: Rocket,
  },
  {
    id: 'school',
    year: 'Ongoing',
    title: 'Methodist 2 Rantau Prapat',
    description:
      'Still in school, still learning the fundamentals — treating every class and every bug as part of the same curriculum.',
    icon: GraduationCap,
  },
  {
    id: 'first-build',
    year: 'Milestone',
    title: 'First Real Project Shipped',
    description:
      'Moved from tutorials to building something of my own — small, rough around the edges, but genuinely mine.',
    icon: Code2,
  },
  {
    id: 'this-site',
    year: 'Latest',
    title: 'This Digital Universe',
    description:
      'Built this portfolio itself as a project — animation, layout, and interaction all part of the learning.',
    icon: Sparkles,
  },
  {
    id: 'next-orbit',
    year: 'Next',
    title: 'Whatever Comes Next',
    description:
      'The journey keeps going — new languages, new tools, new things to break and fix again.',
    icon: Orbit,
  },
]
