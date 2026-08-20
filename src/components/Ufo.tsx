import { cn } from '@/lib/utils'

export default function Ufo({
  size = 90,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none animate-float', className)}
      style={{ width: size, height: size * 0.75 }}
    >
      <svg viewBox="0 0 120 90" fill="none" className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]">
        <defs>
          <linearGradient id="ufoDome" x1="40" y1="10" x2="80" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#5eead4" />
          </linearGradient>
          <linearGradient id="ufoBody" x1="10" y1="40" x2="110" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e8ebf5" />
            <stop offset="1" stopColor="#aab2c9" />
          </linearGradient>
          <linearGradient id="ufoBeam" x1="60" y1="55" x2="60" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf7d" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fbbf7d" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* beam */}
        <path d="M40 54 L80 54 L100 90 L20 90 Z" fill="url(#ufoBeam)" />

        {/* dome */}
        <path d="M40 40 Q42 12 60 12 Q78 12 80 40 Z" fill="url(#ufoDome)" opacity="0.9" />
        <ellipse cx="60" cy="40" rx="24" ry="8" fill="#0d1226" opacity="0.35" />

        {/* body */}
        <ellipse cx="60" cy="48" rx="58" ry="14" fill="url(#ufoBody)" stroke="#9aa4c0" strokeWidth="1.5" />
        <ellipse cx="60" cy="46" rx="40" ry="7" fill="#c7ceE0" opacity="0.6" />

        {/* lights */}
        <circle cx="30" cy="50" r="3" fill="#fbbf7d" />
        <circle cx="60" cy="54" r="3" fill="#5eead4" />
        <circle cx="90" cy="50" r="3" fill="#a78bfa" />
      </svg>
    </div>
  )
}
