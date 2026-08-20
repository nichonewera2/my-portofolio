export type SkillGroup = {
  id: string
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'tools',
    label: 'Tools & Workflow',
    items: ['Vite', 'Git', 'Vercel', 'VS Code'],
  },
  {
    id: 'learning',
    label: 'Currently Learning',
    items: ['Node.js', 'API integration', 'UI/UX fundamentals'],
  },
]
