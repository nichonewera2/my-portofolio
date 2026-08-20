import { useEffect, useState } from 'react'

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const MONTH = 30 * DAY
const YEAR = 365 * DAY

export function formatRelativeTime(iso: string, now: number = Date.now()): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''

  const diff = now - then
  if (diff < 0) return 'Just now'
  if (diff < MINUTE) return 'Just now'
  if (diff < HOUR) {
    const m = Math.floor(diff / MINUTE)
    return `${m} minute${m === 1 ? '' : 's'} ago`
  }
  if (diff < DAY) {
    const h = Math.floor(diff / HOUR)
    return `${h} hour${h === 1 ? '' : 's'} ago`
  }
  if (diff < MONTH) {
    const d = Math.floor(diff / DAY)
    return `${d} day${d === 1 ? '' : 's'} ago`
  }
  if (diff < YEAR) {
    const mo = Math.floor(diff / MONTH)
    return `${mo} month${mo === 1 ? '' : 's'} ago`
  }
  const y = Math.floor(diff / YEAR)
  return `${y} year${y === 1 ? '' : 's'} ago`
}

/**
 * Renders "Added 3 hours ago" and keeps itself in sync — no page reload
 * needed. Refresh cadence scales with age so it stays cheap for old
 * projects but still feels live for ones added minutes ago.
 */
export default function TimeAgo({ iso, className }: { iso: string; className?: string }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const ageMs = Date.now() - new Date(iso).getTime()
    const intervalMs = ageMs < HOUR ? 15_000 : ageMs < DAY ? 60_000 : 10 * MINUTE

    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [iso])

  const label = formatRelativeTime(iso, now)
  if (!label) return null

  return (
    <time dateTime={iso} title={new Date(iso).toLocaleString('en-US')} className={className}>
      Added {label}
    </time>
  )
}
