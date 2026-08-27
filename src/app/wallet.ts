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

function safeIcon(icon?: string): string | undefined {
  return icon?.startsWith('data:image') ? icon : undefined
}

/** Snapshot of connectable wallets — Ethereum only, by the owner's decree. */
export function listWallets(): FoundWallet[] {
  const out: FoundWallet[] = []
  for (const w of evmWallets) {
    out.push({ chain: 'ethereum', name: w.name, icon: safeIcon(w.icon), sign: () => signEthereum(w.provider) })
  }
  const legacyEth = (window as { ethereum?: EthProvider }).ethereum
  if (!evmWallets.length && legacyEth) {
    out.push({ chain: 'ethereum', name: 'Browser wallet', sign: () => signEthereum(legacyEth) })
  }
  return out
}

// ---- sign-in ------------------------------------------------------------------

function requireSupa(): NonNullable<typeof supa> {
  if (!supa) throw new Error('Cloud is not configured — play as a guest instead.')
  return supa
}

async function signEthereum(provider: EthProvider): Promise<void> {
  const client = requireSupa()
  const { error } = await client.auth.signInWithWeb3({
    chain: 'ethereum',
    statement: STATEMENT,
    wallet: provider as EthereumWallet,
  })
  if (error) throw new Error(error.message)
}
