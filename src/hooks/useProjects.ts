import { useCallback, useEffect, useState } from 'react'
import { FALLBACK_PROJECTS, type Project } from '@/data/projects'

// The Telegram bot commits updates straight to data/projects.json in this
// repo. raw.githubusercontent.com serves the latest committed content with
// permissive CORS, so the browser can fetch it directly with no backend of
// its own.
const GITHUB_OWNER = 'nichonewera2'
const GITHUB_REPO = 'my-portofolio'
const DATA_FILE_PATH = 'data/projects.json'

// Branch name isn't hardcoded — repos can default to "main", "master", or
// something else entirely, and getting this wrong would silently break
// every live update. We ask GitHub's API once (cached for the tab's
// session) instead of guessing.
let cachedBranch: string | null = null

async function resolveBranch(signal: AbortSignal): Promise<string> {
  if (cachedBranch) return cachedBranch

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, { signal })
    if (res.ok) {
      const info = await res.json()
      if (typeof info?.default_branch === 'string' && info.default_branch) {
        const branch = info.default_branch
        cachedBranch = branch
        return branch
      }
    }
    console.warn(
      `[useProjects] Couldn't read default branch from GitHub API (HTTP ${res.status}) — falling back to "main".`,
    )
  } catch (err) {
    console.warn('[useProjects] GitHub API request for default branch failed — falling back to "main".', err)
  }
  return 'main'
}

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
      const branchesToTry: string[] = []
      try {
        const branch = await resolveBranch(controller.signal)
        branchesToTry.push(branch)
        // Belt-and-suspenders: if the resolved branch's fetch somehow 404s
        // (e.g. cached a stale answer), also try the other common default.
        if (branch !== 'main') branchesToTry.push('main')
        if (branch !== 'master') branchesToTry.push('master')
      } catch {
        branchesToTry.push('main', 'master')
      }

      let lastError: unknown = null

      for (const branch of branchesToTry) {
        const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${branch}/${DATA_FILE_PATH}?_=${Date.now()}`
        try {
          const res = await fetch(url, { signal: controller.signal, cache: 'no-store' })
          if (!res.ok) {
            lastError = new Error(`HTTP ${res.status} fetching ${url}`)
            continue
          }

          const json = await res.json()
          const list = Array.isArray(json?.projects) ? json.projects : []
          const valid = list.filter(isValidProject) as Project[]

          if (valid.length === 0) {
            lastError = new Error(`"${url}" returned no valid projects`)
            continue
          }

          valid.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())

          if (!cancelled) {
            setProjects(valid)
            setIsFallback(false)
            setLoading(false)
          }
          return
        } catch (err) {
          lastError = err
        }
      }

      // Every branch attempt failed — fall back, and log exactly why so
      // it's debuggable from the browser console (F12 → Console).
      console.error(
        '[useProjects] Could not load live project data from any branch. Showing offline fallback data instead. Last error:',
        lastError,
      )
      if (!cancelled) {
        setProjects(FALLBACK_PROJECTS)
        setIsFallback(true)
        setLoading(false)
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
