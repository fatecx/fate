/**
 * Headless wallet connect — no vendor modal; fate draws its own picker.
 * Solana wallets announce themselves via the Wallet Standard events,
 * Ethereum wallets via EIP-6963. Signing in is one message signature
 * (SIWS / SIWE) verified by Supabase; the address becomes the founder,
 * no email, no funds, nothing else leaves the browser.
 */
import type { EthereumWallet, SolanaWallet } from '@supabase/supabase-js'
import { supa } from './cloud'

const STATEMENT = 'Sign the incorporation papers. One life, four companies, every scar on the record.'

export interface FoundWallet {
  chain: 'solana' | 'ethereum'
  name: string
  icon?: string
  /** Connect + sign-in; throws with a human-readable message on failure. */
  sign: () => Promise<void>
}

// ---- Wallet Standard discovery (Solana) --------------------------------------

interface StandardAccount {
  address: string
  publicKey: Uint8Array
  chains?: readonly string[]
}

interface StandardWallet {
  name: string
  icon?: string
  chains?: readonly string[]
  features: {
    'standard:connect'?: { connect: () => Promise<{ accounts: readonly StandardAccount[] }> }
    'solana:signMessage'?: {
      signMessage: (input: {
        account: StandardAccount
        message: Uint8Array
      }) => Promise<readonly { signature: Uint8Array }[]>
    }
    'solana:signIn'?: { signIn: NonNullable<SolanaWallet['signIn']> }
  }
}

const solWallets: StandardWallet[] = []

interface EthProvider {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>
}

const evmWallets: { uuid: string; name: string; icon?: string; provider: EthProvider }[] = []

let initialized = false

/** Install discovery listeners and probe for already-injected wallets. */
export function initWalletDiscovery(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  const register = (...wallets: StandardWallet[]): (() => void) => {
    for (const w of wallets) {
      if (w?.name && !solWallets.some((x) => x.name === w.name)) solWallets.push(w)
    }
    return () => {}
  }
  window.addEventListener('wallet-standard:register-wallet', (e) => {
    const cb = (e as { detail?: (api: { register: typeof register }) => void }).detail
    try {
      cb?.({ register })
    } catch {
      /* misbehaving wallet — skip it */
    }
  })
  const ready = new Event('wallet-standard:app-ready')
  Object.defineProperty(ready, 'detail', { value: { register } })
  window.dispatchEvent(ready)

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

/** Snapshot of connectable wallets, Solana first. */
export function listWallets(): FoundWallet[] {
  const out: FoundWallet[] = []
  for (const w of solWallets) {
    const f = w.features
    const canSign = f['solana:signIn'] ?? (f['standard:connect'] && f['solana:signMessage'])
    const isSolana = w.chains?.some((c) => c.startsWith('solana:')) ?? true
    if (!canSign || !isSolana) continue
    out.push({ chain: 'solana', name: w.name, icon: safeIcon(w.icon), sign: () => signSolana(w) })
  }
  // Legacy injection fallback (older Phantom builds) when the standard finds nothing.
  if (!out.length && (window as { solana?: unknown }).solana) {
    out.push({ chain: 'solana', name: 'Solana wallet', sign: () => signSolanaDefault() })
  }
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

async function signSolana(w: StandardWallet): Promise<void> {
  const client = requireSupa()
  const f = w.features
  let wallet: SolanaWallet
  const siws = f['solana:signIn']
  if (siws) {
    wallet = { signIn: (...inputs) => siws.signIn(...inputs) }
  } else {
    const conn = f['standard:connect']
    const sm = f['solana:signMessage']
    if (!conn || !sm) throw new Error(`${w.name} cannot sign messages.`)
    const { accounts } = await conn.connect()
    const account = accounts.find((a) => a.chains?.some((c) => c.startsWith('solana:'))) ?? accounts[0]
    if (!account) throw new Error(`${w.name} returned no account.`)
    wallet = {
      publicKey: { toBase58: () => account.address },
      signMessage: async (message: Uint8Array) => {
        const res = await sm.signMessage({ account, message })
        const sig = res[0]?.signature
        if (!sig) throw new Error('The wallet returned no signature.')
        return sig
      },
    }
  }
  const { error } = await client.auth.signInWithWeb3({ chain: 'solana', statement: STATEMENT, wallet })
  if (error) throw new Error(error.message)
}

async function signSolanaDefault(): Promise<void> {
  const client = requireSupa()
  const { error } = await client.auth.signInWithWeb3({ chain: 'solana', statement: STATEMENT })
  if (error) throw new Error(error.message)
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
