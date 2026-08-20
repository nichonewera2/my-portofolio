import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Music2 } from 'lucide-react'

const AUDIO_SRC = 'https://files.catbox.moe/ej02ic.mp3'

/**
 * Floating ambient-music toggle, fixed to the bottom-left corner. Shows a
 * slow-spinning ring (like a little orbiting record) and a tiny animated
 * equalizer while playing.
 */
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(true)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setReady(false))
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 sm:bottom-6 sm:left-6">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
      />

      <button
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Pause ambient music' : 'Play ambient music'}
        aria-pressed={playing}
        className="glass-panel group relative flex h-14 w-14 items-center justify-center rounded-full border-white/15 shadow-panel transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {/* orbiting ring, only spins while playing */}
        <motion.span
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={
            playing
              ? { duration: 5, repeat: Infinity, ease: 'linear' }
              : { duration: 0.4, ease: 'easeOut' }
          }
          className="absolute inset-1 rounded-full border border-dashed border-cyan-glow/40"
        >
          <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-glow shadow-glow" />
        </motion.span>

        {playing && (
          <span className="absolute -inset-1.5 animate-pulse-glow rounded-full bg-cyan-glow/10" />
        )}

        {playing ? (
          <Pause size={17} className="relative z-10 text-cyan-glow" fill="currentColor" />
        ) : (
          <Music2 size={17} className="relative z-10 text-starlight/80" />
        )}
      </button>

      {/* mini equalizer bars */}
      {playing && (
        <div className="mt-2 flex items-end justify-center gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
              transition={{
                duration: 0.9 + i * 0.15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-[3px] rounded-full bg-cyan-glow/70"
              style={{ height: '30%' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
