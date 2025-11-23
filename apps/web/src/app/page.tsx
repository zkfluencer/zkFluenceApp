"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Zap, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { useEffect } from "react"

export default function HomePage() {
  const { context, isMiniAppReady, isSDKLoaded, setMiniAppReady } = useMiniApp()
  const { address, isConnected } = useAccount()

  // Extract user data from Farcaster context
  const farcasterUser = context?.user
  const walletAddress = address || farcasterUser?.custody || farcasterUser?.verifications?.[0] || "0x742d...4a8C"
  const displayName = farcasterUser?.displayName || farcasterUser?.username || "Creator"
  const username = farcasterUser?.username || "@creator_eth"
  const pfpUrl = farcasterUser?.pfpUrl

  // Format wallet address
  const formatAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const user = {
    avatar: pfpUrl || "/placeholder-user.jpg",
    farcasterId: username.startsWith('@') ? username : `@${username}`,
    walletAddress: formatAddress(walletAddress),
    fullWalletAddress: walletAddress,
    displayName,
    isConnected,
  }

  // Call ready() after component mounts and content is visible
  useEffect(() => {
    if (isSDKLoaded && !isMiniAppReady) {
      // Small delay to ensure DOM is painted
      const timer = setTimeout(() => {
        setMiniAppReady()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isSDKLoaded, isMiniAppReady, setMiniAppReady])

  // Show loading state only while SDK is loading
  if (!isSDKLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading zkFluencer...</p>
        </div>
      </div>
    )
  }

  const campaigns = [
    {
      id: "1",
      title: "Share Celo Mobile Wallet Experience",
      brand: "Valora",
      description: "Create authentic content showcasing your experience with the Celo mobile wallet app",
      participants: 142,
      reward: 25,
      totalPool: 3500,
      category: "Social",
    },
    {
      id: "2",
      title: "DeFi Tutorial: Mint Your First NFT",
      brand: "Celo Foundation",
      description: "Create a beginner-friendly tutorial on minting NFTs on the Celo blockchain",
      participants: 68,
      reward: 40,
      totalPool: 2720,
      category: "Educational",
    },
    {
      id: "3",
      title: "Ecosystem Review: Your Favorite Celo dApp",
      brand: "Celo Community",
      description: "Share an in-depth review of your favorite decentralized app in the Celo ecosystem",
      participants: 34,
      reward: 30,
      totalPool: 1020,
      category: "Review",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-[#635949]/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">zkFluencer</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm font-medium px-2 sm:px-3">
                Dashboard
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm font-medium px-2 sm:px-3">
                Profile
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm font-medium border-primary text-primary hover:bg-primary hover:text-white bg-transparent px-2 sm:px-3 hidden sm:flex"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-8 sm:mb-12 -mx-4 sm:-mx-6 px-4 sm:px-6 py-6 sm:py-8 bg-[#635949] text-white">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 tracking-tight">Active Campaigns</h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Create authentic content, grow your influence, and earn rewards on Celo
              </p>
            </div>
            <div className="w-full sm:w-auto flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 border border-white/20">
              <Avatar className="h-10 w-10 ring-2 ring-white/30 flex-shrink-0">
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback className="bg-primary text-white">
                  {user.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-white">{user.farcasterId}</div>
                  {user.isConnected && (
                    <div className="w-2 h-2 rounded-full bg-green-400 ring-2 ring-white/30"></div>
                  )}
                </div>
                <div className="text-xs text-white/70 font-mono truncate" title={user.fullWalletAddress}>
                  {user.walletAddress}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {campaigns.map((campaign, index) => (
            <Card
              key={campaign.id}
              className={`p-4 sm:p-6 hover:shadow-md transition-shadow border-border ${index % 2 === 1 ? "bg-card-alt" : ""}`}
            >
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium px-2 py-0.5 bg-accent/10 text-accent border-0"
                      >
                        {campaign.category}
                      </Badge>
                      <span className="text-xs sm:text-sm text-muted-foreground">by {campaign.brand}</span>
                    </div>
                    <h3 className="font-semibold text-lg sm:text-xl mb-2 leading-snug">{campaign.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{campaign.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-3 px-3 sm:px-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-semibold text-foreground">{campaign.participants}</span>
                      <span className="text-muted-foreground ml-1">participants</span>
                    </span>
                  </div>
                  <div className="h-4 w-px bg-border hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-semibold text-foreground">{campaign.totalPool}</span>
                      <span className="text-muted-foreground ml-1">CELO pool</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Earn up to</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{campaign.reward}</span>
                      <span className="text-sm text-muted-foreground font-medium">CELO</span>
                    </div>
                  </div>
                  <Link href={`/creator/campaigns/${campaign.id}/start`} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-6">
                      Participate
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-12 sm:mt-16 p-6 sm:p-10 text-center bg-[#1a0329] border-[#1a0329] text-white">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-white/10 flex items-center justify-center">
            <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Ready to explore campaigns?</h3>
          <p className="text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
            Browse active campaigns, earn rewards, and grow your influence in the Web3 creator economy
          </p>
          <Link href="/creator/feed">
            <Button
              size="lg"
              className="px-6 sm:px-8 bg-primary hover:bg-primary/90 text-white font-semibold w-full sm:w-auto"
            >
              View All Campaigns
            </Button>
          </Link>
        </Card>
      </main>
    </div>
  )
}
