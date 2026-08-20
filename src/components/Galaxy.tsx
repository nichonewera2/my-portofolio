import galaxyTexture from '@/assets/galaxy-texture.png'
import { cn } from '@/lib/utils'

export default function Galaxy({
  size = 220,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none relative animate-galaxy-spin opacity-80', className)}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-[-20%] animate-glow-pulse-lg rounded-full bg-violet-glow/20 blur-2xl" />
      <img
        src={galaxyTexture}
        alt=""
        className="relative h-full w-full object-contain mix-blend-screen"
        draggable={false}
      />
    </div>
  )
}
