/**
 * /api/save — the map editor's server hand.
 *
 * The GitHub token lives ONLY here, in Vercel env (GITHUB_TOKEN). The browser
 * never sees it. Auth is the map passphrase itself (FATE_MAP_PASS) — the same
 * phrase that unlocks fate.cx/map — so saving needs nothing the owner doesn't
 * already have.
 *
 * POST { pass, action: 'save',   edits: [{ file, from, to }] } → { sha }
 * POST { pass, action: 'flags',  flags: [artId] }              → { sha }
 * POST { pass, action: 'status', sha }                         → { found, status, conclusion }
 *
 * 'save' rewrites each unique literal in the named content file and pushes ONE
 * commit to main via the git data API. The ship workflow then tests + deploys;
 * a bad edit fails vitest and never goes live.
 */
import { createHash, timingSafeEqual } from 'node:crypto'

const REPO = 'fatecx/fate'
const BRANCH = 'main'
const FILE_OK = /^src\/content\/[A-Za-z0-9_\-\/]+\.ts$/

const sha256 = (s: string) => createHash('sha256').update(s).digest()

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store')
  // The map runs from a blob: page whose origin may be www.fate.cx while the
  // API lives on the apex — CORS must say yes. Auth is the passphrase in the
  // body (no cookies), so a wildcard is safe.
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const body = req.body ?? {}
  const want = process.env.FATE_MAP_PASS
  const token = process.env.GITHUB_TOKEN
  if (!want || !token) return res.status(500).json({ error: 'server not configured' })
  if (typeof body.pass !== 'string' || !timingSafeEqual(sha256(body.pass), sha256(want)))
    return res.status(401).json({ error: 'wrong passphrase' })

  const gh = async (method: string, path: string, payload?: unknown, raw = false) => {
    const r = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: raw ? 'application/vnd.github.raw' : 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'fate-map-editor',
      },
      body: payload ? JSON.stringify(payload) : undefined,
    })
    if (!r.ok) throw new Error(`GitHub ${method} ${path} → ${r.status}`)
    return raw ? r.text() : r.json()
  }

  try {
    if (body.action === 'status') {
      if (typeof body.sha !== 'string' || !/^[0-9a-f]{7,40}$/.test(body.sha))
        return res.status(400).json({ error: 'bad sha' })
      const runs = await gh('GET', `/actions/runs?head_sha=${body.sha}`)
      const run = runs.workflow_runs?.[0]
      return res.status(200).json({ found: !!run, status: run?.status ?? null, conclusion: run?.conclusion ?? null })
    }

    if (body.action === 'flags') {
      // The ART tab's remake list — one tracked JSON file, one commit.
      const flags = body.flags
      if (
        !Array.isArray(flags) || flags.length > 600 ||
        flags.some((f: unknown) => typeof f !== 'string' || !/^[a-z0-9_-]{1,80}$/i.test(f))
      )
        return res.status(400).json({ error: 'bad flags' })
      const content = JSON.stringify({ flagged: [...flags].sort() }, null, 2) + '\n'
      const base = (await gh('GET', `/git/ref/heads/${BRANCH}`)).object.sha
      const baseTree = (await gh('GET', `/git/commits/${base}`)).tree.sha
      const blob = await gh('POST', '/git/blobs', { content, encoding: 'utf-8' })
      const newTree = await gh('POST', '/git/trees', {
        base_tree: baseTree,
        tree: [{ path: 'art/flags.json', mode: '100644', type: 'blob', sha: blob.sha }],
      })
      const commit = await gh('POST', '/git/commits', {
        message: `Art flags from the map (${flags.length} flagged)`,
        tree: newTree.sha,
        parents: [base],
      })
      await gh('PATCH', `/git/refs/heads/${BRANCH}`, { sha: commit.sha })
      return res.status(200).json({ sha: commit.sha })
    }

    if (body.action === 'save') {
      const edits = body.edits
      if (!Array.isArray(edits) || edits.length === 0 || edits.length > 300)
        return res.status(400).json({ error: 'bad edits' })
      for (const e of edits)
        if (
          typeof e?.file !== 'string' || !FILE_OK.test(e.file) ||
          typeof e?.from !== 'string' || e.from.length === 0 ||
          typeof e?.to !== 'string'
        )
          return res.status(400).json({ error: 'bad edit shape (content files only)' })

      // Group by file, fetch once, replace each unique literal.
      const byFile = new Map<string, { from: string; to: string }[]>()
      for (const e of edits) {
        if (!byFile.has(e.file)) byFile.set(e.file, [])
        byFile.get(e.file)!.push(e)
      }
      const updates = new Map<string, string>()
      for (const [file, list] of byFile) {
        let src = (await gh('GET', `/contents/${file}?ref=${BRANCH}`, undefined, true)) as string
        for (const { from, to } of list) {
          const at = src.indexOf(from)
          if (at === -1)
            throw new Error(`${file}: original text not found — the source changed since this map was built; redeploy the map`)
          if (src.indexOf(from, at + 1) !== -1) throw new Error(`${file}: text is no longer unique`)
          src = src.slice(0, at) + to + src.slice(at + from.length)
        }
        updates.set(file, src)
      }

      // One commit for the whole save, straight onto main.
      const base = (await gh('GET', `/git/ref/heads/${BRANCH}`)).object.sha
      const baseTree = (await gh('GET', `/git/commits/${base}`)).tree.sha
      const tree: unknown[] = []
      for (const [file, content] of updates) {
        const blob = await gh('POST', '/git/blobs', { content, encoding: 'utf-8' })
        tree.push({ path: file, mode: '100644', type: 'blob', sha: blob.sha })
      }
      const newTree = await gh('POST', '/git/trees', { base_tree: baseTree, tree })
      const commit = await gh('POST', '/git/commits', {
        message: `Script edits from the map editor (${edits.length} block${edits.length > 1 ? 's' : ''})`,
        tree: newTree.sha,
        parents: [base],
      })
      await gh('PATCH', `/git/refs/heads/${BRANCH}`, { sha: commit.sha })
      return res.status(200).json({ sha: commit.sha })
    }

    return res.status(400).json({ error: 'unknown action' })
  } catch (err: any) {
    return res.status(502).json({ error: String(err?.message ?? err) })
  }
}
