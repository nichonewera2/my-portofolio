import { useCallback, useEffect, useState } from 'react'
import { FALLBACK_PROJECTS, type Project } from '@/data/projects'

// The Telegram bot commits updates straight to this file in the repo.
// raw.githubusercontent.com serves the latest committed content on the
// given branch, with permissive CORS, so the browser can fetch it
// directly with no backend of its own. Change GITHUB_BRANCH here if the
// repo's default branch is ever renamed (e.g. to "master").
const GITHUB_OWNER = 'nichonewera2'
const GITHUB_REPO = 'my-portofolio'
const GITHUB_BRANCH = 'main'
const DATA_URL = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/data/projects.json`

type ProjectsState = {
  projects: Project[]
  loading: boolean
  /** true only when the live fetch failed and we fell back to local data */
  isFallback: boolean
  refresh: () => void
}

function isValidProject(value: unknown): value is Project {
  if (!value || typeof value !== 'object') return false
  const p = value as Record<string, unknown>
  return (
    typeof p.id === 'string' &&
    typeof p.title === 'string' &&
    typeof p.description === 'string' &&
    Array.isArray(p.tags) &&
    typeof p.status === 'string' &&
    typeof p.accent === 'string' &&
    typeof p.cover === 'string' &&
    typeof p.addedAt === 'string'
  )
}

export function useProjects(): ProjectsState {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)
  const [tick, setTick] = useState(0)

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      try {
        // Cache-bust so edits from the bot show up right away instead of
        // waiting out the CDN's cache window.
        const res = await fetch(`${DATA_URL}?_=${Date.now()}`, {
          signal: controller.signal,
          cache: 'no-store',
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const json = await res.json()
        const list = Array.isArray(json?.projects) ? json.projects : []
        const valid = list.filter(isValidProject) as Project[]

        if (valid.length === 0) throw new Error('empty or malformed project list')

        // Newest first.
        valid.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())

        if (!cancelled) {
          setProjects(valid)
          setIsFallback(false)
        }
      } catch {
        if (!cancelled) {
          setProjects(FALLBACK_PROJECTS)
          setIsFallback(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [tick])

  return { projects, loading, isFallback, refresh }
}
