import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import FavoriteCard from '@/components/FavoriteCard'
import Asteroid from '@/components/Asteroid'
import Planet from '@/components/Planet'
import { useParallax } from '@/hooks/useParallax'
import { favorites } from '@/data/favorites'

export default function Favorites() {
  const { ref, y } = useParallax<HTMLDivElement>(30)

  return (
    <section id="favorites" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <Planet size={40} hue="violet" variant="plain" className="absolute left-6 top-6 hidden lg:block" />
        <Asteroid size={20} className="absolute right-10 bottom-10 hidden lg:block" />
      </motion.div>

      <div className="section-shell">
        <SectionHeading
          eyebrow="Personal Frequency"
          title="On My Playlist"
          description="A little bit of what keeps me company off-screen — the music on repeat and the show that never gets old."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {favorites.map((media, index) => (
            <FavoriteCard key={media.id} media={media} index={index} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink-4">
          Tribute cards — stylised artwork, not official photography.
        </p>
      </div>
    </section>
  )
}
