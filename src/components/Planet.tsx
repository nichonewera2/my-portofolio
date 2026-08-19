import { cn } from '@/lib/utils'

type PlanetProps = {
  size?: number
  className?: string
  hue?: 'cyan' | 'violet'
  ring?: boolean
}

/**
 * A small decorative CSS-only planet with an optional orbital ring.
 * Used sparingly as ambient set-dressing near section edges.
 */
export default function Planet({ size = 120, className, hue = 'cyan', ring = true }: PlanetProps) {
  const gradient =
    hue === 'cyan'
      ? 'from-cyan-glow/70 via-cyan-bright/40 to-navy'
      : 'from-violet-glow/70 via-violet-deep/40 to-navy'

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none relative animate-float-slow', className)}
      style={{ width: size, height: size }}
    >
      {ring && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
          style={{
            width: size * 1.7,
            height: size * 0.5,
            transform: 'translate(-50%, -50%) rotate(-12deg)',
          }}
        />
      )}
      <div
        className={cn(
          'absolute inset-[15%] rounded-full bg-gradient-to-br shadow-glow',
          gradient,
        )}
      />
    </div>
  )
}
