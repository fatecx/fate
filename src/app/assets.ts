/** Public file URL. Vite `base` is `/` on fate.cx and `./` on the itch zip,
 *  so a leading slash would 404 inside itch's iframe. */
export function pubUrl(path: string): string {
  const p = path.replace(/^\//, '')
  const base = import.meta.env.BASE_URL || '/'
  return base.endsWith('/') ? `${base}${p}` : `${base}/${p}`
}

export function artUrl(id: string): string {
  return pubUrl(`art/${id}.webp`)
}

export function sfxUrl(id: string): string {
  return pubUrl(`sfx/${id}.mp3`)
}
