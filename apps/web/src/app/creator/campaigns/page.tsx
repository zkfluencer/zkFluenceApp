"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CreatorHeader } from "@/components/creator-header"
import { BottomNav } from "@/components/bottom-nav"
import { CampaignCard } from "@/components/campaign-card"
import { CampaignFilters } from "@/components/campaign-filters"
import { useState } from "react"

export default function CampaignsPage() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address } = useAccount()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [minReward, setMinReward] = useState(0)

  // Extract Farcaster user data
  const user = context?.user
  const username = user?.username || "creator"

  // Mock CVS score - TODO: Fetch from backend API
  const userCVS = 87

  // Mock campaign data - TODO: Replace with API call
  const campaigns = [
    {
      id: "1",
      title: "Celo Wallet Mobile App Launch",
      company: "Celo Foundation",
      companyLogo: "/placeholder.svg?height=48&width=48&text=CF",
      reward: 50,
      rewardToken: "USDC",
      deadline: "2024-12-30",
      spotsLeft: 15,
      minCVS: 75,
      category: "wallet",
      backgroundImage: "/mobile-wallet-app-blockchain.jpg",
      duration: "30-90s",
      description: "Create engaging content showcasing the new Celo mobile wallet features and ease of use.",
      tags: ["Mobile", "Wallet", "Easy"],
    },
    {
      id: "2",
      title: "DeFi Made Simple Campaign",
      company: "Uniswap Labs",
      companyLogo: "/placeholder.svg?height=48&width=48&text=UL",
      reward: 75,
      rewardToken: "USDC",
      deadline: "2024-12-25",
      spotsLeft: 8,
      minCVS: 80,
      category: "defi",
      backgroundImage: "/defi-trading-cryptocurrency.jpg",
      duration: "45-120s",
      description: "Help educate viewers about DeFi concepts using Uniswap as examples.",
      tags: ["DeFi", "Trading", "Education"],
    },
    {
      id: "3",
      title: "NFT Marketplace Promotion",
      company: "OpenSea",
      companyLogo: "/placeholder.svg?height=48&width=48&text=OS",
      reward: 100,
      rewardToken: "USDC",
      deadline: "2024-12-28",
      spotsLeft: 3,
      minCVS: 90,
      category: "nft",
      backgroundImage: "/nft-digital-art-marketplace.jpg",
      duration: "60-180s",
      description: "Showcase your NFT collection and experience with OpenSea marketplace.",
      tags: ["NFT", "Art", "Collection"],
      premium: true,
    },
    {
      id: "4",
      title: "Web3 Gaming Experience",
      company: "Immutable X",
      companyLogo: "/placeholder.svg?height=48&width=48&text=IX",
      reward: 60,
      rewardToken: "USDC",
      deadline: "2025-01-05",
      spotsLeft: 28,
      minCVS: 70,
      category: "gaming",
      backgroundImage: "/gaming-esports-blockchain.jpg",
      duration: "30-60s",
      description: "Promote the new blockchain gaming platform with exciting gameplay footage.",
      tags: ["Gaming", "Play2Earn", "Fun"],
    },
  ]

  // Filter campaigns based on user selections
  const filteredCampaigns = campaigns.filter((campaign) => {
    const categoryMatch = selectedCategory === "all" || campaign.category === selectedCategory
    const rewardMatch = campaign.reward >= minReward
    return categoryMatch && rewardMatch
  })

  // Loading state while Farcaster SDK initializes
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
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Browse Campaigns</h1>
            <p className="text-muted-foreground">
              Your CVS Score: <span className="text-primary font-bold">{userCVS}</span> - Find campaigns that match your profile
            </p>
          </div>

          {/* Filters */}
          <CampaignFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            minReward={minReward}
            onMinRewardChange={setMinReward}
          />

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredCampaigns.map((campaign) => {
              const isEligible = userCVS >= campaign.minCVS
              return (
                <CampaignCard
                  key={campaign.id}
                  {...campaign}
                  isEligible={isEligible}
                  userCVS={userCVS}
                />
              )
            })}
          </div>

          {/* Empty State */}
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No campaigns match your filters</p>
              <button
                onClick={() => {
                  setSelectedCategory("all")
                  setMinReward(0)
                }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
