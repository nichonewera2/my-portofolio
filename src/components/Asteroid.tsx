import { cn } from '@/lib/utils'

export default function Asteroid({
  size = 30,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none animate-spin-slow', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" className="h-full w-full opacity-70">
        <path
          d="M8 14 L18 6 L30 10 L36 20 L30 32 L16 34 L6 26 Z"
          fill="#4b5270"
          stroke="#7c8299"
          strokeWidth="1"
        />
        <circle cx="16" cy="18" r="2.5" fill="#33384e" />
        <circle cx="25" cy="24" r="2" fill="#33384e" />
        <circle cx="22" cy="14" r="1.5" fill="#33384e" />
      </svg>
    </div>
  )
}
