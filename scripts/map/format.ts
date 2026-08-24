/**
 * English translation of the predicate/effect DSL — shared by the map
 * generator and (later) any debug UI. The player never sees these; reviewers do.
 */
import type { Effect } from '../../src/engine/effects'
import type { Cmp, Pred } from '../../src/engine/predicates'
import type { CharacterDef } from '../../src/content/schema'

const OP: Record<Cmp, string> = { eq: '=', neq: '≠', gte: '≥', lte: '≤', gt: '>', lt: '<' }
const MONEY = (n: number) => `${n < 0 ? '−' : '+'}$${Math.abs(n).toLocaleString('en-US')}`

export function makeFmt(characters: Record<string, CharacterDef>) {
  const name = (id: string) => characters[id]?.name ?? id

  const fmtPred = (p: Pred): string => {
    switch (p.k) {
      case 'true':
        return 'always'
      case 'flag':
        return `flag ${p.scope}:${p.key} ${OP[p.cmp]} ${JSON.stringify(p.v)}`
      case 'stress':
        return `stress ${OP[p.cmp]} ${p.v}`
      case 'runway':
        return `runway ${OP[p.cmp]} ${p.v}wks`
      case 'treasury':
        return `treasury ${OP[p.cmp]} ${MONEY(p.v)}`
      case 'rep':
        return `cred ${OP[p.cmp]} ${p.v}`
      case 'stake':
        return `${name(p.who)} stake ${OP[p.cmp]} ${p.v}%`
      case 'rel':
        return `${name(p.who)} ${p.field} ${OP[p.cmp]} ${p.v}`
      case 'met':
        return `has met ${name(p.who)}`
      case 'score':
        return `founder score ${OP[p.cmp]} ${p.v}`
      case 'corpse':
        return `${p.company} is dead in the world`
      case 'seen':
        return `scene played: ${p.scene}`
      case 'age':
        return `company week ${OP[p.cmp]} ${p.v}`
      case 'all':
        return p.of.map(fmtPred).join(' AND ')
      case 'any':
        return p.of.map(fmtPred).join(' OR ')
      case 'not':
        return `NOT (${fmtPred(p.p)})`
    }
  }

  const fmtEffect = (fx: Effect): string => {
    switch (fx.e) {
      case 'treasury':
        return `Treasury ${MONEY(fx.d)}`
      case 'burn':
        return `Burn ${fx.d >= 0 ? '+' : '−'}$${Math.abs(fx.d).toLocaleString('en-US')}/wk`
      case 'revenue':
        return `Revenue ${fx.d >= 0 ? '+' : '−'}$${Math.abs(fx.d).toLocaleString('en-US')}/wk`
      case 'stress':
        return `Stress ${fx.d >= 0 ? '+' : '−'}${Math.abs(fx.d)}`
      case 'rep':
        return `Cred ${fx.d >= 0 ? '+' : '−'}${Math.abs(fx.d)}`
      case 'score':
        return `Founder score ${fx.d >= 0 ? '+' : '−'}${Math.abs(fx.d)}`
      case 'stake':
        return `${name(fx.who)} ${fx.d >= 0 ? '+' : '−'}${Math.abs(fx.d)}% equity`
      case 'rel': {
        const parts: string[] = []
        if (fx.aff) parts.push(`affinity ${fx.aff >= 0 ? '+' : ''}${fx.aff}`)
        if (fx.resp) parts.push(`respect ${fx.resp >= 0 ? '+' : ''}${fx.resp}`)
        if (fx.standing) parts.push(`${fx.standing}`)
        return `${name(fx.who)}: ${parts.join(', ') || 'touch'}`
      }
      case 'meet':
        return `Meet ${name(fx.who)}`
      case 'flag':
        return `set ${fx.scope}:${fx.key} = ${JSON.stringify(fx.v)}`
      case 'clearFlag':
        return `clear ${fx.scope}:${fx.key}`
      case 'enqueue':
        return `Next scene → ${fx.scene}`
      case 'fuse':
        return `Fuse on ${fx.scene} (${fx.epochs}wks)`
      case 'end':
        return `■ ENDS CHAPTER — "${fx.ending}"`
    }
  }

  return { name, fmtPred, fmtEffect }
}
