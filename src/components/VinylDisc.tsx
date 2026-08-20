import { cn } from '@/lib/utils'

export default function VinylDisc({
  size = 80,
  spinning = true,
  className,
}: {
  size?: number
  spinning?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(spinning && 'animate-spin-slow', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="48" fill="#0d0d10" stroke="#2a2a30" strokeWidth="1" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#222228" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="33" fill="none" stroke="#222228" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="#222228" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="19" fill="#a78bfa" opacity="0.85" />
        <circle cx="50" cy="50" r="19" fill="none" stroke="#5eead4" strokeWidth="0.8" opacity="0.6" />
        <circle cx="50" cy="50" r="3.5" fill="#05060d" />
      </svg>
    </div>
  )
}
