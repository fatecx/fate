/**
 * The landing scroll — fate.cx's front door for a wallet the game has never
 * met. Scroll-cinema over the real art: pinned scenes, slow Ken Burns prints,
 * the actual opening beat rendered read-only, live community splits. Copy and
 * art live in src/content/landing.ts; this file only renders them.
 * Art never blocks: a missing print leaves a sigil field and the page reads on.
 */
import { CONTENT } from '../content/world'
import { getScene } from '../engine/reduce'
import { fetchDecisionSplit } from './cloud'
import {
  HERO,
  HERO_ART,
  OPENING,
  OPENING_STAT,
  PREMISE,
  CHAPTERS,
  FEATURES,
  CLIFFHANGER,
  PLAQUES,
  RECORD,
  CTA,
  COVENANT,
  type LandingPanel,
} from '../content/landing'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function panelHtml(p: LandingPanel, extra = ''): string {
  return `
  <section class="ld-scene" data-art="${p.art ?? ''}">
    <div class="ld-beat">
      ${p.glyph ? `<div class="ld-glyph">${p.glyph}</div>` : ''}
      <div class="ld-kicker">${esc(p.kicker)}</div>
      ${p.head ? `<h2 class="ld-head">${esc(p.head)}</h2>` : ''}
      ${p.paras.map((t) => `<p class="ld-body">${esc(t)}</p>`).join('')}
      ${extra}
    </div>
  </section>`
}

/** The real first scene, read-only — the choices are the door. */
function cliffhangerHtml(): string {
  const scene = getScene(CONTENT, 'hyperchute', CLIFFHANGER.sceneId)
  const speaker = scene.speaker ? CONTENT.characters[scene.speaker] : null
  const portrait = scene.speaker
    ? `<div class="ld-portrait"><img src="/art/${scene.speaker}.webp" alt="" loading="lazy" onerror="this.remove()"><div class="ld-cap"><div class="ld-cap-name">${esc(speaker?.name ?? '')}</div><div class="ld-cap-role">${esc(speaker?.role ?? '')}</div></div></div>`
    : ''
  return `
  <section class="ld-scene ld-tall" data-art="">
    <div class="ld-beat ld-wide">
      <div class="ld-kicker">${esc(CLIFFHANGER.kicker)}</div>
      <div class="ld-stagebox">
        ${portrait}
        <div class="ld-script">
          ${scene.leadIn ? `<div class="ld-leadin">${esc(scene.leadIn)}</div>` : ''}
          <h3 class="ld-scene-title">${esc(scene.title)}</h3>
          <p class="ld-prose">${esc(scene.prose)}</p>
          <div class="ld-choices">
            ${scene.choices.map((c) => `<button class="ld-choice" disabled>${esc(c.label)}</button>`).join('')}
          </div>
          <button class="ld-choice-gate" data-enter>${esc(CLIFFHANGER.caption)}</button>
        </div>
      </div>
    </div>
  </section>`
}

export function renderLanding(root: HTMLElement, onEnter: () => void): void {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  const chaptersHtml = `
  <section class="ld-scene ld-tall" data-art="">
    <div class="ld-beat ld-wide">
      <div class="ld-kicker">FOUR COMPANIES, IN ORDER</div>
      <div class="ld-chapters">
        ${CHAPTERS.map(
          (c) => `
        <div class="ld-card ${c.sealed ? 'sealed' : ''}">
          <div class="ld-card-art">${
            c.art
              ? `<img src="/art/${c.art}.webp" alt="" loading="lazy" onerror="this.remove()">`
              : `<span class="ld-card-sigil">${c.sealed ? '✕' : c.name[0]}</span>`
          }</div>
          <div class="ld-card-kicker">${esc(c.kicker)}</div>
          <div class="ld-card-name">${c.sealed ? 'SEALED' : esc(c.name)}</div>
          <p class="ld-card-line">${esc(c.line)}</p>
        </div>`,
        ).join('')}
      </div>
    </div>
  </section>`

  const plaquesHtml = PLAQUES.map(
    (q) => `
  <section class="ld-scene ld-short" data-art="">
    <div class="ld-beat">
      <div class="ld-quote">“${esc(q.quote)}”</div>
      <div class="ld-source">${esc(q.source)}</div>
    </div>
  </section>`,
  ).join('')

  const el = document.createElement('div')
  el.className = 'landing'
  el.innerHTML = `
    <div class="ld-bg"><div class="ld-bg-img a"></div><div class="ld-bg-img b"></div><div class="ld-veil"></div></div>
    <button class="ld-enter-chip" data-enter>ENTER →</button>
    <div class="ld-scroll">
      <section class="ld-scene ld-hero" data-art="${HERO_ART[0]}">
        <div class="ld-beat">
          <div class="ld-kicker">${esc(HERO.kicker)}</div>
          <h1 class="ld-title">${esc(HERO.title)}</h1>
          <div class="ld-tag">${esc(HERO.tag)}</div>
          <button class="cta ld-cta" data-enter>Sign the papers →</button>
          <div class="ld-scrollcue">SCROLL</div>
        </div>
      </section>
      ${panelHtml(OPENING, `<div class="ld-stat">${esc(OPENING_STAT)}</div>`)}
      ${panelHtml(PREMISE)}
      ${chaptersHtml}
      ${FEATURES.map((f) => panelHtml(f)).join('')}
      ${cliffhangerHtml()}
      ${plaquesHtml}
      ${panelHtml(RECORD, `<div class="ld-chips" id="ldChips"></div><a class="tk-link" href="/leaderboard.html" target="_blank" rel="noopener">FOUNDERS LEDGER ↗</a>`)}
      <section class="ld-scene" data-art="${CTA.art ?? ''}">
        <div class="ld-beat">
          <div class="ld-kicker">${esc(CTA.kicker)}</div>
          <h2 class="ld-head">${esc(CTA.head ?? '')}</h2>
          ${CTA.paras.map((t) => `<p class="ld-body">${esc(t)}</p>`).join('')}
          <button class="cta ld-cta" data-enter>Sign the papers →</button>
          <div class="ld-covenant">${COVENANT.map((l) => `<div>${esc(l)}</div>`).join('')}</div>
          <div class="ld-foot">FATE.CX · <a class="tk-link" href="/leaderboard.html" target="_blank" rel="noopener">THE FOUNDERS’ LEDGER</a></div>
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
    img.src = `/art/${id}.webp`
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
    layers[next].style.backgroundImage = `url('/art/${id}.webp')`
    layers[next].style.opacity = '1'
    layers[front].style.opacity = '0'
    if (!reduced) {
      layers[next].style.animation = 'none'
      void layers[next].offsetWidth // restart the drift from frame zero
      layers[next].style.animation = ''
    }
    front = next
  }

  // ---- scene activation: reveal beats, swap the wall to the scene's print ----
  const scenes = [...el.querySelectorAll<HTMLElement>('.ld-scene')]
  const hero = scenes[0]
  let heroLive = true
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const t = en.target as HTMLElement
        if (en.isIntersecting) {
          t.classList.add('on')
          if (t === hero) heroLive = true
          else if (en.intersectionRatio >= 0.4) {
            heroLive = false
            show(t.dataset.art ?? '')
          }
        } else if (t === hero) heroLive = false
      }
    },
    { root: el.querySelector('.ld-scroll'), threshold: [0.15, 0.4] },
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

  // ---- live community chips: real splits, or a clean absence ----
  void (async () => {
    const holder = el.querySelector('#ldChips')
    if (!holder) return
    const split = await fetchDecisionSplit('hyperchute')
    const rows: { pct: number; label: string }[] = []
    for (const [sceneId, counts] of Object.entries(split)) {
      const total = counts.reduce((s, c) => s + c.n, 0)
      if (total < 5) continue
      const top = [...counts].sort((a, b) => b.n - a.n)[0]
      try {
        const sc = getScene(CONTENT, 'hyperchute', sceneId)
        const label = sc.choices[top.choice]?.label
        if (!label) continue
        rows.push({ pct: Math.round((100 * top.n) / total), label })
      } catch {
        /* retired scene ids stay out of the chips */
      }
    }
    rows.sort((a, b) => b.pct - a.pct)
    holder.innerHTML = rows
      .slice(0, 3)
      .map((r) => `<div class="ld-chip"><b>${r.pct}%</b> — “${esc(r.label)}”</div>`)
      .join('')
  })()
}
