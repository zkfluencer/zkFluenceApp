"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CompanyHeader } from "@/components/company-header"
import { CompanyCampaignCard } from "@/components/company-campaign-card"
import Link from "next/link"
import { useState } from "react"

export default function CompanyDashboard() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address, isConnected } = useAccount()

  // Extract Farcaster user data
  const user = context?.user
  const companyName = user?.displayName || "Web3 Company"

  // Mock company data - TODO: Replace with API call
  const companyData = {
    name: companyName,
    logo: "/placeholder.svg?height=64&width=64&text=Logo",
    totalCampaigns: 12,
    activeCampaigns: 4,
    totalCreators: 47,
    totalSpent: 8950.0,
    pendingReviews: 8,
    approvalRate: 92,
  }

  // Mock active campaigns - TODO: Replace with API call
  const activeCampaigns = [
    {
      id: "1",
      title: "Celo Wallet Mobile App Launch",
      status: "active",
      reward: 50,
      rewardToken: "USDC",
      deadline: "2024-12-30",
      spotsTotal: 20,
      spotsFilled: 5,
      pendingReviews: 3,
      approvedSubmissions: 2,
      totalSpent: 100,
      thumbnailUrl: "/mobile-wallet-app-blockchain.jpg",
    },
    {
      id: "2",
      title: "DeFi Made Simple Campaign",
      status: "active",
      reward: 75,
      rewardToken: "USDC",
      deadline: "2024-12-25",
      spotsTotal: 15,
      spotsFilled: 12,
      pendingReviews: 4,
      approvedSubmissions: 8,
      totalSpent: 600,
      thumbnailUrl: "/defi-trading-cryptocurrency.jpg",
    },
    {
      id: "3",
      title: "NFT Marketplace Promotion",
      status: "active",
      reward: 100,
      rewardToken: "USDC",
      deadline: "2024-12-28",
      spotsTotal: 10,
      spotsFilled: 7,
      pendingReviews: 1,
      approvedSubmissions: 6,
      totalSpent: 600,
      thumbnailUrl: "/nft-digital-art-marketplace.jpg",
    },
    {
      id: "4",
      title: "Web3 Gaming Experience",
      status: "active",
      reward: 60,
      rewardToken: "USDC",
      deadline: "2025-01-05",
      spotsTotal: 30,
      spotsFilled: 2,
      pendingReviews: 0,
      approvedSubmissions: 2,
      totalSpent: 120,
      thumbnailUrl: "/gaming-esports-blockchain.jpg",
    },
  ]

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
      <CompanyHeader companyName={companyData.name} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {companyData.name}!</h1>
            <p className="text-muted-foreground">Manage your campaigns and connect with verified creators</p>
          </div>

          {/* Wallet Connection Banner */}
          {!isConnected && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">Wallet Not Connected</h3>
                  <p className="text-sm text-muted-foreground">Connect your wallet to fund campaigns and process payments</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                  Connect Wallet
                </button>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-5 border border-primary/20">
              <div className="text-3xl font-bold text-primary mb-1">{companyData.activeCampaigns}</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
              <div className="text-xs text-muted-foreground mt-2">of {companyData.totalCampaigns} total</div>
            </div>

            <div className="bg-gradient-to-br from-[#4E632A]/20 to-[#4E632A]/10 rounded-2xl p-5 border border-[#4E632A]/20">
              <div className="text-3xl font-bold text-[#4E632A] mb-1">{companyData.totalCreators}</div>
              <div className="text-sm text-muted-foreground">Total Creators</div>
              <div className="text-xs text-muted-foreground mt-2">verified applicants</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl p-5 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-500 mb-1">${companyData.totalSpent}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
              <div className="text-xs text-muted-foreground mt-2">USDC on Celo</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-2xl p-5 border border-yellow-500/20">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{companyData.pendingReviews}</div>
              <div className="text-sm text-muted-foreground">Pending Reviews</div>
              <div className="text-xs text-muted-foreground mt-2">submissions to review</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/company/campaigns/create"
                className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 hover:opacity-90 transition-opacity"
              >
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-bold text-lg mb-2">Create Campaign</h3>
                <p className="text-sm opacity-90">Launch a new creator campaign</p>
              </Link>

              <Link
                href="/company/creators"
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="text-3xl mb-3">👥</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Browse Creators</h3>
                <p className="text-sm text-muted-foreground">Find verified influencers</p>
              </Link>

              <Link
                href="/company/analytics"
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-lg mb-2 text-foreground">View Analytics</h3>
                <p className="text-sm text-muted-foreground">Track campaign performance</p>
              </Link>
            </div>
          </div>

          {/* Active Campaigns */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Active Campaigns</h2>
              <Link href="/company/campaigns" className="text-primary hover:underline text-sm font-medium">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCampaigns.map((campaign) => (
                <CompanyCampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>

            {activeCampaigns.length === 0 && (
              <div className="bg-card rounded-2xl p-12 border border-border text-center">
                <div className="text-5xl mb-4">🎯</div>
                <p className="text-lg text-muted-foreground mb-2">No active campaigns</p>
                <p className="text-sm text-muted-foreground mb-6">Create your first campaign to start connecting with creators</p>
                <Link
                  href="/company/campaigns/create"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Create Campaign
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
