/**
 * Seeded PRNG (mulberry32) stepped over an explicit u32 cursor.
 *
 * The cursor lives inside GameState (`state.seed`) so saves capture it —
 * determinism is structural: same seed + same actions => identical trace.
 */
export class Rng {
  s: number

  constructor(seed: number) {
    this.s = seed >>> 0
  }

  private next(): number {
    this.s = (this.s + 0x6d2b79f5) >>> 0
    let t = this.s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return (t ^ (t >>> 14)) >>> 0
  }

  /** Float in [0, 1). */
  float(): number {
    return this.next() / 4294967296
  }

  /** Integer in [min, max], inclusive. */
  int(min: number, max: number): number {
    return min + Math.floor(this.float() * (max - min + 1))
  }

  chance(p: number): boolean {
    return this.float() < p
  }

  pick<T>(xs: readonly T[]): T {
    if (xs.length === 0) throw new Error('Rng.pick: empty list')
    return xs[this.int(0, xs.length - 1)]
  }

  /** Weighted pick without replacement; returns up to n distinct items. */
  weightedPick<T>(xs: readonly T[], weight: (x: T) => number, n: number): T[] {
    const pool = [...xs]
    const out: T[] = []
    while (out.length < n && pool.length > 0) {
      const total = pool.reduce((s, x) => s + Math.max(0, weight(x)), 0)
      if (total <= 0) {
        out.push(pool.splice(this.int(0, pool.length - 1), 1)[0])
        continue
      }
      let roll = this.float() * total
      for (let i = 0; i < pool.length; i++) {
        roll -= Math.max(0, weight(pool[i]))
        if (roll <= 0) {
          out.push(pool.splice(i, 1)[0])
          break
        }
      }
    }
    return out
  }
}
