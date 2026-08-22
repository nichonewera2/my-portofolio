import { useState } from 'react'
import { motion } from 'framer-motion'
import profilePrimary from '@/assets/nicholas-profile.jpg'
import profileAlt from '@/assets/nicholas-profile-alt.jpg'

/**
 * The signature element of the hero: a HUD-style identity frame that flips
 * between two photos on click/tap, like a scanning ID card. Orbiting ring
 * and corner brackets reinforce the "digital universe" concept.
 */
export default function IdentityFrame() {
  const [flipped, setFlipped] = useState(false)

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
        onClick={() => setFlipped((v) => !v)}
        aria-label="Flip profile photo"
        className="group relative h-full w-full [perspective:1200px]"
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front face */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <FrameFace src={profilePrimary} label="IDENT // 001" />
          </div>
          {/* Back face */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <FrameFace src={profileAlt} label="IDENT // 002" />
          </div>
        </motion.div>
      </button>

      <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-4">
        tap to rotate
      </span>
    </div>
  )
}

function FrameFace({ src, label }: { src: string; label: string }) {
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
