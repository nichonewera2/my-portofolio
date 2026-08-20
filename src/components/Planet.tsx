import { cn } from '@/lib/utils'

type PlanetProps = {
  size?: number
  className?: string
  hue?: 'cyan' | 'violet' | 'amber'
  variant?: 'ring' | 'saturn' | 'moon' | 'plain'
}

/**
 * A decorative CSS/SVG planet with several visual variants: a simple ring
 * world, a Saturn-style banded planet with a wide flat ring, a cratered
 * moon, or a plain glowing sphere. Used generously as ambient set-dressing.
 */
export default function Planet({ size = 120, className, hue = 'cyan', variant = 'ring' }: PlanetProps) {
  const gradient =
    hue === 'cyan'
      ? 'from-cyan-glow/70 via-cyan-bright/40 to-navy'
      : hue === 'violet'
        ? 'from-violet-glow/70 via-violet-deep/40 to-navy'
        : 'from-amber-glow/70 via-amber-glow/30 to-navy'

  if (variant === 'moon') {
    return (
      <div
        aria-hidden="true"
        className={cn('pointer-events-none relative animate-float-slow', className)}
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-starlight/80 via-white/40 to-navy shadow-glow">
          <span className="absolute left-[20%] top-[25%] h-[18%] w-[18%] rounded-full bg-navy/25" />
          <span className="absolute left-[55%] top-[50%] h-[14%] w-[14%] rounded-full bg-navy/20" />
          <span className="absolute left-[35%] top-[62%] h-[10%] w-[10%] rounded-full bg-navy/15" />
        </div>
      </div>
    )
  }

  if (variant === 'saturn') {
    return (
      <div
        aria-hidden="true"
        className={cn('pointer-events-none relative animate-float-slow', className)}
        style={{ width: size, height: size }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[999px] border-2 border-amber-glow/40 bg-amber-glow/5"
          style={{ width: size * 1.9, height: size * 0.42, transform: 'translate(-50%, -50%) rotate(-16deg)' }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[999px] border border-amber-glow/25"
          style={{ width: size * 1.6, height: size * 0.34, transform: 'translate(-50%, -50%) rotate(-16deg)' }}
        />
        <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-amber-glow/80 via-violet-glow/40 to-navy shadow-glow" />
      </div>
    )
  }

  if (variant === 'plain') {
    return (
      <div
        aria-hidden="true"
        className={cn('pointer-events-none animate-float-slow rounded-full bg-gradient-to-br shadow-glow', gradient, className)}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none relative animate-float-slow', className)}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
        style={{ width: size * 1.7, height: size * 0.5, transform: 'translate(-50%, -50%) rotate(-12deg)' }}
      />
      <div className={cn('absolute inset-[15%] rounded-full bg-gradient-to-br shadow-glow', gradient)} />
    </div>
  )
}
