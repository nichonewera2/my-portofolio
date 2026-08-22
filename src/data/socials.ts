export type SocialLink = {
  id: string
  label: string
  href: string
  icon: 'whatsapp' | 'telegram' | 'instagram' | 'github'
}

// Ganti nilai href di bawah ini dengan link/nomor asli kamu.
export const socials: SocialLink[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://whatsapp.com/channel/0029Vb8d2OPHltY2iYUU8B03',
    icon: 'whatsapp',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/tr4llera',
    icon: 'telegram',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/ockck11',
    icon: 'instagram',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/nichonewera2',
    icon: 'github',
  },
]
