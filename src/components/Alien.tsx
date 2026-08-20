import { cn } from '@/lib/utils'

export default function Alien({
  size = 56,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none animate-float', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 80 80" fill="none" className="h-full w-full drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)]">
        <defs>
          <linearGradient id="alienBody" x1="20" y1="10" x2="60" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a7f5e4" />
            <stop offset="1" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        <path
          d="M40 6 C58 6 66 24 62 42 C60 54 52 62 40 74 C28 62 20 54 18 42 C14 24 22 6 40 6 Z"
          fill="url(#alienBody)"
        />
        <ellipse cx="28" cy="34" rx="8" ry="11" fill="#0d1226" />
        <ellipse cx="52" cy="34" rx="8" ry="11" fill="#0d1226" />
        <ellipse cx="25" cy="30" rx="2.4" ry="3" fill="#ffffff" opacity="0.8" />
        <ellipse cx="49" cy="30" rx="2.4" ry="3" fill="#ffffff" opacity="0.8" />
        <path d="M32 54 Q40 60 48 54" stroke="#0d1226" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
