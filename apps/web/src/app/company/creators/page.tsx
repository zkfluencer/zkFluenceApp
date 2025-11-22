"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CompanyHeader } from "@/components/company-header"
import { CreatorProfileCard } from "@/components/creator-profile-card"
import { useState } from "react"

export default function CreatorsPage() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address } = useAccount()

  // Extract Farcaster user data
  const user = context?.user
  const companyName = user?.displayName || "Web3 Company"

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [minCVS, setMinCVS] = useState(0)
  const [sortBy, setSortBy] = useState("cvs")

  // Mock creators data - TODO: Replace with API call
  const creators = [
    {
      id: "1",
      fid: "12345",
      username: "cryptoartist",
      displayName: "Crypto Artist",
      pfpUrl: "/creator-avatar.png",
      bio: "TikTok creator sharing Web3 knowledge and crypto education",
      cvsScore: 92,
      totalSubmissions: 45,
      approvedRate: 95,
      totalEarned: 3250.0,
      specialties: ["DeFi", "NFTs", "Education"],
      followerCount: "125K",
      isVerified: true,
      region: "United States",
    },
    {
      id: "2",
      fid: "67890",
      username: "web3educator",
      displayName: "Web3 Educator",
      pfpUrl: "/placeholder.svg?height=80&width=80&text=WE",
      bio: "Making blockchain simple and fun for everyone",
      cvsScore: 88,
      totalSubmissions: 32,
      approvedRate: 91,
      totalEarned: 2100.0,
      specialties: ["Education", "Wallet", "DeFi"],
      followerCount: "95K",
      isVerified: true,
      region: "Canada",
    },
    {
      id: "3",
      fid: "11223",
      username: "nftcollector",
      displayName: "NFT Collector Pro",
      pfpUrl: "/placeholder.svg?height=80&width=80&text=NC",
      bio: "Digital art enthusiast and NFT collector since 2021",
      cvsScore: 85,
      totalSubmissions: 28,
      approvedRate: 89,
      totalEarned: 1950.0,
      specialties: ["NFTs", "Art", "Marketplace"],
      followerCount: "78K",
      isVerified: true,
      region: "United Kingdom",
    },
    {
      id: "4",
      fid: "33445",
      username: "gamingchain",
      displayName: "Gaming Chain",
      pfpUrl: "/placeholder.svg?height=80&width=80&text=GC",
      bio: "Web3 gaming content creator and blockchain gamer",
      cvsScore: 82,
      totalSubmissions: 38,
      approvedRate: 87,
      totalEarned: 2450.0,
      specialties: ["Gaming", "Play2Earn", "Community"],
      followerCount: "142K",
      isVerified: true,
      region: "Philippines",
    },
    {
      id: "5",
      fid: "55667",
      username: "defimaster",
      displayName: "DeFi Master",
      pfpUrl: "/placeholder.svg?height=80&width=80&text=DM",
      bio: "DeFi strategist sharing trading tips and protocol reviews",
      cvsScore: 90,
      totalSubmissions: 41,
      approvedRate: 93,
      totalEarned: 2890.0,
      specialties: ["DeFi", "Trading", "Analytics"],
      followerCount: "108K",
      isVerified: true,
      region: "Singapore",
    },
  ]

  // Filter and sort creators
  const filteredCreators = creators
    .filter((creator) => creator.cvsScore >= minCVS)
    .sort((a, b) => {
      if (sortBy === "cvs") return b.cvsScore - a.cvsScore
      if (sortBy === "earned") return b.totalEarned - a.totalEarned
      if (sortBy === "rate") return b.approvedRate - a.approvedRate
      return 0
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
      <CompanyHeader companyName={companyName} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Browse Creators</h1>
            <p className="text-muted-foreground">Find verified influencers for your campaigns</p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-5 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Sort By */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="cvs">CVS Score (High to Low)</option>
                  <option value="earned">Total Earned (High to Low)</option>
                  <option value="rate">Approval Rate (High to Low)</option>
                </select>
              </div>

              {/* Min CVS */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Minimum CVS: {minCVS}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minCVS}
                  onChange={(e) => setMinCVS(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
            </div>
          </div>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <CreatorProfileCard key={creator.id} {...creator} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCreators.length === 0 && (
            <div className="bg-card rounded-2xl p-12 border border-border text-center">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg text-muted-foreground mb-2">No creators found</p>
              <p className="text-sm text-muted-foreground mb-6">
                Try adjusting your filters to see more results
              </p>
              <button
                onClick={() => {
                  setMinCVS(0)
                  setSortBy("cvs")
                }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
