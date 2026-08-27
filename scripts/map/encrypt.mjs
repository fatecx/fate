/**
 * Map gate — encrypts map.html (the full storyline map + script) with a
 * password-derived key and writes a self-decrypting page to dist/map/index.html
 * (served at fate.cx/map).
 *
 * The password lives ONLY in the environment (FATE_MAP_PASS, kept in
 * ~/.tokens). Nothing secret ships: the page holds salt + iv + ciphertext,
 * and the key is derived in-browser via PBKDF2 (600k iterations). Without the
 * password the payload is AES-256-GCM noise. No password in code, ever.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { webcrypto as crypto } from 'node:crypto'

const pass = process.env.FATE_MAP_PASS
if (!pass) {
  console.log('map gate: FATE_MAP_PASS not set — skipping /map (source ~/.tokens to include it)')
  process.exit(0)
}
if (!existsSync('map.html')) {
  console.log('map gate: map.html missing — run npm run map first')
  process.exit(1)
}

const ITER = 600_000
const salt = crypto.getRandomValues(new Uint8Array(16))
const iv = crypto.getRandomValues(new Uint8Array(12))
const keyMat = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey'])
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
  keyMat,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt'],
)
const plain = new TextEncoder().encode(readFileSync('map.html', 'utf8'))
const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain))
const b64 = (u) => Buffer.from(u).toString('base64')

const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>FATE · restricted</title>
<style>
body{background:#14161a;color:#ecedea;font-family:ui-monospace,Menlo,monospace;display:grid;place-items:center;min-height:100vh;margin:0}
form{display:flex;flex-direction:column;gap:14px;width:min(320px,86vw)}
h1{font-size:13px;letter-spacing:.2em;font-weight:600;color:#e57a2e}
input{background:#1b1e23;border:1px solid #33363c;color:#ecedea;border-radius:4px;padding:11px 13px;font:inherit;font-size:14px}
input:focus{outline:2px solid #e57a2e}
button{background:#e57a2e;color:#14161a;border:0;border-radius:4px;padding:11px;font:inherit;font-weight:700;letter-spacing:.08em;cursor:pointer}
p{font-size:11px;color:#8b8d85;line-height:1.6}#err{color:#c4554d;font-size:12px;display:none}
</style></head><body>
<form id="f"><h1>FATE · STORYLINE MAP</h1>
<input id="p" type="password" placeholder="passphrase" autofocus autocomplete="current-password">
<button>UNLOCK</button><span id="err">Wrong passphrase.</span>
<p>The map and the full script are production notes. If you weren't given the phrase, there is nothing here for you.</p></form>
<script>
const SALT='${b64(salt)}',IV='${b64(iv)}',DATA='${b64(cipher)}',ITER=${ITER};
const un=b=>Uint8Array.from(atob(b),c=>c.charCodeAt(0));
async function unlock(pass){
  const km=await crypto.subtle.importKey('raw',new TextEncoder().encode(pass),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:un(SALT),iterations:ITER,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['decrypt']);
  const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:un(IV)},key,un(DATA));
  const html=new TextDecoder().decode(plain);
  sessionStorage.setItem('fate-map-pass',pass);
  // Blob navigation (not document.write): a real page load, so the map's own
  // scripts execute. blob: inherits this page's origin — storage keeps working.
  location.replace(URL.createObjectURL(new Blob([html],{type:'text/html'})));
}
document.getElementById('f').addEventListener('submit',e=>{e.preventDefault();
  unlock(document.getElementById('p').value).catch(()=>{document.getElementById('err').style.display='block';});});
const saved=sessionStorage.getItem('fate-map-pass');
if(saved)unlock(saved).catch(()=>sessionStorage.removeItem('fate-map-pass'));
</script></body></html>`

mkdirSync('dist/map', { recursive: true })
writeFileSync('dist/map/index.html', page)
console.log(`map gate: wrote dist/map/index.html (${(page.length / 1024).toFixed(0)} KB encrypted)`)
