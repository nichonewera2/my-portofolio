import { useCallback, useEffect, useState } from 'react'

const GITHUB_OWNER = 'nichonewera2'
const GITHUB_REPO = 'my-portofolio'
const DATA_FILE_PATH = 'data/comments.json'

export type Comment = {
  id: string
  name: string
  comment: string
  createdAt: string
}

function isValidComment(value: unknown): value is Comment {
  if (!value || typeof value !== 'object') return false
  const c = value as Record<string, unknown>
  return (
    typeof c.id === 'string' &&
    typeof c.name === 'string' &&
    typeof c.comment === 'string' &&
    typeof c.createdAt === 'string'
  )
}

type CommentsState = {
  comments: Comment[]
  loading: boolean
  isFallback: boolean
  refresh: () => void
}

export function useComments(limit = 3): CommentsState {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)
  const [tick, setTick] = useState(0)

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      const branches = ['main', 'master']
      let lastError: unknown = null

      for (const branch of branches) {
        const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${branch}/${DATA_FILE_PATH}?_=${Date.now()}`
        try {
          const res = await fetch(url, { signal: controller.signal, cache: 'no-store' })
          if (!res.ok) {
            lastError = new Error(`HTTP ${res.status} fetching ${url}`)
            continue
          }
          const json = await res.json()
          const list = Array.isArray(json?.comments) ? json.comments : []
          const valid = (list.filter(isValidComment) as Comment[]).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )

          if (!cancelled) {
            setComments(valid.slice(0, limit))
            setIsFallback(false)
            setLoading(false)
          }
          return
        } catch (err) {
          lastError = err
        }
      }

      console.error('[useComments] Could not load comments from any branch. Last error:', lastError)
      if (!cancelled) {
        setComments([])
        setIsFallback(true)
        setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [tick, limit])

  return { comments, loading, isFallback, refresh }
}
