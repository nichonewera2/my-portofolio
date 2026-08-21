import { Home, Radar } from 'lucide-react'
import Planet from '@/components/Planet'
import Asteroid from '@/components/Asteroid'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Planet size={90} hue="violet" variant="moon" className="absolute left-[10%] top-[18%] opacity-70" />
      <Asteroid size={26} className="absolute right-[12%] top-[26%] opacity-60" />
      <Planet size={60} hue="neptune" variant="plain" className="absolute right-[8%] bottom-[16%] opacity-60" />

      <span className="eyebrow mb-6">
        <Radar size={13} className="animate-pulse-glow" />
        Signal Lost
      </span>

      <h1 className="font-display text-[5rem] font-black leading-none text-gradient sm:text-[7rem]">
        404
      </h1>
      <p className="mt-4 max-w-md text-lg font-semibold text-starlight">
        This coordinate doesn't exist in this universe.
      </p>
      <p className="mt-2 max-w-sm text-sm text-starlight/50">
        The page you're looking for may have drifted off, been renamed, or never existed at all.
      </p>

      <a
        href="/"
        className="btn-bubble mt-8 inline-flex items-center gap-2 bg-cyan-glow px-7 py-3 text-sm font-bold text-[#05060d] shadow-glow transition-shadow hover:shadow-[0_0_55px_-4px_rgba(94,234,212,0.6)]"
      >
        <Home size={16} />
        Back to home
      </a>
    </div>
  )
}
