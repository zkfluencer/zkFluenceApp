// Wallet and transaction API client functions

import type { Transaction, WalletBalance, WithdrawalRequest, WithdrawalResponse, PaymentEscrow } from "@/types/transaction"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export class WalletAPI {
  /**
   * Get wallet balance for current user
   */
  static async getBalance(): Promise<WalletBalance> {
    const response = await fetch(`${API_BASE_URL}/wallet/balance`)
    if (!response.ok) throw new Error("Failed to fetch balance")
    return response.json()
  }

  /**
   * Get transaction history
   */
  static async getTransactions(params?: {
    type?: string
    status?: string
    limit?: number
    offset?: number
  }): Promise<Transaction[]> {
    const queryParams = new URLSearchParams()
    if (params?.type) queryParams.append("type", params.type)
    if (params?.status) queryParams.append("status", params.status)
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.offset) queryParams.append("offset", params.offset.toString())

    const response = await fetch(`${API_BASE_URL}/wallet/transactions?${queryParams}`)
    if (!response.ok) throw new Error("Failed to fetch transactions")
    return response.json()
  }

  /**
   * Request withdrawal to wallet
   */
  static async requestWithdrawal(data: WithdrawalRequest): Promise<WithdrawalResponse> {
    const response = await fetch(`${API_BASE_URL}/wallet/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to process withdrawal")
    return response.json()
  }

  /**
   * Get escrow information for a campaign
   */
  static async getCampaignEscrow(campaignId: string): Promise<PaymentEscrow> {
    const response = await fetch(`${API_BASE_URL}/escrow/campaign/${campaignId}`)
    if (!response.ok) throw new Error("Failed to fetch escrow info")
    return response.json()
  }

  /**
   * Fund campaign escrow (company only)
   */
  static async fundCampaignEscrow(
    campaignId: string,
    amount: number
  ): Promise<{ txHash: string; contractAddress: string }> {
    const response = await fetch(`${API_BASE_URL}/escrow/campaign/${campaignId}/fund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
    if (!response.ok) throw new Error("Failed to fund escrow")
    return response.json()
  }

  /**
   * Get transaction by hash
   */
  static async getTransaction(txHash: string): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/wallet/transactions/${txHash}`)
    if (!response.ok) throw new Error("Failed to fetch transaction")
    return response.json()
  }

  /**
   * Estimate withdrawal fee
   */
  static async estimateWithdrawalFee(amount: number): Promise<{ fee: number; netAmount: number }> {
    const response = await fetch(`${API_BASE_URL}/wallet/estimate-fee?amount=${amount}`)
    if (!response.ok) throw new Error("Failed to estimate fee")
    return response.json()
  }
}
