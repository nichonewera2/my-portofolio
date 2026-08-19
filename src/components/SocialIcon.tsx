import { MessageCircle, Send, Instagram, Github, type LucideIcon } from 'lucide-react'
import type { SocialLink } from '@/data/socials'

const iconMap: Record<SocialLink['icon'], LucideIcon> = {
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Instagram,
  github: Github,
}

export default function SocialIcon({ icon, size = 18 }: { icon: SocialLink['icon']; size?: number }) {
  const Icon = iconMap[icon]
  return <Icon size={size} />
}
