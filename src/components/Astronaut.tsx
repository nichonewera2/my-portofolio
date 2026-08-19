import { cn } from '@/lib/utils'

type AstronautProps = {
  size?: number
  className?: string
  pose?: 'float' | 'wave'
  flip?: boolean
}

/**
 * A custom hand-built astronaut illustration — the mascot of the
 * "digital universe" concept. Floats gently, with a glassy visor that
 * catches a cyan/violet reflection to tie into the site's palette.
 */
export default function Astronaut({
  size = 180,
  className,
  pose = 'float',
  flip = false,
}: AstronautProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none',
        pose === 'wave' ? 'animate-bob-rotate' : 'animate-float-astro',
        className,
      )}
      style={{ width: size, height: size * 1.15, transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <svg viewBox="0 0 200 230" fill="none" className="h-full w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]">
        <defs>
          <linearGradient id="suitBody" x1="40" y1="70" x2="160" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f3f5fb" />
            <stop offset="1" stopColor="#c7ceE0" />
          </linearGradient>
          <linearGradient id="visorGlass" x1="60" y1="40" x2="140" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22d3ee" />
            <stop offset="0.55" stopColor="#0d1226" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="backpack" x1="70" y1="90" x2="130" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#dfe4f2" />
            <stop offset="1" stopColor="#aab2c9" />
          </linearGradient>
          <radialGradient id="helmetShine" cx="0.3" cy="0.25" r="0.6">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* backpack */}
        <rect x="72" y="98" width="56" height="76" rx="16" fill="url(#backpack)" />
        <rect x="80" y="108" width="14" height="22" rx="4" fill="#8791ad" opacity="0.6" />
        <rect x="106" y="108" width="14" height="22" rx="4" fill="#8791ad" opacity="0.6" />

        {/* tether */}
        <path
          d="M72 130 C 40 140, 24 165, 30 200"
          stroke="#5eead4"
          strokeWidth="2.5"
          strokeDasharray="1 7"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />

        {/* body suit */}
        <path
          d="M62 118 Q100 100 138 118 L146 190 Q100 212 54 190 Z"
          fill="url(#suitBody)"
          stroke="#9aa4c0"
          strokeWidth="1.5"
        />
        {/* chest panel */}
        <rect x="82" y="140" width="36" height="24" rx="6" fill="#0d1226" opacity="0.85" />
        <circle cx="91" cy="152" r="3" fill="#5eead4" />
        <circle cx="101" cy="152" r="3" fill="#a78bfa" />
        <circle cx="111" cy="152" r="3" fill="#fbbf7d" />

        {/* arms */}
        <path
          d="M62 122 Q40 128 36 156 Q34 172 48 178"
          stroke="#c7ceE0"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={
            pose === 'wave'
              ? 'M138 122 Q166 108 168 78 Q169 62 158 54'
              : 'M138 122 Q160 130 162 158 Q163 172 150 180'
          }
          stroke="#c7ceE0"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
        />
        {/* gloves */}
        <circle cx="47" cy="180" r="12" fill="#e8ebf5" stroke="#9aa4c0" strokeWidth="1.5" />
        <circle
          cx={pose === 'wave' ? 158 : 151}
          cy={pose === 'wave' ? 52 : 182}
          r="12"
          fill="#e8ebf5"
          stroke="#9aa4c0"
          strokeWidth="1.5"
        />

        {/* legs */}
        <path d="M74 188 Q70 208 76 222" stroke="#c7ceE0" strokeWidth="18" strokeLinecap="round" fill="none" />
        <path d="M124 188 Q128 208 122 222" stroke="#c7ceE0" strokeWidth="18" strokeLinecap="round" fill="none" />
        <circle cx="76" cy="222" r="10" fill="#dfe4f2" stroke="#9aa4c0" strokeWidth="1.5" />
        <circle cx="122" cy="222" r="10" fill="#dfe4f2" stroke="#9aa4c0" strokeWidth="1.5" />

        {/* helmet */}
        <circle cx="100" cy="66" r="46" fill="#f3f5fb" stroke="#9aa4c0" strokeWidth="1.5" />
        <circle cx="100" cy="66" r="46" fill="url(#helmetShine)" />
        {/* visor */}
        <ellipse cx="100" cy="68" rx="32" ry="28" fill="url(#visorGlass)" />
        <path
          d="M76 58 Q100 44 124 58"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* tiny reflected stars in visor */}
        <circle cx="88" cy="60" r="1.6" fill="#ffffff" opacity="0.9" />
        <circle cx="112" cy="72" r="1.2" fill="#ffffff" opacity="0.7" />
        <circle cx="100" cy="80" r="1" fill="#ffffff" opacity="0.6" />

        {/* helmet antenna */}
        <line x1="132" y1="34" x2="140" y2="20" stroke="#9aa4c0" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="140" cy="18" r="4" fill="#fbbf7d" />
      </svg>
    </div>
  )
}
