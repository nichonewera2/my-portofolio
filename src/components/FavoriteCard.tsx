import { motion } from 'framer-motion'
import { Music, Tv } from 'lucide-react'
import VinylDisc from '@/components/VinylDisc'
import { cn } from '@/lib/utils'
import type { FavoriteMedia } from '@/data/favorites'

export default function FavoriteCard({ media, index }: { media: FavoriteMedia; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
      className={cn(
        'group relative flex h-full flex-col justify-end overflow-hidden rounded-bubble border border-white/10 shadow-panel transition-all duration-500',
        media.mono ? 'hover:shadow-glow' : 'hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.4)]',
      )}
      style={{ aspectRatio: '4 / 3' }}
    >
      <img
        src={media.texture}
        alt=""
        aria-hidden="true"
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110',
          media.mono && 'saturate-0 contrast-125',
        )}
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

      {/* Spinning vinyl accent for music entries */}
      {media.category === 'Music' && (
        <VinylDisc
          size={56}
          className="absolute right-4 top-4 opacity-80 transition-opacity group-hover:opacity-100"
        />
      )}

      <div className="relative z-10 p-6">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-void/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-starlight/60 backdrop-blur-sm">
          {media.category === 'Music' ? <Music size={11} /> : <Tv size={11} />}
          {media.category}
        </span>
        <h3 className="font-display text-lg font-bold leading-tight text-starlight">
          {media.name}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-starlight/60">{media.tagline}</p>
      </div>
    </motion.div>
  )
}
