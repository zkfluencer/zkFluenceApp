"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CreatorHeader } from "@/components/creator-header"
import { BottomNav } from "@/components/bottom-nav"
import { OnboardingWizard } from "@/components/onboarding-wizard"
import Link from "next/link"
import { useState } from "react"

export default function CreatorDashboard() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address } = useAccount()
  const [showWizard, setShowWizard] = useState(false)

  // Extract real Farcaster user data
  const user = context?.user
  const creatorData = {
    fid: user?.fid?.toString() || "12345",
    username: user?.username || "cryptoartist",
    displayName: user?.displayName || "Crypto Artist",
    pfpUrl: user?.pfpUrl || "/creator-avatar.png",
    bio: user?.bio || "TikTok creator sharing Web3 knowledge",
    isVerified: !!user?.verifications?.length,
    region: "United States", // TODO: Get from Self.xyz verification
    walletAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "0x7a8f...9d2c",
    tiktokConnected: false, // TODO: Check TikTok OAuth status
    tiktokUsername: "cryptoartist_tk", // TODO: Get from TikTok OAuth
    cvsScore: 87, // TODO: Fetch from backend API
    totalEarnings: 1250.5, // TODO: Fetch from smart contract
    activeCampaigns: 3, // TODO: Fetch from API
    totalSubmissions: 24, // TODO: Fetch from API
    approvedSubmissions: 21, // TODO: Fetch from API
  }

  const recentCampaigns = [
    {
      id: 1,
      title: "Celo Wallet Mobile App Launch",
      company: "Celo Foundation",
      status: "active",
      reward: 50,
      imageUrl: "/mobile-wallet-app-blockchain.jpg",
    },
    {
      id: 2,
      title: "DeFi Made Simple Campaign",
      company: "Uniswap Labs",
      status: "pending",
      reward: 75,
      imageUrl: "/defi-trading-cryptocurrency.jpg",
    },
    {
      id: 3,
      title: "NFT Marketplace Promotion",
      company: "OpenSea",
      status: "completed",
      reward: 100,
      imageUrl: "/nft-digital-art-marketplace.jpg",
    },
  ]

  const achievements = [
    { id: 1, emoji: "🎯", label: "First Campaign", unlocked: true },
    { id: 2, emoji: "⭐", label: "10 Approvals", unlocked: true },
    { id: 3, emoji: "💎", label: "Diamond Creator", unlocked: false },
    { id: 4, emoji: "🚀", label: "Viral Hit", unlocked: false },
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
      <CreatorHeader username={creatorData.username} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Hero Profile Section */}
          <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent px-6 py-8 mb-6 rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <img
                  src={creatorData.pfpUrl}
                  alt={creatorData.displayName}
                  className="w-20 h-20 rounded-full border-4 border-primary/30 object-cover"
                />
                {creatorData.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-1">{creatorData.displayName}</h1>
                <p className="text-sm text-muted-foreground mb-2">@{creatorData.username}</p>
                <div className="flex gap-2 flex-wrap">
                  {creatorData.tiktokConnected && (
                    <span className="px-3 py-1 bg-black text-white text-xs rounded-full font-medium">
                      🎵 @{creatorData.tiktokUsername}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    FID: {creatorData.fid}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50">
                <div className="text-3xl font-bold text-primary mb-1">${creatorData.totalEarnings}</div>
                <div className="text-xs text-muted-foreground font-medium">Total Earned</div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50">
                <div className="text-3xl font-bold text-foreground mb-1">{creatorData.cvsScore}</div>
                <div className="text-xs text-muted-foreground font-medium">CVS Score</div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50">
                <div className="text-3xl font-bold text-foreground mb-1">{creatorData.activeCampaigns}</div>
                <div className="text-xs text-muted-foreground font-medium">Active</div>
              </div>
            </div>
          </div>

          {/* Verification Call-to-Action */}
          {!creatorData.isVerified && (
            <div className="px-6 mb-6">
              <button
                onClick={() => setShowWizard(true)}
                className="w-full bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/30 rounded-2xl p-6 text-left hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🛡️</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      Complete Verification
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Verify your identity with Self.xyz and connect your TikTok account to unlock full access
                    </p>
                  </div>
                  <div className="text-primary text-2xl">→</div>
                </div>
              </button>
            </div>
          )}

          {/* CVS Progress Card */}
          <div className="px-6 mb-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-5 border border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Creator Quality Score</h3>
                  <p className="text-sm text-muted-foreground">Silver Tier</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{creatorData.cvsScore}</div>
                  <div className="text-xs text-muted-foreground">/100</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-3">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 transition-all"
                  style={{ width: `${creatorData.cvsScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="text-muted-foreground">
                  {creatorData.approvedSubmissions}/{creatorData.totalSubmissions} approved
                </div>
                <div className="text-primary font-medium">13 points to Gold 🏆</div>
              </div>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Active Campaigns</h2>
              <Link href="/creator/campaigns" className="text-sm text-primary font-medium">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {recentCampaigns.map((campaign) => (
                <Link key={campaign.id} href={`/creator/campaigns/${campaign.id}`} className="block group">
                  <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all">
                    <div className="flex gap-3 p-3">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                        <img
                          src={campaign.imageUrl || "/placeholder.svg"}
                          alt={campaign.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {campaign.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{campaign.company}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">${campaign.reward}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              campaign.status === "active"
                                ? "bg-[#B2EBA1]/10 text-[#4E632A]"
                                : campaign.status === "pending"
                                  ? "bg-yellow-500/10 text-yellow-600"
                                  : "bg-gray-500/10 text-gray-600"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="px-6 mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Achievements</h2>
            <div className="grid grid-cols-4 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? "bg-[#B2EBA1]/10 text-[#4E632A] border-[#4E632A]/30"
                      : "bg-muted/30 text-muted-foreground border-border opacity-50"
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.emoji}</div>
                  <div className="text-xs font-medium text-foreground line-clamp-2">{achievement.label}</div>
                  {achievement.unlocked && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/creator/campaigns"
                className="bg-primary text-primary-foreground rounded-2xl p-5 text-center font-bold hover:opacity-90 transition-opacity"
              >
                <div className="text-3xl mb-2">🎯</div>
                <div>Find Campaigns</div>
              </Link>
              <Link
                href="/creator/submissions"
                className="bg-card border border-border rounded-2xl p-5 text-center font-bold hover:border-primary/50 transition-colors"
              >
                <div className="text-3xl mb-2">📹</div>
                <div>My Submissions</div>
              </Link>
              <Link
                href="/creator/wallet"
                className="bg-card border border-border rounded-2xl p-5 text-center font-bold hover:border-primary/50 transition-colors"
              >
                <div className="text-3xl mb-2">💰</div>
                <div>Wallet</div>
              </Link>
              <button className="bg-card border border-border rounded-2xl p-5 text-center font-bold hover:border-primary/50 transition-colors">
                <div className="text-3xl mb-2">🎁</div>
                <div>Invite Friends</div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* OnboardingWizard modal */}
      <OnboardingWizard open={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  )
}
