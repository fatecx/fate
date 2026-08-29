import { execFileSync } from 'node:child_process'
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const designDir = join(root, 'design', 'brand')
const publicDir = join(root, 'public')
const tauriDir = join(root, 'src-tauri', 'icons')
const supersampling = 4

const transparent = 0
const paper = 1
const ink = 2

mkdirSync(designDir, { recursive: true })
mkdirSync(join(publicDir, 'brand'), { recursive: true })
mkdirSync(tauriDir, { recursive: true })

function insideRoundedRect(x, y, left, top, right, bottom, radius) {
  if (x < left || x > right || y < top || y > bottom) return false
  const nearestX = Math.max(left + radius, Math.min(x, right - radius))
  const nearestY = Math.max(top + radius, Math.min(y, bottom - radius))
  const dx = x - nearestX
  const dy = y - nearestY
  return dx * dx + dy * dy <= radius * radius
}

function insideSpine(x, y, top, bottom, halfWidth) {
  if (y < top || y > bottom) return false
  const reach = (bottom - top) / 2
  const widthAtY = halfWidth * (1 - Math.abs(y - 0.5) / reach)
  return Math.abs(x - 0.5) <= widthAtY
}

function markPixel(x, y, kind) {
  if (kind === 'mark') {
    const inSpine = insideSpine(x, y, 96 / 1024, 928 / 1024, 36 / 1024)
    const dx = x - 0.5
    const dy = y - 0.5
    const inCircle = dx * dx + dy * dy <= (252 / 1024) ** 2
    return inSpine || inCircle ? ink : transparent
  }

  const plateSize = 824 / 1024
  const plateStart = (1 - plateSize) / 2
  const onPlate = insideRoundedRect(
    x,
    y,
    plateStart,
    plateStart,
    1 - plateStart,
    1 - plateStart,
    165 / 1024,
  )
  if (!onPlate) return transparent

  const inSpine = insideSpine(x, y, 182 / 1024, 842 / 1024, 28 / 1024)
  const dx = x - 0.5
  const dy = y - 0.5
  const inCircle = dx * dx + dy * dy <= (196 / 1024) ** 2
  return inSpine || inCircle ? ink : paper
}

function noise(x, y, seed) {
  let value = Math.imul(x ^ seed, 374761393) + Math.imul(y ^ (seed * 31), 668265263)
  value = Math.imul(value ^ (value >>> 13), 1274126177)
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295
}

function valueNoise(x, y, columns, rows, seed) {
  const scaledX = x * columns
  const scaledY = y * rows
  const left = Math.floor(scaledX)
  const top = Math.floor(scaledY)
  const blendX = (scaledX - left) ** 2 * (3 - 2 * (scaledX - left))
  const blendY = (scaledY - top) ** 2 * (3 - 2 * (scaledY - top))
  const upper = noise(left, top, seed) * (1 - blendX) + noise(left + 1, top, seed) * blendX
  const lower = noise(left, top + 1, seed) * (1 - blendX) + noise(left + 1, top + 1, seed) * blendX
  return upper * (1 - blendY) + lower * blendY
}

function clampChannel(value) {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function colorAt(colorId, x, y, kind) {
  if (kind === 'mark') return [22, 24, 29]

  if (colorId === ink) {
    const printedGrain = (noise(Math.floor(x * 1024), Math.floor(y * 1024), 71) - 0.5) * 5
    const inkDrift = (valueNoise(x, y, 31, 27, 43) - 0.5) * 4
    const lift = noise(Math.floor(x * 760), Math.floor(y * 760), 113) < 0.012 ? 7 : 0
    const density = printedGrain + inkDrift + lift
    return [
      clampChannel(22 + density),
      clampChannel(24 + density),
      clampChannel(29 + density * 1.05),
    ]
  }

  const broadMottle = (valueNoise(x, y, 9, 8, 17) - 0.5) * 18
  const smallMottle = (valueNoise(x, y, 37, 29, 53) - 0.5) * 8
  const paperFiber = (valueNoise(x, y, 113, 97, 89) - 0.5) * 4
  const fineGrain = (noise(Math.floor(x * 1024), Math.floor(y * 1024), 131) - 0.5) * 6
  const fleck = noise(Math.floor(x * 720), Math.floor(y * 720), 197)
  const fleckTone = fleck < 0.014 ? -13 * (1 - fleck / 0.014) : fleck > 0.992 ? 5 : 0
  const edge = Math.max(Math.abs(x - 0.5), Math.abs(y - 0.5))
  const edgeTone = -Math.max(0, edge - 0.28) * 15
  const tone = broadMottle + smallMottle + paperFiber + fineGrain + fleckTone + edgeTone

  return [
    clampChannel(222 + tone),
    clampChannel(209 + tone * 0.9),
    clampChannel(188 + tone * 0.72),
  ]
}

function renderRgba(size, kind) {
  const rgba = Buffer.alloc(size * size * 4)
  const samples = supersampling * supersampling

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let alpha = 0
      let red = 0
      let green = 0
      let blue = 0

      for (let sampleY = 0; sampleY < supersampling; sampleY += 1) {
        for (let sampleX = 0; sampleX < supersampling; sampleX += 1) {
          const normalizedX = (x + (sampleX + 0.5) / supersampling) / size
          const normalizedY = (y + (sampleY + 0.5) / supersampling) / size
          const colorId = markPixel(normalizedX, normalizedY, kind)
          if (colorId === transparent) continue
          const [r, g, b] = colorAt(colorId, normalizedX, normalizedY, kind)
          alpha += 255
          red += r * 255
          green += g * 255
          blue += b * 255
        }
      }

      const offset = (y * size + x) * 4
      if (alpha === 0) continue
      rgba[offset] = Math.round(red / alpha)
      rgba[offset + 1] = Math.round(green / alpha)
      rgba[offset + 2] = Math.round(blue / alpha)
      rgba[offset + 3] = Math.round(alpha / samples)
    }
  }

  return rgba
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
  }
  return value >>> 0
})

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function pngChunk(type, data = Buffer.alloc(0)) {
  const name = Buffer.from(type, 'ascii')
  const chunk = Buffer.alloc(data.length + 12)
  chunk.writeUInt32BE(data.length, 0)
  name.copy(chunk, 4)
  data.copy(chunk, 8)
  chunk.writeUInt32BE(crc32(Buffer.concat([name, data])), data.length + 8)
  return chunk
}

function encodePng(size, rgba) {
  const stride = size * 4
  const scanlines = Buffer.alloc((stride + 1) * size)
  for (let row = 0; row < size; row += 1) {
    const destination = row * (stride + 1)
    scanlines[destination] = 0
    rgba.copy(scanlines, destination + 1, row * stride, (row + 1) * stride)
  }

  const header = Buffer.alloc(13)
  header.writeUInt32BE(size, 0)
  header.writeUInt32BE(size, 4)
  header[8] = 8
  header[9] = 6

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(scanlines, { level: 9 })),
    pngChunk('IEND'),
  ])
}

const cache = new Map()

function png(size, kind) {
  const key = `${kind}-${size}`
  if (!cache.has(key)) cache.set(key, encodePng(size, renderRgba(size, kind)))
  return cache.get(key)
}

function writePng(relativePath, size, kind) {
  const destination = join(root, relativePath)
  mkdirSync(dirname(destination), { recursive: true })
  writeFileSync(destination, png(size, kind))
}

function makeIco(pngBuffer) {
  const header = Buffer.alloc(22)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  header[6] = 0
  header[7] = 0
  header[8] = 0
  header[9] = 0
  header.writeUInt16LE(1, 10)
  header.writeUInt16LE(32, 12)
  header.writeUInt32LE(pngBuffer.length, 14)
  header.writeUInt32LE(22, 18)
  return Buffer.concat([header, pngBuffer])
}

writePng('design/brand/fate-orbital-spine-1024.png', 1024, 'mark')
writePng('design/brand/fate-app-icon-1024.png', 1024, 'app')
writePng('public/brand/fate-orbital-spine-1024.png', 1024, 'mark')

writePng('public/favicon-16x16.png', 16, 'mark')
writePng('public/favicon-32x32.png', 32, 'mark')
writePng('public/favicon.png', 64, 'mark')
writeFileSync(join(publicDir, 'favicon.ico'), makeIco(png(256, 'mark')))
writePng('public/apple-touch-icon.png', 180, 'app')
writePng('public/icon-192.png', 192, 'app')
writePng('public/icon-512.png', 512, 'app')

const tauriSizes = new Map([
  ['32x32.png', 32],
  ['64x64.png', 64],
  ['128x128.png', 128],
  ['128x128@2x.png', 256],
  ['icon.png', 1024],
  ['Square30x30Logo.png', 30],
  ['Square44x44Logo.png', 44],
  ['Square71x71Logo.png', 71],
  ['Square89x89Logo.png', 89],
  ['Square107x107Logo.png', 107],
  ['Square142x142Logo.png', 142],
  ['Square150x150Logo.png', 150],
  ['Square284x284Logo.png', 284],
  ['Square310x310Logo.png', 310],
  ['StoreLogo.png', 50],
])

for (const [filename, size] of tauriSizes) {
  writeFileSync(join(tauriDir, filename), png(size, 'app'))
}

writeFileSync(join(tauriDir, 'icon.ico'), makeIco(png(256, 'app')))

const temporaryRoot = mkdtempSync(join(tmpdir(), 'fate-icons-'))
const iconset = join(temporaryRoot, 'Fate.iconset')
mkdirSync(iconset)

try {
  const macIcons = [
    ['icon_16x16.png', 16],
    ['icon_16x16@2x.png', 32],
    ['icon_32x32.png', 32],
    ['icon_32x32@2x.png', 64],
    ['icon_128x128.png', 128],
    ['icon_128x128@2x.png', 256],
    ['icon_256x256.png', 256],
    ['icon_256x256@2x.png', 512],
    ['icon_512x512.png', 512],
    ['icon_512x512@2x.png', 1024],
  ]
  for (const [filename, size] of macIcons) {
    writeFileSync(join(iconset, filename), png(size, 'app'))
  }
  execFileSync('/usr/bin/iconutil', [
    '-c',
    'icns',
    iconset,
    '-o',
    join(tauriDir, 'icon.icns'),
  ])
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true })
}

const expectedSvg = readFileSync(join(designDir, 'fate-orbital-spine.svg'), 'utf8')
if (!expectedSvg.includes('cx="512" cy="512"') || !expectedSvg.includes('M512 96')) {
  throw new Error('The canonical SVG is not centered on the 512px axis')
}

console.log('Generated Fate orbital-spine assets in design/brand, public, and src-tauri/icons.')
