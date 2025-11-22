"use client"

import { useState, useEffect } from "react"
import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount, useConnect } from "wagmi"
import { OnboardingWizard } from "@/components/onboarding-wizard"
import { CreatorHeader } from "@/components/creator-header"
import { TikTokCampaignCard } from "@/components/tiktok-campaign-card"
import { DesktopCampaignCard } from "@/components/desktop-campaign-card"
import { BottomNav } from "@/components/bottom-nav"

export default function HomePage() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address, isConnected, isConnecting } = useAccount()
  const { connect, connectors } = useConnect()
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Auto-connect wallet when miniapp is ready
  useEffect(() => {
    if (isMiniAppReady && !isConnected && !isConnecting && connectors.length > 0) {
      const farcasterConnector = connectors.find(c => c.id === 'farcaster')
      if (farcasterConnector) {
        connect({ connector: farcasterConnector })
      }
    }
  }, [isMiniAppReady, isConnected, isConnecting, connectors, connect])

  // Check onboarding completion
  useEffect(() => {
    if (isMiniAppReady) {
      const hasCompletedOnboarding = localStorage.getItem("zkfluencer_onboarding_completed")
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true)
      }
    }
  }, [isMiniAppReady])

  const handleOnboardingComplete = () => {
    localStorage.setItem("zkfluencer_onboarding_completed", "true")
    setShowOnboarding(false)
  }

  // Extract real user data from Farcaster context
  const user = context?.user
  const username = user?.username || "creator"
  const displayName = user?.displayName || "Creator"
  const pfpUrl = user?.pfpUrl
  const walletAddress = address || user?.custody || user?.verifications?.[0]

  // Mock campaign data (will be replaced with API calls)
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
      title: "DeFi Made Simple Campaign",
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
      title: "NFT Marketplace Promotion",
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
      title: "Web3 Gaming Experience",
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

  // Loading state while Farcaster SDK initializes
  if (!isMiniAppReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md mx-auto p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading zkFluencer...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <CreatorHeader username={username} />

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

      {/* Onboarding Wizard for first-time users */}
      <OnboardingWizard open={showOnboarding} onClose={handleOnboardingComplete} />
    </div>
  )
}
