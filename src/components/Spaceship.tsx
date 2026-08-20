import { cn } from '@/lib/utils'

type SpaceshipProps = {
  size?: number
  className?: string
  tilt?: number
}

/**
 * A small rocket ship illustration with an animated flame trail.
 * Used as ambient decoration flying across sections.
 */
export default function Spaceship({ size = 90, className, tilt = -35 }: SpaceshipProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none animate-float-astro', className)}
      style={{ width: size, height: size * 1.3, transform: `rotate(${tilt}deg)` }}
    >
      <svg viewBox="0 0 100 140" fill="none" className="h-full w-full drop-shadow-[0_14px_22px_rgba(0,0,0,0.4)]">
        <defs>
          <linearGradient id="shipBody" x1="30" y1="0" x2="70" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f3f5fb" />
            <stop offset="1" stopColor="#b7bfd6" />
          </linearGradient>
          <linearGradient id="shipFlame" x1="50" y1="95" x2="50" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf7d" />
            <stop offset="0.5" stopColor="#5eead4" />
            <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="shipWindow" cx="0.35" cy="0.3" r="0.7">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#22d3ee" />
          </radialGradient>
        </defs>

        {/* fins */}
        <path d="M30 78 L10 108 L34 100 Z" fill="#a78bfa" />
        <path d="M70 78 L90 108 L66 100 Z" fill="#5eead4" />

        {/* body */}
        <path
          d="M50 6 C70 24 76 58 68 96 L32 96 C24 58 30 24 50 6 Z"
          fill="url(#shipBody)"
          stroke="#9aa4c0"
          strokeWidth="1.5"
        />

        {/* window */}
        <circle cx="50" cy="46" r="14" fill="url(#shipWindow)" stroke="#f3f5fb" strokeWidth="3" />
        <circle cx="46" cy="42" r="3" fill="#ffffff" opacity="0.7" />

        {/* base ring */}
        <rect x="32" y="94" width="36" height="10" rx="4" fill="#dfe4f2" stroke="#9aa4c0" strokeWidth="1" />

        {/* flame */}
        <path
          d="M40 104 Q50 138 60 104 Q52 116 50 104 Q48 116 40 104 Z"
          fill="url(#shipFlame)"
        />
      </svg>
    </div>
  )
}
