/**
 * Objective first-pass screening for the raw benchmark renders.
 *
 * This rejects known game-audio failures (late starts, bass-only hum, extreme
 * surges, long dead gaps) and ranks the surviving variants. It intentionally
 * does not pretend to judge melody or taste; the final three still require a
 * human listen in /map.
 *
 *   node scripts/audio/analyze-music-benchmarks.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '../..')
const renderDir = resolve(root, 'music/benchmark-renders')
const manifest = JSON.parse(readFileSync(resolve(root, 'music/benchmarks.json'), 'utf8'))

const mean = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
const median = (values) => {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}
const percentile = (values, ratio) => {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * ratio)))]
}
const clamp = (value, low, high) => Math.min(high, Math.max(low, value))
const round = (value, places = 2) => Number(value.toFixed(places))

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (result.error || result.status !== 0) {
    throw new Error(`${command} failed: ${result.error?.message ?? (result.stderr || result.stdout).slice(-800)}`)
  }
  return `${result.stdout}\n${result.stderr}`
}

function probe(file) {
  const output = run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size', '-of', 'json', file])
  const format = JSON.parse(output).format
  return { duration: Number(format.duration), bytes: Number(format.size) }
}

function loudness(file) {
  const output = run('ffmpeg', [
    '-hide_banner', '-nostats', '-loglevel', 'verbose', '-i', file,
    '-filter_complex', 'ebur128=framelog=verbose:peak=true', '-f', 'null', '-',
  ])
  const integrated = [...output.matchAll(/\n\s*I:\s*(-?[\d.]+) LUFS/g)].at(-1)
  const range = [...output.matchAll(/\n\s*LRA:\s*(-?[\d.]+) LU/g)].at(-1)
  const peak = [...output.matchAll(/\n\s*Peak:\s*(-?[\d.]+) dBFS/g)].at(-1)
  const moments = [...output.matchAll(/t:\s*([\d.]+).*?M:\s*(-?[\d.]+)/g)]
    .map((match) => ({ time: Number(match[1]), value: Number(match[2]) }))
    .filter((point) => point.value > -70)
  const values = moments.map((point) => point.value)
  return {
    integrated: Number(integrated?.[1]),
    range: Number(range?.[1]),
    truePeak: Number(peak?.[1]),
    momentMedian: median(values),
    momentP95: percentile(values, 0.95),
    moments,
  }
}

function meanVolume(file, filter) {
  const args = ['-hide_banner', '-nostats', '-i', file, '-af', filter ? `${filter},volumedetect` : 'volumedetect', '-f', 'null', '-']
  const output = run('ffmpeg', args)
  return Number(output.match(/mean_volume:\s*(-?[\d.]+) dB/)?.[1])
}

function silence(file, duration) {
  const output = run('ffmpeg', [
    '-hide_banner', '-nostats', '-i', file,
    '-af', 'silencedetect=noise=-42dB:d=0.08', '-f', 'null', '-',
  ])
  const intervals = []
  let start = null
  for (const line of output.split('\n')) {
    const startMatch = line.match(/silence_start:\s*([\d.]+)/)
    if (startMatch) start = Number(startMatch[1])
    const endMatch = line.match(/silence_end:\s*([\d.]+).*silence_duration:\s*([\d.]+)/)
    if (endMatch) {
      intervals.push({ start: start ?? Number(endMatch[1]) - Number(endMatch[2]), end: Number(endMatch[1]), duration: Number(endMatch[2]) })
      start = null
    }
  }
  const initial = intervals.find((interval) => interval.start <= 0.02)?.duration ?? 0
  const internal = intervals.filter((interval) => interval.start > 0.02 && interval.end < duration - 0.5)
  return { initial, longestInternal: Math.max(0, ...internal.map((interval) => interval.duration)), intervals }
}

function spectrum(file, composition) {
  const output = run('ffmpeg', [
    '-hide_banner', '-nostats', '-i', file,
    '-af', 'aspectralstats=win_size=4096:overlap=0.75,ametadata=mode=print', '-f', 'null', '-',
  ])
  const points = []
  let time = 0
  for (const line of output.split('\n')) {
    const timeMatch = line.match(/pts_time:([\d.]+)/)
    if (timeMatch) time = Number(timeMatch[1])
    const centroidMatch = line.match(/aspectralstats\.\d+\.centroid=([\deE+.-]+)/)
    if (centroidMatch) {
      const value = Number(centroidMatch[1])
      if (value >= 20 && value <= 20_000) points.push({ time, value })
    }
  }
  const centroids = points.map((point) => point.value)
  let cursor = 0
  const sections = composition.sections.map((section) => {
    const start = cursor
    cursor += section.durationMs / 1000
    const values = points.filter((point) => point.time >= start && point.time < cursor).map((point) => point.value)
    return { name: section.name, meanCentroid: mean(values) }
  })
  const sectionValues = sections.map((section) => section.meanCentroid).filter(Boolean)
  return {
    medianCentroid: median(centroids),
    sectionCentroidRangeRatio: sectionValues.length ? (Math.max(...sectionValues) - Math.min(...sectionValues)) / median(sectionValues) : 0,
    sections,
  }
}

function score(metrics) {
  const onset = clamp(20 - Math.max(0, metrics.introDelay - 0.75) * 16, 0, 20)

  const bassDelta = metrics.lowBandDelta
  const bass = bassDelta <= -5 && bassDelta >= -14 ? 12
    : bassDelta < -14 ? clamp(12 - (-14 - bassDelta), 5, 12)
      : clamp(((-bassDelta) - 2) * 4, 0, 12)
  const centroid = metrics.medianCentroid >= 700 && metrics.medianCentroid <= 5000 ? 8
    : metrics.medianCentroid >= 450 && metrics.medianCentroid <= 7500 ? 5 : 1

  const spectralDevelopment = clamp(metrics.sectionCentroidRangeRatio / 0.22 * 15, 0, 15)
  const dynamicRange = metrics.loudnessRange >= 4 && metrics.loudnessRange <= 11 ? 10
    : metrics.loudnessRange < 4 ? clamp(metrics.loudnessRange / 4 * 10, 0, 10)
      : clamp(10 - (metrics.loudnessRange - 11) * 1.5, 2, 10)
  const sectionValues = metrics.sectionLoudness.map((section) => section.mean).filter(Number.isFinite)
  const sectionRange = sectionValues.length ? Math.max(...sectionValues) - Math.min(...sectionValues) : 0
  const sectionalDynamics = sectionRange >= 3 && sectionRange <= 10 ? 10
    : sectionRange < 3 ? clamp(sectionRange / 3 * 10, 0, 10)
      : clamp(10 - (sectionRange - 10), 2, 10)

  const level = metrics.integratedLufs >= -23 && metrics.integratedLufs <= -14 ? 10
    : metrics.integratedLufs >= -27 && metrics.integratedLufs <= -11 ? 6 : 2
  const headroom = metrics.truePeak <= -1 ? 5 : metrics.truePeak <= -0.2 ? 3 : 0
  const surge = metrics.loudnessSurge <= 8 ? 5 : clamp(5 - (metrics.loudnessSurge - 8) * 1.25, 0, 5)
  const gaps = metrics.longestInternalSilence <= 1.5 ? 5 : clamp(5 - (metrics.longestInternalSilence - 1.5) * 2, 0, 5)
  return round(clamp(onset + bass + centroid + spectralDevelopment + dynamicRange + sectionalDynamics + level + headroom + surge + gaps, 0, 100), 1)
}

const files = readdirSync(renderDir).filter((file) => file.endsWith('.mp3')).sort()
const results = []
for (const [index, name] of files.entries()) {
  const id = name.slice(0, -4)
  const composition = manifest.compositions.find((candidate) => id.startsWith(`${candidate.id}_v`))
  if (!composition) continue
  process.stdout.write(`[${index + 1}/${files.length}] ${id}… `)
  const file = resolve(renderDir, name)
  const base = probe(file)
  const loud = loudness(file)
  const silent = silence(file, base.duration)
  const spectral = spectrum(file, composition)
  const fullMean = meanVolume(file)
  const lowMean = meanVolume(file, 'lowpass=f=180')
  const sectionLoudness = []
  let cursor = 0
  for (const section of composition.sections) {
    const start = cursor
    cursor += section.durationMs / 1000
    const values = loud.moments.filter((point) => point.time >= start && point.time < cursor).map((point) => point.value)
    sectionLoudness.push({ name: section.name, mean: mean(values) })
  }
  const metrics = {
    id,
    composition: composition.id,
    variant: Number(id.match(/_v(\d+)$/)?.[1]),
    duration: round(base.duration, 3),
    bytes: base.bytes,
    introDelay: round(silent.initial, 3),
    longestInternalSilence: round(silent.longestInternal, 3),
    integratedLufs: loud.integrated,
    loudnessRange: loud.range,
    truePeak: loud.truePeak,
    loudnessSurge: round(loud.momentP95 - loud.momentMedian, 2),
    fullMeanDb: fullMean,
    lowBandMeanDb: lowMean,
    lowBandDelta: round(lowMean - fullMean, 2),
    medianCentroid: round(spectral.medianCentroid),
    sectionCentroidRangeRatio: round(spectral.sectionCentroidRangeRatio, 3),
    sectionLoudness: sectionLoudness.map((section) => ({ ...section, mean: round(section.mean, 2) })),
    sectionSpectrum: spectral.sections.map((section) => ({ ...section, meanCentroid: round(section.meanCentroid) })),
  }
  metrics.flags = [
    metrics.introDelay > 1.5 && `late start ${metrics.introDelay}s`,
    metrics.lowBandDelta > -3 && `bass-dominant ${metrics.lowBandDelta}dB`,
    metrics.medianCentroid < 350 && `poor laptop audibility ${metrics.medianCentroid}Hz`,
    metrics.longestInternalSilence > 3 && `dead gap ${metrics.longestInternalSilence}s`,
    metrics.loudnessSurge > 12 && `drowning surge ${metrics.loudnessSurge}LU`,
    metrics.truePeak > -0.1 && `no peak headroom ${metrics.truePeak}dBFS`,
  ].filter(Boolean)
  metrics.score = score(metrics)
  results.push(metrics)
  console.log(`${metrics.score}/100${metrics.flags.length ? ` · REJECT ${metrics.flags.join(', ')}` : ''}`)
}

const recommendations = manifest.compositions.map((composition) => {
  const ranked = results
    .filter((result) => result.composition === composition.id)
    .sort((a, b) => (a.flags.length - b.flags.length) || (b.score - a.score))
  return { composition: composition.id, selected: ranked[0]?.id, ranking: ranked.map((result) => result.id) }
})

const output = { generatedAt: new Date().toISOString(), rubric: 'objective screening only; human approval required', recommendations, results }
writeFileSync(resolve(renderDir, 'analysis.json'), `${JSON.stringify(output, null, 2)}\n`)
console.log('\nRecommended shortlist:')
for (const recommendation of recommendations) {
  const result = results.find((candidate) => candidate.id === recommendation.selected)
  console.log(`  ${recommendation.composition}: ${recommendation.selected} (${result?.score}/100${result?.flags.length ? ', flagged' : ''})`)
}
