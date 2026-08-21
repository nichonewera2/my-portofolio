import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, CheckCircle2, AlertTriangle, Send, RefreshCw } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import CommentAvatar from '@/components/CommentAvatar'
import TimeAgo from '@/components/TimeAgo'
import { useComments } from '@/hooks/useComments'

const MAX_NAME = 40
const MAX_COMMENT = 300
const STORAGE_KEY = 'nou_has_commented'

type Phase = 'idle' | 'submitting' | 'locked' | 'error'

export default function Comments() {
  const { comments, loading, isFallback, refresh } = useComments(3)
  const [phase, setPhase] = useState<Phase>('idle')
  const [justSubmitted, setJustSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [errorText, setErrorText] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) {
      setPhase('locked')
    }
  }, [])

  const canSubmit = name.trim().length > 0 && text.trim().length > 0 && phase === 'idle'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setPhase('submitting')
    setErrorText('')

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          comment: text.trim(),
          hp: honeypotRef.current?.value || '',
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.ok) {
        if (res.status === 403) {
          window.localStorage.setItem(STORAGE_KEY, '1')
          setPhase('locked')
          return
        }
        setErrorText(data?.error || 'Something went wrong. Please try again.')
        setPhase('error')
        return
      }

      window.localStorage.setItem(STORAGE_KEY, '1')
      setJustSubmitted(true)
      setPhase('locked')
      setName('')
      setText('')

      // raw.githubusercontent.com can take a few seconds to reflect a
      // commit made via the API — one immediate refetch can race ahead of
      // that propagation, so we retry a few times with backoff instead of
      // trusting a single fetch right after submit.
      const delays = [800, 2000, 4000, 7000]
      delays.forEach((ms) => window.setTimeout(refresh, ms))
    } catch {
      setErrorText('Could not reach the server. Check your connection and try again.')
      setPhase('error')
    }
  }

  return (
    <section id="comments" className="relative overflow-hidden py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Signal Log"
          title="Leave a Comment"
          description="A public log of messages from visitors — one entry per person, newest on top."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* --- Form --- */}
          <motion.div
            animate={phase === 'error' ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-bubble p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {phase === 'locked' ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full min-h-[220px] flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 size={36} className="mb-4 text-cyan-glow" />
                  <p className="font-display text-lg font-bold text-starlight">
                    {justSubmitted ? 'Comment logged!' : "You've already logged a comment"}
                  </p>
                  <p className="mt-1.5 max-w-xs text-sm text-starlight/50">
                    {justSubmitted
                      ? 'Thanks for leaving your mark on this page.'
                      : 'Each visitor gets one entry in the log — thanks for stopping by.'}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
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
                    <label htmlFor="c-name" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-starlight/40">
                      Your name
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value.slice(0, MAX_NAME))}
                      disabled={phase !== 'idle'}
                      placeholder="e.g. Alex"
                      className="w-full rounded-xl border border-hairline/15 bg-surface/[0.04] px-4 py-2.5 text-sm text-starlight placeholder:text-starlight/30 outline-none transition-colors focus:border-cyan-glow/50 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="c-text" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-starlight/40">
                      Comment
                    </label>
                    <textarea
                      id="c-text"
                      required
                      rows={4}
                      value={text}
                      onChange={(e) => setText(e.target.value.slice(0, MAX_COMMENT))}
                      disabled={phase !== 'idle'}
                      placeholder="Say something for the log..."
                      className="w-full resize-none rounded-xl border border-hairline/15 bg-surface/[0.04] px-4 py-3 text-sm text-starlight placeholder:text-starlight/30 outline-none transition-colors focus:border-cyan-glow/50 disabled:opacity-50"
                    />
                    <div className="mt-1 text-right font-mono text-[10px] text-starlight/30">
                      {text.length}/{MAX_COMMENT}
                    </div>
                  </div>

                  {phase === 'error' && (
                    <p className="flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-400/[0.06] px-3 py-2 text-xs text-red-300">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                      {errorText}
                    </p>
                  )}

                  <p className="text-[11px] text-starlight/30">One comment per visitor — make it count!</p>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="btn-bubble flex w-full items-center justify-center gap-2 bg-cyan-glow py-3 text-sm font-bold text-[#05060d] shadow-glow transition-shadow hover:shadow-[0_0_55px_-4px_rgba(94,234,212,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    <Send size={15} />
                    {phase === 'submitting' ? 'Logging…' : phase === 'error' ? 'Try Again' : 'Post Comment'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* --- Signal log list --- */}
          <div className="glass-panel relative overflow-hidden rounded-bubble p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-starlight/40">
              <span className="flex items-center gap-2">
                <Terminal size={13} className="text-cyan-glow" />
                Latest transmissions
              </span>
              <button
                type="button"
                onClick={refresh}
                className="flex items-center gap-1 rounded-full border border-hairline/10 px-2 py-1 text-[10px] normal-case tracking-normal text-starlight/40 transition-colors hover:text-starlight/70"
                aria-label="Refresh comments"
              >
                <RefreshCw size={11} />
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex animate-pulse gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-surface/[0.08]" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-3 w-1/3 rounded bg-surface/[0.08]" />
                      <div className="h-3 w-4/5 rounded bg-surface/[0.06]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length === 0 ? (
              <p className="py-8 text-center text-sm text-starlight/40">
                {isFallback ? "Couldn't load the log right now — try refreshing." : 'No comments yet — be the first to log one!'}
              </p>
            ) : (
              <ul className="space-y-3">
                {comments.map((c, i) => (
                  <motion.li
                    key={c.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                    className="group relative flex gap-3 overflow-hidden rounded-xl border border-hairline/10 bg-surface/[0.03] p-4"
                  >
                    {/* Left accent bar — pulses on the newest entry only */}
                    <span
                      className={`absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-glow to-violet-glow ${
                        i === 0 ? 'animate-pulse-glow' : 'opacity-30'
                      }`}
                    />
                    <CommentAvatar name={c.name} size={38} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                        <p className="truncate text-sm font-bold text-starlight">{c.name}</p>
                        <TimeAgo iso={c.createdAt} className="shrink-0 font-mono text-[10px] text-starlight/35" />
                      </div>
                      <p className="mt-1 break-words text-sm leading-snug text-starlight/70">{c.comment}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
