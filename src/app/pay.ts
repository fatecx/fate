/**
 * The filing fee — $20 in USDC on Base, wired to the studio treasury.
 * One payment per founder, recorded in the payments table and receipted
 * locally so a confirmed check can never be lost to a dropped connection.
 * The admin wallet and any wallet already carrying a biography skip the fee.
 */
import { supa, walletAddress } from './cloud'
import type { Session } from '@supabase/supabase-js'

/** Studio Buxor treasury (Safe) on Base. */
export const TREASURY = '0x95FdE27DE0B617b019595D16ee1459ea76895568'
/** The owner's test wallet — fee waived, dev tools armed. */
const ADMIN = '0xaaf9ac3913331162d3fc167ed4919ea60b0e2884'
/** Native USDC on Base mainnet. */
const USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
const BASE_CHAIN_HEX = '0x2105' // 8453
/** $20, in USDC's six decimals. */
const PRICE_UNITS = 20_000_000n
export const PRICE_LABEL = '$20'

const RECEIPT_KEY = 'fate-filing-receipt'

export interface Eip1193 {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>
}

export function isAdmin(session: Session | null): boolean {
  return !!session && walletAddress(session).toLowerCase() === ADMIN
}

/** ERC-20 transfer(to, amount) calldata. */
function transferData(): string {
  const to = TREASURY.slice(2).toLowerCase().padStart(64, '0')
  const amount = PRICE_UNITS.toString(16).padStart(64, '0')
  return `0xa9059cbb${to}${amount}`
}

async function ensureBaseChain(p: Eip1193): Promise<void> {
  try {
    await p.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: BASE_CHAIN_HEX }] })
  } catch (err) {
    const code = (err as { code?: number })?.code
    if (code !== 4902) throw err
    await p.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: BASE_CHAIN_HEX,
          chainName: 'Base',
          nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
          rpcUrls: ['https://mainnet.base.org'],
          blockExplorerUrls: ['https://basescan.org'],
        },
      ],
    })
    await p.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: BASE_CHAIN_HEX }] })
  }
}

/** Send the check and wait for the chain to confirm it. Returns the tx hash. */
export async function wireCheck(p: Eip1193): Promise<{ tx: string; payer: string }> {
  const accounts = (await p.request({ method: 'eth_requestAccounts' })) as string[]
  const payer = accounts?.[0]
  if (!payer) throw new Error('The wallet returned no account.')
  await ensureBaseChain(p)
  const tx = (await p.request({
    method: 'eth_sendTransaction',
    params: [{ from: payer, to: USDC, data: transferData(), value: '0x0' }],
  })) as string
  if (!tx) throw new Error('The wallet returned no transaction.')
  // The check is in the mail — hold until the chain stamps it.
  for (let i = 0; i < 150; i++) {
    await new Promise((r) => setTimeout(r, 2000))
    const receipt = (await p
      .request({ method: 'eth_getTransactionReceipt', params: [tx] })
      .catch(() => null)) as { status?: string } | null
    if (receipt?.status === '0x1') return { tx, payer }
    if (receipt?.status === '0x0') throw new Error('The transfer failed on-chain. Nothing was charged twice — try again.')
  }
  throw new Error(`The chain is slow to confirm. Your payment may still land — reload in a minute. Tx: ${tx}`)
}

/** True when this founder has a payment on the record. */
export async function hasPaid(): Promise<boolean> {
  if (!supa) return false
  try {
    const { data } = await supa.from('payments').select('tx').limit(1)
    return !!data?.length
  } catch {
    return false
  }
}

/** Write the payment row; receipt survives locally until the row lands. */
export async function recordPayment(session: Session, tx: string, payer: string): Promise<void> {
  try {
    localStorage.setItem(RECEIPT_KEY, JSON.stringify({ tx, payer, uid: session.user.id }))
  } catch {
    /* private mode — the row insert below still carries it */
  }
  if (!supa) return
  try {
    await supa.from('payments').upsert({
      user_id: session.user.id,
      wallet: walletAddress(session),
      payer,
      chain: 'base',
      tx,
      amount: Number(PRICE_UNITS),
    })
    localStorage.removeItem(RECEIPT_KEY)
  } catch {
    /* the local receipt remains; claimReceipt retries on next boot */
  }
}

/** A confirmed check whose row never landed gets claimed on the next visit. */
export async function claimReceipt(session: Session): Promise<boolean> {
  try {
    const raw = localStorage.getItem(RECEIPT_KEY)
    if (!raw) return false
    const r = JSON.parse(raw) as { tx?: string; payer?: string; uid?: string }
    if (!r?.tx || r.uid !== session.user.id) return false
    await recordPayment(session, r.tx, r.payer ?? '')
    return true
  } catch {
    return false
  }
}
