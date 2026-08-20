const PLANETS = [
  { name: 'Mercury', color: '#9a958c', size: 12 },
  { name: 'Venus', color: '#e0b872', size: 18 },
  { name: 'Earth', color: '#4fa8e0', size: 19 },
  { name: 'Mars', color: '#e0693f', size: 15 },
  { name: 'Jupiter', color: '#d9a06b', size: 34, banded: true },
  { name: 'Saturn', color: '#e8c98f', size: 30, ringed: true },
  { name: 'Uranus', color: '#8fd8d0', size: 22 },
  { name: 'Neptune', color: '#5470e0', size: 21 },
]

/**
 * A horizontal decorative strip showing all eight solar-system planets to
 * scale-ish, used as a section divider — a nod to "every planet" in the
 * digital universe.
 */
export default function SolarSystemStrip() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex max-w-4xl items-end justify-between gap-3 overflow-x-auto px-6 py-4 sm:gap-6"
    >
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {PLANETS.map((planet) => (
        <div key={planet.name} className="relative flex shrink-0 flex-col items-center gap-2">
          <div className="relative flex items-center justify-center" style={{ width: planet.size + 20, height: planet.size + 20 }}>
            {planet.ringed && (
              <div
                className="absolute rounded-full border border-amber-glow/40"
                style={{
                  width: planet.size * 1.9,
                  height: planet.size * 0.5,
                  transform: 'rotate(-18deg)',
                }}
              />
            )}
            <div
              className="rounded-full shadow-[0_0_16px_-2px_currentColor]"
              style={{
                width: planet.size,
                height: planet.size,
                backgroundColor: planet.color,
                color: planet.color,
                backgroundImage: planet.banded
                  ? `repeating-linear-gradient(0deg, ${planet.color}, ${planet.color} 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 6px)`
                  : undefined,
              }}
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-starlight/35">
            {planet.name}
          </span>
        </div>
      ))}
    </div>
  )
}
