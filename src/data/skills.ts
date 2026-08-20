export type SkillGroup = {
  id: string
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Bahasa Pemrograman',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'frameworks',
    label: 'Framework & Library',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'tools',
    label: 'Tools & Alur Kerja',
    items: ['Vite', 'Git', 'Vercel', 'VS Code'],
  },
  {
    id: 'learning',
    label: 'Sedang Dipelajari',
    items: ['Node.js', 'Integrasi API', 'Dasar-dasar UI/UX'],
  },
]
