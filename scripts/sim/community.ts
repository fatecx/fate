/**
 * COMMUNITY BASELINE — a million lives, compiled.
 *
 * Merges sim/shard-*.json into sim/community.json: every (company, scene,
 * choice) tally across all shards, plus the headline lives count. The seeding
 * step pushes these into Supabase's decision_baseline table, which the
 * decision_split RPC blends with live human rows — so THE RECORD's community
 * percentages are real lived statistics from day one.
 *
 *   npm run sim:community            (merge shards → community.json + seed.sql)
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const simDir = join(process.cwd(), 'sim')
const shards = readdirSync(simDir).filter((f) => f.startsWith('shard-') && f.endsWith('.json'))
if (!shards.length) {
  console.error('no sim/shard-*.json files — run the shards first')
  process.exit(1)
}

const tally = new Map<string, number>() // "company|scene|choice" → n
let lives = 0
const endings = new Map<string, number>() // "company|ending" → n

for (const f of shards) {
  const r = JSON.parse(readFileSync(join(simDir, f), 'utf8'))
  for (const P of Object.values(r.perPolicy) as any[]) {
    lives += P.runs
    for (const [ch, ends] of Object.entries(P.endings as Record<string, Record<string, number>>))
      for (const [id, n] of Object.entries(ends)) {
        const k = `${ch}|${id}`
        endings.set(k, (endings.get(k) ?? 0) + n)
      }
  }
  for (const [key, s] of Object.entries(r.sceneStats as Record<string, { choices: number[] }>)) {
    const [company, scene] = [key.split('/')[0], key.split('/').slice(1).join('/')]
    s.choices.forEach((n, i) => {
      if (!n) return
      const k = `${company}|${scene}|${i}`
      tally.set(k, (tally.get(k) ?? 0) + n)
    })
  }
}

const rows = [...tally.entries()].map(([k, n]) => {
  const [company, scene, choice] = k.split('|')
  return { company, scene, choice: Number(choice), n }
})

const community = {
  generated: new Date().toISOString(),
  lives,
  shards: shards.length,
  rows: rows.length,
  endings: Object.fromEntries(endings),
}
writeFileSync(join(simDir, 'community.json'), JSON.stringify(community, null, 1))

// Idempotent seed SQL: replaces the whole baseline in one transaction.
const values = rows
  .map((r) => `('${r.company}','${r.scene.replace(/'/g, "''")}',${r.choice},${r.n})`)
  .join(',\n')
const sql = `begin;
create table if not exists public.decision_baseline (
  company text not null,
  scene text not null,
  choice int not null,
  n bigint not null,
  primary key (company, scene, choice)
);
alter table public.decision_baseline enable row level security;
truncate public.decision_baseline;
insert into public.decision_baseline (company, scene, choice, n) values
${values};
create or replace function public.decision_split(p_company text)
 returns table(scene text, choice integer, n bigint)
 language sql stable security definer
 set search_path to 'public'
as $fn$
  select scene, choice, sum(n)::bigint from (
    select d.scene, d.choice, count(*)::bigint as n
    from public.decisions d where d.company = p_company
    group by d.scene, d.choice
    union all
    select b.scene, b.choice, b.n
    from public.decision_baseline b where b.company = p_company
  ) t group by scene, choice
$fn$;
commit;`
writeFileSync(join(simDir, 'seed.sql'), sql)

console.log(`${lives.toLocaleString()} lives across ${shards.length} shards · ${rows.length} (scene,choice) rows`)
console.log('wrote sim/community.json and sim/seed.sql — apply with the Supabase management API')
