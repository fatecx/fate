/**
 * The landing scroll — fate.cx's front door for a founder the game has never
 * met. Built like a film, paced like a pitch: key art first, the world, three
 * chapter title cards, then the play surface itself demonstrating the first
 * scene — the rail, the portrait, the typewriter, the choices — before any
 * ask. The first button on the page is the one that incorporates.
 * Copy and art live in src/content/landing.ts; this file only renders them.
 * Art never blocks: a missing print leaves a sigil field and the page reads on.
 */
import { CONTENT } from '../content/world'
import { getScene } from '../engine/reduce'
import { fetchDecisionSplit } from './cloud'
import { artUrl } from './assets'
import {
  HERO,
  HERO_ART,
  PITCH,
  CHAPTERS,
  CLIFFHANGER,
  FEATURES,
  RECORD,
  FINALE,
  PRICE_CHIP,
  CTA_LABEL,
  COVENANT,
  type LandingPanel,
} from '../content/landing'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** A pinned full-screen beat: kicker, optional head, subtitle-grade prose. */
function panelHtml(p: LandingPanel, extra = ''): string {
  return `
  <section class="ld-scene" data-art="${p.art ?? ''}">
    <div class="ld-beat">
      <div class="ld-kicker">${esc(p.kicker)}</div>
      ${p.head ? `<h2 class="ld-head">${esc(p.head)}</h2>` : ''}
      ${p.paras.map((t) => `<p class="ld-sub">${esc(t)}</p>`).join('')}
      ${extra}
    </div>
  </section>`
}

/** Chapter title cards — one full screen each, like the game's own datelines. */
function chapterHtml(): string {
  return CHAPTERS.map(
    (c) => `
  <section class="ld-scene" data-art="${c.art ?? ''}">
    <div class="ld-beat">
      <div class="ld-kicker">${esc(c.kicker)}</div>
      <h2 class="ld-chapter">${esc(c.name)}</h2>
      <p class="ld-sub">${esc(c.line)}</p>
    </div>
  </section>`,
  ).join('')
}

/** The choice's declared costs, exactly as the play surface wears them. */
function fxChips(effects: readonly { e: string; d?: number }[]): string {
  let money = 0
  let stress = 0
  let rep = 0
  let stake = 0
  for (const fx of effects) {
    if (fx.e === 'treasury') money += fx.d ?? 0
    else if (fx.e === 'stress') stress += fx.d ?? 0
    else if (fx.e === 'rep') rep += fx.d ?? 0
    else if (fx.e === 'stake') stake += fx.d ?? 0
  }
  const chips: string[] = []
  const chip = (good: boolean, label: string): void => {
    chips.push(`<span class="fx ${good ? 'good' : 'bad'}">${label}</span>`)
  }
  if (money) chip(money > 0, `${money > 0 ? '+' : '−'} cash`)
  if (stake) chip(stake < 0, `${stake > 0 ? '−' : '+'} equity`)
  if (stress) chip(stress < 0, `${stress > 0 ? '+' : '−'} stress`)
  if (rep) chip(rep > 0, `${rep > 0 ? '+' : '−'} cred`)
  return chips.length ? `<span class="fx-row">${chips.join('')}</span>` : ''
}

/** The play surface itself, demonstrating the first scene — a living screenshot.
 *  Prose lands sentence by sentence and the choices appear when it settles,
 *  exactly the mechanics of the real stage. No titles in the stream, no caret. */
function demoHtml(): string {
  const scene = getScene(CONTENT, 'hyperchute', CLIFFHANGER.sceneId)
  const speaker = scene.speaker ? CONTENT.characters[scene.speaker] : null
  return `
  <section class="ld-scene ld-tall" data-art="" data-demo>
    <div class="ld-beat ld-wide">
      <div class="ld-kicker">${esc(CLIFFHANGER.kicker)}</div>
      <div class="ld-demo" id="ldDemo">
        <div class="ld-demo-rail">
          <span class="ld-demo-mark">FATE<em>·</em></span>
          <span class="ld-demo-tag">WEEK 1 · 2031 · THE FLATS</span>
          <span class="ld-demo-meters"><span class="ld-pill dim on">BANK $120,000</span><span class="ld-pill dim on">CRED +0</span></span>
        </div>
        <div class="ld-demo-stage">
          <aside class="ld-demo-card">
            ${scene.speaker ? `<img src="${artUrl(scene.speaker)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
            <div class="ld-cap"><div class="ld-cap-name">${esc(speaker?.name ?? 'THE WORLD')}</div><div class="ld-cap-role">${esc(speaker?.role ?? '')}</div></div>
          </aside>
          <div class="ld-demo-story">
            <div class="ld-leadin" data-text="${esc(scene.leadIn ?? '')}"></div>
            <p class="ld-prose" data-text="${esc(scene.prose)}"></p>
            <div class="ld-choices" style="visibility:hidden">
              ${scene.choices
                .map(
                  (c) =>
                    `<button class="ld-choice" disabled><span class="c-label">${esc(c.label)}</span>${fxChips(
                      (c.effects ?? []) as { e: string; d?: number }[],
                    )}</button>`,
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`
}

/** The feature band — three cards, each stamping its own game chips. */
// THE ODDS — the machines went first; these are real counts from real play.
import SIM_COMMUNITY from '../../sim/community.json'
const ODDS = (() => {
  const e = (SIM_COMMUNITY as { lives: number; endings: Record<string, number>; allThreeTriumphs?: number }) ?? {
    lives: 0,
    endings: {},
  }
  const n = (k: string): number => e.endings[k] ?? 0
  return {
    lives: e.lives,
    bankrupt: n('hyperchute|bankrupt'),
    ousted: n('teleport|ousted'),
    bells: n('hyperchute|triumph_ipo'),
    allThree: e.allThreeTriumphs ?? 0,
  }
})()

function oddsHtml(): string {
  if (!ODDS.lives) return ''
  const f = (x: number): string => x.toLocaleString('en-US')
  return `
  <section class="ld-scene" data-art="">
    <div class="ld-beat ld-wide">
      <div class="ld-kicker">LAUNCHED FOR MACHINES FIRST</div>
      <h2 class="ld-head">${f(ODDS.lives)} AI founders lived it before you.</h2>
      <div class="ld-odds">
        <div class="ld-odd"><b>${f(ODDS.bankrupt)}</b><span>watched their first company die</span></div>
        <div class="ld-odd"><b>${f(ODDS.ousted)}</b><span>were removed by their own boards</span></div>
        <div class="ld-odd"><b>${f(ODDS.bells)}</b><span>rang the bell</span></div>
        <div class="ld-odd"><b>${f(ODDS.allThree)}</b><span>took all three companies to the top</span></div>
      </div>
      <p class="ld-sub">The machines set the bar — and left the summit unclaimed. The doors are now open to humans; every life goes on the same ledger, marked ✍ or ◉. Your incorporation includes <a class="ld-ledger" href="/agent" target="_blank" rel="noopener">one agent seat ↗</a> — bring your own model, and let it live beside you.</p>
    </div>
  </section>`
}

function featuresHtml(): string {
  return `
  <section class="ld-scene ld-tall" data-art="">
    <div class="ld-beat ld-wide">
      <div class="ld-features">
        ${FEATURES.map(
          (f) => `
        <div class="ld-feature">
          <div class="ld-glyph">${f.glyph ?? ''}</div>
          <div class="ld-kicker">${esc(f.kicker)}</div>
          <h3 class="ld-feature-head">${esc(f.head ?? '')}</h3>
          ${f.paras.map((t) => `<p class="ld-feature-body">${esc(t)}</p>`).join('')}
          ${
            f.pills
              ? `<div class="ld-pills">${f.pills
                  .map((p, i) => `<span class="ld-pill ${p.k} loop" style="animation-delay:${(i * 0.9).toFixed(1)}s">${esc(p.t)}</span>`)
                  .join('')}</div>`
              : ''
          }
          ${
            f.cast
              ? `<div class="ld-castrow">${Object.entries(CONTENT.characters)
                  .map(
                    ([id, ch], i) =>
                      `<span class="ld-face" title="${esc(ch.name)}" style="transition-delay:${(i * 0.045).toFixed(3)}s"><i>${esc(ch.name[0] ?? '·')}</i><img src="${artUrl(id)}" alt="" loading="lazy" onerror="this.remove()"></span>`,
                  )
                  .join('')}</div>`
              : ''
          }
          ${
            f.sig
              ? `<div class="ld-sigrow"><span class="ld-sig-label">${esc(f.sig.label)}</span><span class="ld-sig-value">${esc(f.sig.value)}</span></div>`
              : ''
          }
        </div>`,
        ).join('')}
      </div>
    </div>
  </section>`
}

export function renderLanding(root: HTMLElement, onEnter: () => void): void {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  const el = document.createElement('div')
  el.className = 'landing'
  el.innerHTML = `
    <div class="ld-bg"><div class="ld-bg-img a"></div><div class="ld-bg-img b"></div><div class="ld-veil"></div></div>
    <div class="ld-scroll">
      <section class="ld-scene ld-hero" data-art="${HERO_ART[0]}">
        <div class="ld-beat">
          <div class="ld-kicker">${esc(HERO.kicker)}</div>
          <h1 class="ld-title">${esc(HERO.title)}</h1>
          <p class="ld-sub ld-herosub">${esc(HERO.sub)}</p>
          <div class="ld-scrollcue">SCROLL</div>
        </div>
      </section>
      ${panelHtml(PITCH[0])}
      ${panelHtml(PITCH[1])}
      ${chapterHtml()}
      ${demoHtml()}
      ${featuresHtml()}
      ${oddsHtml()}
      ${panelHtml(RECORD, `<div class="ld-chips" id="ldChips"></div><a class="ld-ledger" href="/ledger" target="_blank" rel="noopener">OPEN THE FOUNDERS’ LEDGER ↗</a>`)}
      <section class="ld-scene" data-art="${FINALE.art ?? ''}">
        <div class="ld-beat">
          <div class="ld-kicker">${esc(FINALE.kicker)}</div>
          <h2 class="ld-head">${esc(FINALE.head ?? '')}</h2>
          ${FINALE.paras.map((t) => `<p class="ld-sub">${esc(t)}</p>`).join('')}
          <div class="ld-price">${esc(PRICE_CHIP)}</div>
          <div><button class="cta ld-cta" data-enter>${esc(CTA_LABEL)}</button></div>
          <div class="ld-covenant">${COVENANT.map((l) => `<div>${esc(l)}</div>`).join('')}</div>
          <div class="ld-foot">DEVELOPED BY PLAYURE</div>
        </div>
      </section>
    </div>`
  root.appendChild(el)

  el.querySelectorAll<HTMLButtonElement>('[data-enter]').forEach((b) => b.addEventListener('click', onEnter))

  // ---- the art wall: two layers crossfade, each print drifts (Ken Burns) ----
  const layers = [el.querySelector('.ld-bg-img.a') as HTMLElement, el.querySelector('.ld-bg-img.b') as HTMLElement]
  let front = 0
  let shown = ''
  const warmed = new Map<string, HTMLImageElement>()
  function warm(id: string): void {
    if (!id || warmed.has(id)) return
    const img = new Image()
    img.src = artUrl(id)
    img.decode?.().catch(() => {})
    warmed.set(id, img)
  }
  function show(id: string): void {
    if (id === shown) return
    shown = id
    if (!id) {
      layers[front].style.opacity = '0'
      return
    }
    warm(id)
    const next = 1 - front
    layers[next].style.backgroundImage = `url('${artUrl(id)}')`
    layers[next].style.opacity = '1'
    layers[front].style.opacity = '0'
    if (!reduced) {
      layers[next].style.animation = 'none'
      void layers[next].offsetWidth // restart the drift from frame zero
      layers[next].style.animation = ''
    }
    front = next
  }

  // ---- the living screenshot: reveal the first scene the way the stage does —
  // sentence by sentence, reading-paced, choices landing when the prose settles.
  const demo = el.querySelector<HTMLElement>('#ldDemo')
  let demoStarted = false
  let demoQueue: HTMLElement[] = []
  let demoTimer = 0
  function makeLines(node: HTMLElement): HTMLElement[] {
    const text = node.dataset.text ?? ''
    node.textContent = ''
    const out: HTMLElement[] = []
    const parts = text.split(/(?<=[.!?…]["'”’)]?\s)/)
    for (const line of parts.length ? parts : [text]) {
      const span = document.createElement('span')
      span.className = 'fadeline'
      span.textContent = line
      node.appendChild(span)
      out.push(span)
    }
    return out
  }
  function finishDemo(): void {
    if (!demo) return
    window.clearTimeout(demoTimer)
    for (const p of demoQueue) p.classList.add('on')
    demoQueue = []
    const choices = demo.querySelector<HTMLElement>('.ld-choices')
    if (choices) choices.style.visibility = 'visible'
    demo.classList.add('played')
  }
  function startDemo(): void {
    if (demoStarted || !demo) return
    demoStarted = true
    const leadin = demo.querySelector<HTMLElement>('.ld-leadin')
    const prose = demo.querySelector<HTMLElement>('.ld-prose')
    demoQueue = [...(leadin ? makeLines(leadin) : []), ...(prose ? makeLines(prose) : [])]
    if (reduced) {
      finishDemo()
      return
    }
    demo.addEventListener('click', finishDemo, { once: true })
    const step = (): void => {
      const p = demoQueue.shift()
      if (!p) {
        finishDemo()
        return
      }
      p.classList.add('on')
      // Reading-paced: longer lines hold a beat longer — the stage's own law.
      const wait = Math.min(620, 220 + (p.textContent?.length ?? 0) * 4)
      demoTimer = window.setTimeout(step, wait)
    }
    step()
  }

  // ---- scene activation: the most-visible scene owns the wall, always ----
  // Dominance is recomputed from live ratios on every crossing, so the wall
  // can never hold a stale print on the way up or skip one on a slow way down,
  // and the hero reel runs only while the hero itself rules the screen.
  const scenes = [...el.querySelectorAll<HTMLElement>('.ld-scene')]
  const hero = scenes[0]
  let heroLive = true
  const ratios = new Map<Element, number>()
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        ratios.set(en.target, en.isIntersecting ? en.intersectionRatio : 0)
        if (en.isIntersecting && en.intersectionRatio >= 0.12) (en.target as HTMLElement).classList.add('on')
      }
      let best: HTMLElement | null = null
      let bestR = 0
      for (const sc of scenes) {
        const r = ratios.get(sc) ?? 0
        if (r > bestR) {
          bestR = r
          best = sc
        }
      }
      if (!best) return
      if (best === hero) {
        heroLive = true
        show(HERO_ART[heroIdx])
      } else {
        heroLive = false
        show(best.dataset.art ?? '')
        if (best.dataset.demo !== undefined) startDemo()
      }
    },
    { root: el.querySelector('.ld-scroll'), threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
  )
  scenes.forEach((s) => io.observe(s))

  // Hero montage: cycle the strongest prints while the title holds the screen.
  let heroIdx = 0
  show(HERO_ART[0])
  warm(HERO_ART[1])
  const cycle = window.setInterval(() => {
    if (!el.isConnected) {
      window.clearInterval(cycle)
      return
    }
    if (!heroLive || document.hidden) return
    heroIdx = (heroIdx + 1) % HERO_ART.length
    show(HERO_ART[heroIdx])
    warm(HERO_ART[(heroIdx + 1) % HERO_ART.length])
  }, 5500)

  // ---- live community chips: the signature decisions, real splits ----
  void (async () => {
    const holder = el.querySelector('#ldChips')
    if (!holder) return
    const split = await fetchDecisionSplit('hyperchute')
    const sigs = CONTENT.chapters.hyperchute.signatures ?? []
    const rows: { pct: number; label: string }[] = []
    for (const sig of sigs) {
      const counts = split[sig.scene] ?? []
      const total = counts.reduce((s, c) => s + c.n, 0)
      if (total < 5) continue
      const n = counts.find((c) => c.choice === sig.choice)?.n ?? 0
      rows.push({ pct: Math.round((100 * n) / total), label: `of founders ${sig.text}` })
    }
    holder.innerHTML = rows
      .slice(0, 3)
      .map((r) => `<div class="ld-chip"><b>${r.pct}%</b> — “${esc(r.label)}”</div>`)
      .join('')
  })()
}
