/**
 * The landing scroll — fate.cx's front door for a wallet the game has never
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
import {
  HERO,
  HERO_ART,
  PITCH,
  PITCH_STAT,
  TAGLINE,
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

/** The play surface itself, demonstrating the first scene — a living screenshot. */
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
            ${scene.speaker ? `<img src="/art/${scene.speaker}.webp" alt="" loading="lazy" onerror="this.remove()">` : ''}
            <div class="ld-cap"><div class="ld-cap-name">${esc(speaker?.name ?? 'THE WORLD')}</div><div class="ld-cap-role">${esc(speaker?.role ?? '')}</div></div>
          </aside>
          <div class="ld-demo-story">
            <div class="ld-leadin" data-text="${esc(scene.leadIn ?? '')}"></div>
            <h3 class="ld-scene-title">${esc(scene.title)}</h3>
            <p class="ld-prose" data-text="${esc(scene.prose)}"></p>
            <div class="ld-choices">
              ${scene.choices.map((c) => `<button class="ld-choice" disabled>${esc(c.label)}</button>`).join('')}
            </div>
            <button class="ld-choice-gate" data-enter>${esc(CLIFFHANGER.caption)}</button>
          </div>
        </div>
      </div>
    </div>
  </section>`
}

/** The feature band — three cards, each stamping its own game chips. */
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
      ${panelHtml(PITCH[0], `<div class="ld-stat">${esc(PITCH_STAT)}</div>`)}
      ${panelHtml(PITCH[1], `<div class="ld-stat">${esc(TAGLINE)}</div>`)}
      ${chapterHtml()}
      ${demoHtml()}
      ${featuresHtml()}
      ${panelHtml(RECORD, `<div class="ld-chips" id="ldChips"></div><a class="tk-link" href="/leaderboard.html" target="_blank" rel="noopener">FOUNDERS LEDGER ↗</a>`)}
      <section class="ld-scene" data-art="${FINALE.art ?? ''}">
        <div class="ld-beat">
          <div class="ld-kicker">${esc(FINALE.kicker)}</div>
          <h2 class="ld-head">${esc(FINALE.head ?? '')}</h2>
          ${FINALE.paras.map((t) => `<p class="ld-sub">${esc(t)}</p>`).join('')}
          <div class="ld-price">${esc(PRICE_CHIP)}</div>
          <div><button class="cta ld-cta" data-enter>${esc(CTA_LABEL)}</button></div>
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

  // ---- the living screenshot: type the first scene the way the game does ----
  const demo = el.querySelector<HTMLElement>('#ldDemo')
  let demoStarted = false
  function typeInto(node: HTMLElement, text: string, cps: number): Promise<void> {
    return new Promise((resolve) => {
      let i = 0
      node.classList.add('typing')
      const step = Math.max(1, Math.round(cps / 60))
      const iv = window.setInterval(() => {
        if (!node.isConnected || node.dataset.done === '1') {
          window.clearInterval(iv)
          node.classList.remove('typing')
          resolve()
          return
        }
        i += step
        node.textContent = text.slice(0, i)
        if (i >= text.length) {
          window.clearInterval(iv)
          node.classList.remove('typing')
          resolve()
        }
      }, 16)
    })
  }
  function finishDemo(): void {
    if (!demo) return
    demo.querySelectorAll<HTMLElement>('[data-text]').forEach((n) => {
      n.dataset.done = '1'
      n.textContent = n.dataset.text ?? ''
      n.classList.remove('typing')
    })
    demo.classList.add('played')
  }
  async function startDemo(): Promise<void> {
    if (demoStarted || !demo) return
    demoStarted = true
    if (reduced) {
      finishDemo()
      return
    }
    demo.addEventListener('click', finishDemo, { once: true })
    const leadin = demo.querySelector<HTMLElement>('.ld-leadin')
    const prose = demo.querySelector<HTMLElement>('.ld-prose')
    if (leadin?.dataset.text) await typeInto(leadin, leadin.dataset.text, 210)
    demo.classList.add('titled')
    if (prose?.dataset.text && !demo.classList.contains('played')) await typeInto(prose, prose.dataset.text, 240)
    demo.classList.add('played')
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
            if (t.dataset.demo !== undefined) void startDemo()
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
