import { useState } from 'react'
import { motion } from 'framer-motion'
import photo1 from '@/assets/nicholas-profile.jpg'
import photo2 from '@/assets/nicholas-profile-alt.jpg'
import photo3 from '@/assets/nicholas-profile-2.jpg'
import photo4 from '@/assets/nicholas-profile-3.jpg'

const PHOTOS = [photo1, photo2, photo3, photo4]

/**
 * The signature element of the hero: a HUD-style identity frame that spins
 * to the next photo on every click/tap, like a scanning ID card cycling
 * through profiles — 4 photos, click as many times as you like.
 *
 * Implementation note: this still uses a classic 2-sided 3D flip (only two
 * faces exist in the DOM), but the currently-hidden face's image is
 * swapped to the *next* photo in the sequence the instant it goes out of
 * view, and the card keeps spinning one direction (0°, 180°, 360°, 540°…)
 * rather than flip-flopping back and forth. That's what makes 4 distinct
 * photos work with only two physical faces.
 */
export default function IdentityFrame() {
  const [step, setStep] = useState(0)

  const frontIndex = step % PHOTOS.length
  const backIndex = (step + 1) % PHOTOS.length
  const stepIsEven = step % 2 === 0

  // Face A is fixed at local rotateY(0), Face B at local rotateY(180).
  // Whichever one is currently facing the viewer gets `frontIndex`; the
  // hidden one is pre-loaded with `backIndex` so it's ready before it
  // rotates into view on the next click.
  const faceAIndex = stepIsEven ? frontIndex : backIndex
  const faceBIndex = stepIsEven ? backIndex : frontIndex

  return (
    <div className="relative mx-auto flex h-[320px] w-[280px] items-center justify-center sm:h-[380px] sm:w-[330px]">
      {/* Orbiting ring */}
      <div className="absolute inset-0 -m-6 animate-spin-slower rounded-full border border-cyan-glow/20" />
      <div className="absolute inset-0 -m-10 animate-spin-reverse rounded-full border border-dashed border-violet-glow/15" />

      {/* Orbiting dot marker */}
      <div className="absolute inset-0 -m-6 animate-spin-slower">
        <div className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-glow shadow-glow" />
      </div>

      <button
        onClick={() => setStep((s) => s + 1)}
        aria-label="Show next photo"
        className="group relative h-full w-full [perspective:1200px]"
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: step * 180 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Face A */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <FrameFace src={PHOTOS[faceAIndex]} index={faceAIndex} />
          </div>
          {/* Face B */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <FrameFace src={PHOTOS[faceBIndex]} index={faceBIndex} />
          </div>
        </motion.div>
      </button>

      <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-4">
        tap to rotate
      </span>
    </div>
  )
}

function FrameFace({ src, index }: { src: string; index: number }) {
  const label = `IDENT // ${String(index + 1).padStart(3, '0')}`

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[36px] border border-hairline/15 bg-navy shadow-panel">
      <img
        src={src}
        alt="Nicholas Orlando Hutajulu"
        className="h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-cyan-glow/10" />

      {/* Corner brackets */}
      {(['top-2 left-2 border-l border-t', 'top-2 right-2 border-r border-t', 'bottom-2 left-2 border-l border-b', 'bottom-2 right-2 border-r border-b'] as const).map(
        (pos) => (
          <span
            key={pos}
            className={`absolute h-4 w-4 border-cyan-glow/70 ${pos}`}
          />
        ),
      )}

      <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-glow">
          {label}
        </span>
      </div>
    </div>
  )
}
