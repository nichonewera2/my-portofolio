// Vercel serverless function — adds a new comment to data/comments.json in
// the GitHub repo. Enforces "one comment per visitor" using a salted hash
// of their IP address, stored separately in data/comments-guard.json so the
// raw IP itself is never written anywhere, and the guard file is never
// fetched by the browser (only this function reads it).
//
// Required environment variables (Vercel → Settings → Environment Variables):
//   GITHUB_TOKEN   — same token used by the Termux bot
//   GITHUB_OWNER   — nichonewera2
//   GITHUB_REPO    — my-portofolio
//   IP_HASH_SECRET — any random long string, used to salt the IP hash so it
//                    can't be brute-forced back to a real IP address

import { createHash } from 'node:crypto'

const DATA_PATH = 'data/comments.json'
const GUARD_PATH = 'data/comments-guard.json'
const MAX_NAME_LEN = 40
const MAX_COMMENT_LEN = 300
const MAX_STORED = 50 // keep some history in the repo even though the site only shows the latest 3

function hashIp(ip, secret) {
  return createHash('sha256').update(`${ip}::${secret}`).digest('hex')
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

async function githubRequest(path, token, owner, repo, options = {}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const res = await fetch(options.method === 'GET' || !options.method ? `${url}?ref=main` : url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  })
  return res
}

async function getJsonFile(path, token, owner, repo) {
  const res = await githubRequest(path, token, owner, repo, { method: 'GET' })
  if (res.status === 404) return { data: null, sha: null }
  if (!res.ok) throw new Error(`GitHub read failed for ${path}: HTTP ${res.status}`)
  const body = await res.json()
  const content = Buffer.from(body.content, 'base64').toString('utf-8')
  return { data: JSON.parse(content), sha: body.sha }
}

async function putJsonFile(path, token, owner, repo, data, message, sha) {
  const content = Buffer.from(JSON.stringify(data, null, 2), 'utf-8').toString('base64')
  const res = await githubRequest(path, token, owner, repo, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content, branch: 'main', ...(sha ? { sha } : {}) }),
  })
  if (res.status === 409) return { conflict: true }
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GitHub write failed for ${path}: HTTP ${res.status} ${text.slice(0, 200)}`)
  }
  return { conflict: false }
}

/** Writes a JSON file, retrying once on a 409 (someone else wrote to it
 * in between our read and write — refetch the latest sha and try again). */
async function putJsonFileWithRetry(path, token, owner, repo, mutate, message) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data, sha } = await getJsonFile(path, token, owner, repo)
    const nextData = mutate(data)
    const result = await putJsonFile(path, token, owner, repo, nextData, message, sha)
    if (!result.conflict) return
  }
  throw new Error(`GitHub write kept conflicting for ${path} after retry`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const pepper = process.env.IP_HASH_SECRET
  if (!token || !owner || !repo || !pepper) {
    console.error('[api/comments] Missing GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO / IP_HASH_SECRET')
    res.status(500).json({ error: 'Server is not configured yet.' })
    return
  }

  const body = req.body || {}
  const { name, comment, hp } = body

  if (hp) {
    // Honeypot tripped — pretend success, do nothing further.
    res.status(200).json({ ok: true })
    return
  }

  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanComment = typeof comment === 'string' ? comment.trim() : ''

  if (!cleanName || !cleanComment) {
    res.status(400).json({ error: 'Name and comment are both required.' })
    return
  }
  if (cleanName.length > MAX_NAME_LEN) {
    res.status(400).json({ error: `Name must be ${MAX_NAME_LEN} characters or fewer.` })
    return
  }
  if (cleanComment.length > MAX_COMMENT_LEN) {
    res.status(400).json({ error: `Comment must be ${MAX_COMMENT_LEN} characters or fewer.` })
    return
  }

  const ip = getClientIp(req)
  const ipHash = hashIp(ip, pepper)

  try {
    // 1. Check (and reserve) the guard file first, so two rapid submissions
    //    from the same IP can't both slip through before either is recorded.
    let alreadyCommented = false
    await putJsonFileWithRetry(
      GUARD_PATH,
      token,
      owner,
      repo,
      (data) => {
        const hashes = Array.isArray(data?.hashes) ? data.hashes : []
        if (hashes.includes(ipHash)) {
          alreadyCommented = true
          return { hashes } // unchanged
        }
        return { hashes: [...hashes, ipHash] }
      },
      'Record commenter (guard)',
    )

    if (alreadyCommented) {
      res.status(403).json({ error: "Looks like you've already left a comment. Thanks for stopping by!" })
      return
    }

    // 2. Append the actual comment to the public list.
    const newComment = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      name: cleanName,
      comment: cleanComment,
      createdAt: new Date().toISOString(),
    }

    try {
      await putJsonFileWithRetry(
        DATA_PATH,
        token,
        owner,
        repo,
        (data) => {
          const list = Array.isArray(data?.comments) ? data.comments : []
          const updated = [newComment, ...list].slice(0, MAX_STORED)
          return { comments: updated }
        },
        `New comment from ${cleanName}`,
      )
    } catch (writeErr) {
      // The comment itself failed to save — free up the guard slot we just
      // reserved so this visitor isn't permanently locked out over a
      // transient failure, then report the error.
      try {
        await putJsonFileWithRetry(
          GUARD_PATH,
          token,
          owner,
          repo,
          (data) => {
            const hashes = Array.isArray(data?.hashes) ? data.hashes : []
            return { hashes: hashes.filter((h) => h !== ipHash) }
          },
          'Rollback guard after failed comment write',
        )
      } catch (rollbackErr) {
        console.error('[api/comments] Rollback also failed:', rollbackErr)
      }
      throw writeErr
    }

    res.status(200).json({ ok: true, comment: newComment })
  } catch (err) {
    console.error('[api/comments] Unexpected error:', err)
    res.status(500).json({ error: 'Unexpected server error. Please try again later.' })
  }
}
