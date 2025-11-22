/**
 * Blockchain utility functions for Celo network
 */

/**
 * Format a transaction hash for display (first 6 and last 4 characters)
 */
export function formatTxHash(hash: string): string {
  if (!hash || hash.length < 10) return hash
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}

/**
 * Format a wallet address for display (first 6 and last 4 characters)
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Get Celoscan explorer URL for a transaction
 */
export function getCeloscanUrl(txHash: string, network: "mainnet" | "alfajores" = "alfajores"): string {
  const baseUrl = network === "mainnet"
    ? "https://celoscan.io"
    : "https://alfajores.celoscan.io"
  return `${baseUrl}/tx/${txHash}`
}

/**
 * Get Celoscan explorer URL for an address
 */
export function getCeloscanAddressUrl(address: string, network: "mainnet" | "alfajores" = "alfajores"): string {
  const baseUrl = network === "mainnet"
    ? "https://celoscan.io"
    : "https://alfajores.celoscan.io"
  return `${baseUrl}/address/${address}`
}

/**
 * Format USDC amount (6 decimals)
 */
export function formatUSDC(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount
  return num.toFixed(2)
}

/**
 * Format CELO amount (18 decimals)
 */
export function formatCELO(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount
  return num.toFixed(4)
}

/**
 * Check if a string is a valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

/**
 * Check if a string is a valid transaction hash
 */
export function isValidTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash)
}
