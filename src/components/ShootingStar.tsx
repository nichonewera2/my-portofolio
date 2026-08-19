export default function ShootingStar({
  top = '15%',
  left = '70%',
  delay = '0s',
}: {
  top?: string
  left?: string
  delay?: string
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute h-[2px] w-[90px] animate-shoot rounded-full bg-gradient-to-r from-transparent via-cyan-glow to-starlight"
      style={{ top, left, animationDelay: delay }}
    />
  )
}
