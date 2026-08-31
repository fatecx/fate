import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const here = path.dirname(fileURLToPath(import.meta.url))
const pageUrl = 'file://' + path.join(here, 'stage.html')
const stills = process.argv.includes('--stills')
const PORT = 9333
const FPS = 24
const DUR = 60
const TIMES = [
  2.0, 7.2, 16.2, 17.2, 21.5, 25.0,
  28.6, 31.5, 38.6, 41.5, 44.9, 46.6, 55.6,
]

const userData = '/tmp/fate-trailer-cdp-' + process.pid
fs.mkdirSync(userData, { recursive: true })

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${userData}`,
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  '--allow-file-access-from-files',
  '--force-device-scale-factor=1',
  '--window-size=1920,1080',
  '--disable-extensions',
  '--disable-sync',
  'about:blank',
], { stdio: ['ignore', 'pipe', 'pipe'] })

chrome.stderr.on('data', (d) => {
  const s = d.toString()
  if (/ERROR|DevTools|listening/.test(s)) process.stderr.write(s)
})

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)) }

async function waitCdp() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (r.ok) return await r.json()
    } catch {}
    await sleep(200)
  }
  throw new Error('Chrome CDP did not come up')
}

function attach(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let id = 0
    const pending = new Map()
    ws.addEventListener('open', () => {
      const send = (method, params = {}) => new Promise((res, rej) => {
        const i = ++id
        pending.set(i, { res, rej })
        ws.send(JSON.stringify({ id: i, method, params }))
      })
      resolve({ ws, send })
    })
    ws.addEventListener('error', reject)
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id)
        pending.delete(msg.id)
        if (msg.error) rej(msg.error)
        else res(msg.result)
      }
    })
  })
}

let exitCode = 0
try {
  await waitCdp()
  const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
  let tab = tabs.find((t) => t.type === 'page')
  if (!tab) {
    await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(pageUrl)}`)
    await sleep(400)
    const tabs2 = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
    tab = tabs2.find((t) => t.type === 'page')
  }
  if (!tab) throw new Error('no page target')
  const { ws, send } = await attach(tab.webSocketDebuggerUrl)
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false,
  })
  await send('Page.navigate', { url: pageUrl })
  await send('Page.loadEventFired').catch(() => {})
  // loadEventFired is an event, not a command — wait a beat and poll fonts
  for (let i = 0; i < 40; i++) {
    const r = await send('Runtime.evaluate', {
      expression: `Promise.all([document.fonts.ready, Promise.all([...document.images].map(img => img.complete ? 1 : new Promise(r => { img.onload = img.onerror = r })))]).then(()=>true)`,
      awaitPromise: true,
    })
    if (r.result?.value) break
    await sleep(100)
  }
  await sleep(300)

  async function shot(t, dest) {
    await send('Runtime.evaluate', { expression: `seek(${t})` })
    const { data } = await send('Page.captureScreenshot', {
      format: 'jpeg', quality: 84, fromSurface: true, optimizeForSpeed: true,
    })
    fs.writeFileSync(dest, Buffer.from(data, 'base64'))
  }

  if (stills) {
    const dir = path.join(here, 'stills')
    fs.mkdirSync(dir, { recursive: true })
    for (const t of TIMES) {
      const name = `t${t.toFixed(1).replace('.', 'p')}.jpg`
      await shot(t, path.join(dir, name))
      console.log('still', name)
    }
  } else {
    const dir = path.join(here, 'frames')
    fs.mkdirSync(dir, { recursive: true })
    const n = FPS * DUR
    const t0 = Date.now()
    for (let i = 0; i < n; i++) {
      const t = i / FPS
      await shot(t, path.join(dir, `f${String(i).padStart(5, '0')}.jpg`))
      if (i % 48 === 0) {
        const elapsed = (Date.now() - t0) / 1000
        console.log(`${i}/${n} t=${t.toFixed(2)} ${(i / Math.max(0.001, elapsed)).toFixed(1)} f/s`)
      }
    }
    console.log('frames', n)
  }
  ws.close()
} catch (err) {
  console.error(err)
  exitCode = 1
} finally {
  chrome.kill('SIGTERM')
  setTimeout(() => { try { chrome.kill('SIGKILL') } catch {} process.exit(exitCode) }, 800)
}
