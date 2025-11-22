// Transaction types for zkFluencer platform

export interface Transaction {
  id: string
  type: "earned" | "withdrawn" | "pending" | "bonus"
  campaignId?: string
  campaign?: string
  amount: number
  date: string
  status: "pending" | "completed" | "failed"
  txHash?: string
  from?: string
  to?: string
  token: "USDC" | "CELO" | "cUSD"
}

export interface WalletBalance {
  balance: number
  pending: number
  lifetime: number
  withdrawable: number
  token: "USDC" | "CELO" | "cUSD"
}

export interface PaymentEscrow {
  campaignId: string
  totalAmount: number
  remainingAmount: number
  releasedAmount: number
  contractAddress: string
  status: "active" | "completed" | "cancelled"
}

export interface WithdrawalRequest {
  amount: number
  walletAddress: string
  token: "USDC" | "CELO" | "cUSD"
}

export interface WithdrawalResponse {
  txHash: string
  amount: number
  fee: number
  netAmount: number
  estimatedTime: number
}
