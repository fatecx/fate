/**
 * Headless wallet connect — no vendor modal; fate draws its own picker.
 * Ethereum wallets announce themselves via EIP-6963; fate lists only them
 * (Base rides the same providers). Signing in is one message signature
 * (SIWE) verified by Supabase; the address becomes the founder,
 * no email, no funds, nothing else leaves the browser.
 */
import type { EthereumWallet } from '@supabase/supabase-js'
import { supa } from './cloud'

const STATEMENT = 'Sign the incorporation papers. One life, three companies, every scar on the record.'

export interface FoundWallet {
  chain: 'ethereum'
  name: string
  icon?: string
  /** Connect + sign-in; throws with a human-readable message on failure. */
  sign: () => Promise<void>
}

interface EthProvider {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>
}

const evmWallets: { uuid: string; name: string; icon?: string; provider: EthProvider }[] = []

let initialized = false

/** Install discovery listeners and probe for already-injected wallets. */
export function initWalletDiscovery(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  window.addEventListener('eip6963:announceProvider', (e) => {
    const d = (e as { detail?: { info?: { uuid?: string; name?: string; icon?: string }; provider?: EthProvider } })
      .detail
    if (!d?.provider || !d.info?.name) return
    const uuid = d.info.uuid ?? d.info.name
    if (!evmWallets.some((x) => x.uuid === uuid)) {
      evmWallets.push({ uuid, name: d.info.name, icon: d.info.icon, provider: d.provider })
    }
  })
  window.dispatchEvent(new Event('eip6963:requestProvider'))
}

/** Phantom's official mark (from the MIT-licensed wallet-adapter), for the injected path. */
const PHANTOM_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiB2aWV3Qm94PSIwIDAgMTA4IDEwOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPg=='

/** The basemark, for the Base Account entry. */
const BASE_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTEgMTExIj48cmVjdCB3aWR0aD0iMTExIiBoZWlnaHQ9IjExMSIgcng9IjI0IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbD0iIzAwNTJGRiIgZD0iTTU0LjkgMTEwLjVjMzAuNSAwIDU1LjItMjQuNyA1NS4yLTU1LjJTODUuNC4xIDU0LjkuMUMyNiAuMSAyLjIgMjIuMy0uMSA1MC42aDczdjkuOWgtNzNjMi4zIDI4LjMgMjYuMSA1MCA1NSA1MHoiLz48L3N2Zz4='

function safeIcon(icon?: string): string | undefined {
  return icon?.startsWith('data:image') ? icon : undefined
}

/** Snapshot of connectable wallets — Ethereum only, by the owner's decree. */
export function listWallets(): FoundWallet[] {
  const out: FoundWallet[] = []
  for (const w of evmWallets) {
    // Announced icons that fail the data-URI check fall back to the marks we carry.
    const icon = safeIcon(w.icon) ?? (w.name.toLowerCase().includes('phantom') ? PHANTOM_ICON : undefined)
    out.push({ chain: 'ethereum', name: w.name, icon, sign: () => signEthereum(w.provider) })
  }
  // Phantom's Ethereum side — some builds skip EIP-6963 and only inject.
  const phantom = (window as { phantom?: { ethereum?: EthProvider } }).phantom?.ethereum
  if (phantom && !out.some((x) => x.name.toLowerCase().includes('phantom'))) {
    out.push({ chain: 'ethereum', name: 'Phantom', icon: PHANTOM_ICON, sign: () => signEthereum(phantom) })
  }
  const legacyEth = (window as { ethereum?: EthProvider }).ethereum
  if (!out.length && legacyEth) {
    out.push({ chain: 'ethereum', name: 'Browser wallet', sign: () => signEthereum(legacyEth) })
  }
  out.push({ chain: 'ethereum', name: 'Base', icon: BASE_ICON, sign: () => signBase() })
  return out
}

// ---- sign-in ------------------------------------------------------------------

function requireSupa(): NonNullable<typeof supa> {
  if (!supa) throw new Error('Cloud is not configured — play as a guest instead.')
  return supa
}

/** EIP-4361 requires a nonce line; supabase omits it when the caller sends
 *  none, and Phantom's strict SIWE parser rejects the message as "invalid
 *  formatting" (MetaMask parses loosely and never noticed). Always send one. */
function siweNonce(): string {
  const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => abc[b % abc.length]).join('')
}

async function signEthereum(provider: EthProvider): Promise<void> {
  const client = requireSupa()
  const { error } = await client.auth.signInWithWeb3({
    chain: 'ethereum',
    statement: STATEMENT,
    wallet: provider as EthereumWallet,
    options: { signInWithEthereum: { nonce: siweNonce() } },
  })
  if (error) throw new Error(error.message)
}

/** Base Account — Coinbase's passkey smart wallet; needs no extension, the
 *  SDK opens its own popup. Loaded lazily so the bundle stays lean. */
async function signBase(): Promise<void> {
  const { createBaseAccountSDK } = await import('@base-org/account')
  const provider = createBaseAccountSDK({
    appName: 'FATE',
    appLogoUrl: 'https://www.fate.cx/art/cut_ring_alive.webp',
  }).getProvider()
  await signEthereum(provider as unknown as EthProvider)
}
