"use client"

import { CreatorHeader } from "@/components/creator-header"
import { TikTokCampaignCard } from "@/components/tiktok-campaign-card"
import { DesktopCampaignCard } from "@/components/desktop-campaign-card"
import { BottomNav } from "@/components/bottom-nav"

export default function CreatorFeedPage() {
  // Mock campaign data with background images
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
      backgroundImage: "/mobile-wallet-app-blockchain.jpg",
      duration: "30-90s",
      description: "Create engaging content showcasing the new Celo mobile wallet features and ease of use.",
      tags: ["Mobile", "Wallet", "Easy"],
    },
    {
      id: "2",
      title: "DeFi Made Simple",
      company: "Uniswap Labs",
      companyLogo: "/placeholder.svg?height=48&width=48&text=UL",
      reward: 75,
      rewardToken: "USDC",
      deadline: "2024-12-25",
      spotsLeft: 8,
      minCVS: 80,
      backgroundImage: "/defi-trading-cryptocurrency.jpg",
      duration: "45-120s",
      description: "Help educate viewers about DeFi concepts using Uniswap as examples.",
      tags: ["DeFi", "Trading", "Education"],
    },
    {
      id: "3",
      title: "NFT Marketplace Spotlight",
      company: "OpenSea",
      companyLogo: "/placeholder.svg?height=48&width=48&text=OS",
      reward: 100,
      rewardToken: "USDC",
      deadline: "2024-12-28",
      spotsLeft: 3,
      minCVS: 90,
      backgroundImage: "/nft-digital-art-marketplace.jpg",
      duration: "60-180s",
      description: "Showcase your NFT collection and experience with OpenSea marketplace.",
      tags: ["NFT", "Art", "Collection"],
      premium: true,
    },
    {
      id: "4",
      title: "Blockchain Gaming",
      company: "Immutable X",
      companyLogo: "/placeholder.svg?height=48&width=48&text=IX",
      reward: 60,
      rewardToken: "USDC",
      deadline: "2025-01-05",
      spotsLeft: 28,
      minCVS: 70,
      backgroundImage: "/gaming-esports-blockchain.jpg",
      duration: "30-60s",
      description: "Promote the new blockchain gaming platform with exciting gameplay footage.",
      tags: ["Gaming", "Play2Earn", "Fun"],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <CreatorHeader username="cryptoartist" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {/* Mobile: TikTok-style vertical scroll */}
        <div className="md:hidden snap-y snap-mandatory h-full scrollbar-hide">
          {campaigns.map((campaign) => (
            <TikTokCampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 container mx-auto max-w-7xl">
          {campaigns.map((campaign) => (
            <DesktopCampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
