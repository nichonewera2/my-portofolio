export type SocialLink = {
  id: string
  label: string
  href: string
  icon: 'whatsapp' | 'telegram' | 'instagram' | 'github'
}

// Replace the href values below with your real links/numbers.
export const socials: SocialLink[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/6281234567890',
    icon: 'whatsapp',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/Nicholas_ofc',
    icon: 'telegram',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/Nicholas.ofc',
    icon: 'instagram',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/',
    icon: 'github',
  },
]
