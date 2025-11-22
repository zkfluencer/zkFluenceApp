"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CreatorHeader } from "@/components/creator-header"
import { BottomNav } from "@/components/bottom-nav"
import { EarningsCard } from "@/components/earnings-card"
import { PaymentHistory } from "@/components/payment-history"
import { useState } from "react"

export default function WalletPage() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address, isConnected } = useAccount()
  const [selectedPeriod, setSelectedPeriod] = useState("all")

  // Extract Farcaster user data
  const user = context?.user
  const username = user?.username || "creator"

  // Mock wallet data - TODO: Replace with smart contract integration
  const walletData = {
    balance: 1250.5,
    pending: 175.0,
    lifetime: 2450.75,
    thisMonth: 425.0,
    withdrawable: 1250.5,
  }

  // Mock transaction history - TODO: Replace with blockchain query
  const transactions = [
    {
      id: "1",
      type: "earned",
      campaign: "Celo Wallet Mobile App Launch",
      amount: 50,
      date: "2024-11-20T10:30:00Z",
      status: "completed",
      txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
    {
      id: "2",
      type: "earned",
      campaign: "DeFi Made Simple Campaign",
      amount: 75,
      date: "2024-11-18T14:20:00Z",
      status: "completed",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    },
    {
      id: "3",
      type: "withdrawn",
      campaign: "Withdrawal to wallet",
      amount: -500,
      date: "2024-11-15T09:15:00Z",
      status: "completed",
      txHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    },
    {
      id: "4",
      type: "pending",
      campaign: "NFT Marketplace Promotion",
      amount: 100,
      date: "2024-11-22T16:45:00Z",
      status: "pending",
    },
    {
      id: "5",
      type: "earned",
      campaign: "Web3 Gaming Experience",
      amount: 60,
      date: "2024-11-10T11:00:00Z",
      status: "completed",
      txHash: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc",
    },
  ]

  // Filter transactions by period
  const filteredTransactions = transactions.filter((tx) => {
    if (selectedPeriod === "all") return true
    const txDate = new Date(tx.date)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24))

    if (selectedPeriod === "week") return daysDiff <= 7
    if (selectedPeriod === "month") return daysDiff <= 30
    return true
  })

  // Loading state
  if (!isMiniAppReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CreatorHeader username={username} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Wallet Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your earnings and withdrawals</p>
          </div>

          {/* Wallet Connection Status */}
          {!isConnected && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">Wallet Not Connected</h3>
                  <p className="text-sm text-muted-foreground">Connect your wallet to view your USDC balance and make withdrawals</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                  Connect Wallet
                </button>
              </div>
            </div>
          )}

          {/* Connected Wallet Address */}
          {isConnected && address && (
            <div className="bg-card rounded-2xl p-5 border border-border mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Connected Wallet</h3>
                  <p className="text-lg font-mono text-foreground">{address.slice(0, 6)}...{address.slice(-4)}</p>
                </div>
                <div className="px-4 py-2 bg-[#B2EBA1]/10 text-[#4E632A] rounded-full text-sm font-medium">
                  ✓ Connected
                </div>
              </div>
            </div>
          )}

          {/* Earnings Summary */}
          <EarningsCard
            totalEarnings={walletData.balance}
            activeCampaigns={4}
          />

          {/* Withdrawal Section */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Withdraw Funds</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available to Withdraw</p>
                <p className="text-3xl font-bold text-primary">${walletData.withdrawable} USDC</p>
              </div>
            </div>
            <button
              disabled={!isConnected || walletData.withdrawable === 0}
              className="w-full bg-primary text-primary-foreground rounded-xl p-4 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!isConnected ? "Connect Wallet to Withdraw" : walletData.withdrawable === 0 ? "No Funds Available" : "Withdraw to Wallet"}
            </button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Funds are sent to your connected wallet on Celo network. Gas fees may apply.
            </p>
          </div>

          {/* Transaction History */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Transaction History</h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Time</option>
                <option value="month">Last Month</option>
                <option value="week">Last Week</option>
              </select>
            </div>

            <PaymentHistory transactions={filteredTransactions} />

            {filteredTransactions.length === 0 && (
              <div className="bg-card rounded-2xl p-12 border border-border text-center">
                <div className="text-5xl mb-4">💰</div>
                <p className="text-lg text-muted-foreground">No transactions yet</p>
                <p className="text-sm text-muted-foreground mt-2">Complete campaigns to start earning USDC</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
