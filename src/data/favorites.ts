import xxxTexture from '@/assets/favorites/xxx-texture.jpg'
import bieberTexture from '@/assets/favorites/bieber-texture.jpg'
import spongebobTexture from '@/assets/favorites/spongebob-texture.jpg'

export type FavoriteMedia = {
  id: string
  name: string
  category: 'Music' | 'Cartoon'
  tagline: string
  monogram: string
  texture: string
  mono: boolean
}

export const favorites: FavoriteMedia[] = [
  {
    id: 'xxxtentacion',
    name: 'XXXTentacion',
    category: 'Music',
    tagline: 'Raw, emotional, unforgettable sound.',
    monogram: 'X',
    texture: xxxTexture,
    mono: true,
  },
  {
    id: 'justin-bieber',
    name: 'Justin Bieber',
    category: 'Music',
    tagline: 'The soundtrack to growing up.',
    monogram: 'JB',
    texture: bieberTexture,
    mono: true,
  },
  {
    id: 'spongebob',
    name: 'SpongeBob SquarePants',
    category: 'Cartoon',
    tagline: 'Peak comfort-watch energy, every single time.',
    monogram: 'SB',
    texture: spongebobTexture,
    mono: false,
  },
]
