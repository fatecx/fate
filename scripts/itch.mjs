/**
 * itch.io HTML5 package — a ZIP with index.html at the root.
 *
 *   npm run itch
 *
 * Uploads: itch.io → Edit game → Kind of project: HTML → Upload fate-itch.zip.
 * This embed plays locally (one life in the browser). No passkey, no Whop.
 */
import { existsSync, readdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'dist-itch')
const zip = resolve(root, 'fate-itch.zip')

rmSync(outDir, { recursive: true, force: true })
if (existsSync(zip)) rmSync(zip)

const env = { ...process.env, VITE_ITCH: '1' }
for (const k of ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY', 'VITE_DEV_TOOLS']) delete env[k]
env.VITE_SUPABASE_URL = ''
env.VITE_SUPABASE_ANON_KEY = ''
env.VITE_DEV_TOOLS = ''

const build = spawnSync('npx', ['vite', 'build', '--base', './', '--outDir', 'dist-itch'], {
  cwd: root,
  env,
  stdio: 'inherit',
})
if (build.status) process.exit(build.status ?? 1)

for (const name of [
  'leaderboard.html',
  'map',
  'music-v2',
  'music-candidates',
  'music-benchmarks',
  'music-directions',
  '.well-known',
]) {
  rmSync(resolve(outDir, name), { recursive: true, force: true })
}
try {
  for (const name of readdirSync(resolve(outDir, 'assets'))) {
    if (name.startsWith('leaderboard-')) rmSync(resolve(outDir, 'assets', name), { force: true })
  }
} catch {
  /* assets dir always exists after a vite build */
}

if (!existsSync(resolve(outDir, 'index.html'))) {
  console.error('itch: dist-itch/index.html missing')
  process.exit(1)
}

const zipped = spawnSync('zip', ['-r', '-X', zip, '.'], { cwd: outDir, stdio: 'inherit' })
if (zipped.status) process.exit(zipped.status ?? 1)

const size = spawnSync('du', ['-h', zip], { encoding: 'utf8' })
console.log(`\nitch HTML5 zip → ${zip}${size.stdout ? `  (${size.stdout.trim().split('\t')[0]})` : ''}`)
console.log('Upload as Kind: HTML. This ZIP has index.html at the root.')
