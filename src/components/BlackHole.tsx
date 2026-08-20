import { cn } from '@/lib/utils'

/**
 * A stylised black hole: dark core with a swirling, glowing accretion
 * disk built from layered rotating gradient rings.
 */
export default function BlackHole({
  size = 140,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none relative', className)}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 animate-orbit-cw rounded-full border-2 border-transparent [background:conic-gradient(from_0deg,transparent,theme(colors.cyan.glow)_20%,transparent_40%)] opacity-70 [mask:radial-gradient(farthest-side,transparent_calc(100%-6px),black_calc(100%-5px))]" />
      <div className="absolute inset-[8%] animate-orbit-ccw rounded-full border-2 border-transparent [background:conic-gradient(from_90deg,transparent,theme(colors.violet.glow)_25%,transparent_45%)] opacity-60 [mask:radial-gradient(farthest-side,transparent_calc(100%-5px),black_calc(100%-4px))]" />
      <div className="absolute inset-[22%] animate-blackhole-pulse rounded-full bg-black shadow-[0_0_40px_14px_rgba(94,234,212,0.25)]" />
      <div className="absolute inset-[30%] rounded-full bg-black" />
    </div>
  )
}
