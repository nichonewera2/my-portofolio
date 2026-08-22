import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, Send, RotateCcw, AlertTriangle } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'

type Phase = 'idle' | 'launching' | 'sent' | 'error'

const MAX_LEN = 800
const MIN_ANIMATION_MS = 1200

// Deterministic-looking but slightly irregular particle trail offsets —
// generated once per module load, not per render, so the trail doesn't
// "jump" on re-renders.
const PARTICLES = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  dx: (i % 2 === 0 ? 1 : -1) * (8 + i * 6),
  delay: i * 0.045,
  size: i % 3 === 0 ? 5 : 3,
}))

export default function Feedback() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errorText, setErrorText] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)

  const canSubmit = message.trim().length > 0 && message.length <= MAX_LEN && phase === 'idle'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setPhase('launching')
    setErrorText('')

    const payload = {
      name: name.trim(),
      message: message.trim(),
      hp: honeypotRef.current?.value || '',
    }

    const started = Date.now()
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      const elapsed = Date.now() - started
      if (elapsed < MIN_ANIMATION_MS) {
        await new Promise((r) => setTimeout(r, MIN_ANIMATION_MS - elapsed))
      }

      if (!res.ok || !data.ok) {
        setErrorText(data?.error || 'Something went wrong. Please try again.')
        setPhase('error')
        return
      }

      setPhase('sent')
      setMessage('')
      setName('')
    } catch {
      const elapsed = Date.now() - started
      if (elapsed < MIN_ANIMATION_MS) {
        await new Promise((r) => setTimeout(r, MIN_ANIMATION_MS - elapsed))
      }
      setErrorText('Could not reach the server. Check your connection and try again.')
      setPhase('error')
    }
  }

  function reset() {
    setPhase('idle')
    setErrorText('')
  }

  return (
    <section id="feedback" className="relative overflow-hidden py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Open Channel"
          title="Send Feedback"
          description="Got a thought, a tip, or just want to say hi? Type a message below and beam it straight to my inbox."
        />

        <div className="mx-auto max-w-xl">
          <motion.div
            animate={phase === 'error' ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel relative overflow-hidden rounded-bubble p-6 sm:p-8"
          >
            {/* Console header strip */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-glow shadow-glow animate-pulse-glow" />
                <span className="flex h-2 w-2 rounded-full bg-violet-glow/70 shadow-glow animate-pulse-glow [animation-delay:0.4s]" />
                <span className="flex h-2 w-2 rounded-full bg-amber-glow/60 shadow-glow animate-pulse-glow [animation-delay:0.8s]" />
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-starlight/40">
                <Radio size={11} />
                Channel Open
              </span>
            </div>

            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                {(phase === 'idle' || phase === 'launching' || phase === 'error') && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    animate={{
                      opacity: phase === 'launching' ? 0 : 1,
                      scale: phase === 'launching' ? 0.92 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="space-y-4"
                  >
                    {/* Honeypot — hidden from real visitors, catches basic bots */}
                    <input
                      ref={honeypotRef}
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />

                    <div>
                      <label htmlFor="fb-name" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-starlight/40">
                        Callsign (optional)
                      </label>
                      <input
                        id="fb-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={80}
                        disabled={phase !== 'idle'}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-hairline/15 bg-surface/[0.04] px-4 py-2.5 text-sm text-starlight placeholder:text-starlight/30 outline-none transition-colors focus:border-cyan-glow/50 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="fb-message" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-starlight/40">
                        Transmission
                      </label>
                      <textarea
                        id="fb-message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
                        disabled={phase !== 'idle'}
                        rows={5}
                        placeholder="Type your message into the void..."
                        className="w-full resize-none rounded-xl border border-hairline/15 bg-surface/[0.04] px-4 py-3 text-sm text-starlight placeholder:text-starlight/30 outline-none transition-colors focus:border-cyan-glow/50 disabled:opacity-50"
                      />
                      <div className="mt-1 text-right font-mono text-[10px] text-starlight/30">
                        {message.length}/{MAX_LEN}
                      </div>
                    </div>

                    {phase === 'error' && (
                      <p className="flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-400/[0.06] px-3 py-2 text-xs text-status-red">
                        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                        {errorText}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="btn-bubble flex w-full items-center justify-center gap-2 bg-cyan-glow py-3 text-sm font-bold text-[#05060d] shadow-glow transition-shadow hover:shadow-[0_0_55px_-4px_rgba(94,234,212,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                    >
                      <Send size={15} />
                      {phase === 'launching' ? 'Transmitting…' : phase === 'error' ? 'Try Again' : 'Transmit'}
                    </button>
                  </motion.form>
                )}

                {phase === 'sent' && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex h-full min-h-[280px] flex-col items-center justify-center text-center"
                  >
                    <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="absolute rounded-full border border-cyan-glow/60"
                          initial={{ width: 16, height: 16, opacity: 0.8 }}
                          animate={{ width: 90, height: 90, opacity: 0 }}
                          transition={{
                            duration: 1.6,
                            repeat: 2,
                            delay: i * 0.4,
                            ease: 'easeOut',
                          }}
                        />
                      ))}
                      <Radio size={26} className="relative z-10 text-cyan-glow" />
                    </div>
                    <p className="font-display text-lg font-bold text-starlight">Transmission Received</p>
                    <p className="mt-1.5 max-w-xs text-sm text-starlight/50">
                      Your message just landed. Thanks for reaching out — I'll read it soon.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline/15 bg-surface/[0.04] px-4 py-2 font-mono text-xs text-starlight/60 transition-colors hover:text-starlight"
                    >
                      <RotateCcw size={12} />
                      Send another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Launch animation — the message becomes a small comet that
                  streaks upward with a trailing particle stream. Purely
                  decorative and pointer-events-none so it never blocks the
                  form beneath it while transitioning out. */}
              <AnimatePresence>
                {phase === 'launching' && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    {PARTICLES.map((p) => (
                      <motion.span
                        key={p.id}
                        className="absolute rounded-full bg-cyan-glow"
                        style={{ width: p.size, height: p.size }}
                        initial={{ x: 0, y: 10, opacity: 0 }}
                        animate={{
                          x: p.dx,
                          y: -160 - p.id * 6,
                          opacity: [0, 0.9, 0],
                        }}
                        transition={{
                          duration: 0.9,
                          delay: p.delay + 0.15,
                          ease: 'easeOut',
                        }}
                      />
                    ))}

                    <motion.div
                      className="absolute h-4 w-4 rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow shadow-glow"
                      initial={{ scale: 0.3, y: 0, opacity: 0 }}
                      animate={{
                        scale: [0.3, 1.15, 0.4],
                        y: [0, 0, -220],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.05, times: [0, 0.3, 1], ease: 'easeIn' }}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
