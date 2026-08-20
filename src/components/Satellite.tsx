import { cn } from '@/lib/utils'

export default function Satellite({
  size = 80,
  className,
  tilt = 15,
}: {
  size?: number
  className?: string
  tilt?: number
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none animate-spin-slower', className)}
      style={{ width: size, height: size, transformOrigin: '50% 50%' }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="h-full w-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <defs>
          <linearGradient id="satPanel" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#0d1226" />
          </linearGradient>
        </defs>

        {/* solar panels */}
        <rect x="2" y="38" width="26" height="24" rx="2" fill="url(#satPanel)" stroke="#5eead4" strokeWidth="1" />
        <rect x="72" y="38" width="26" height="24" rx="2" fill="url(#satPanel)" stroke="#5eead4" strokeWidth="1" />
        <line x1="28" y1="50" x2="40" y2="50" stroke="#9aa4c0" strokeWidth="3" />
        <line x1="60" y1="50" x2="72" y2="50" stroke="#9aa4c0" strokeWidth="3" />

        {/* body */}
        <rect x="40" y="36" width="20" height="28" rx="5" fill="#e8ebf5" stroke="#9aa4c0" strokeWidth="1.5" />
        <circle cx="50" cy="46" r="4" fill="#a78bfa" />

        {/* antenna */}
        <line x1="50" y1="36" x2="50" y2="18" stroke="#9aa4c0" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="16" r="3.5" fill="#fbbf7d" />
      </svg>
    </div>
  )
}
