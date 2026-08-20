export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'Live' | 'Dikerjakan' | 'Prototipe'
  link?: string
  codeLink?: string
  accent: 'cyan' | 'violet'
  cover: string
}

import sitelensCover from '@/assets/covers/sitelens-cover.png'
import universeCover from '@/assets/covers/universe-cover.png'

export const projects: Project[] = [
  {
    id: 'sitelens',
    title: 'SiteLens',
    description:
      'Sebuah tool yang mengambil tangkapan visual langsung dari sebuah website — cukup tempel URL, dapat screenshot instan. Dibangun untuk berlatih browser automation dan UI yang bersih serta cepat.',
    tags: ['Next.js', 'React', 'TypeScript', 'Playwright', 'Tailwind CSS'],
    status: 'Dikerjakan',
    accent: 'cyan',
    cover: sitelensCover,
  },
  {
    id: 'digital-universe',
    title: "Nicholas' Digital Universe",
    description:
      'Portofolio ini sendiri — sebuah situs bertema luar angkasa yang sinematik, dibangun untuk mendorong kemampuanku dalam animasi, sistem layout, dan desain interaktif melebihi template biasa.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    accent: 'violet',
    cover: universeCover,
  },
]
