"use client"

import { CreatorHeader } from "@/components/creator-header"
import { TikTokCampaignCard } from "@/components/tiktok-campaign-card"
import { DesktopCampaignCard } from "@/components/desktop-campaign-card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CampaignFilters } from "@/components/campaign-filters"
import { BottomNav } from "@/components/bottom-nav"

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const campaigns = [
    {
      id: "1",
      title: "Celo Wallet Mobile App Launch",
      company: "Celo Foundation",
      companyLogo: "/placeholder.svg?height=48&width=48&text=CF",
      reward: 50,
      rewardToken: "USDC",
      deadline: "3 days left",
      spotsLeft: 15,
      minCVS: 75,
      backgroundImage: "/mobile-wallet-app-blockchain.jpg",
      duration: "30-90s",
      description: "Create engaging content showcasing the new Celo mobile wallet features and ease of use.",
      tags: ["Mobile", "Wallet", "Easy"],
      premium: false,
    },
    {
      id: "2",
      title: "DeFi Made Simple Educational Series",
      company: "Uniswap Labs",
      companyLogo: "/placeholder.svg?height=48&width=48&text=UL",
      reward: 75,
      rewardToken: "USDC",
      deadline: "1 week left",
      spotsLeft: 8,
      minCVS: 80,
      backgroundImage: "/defi-trading-cryptocurrency.jpg",
      duration: "60s",
      description: "Help educate viewers about DeFi concepts using Uniswap as examples.",
      tags: ["DeFi", "Education", "Finance"],
      premium: true,
    },
    {
      id: "3",
      title: "NFT Marketplace Creator Spotlight",
      company: "OpenSea",
      companyLogo: "/placeholder.svg?height=48&width=48&text=OS",
      reward: 100,
      rewardToken: "USDC",
      deadline: "5 days left",
      spotsLeft: 3,
      minCVS: 90,
      backgroundImage: "/nft-digital-art-marketplace.jpg",
      duration: "90s",
      description: "Showcase your NFT collection and experience with OpenSea marketplace.",
      tags: ["NFT", "Art", "Collectibles"],
      premium: true,
    },
    {
      id: "4",
      title: "Blockchain Gaming Platform Launch",
      company: "Immutable X",
      companyLogo: "/placeholder.svg?height=48&width=48&text=IX",
      reward: 60,
      rewardToken: "USDC",
      deadline: "2 weeks left",
      spotsLeft: 28,
      minCVS: 70,
      backgroundImage: "/gaming-esports-blockchain.jpg",
      duration: "60-90s",
      description: "Promote the new blockchain gaming platform with exciting gameplay footage.",
      tags: ["Gaming", "Play2Earn", "NFT"],
      premium: false,
    },
    {
      id: "5",
      title: "Stablecoin Education Campaign",
      company: "Circle",
      companyLogo: "/placeholder.svg?height=48&width=48&text=CI",
      reward: 80,
      rewardToken: "USDC",
      deadline: "3 weeks left",
      spotsLeft: 52,
      minCVS: 85,
      backgroundImage: "/mobile-wallet-app-blockchain.jpg",
      duration: "45-60s",
      description: "Explain how USDC stablecoins work and their benefits for everyday transactions.",
      tags: ["USDC", "Stablecoin", "Payments"],
      premium: true,
    },
    {
      id: "6",
      title: "DAO Governance Tutorial Series",
      company: "Aragon",
      companyLogo: "/placeholder.svg?height=48&width=48&text=AR",
      reward: 55,
      rewardToken: "USDC",
      deadline: "2 days left",
      spotsLeft: 5,
      minCVS: 75,
      backgroundImage: "/defi-trading-cryptocurrency.jpg",
      duration: "60s",
      description: "Create educational content about DAO governance and decision-making.",
      tags: ["DAO", "Governance", "Web3"],
      premium: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CreatorHeader username="cryptoartist" />

      <div className="sticky top-16 left-0 right-0 z-40 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border md:hidden">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🔍</span>
            <Input
              type="search"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="h-11 w-11 bg-transparent">
                <span className="text-lg">⚙️</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96">
              <SheetHeader>
                <SheetTitle>Filter Campaigns</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <CampaignFilters />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        {/* Mobile: TikTok-style vertical scroll */}
        <div className="md:hidden snap-y snap-mandatory min-h-screen overflow-y-scroll hide-scrollbar">
          {campaigns.map((campaign) => (
            <TikTokCampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>

        {/* Desktop: Grid with search */}
        <div className="hidden md:block">
          <div className="container mx-auto max-w-7xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Discover Campaigns</h1>
                <p className="text-muted-foreground">Find the perfect campaign for your audience</p>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="relative flex-1 max-w-xl">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🔍</span>
                <Input
                  type="search"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <Button variant="outline" className="bg-transparent">
                <span className="mr-2">⚙️</span>
                Filters
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <DesktopCampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
