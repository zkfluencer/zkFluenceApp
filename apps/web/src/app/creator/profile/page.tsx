"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CreatorHeader } from "@/components/creator-header"
import { BottomNav } from "@/components/bottom-nav"
import { useState } from "react"

export default function ProfilePage() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address } = useAccount()
  const [showWizard, setShowWizard] = useState(false)

  // Extract Farcaster user data
  const user = context?.user
  const profileData = {
    fid: user?.fid?.toString() || "12345",
    username: user?.username || "cryptoartist",
    displayName: user?.displayName || "Crypto Artist",
    pfpUrl: user?.pfpUrl || "/creator-avatar.png",
    bio: user?.bio || "TikTok creator sharing Web3 knowledge",
    isVerified: !!user?.verifications?.length,
    verifications: user?.verifications || [],
    walletAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "0x7a8f...9d2c",
    // TODO: Get from Self.xyz verification
    selfVerified: false,
    region: "United States",
    // TODO: Check TikTok OAuth status
    tiktokConnected: false,
    tiktokUsername: "cryptoartist_tk",
    // TODO: Fetch from backend API
    cvsScore: 87,
    totalEarnings: 1250.5,
    totalSubmissions: 24,
    approvedSubmissions: 21,
    joinedDate: "2024-01-15",
  }

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
      <CreatorHeader username={profileData.username} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <img
                  src={profileData.pfpUrl}
                  alt={profileData.displayName}
                  className="w-24 h-24 rounded-full border-4 border-primary/30 object-cover"
                />
                {profileData.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-1">{profileData.displayName}</h1>
                <p className="text-lg text-muted-foreground mb-3">@{profileData.username}</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                    FID: {profileData.fid}
                  </span>
                  {profileData.tiktokConnected && (
                    <span className="px-3 py-1 bg-black text-white text-sm rounded-full font-medium">
                      🎵 @{profileData.tiktokUsername}
                    </span>
                  )}
                </div>
                <p className="text-foreground mb-4">{profileData.bio}</p>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(profileData.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50">
                <div className="text-2xl font-bold text-primary mb-1">{profileData.cvsScore}</div>
                <div className="text-xs text-muted-foreground">CVS Score</div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50">
                <div className="text-2xl font-bold text-foreground mb-1">${profileData.totalEarnings}</div>
                <div className="text-xs text-muted-foreground">Total Earned</div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50">
                <div className="text-2xl font-bold text-foreground mb-1">{profileData.totalSubmissions}</div>
                <div className="text-xs text-muted-foreground">Submissions</div>
              </div>
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50">
                <div className="text-2xl font-bold text-[#4E632A] mb-1">
                  {Math.round((profileData.approvedSubmissions / profileData.totalSubmissions) * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Approval Rate</div>
              </div>
            </div>
          </div>

          {/* Verification Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Verification Status</h2>

            {/* Farcaster Verification */}
            <div className="bg-card rounded-2xl p-5 border border-border mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🔗</div>
                  <div>
                    <h3 className="font-bold text-foreground">Farcaster Account</h3>
                    <p className="text-sm text-muted-foreground">Connected via FID {profileData.fid}</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-[#B2EBA1]/10 text-[#4E632A] rounded-full text-sm font-medium">
                  ✓ Connected
                </div>
              </div>
            </div>

            {/* Self.xyz Verification */}
            <div className="bg-card rounded-2xl p-5 border border-border mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🛡️</div>
                  <div>
                    <h3 className="font-bold text-foreground">Self.xyz Identity</h3>
                    <p className="text-sm text-muted-foreground">
                      {profileData.selfVerified ? "Verified" : "Verify your identity and location"}
                    </p>
                  </div>
                </div>
                {profileData.selfVerified ? (
                  <div className="px-4 py-2 bg-[#B2EBA1]/10 text-[#4E632A] rounded-full text-sm font-medium">
                    ✓ Verified
                  </div>
                ) : (
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                    Verify Now
                  </button>
                )}
              </div>
            </div>

            {/* TikTok Connection */}
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🎵</div>
                  <div>
                    <h3 className="font-bold text-foreground">TikTok Account</h3>
                    <p className="text-sm text-muted-foreground">
                      {profileData.tiktokConnected ? `@${profileData.tiktokUsername}` : "Connect your TikTok account"}
                    </p>
                  </div>
                </div>
                {profileData.tiktokConnected ? (
                  <div className="px-4 py-2 bg-[#B2EBA1]/10 text-[#4E632A] rounded-full text-sm font-medium">
                    ✓ Connected
                  </div>
                ) : (
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Wallet Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Wallet</h2>
            <div className="bg-card rounded-2xl p-5 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground mb-1">Connected Wallet</h3>
                  <p className="text-sm text-muted-foreground font-mono">{profileData.walletAddress}</p>
                </div>
                {address && (
                  <div className="px-4 py-2 bg-[#B2EBA1]/10 text-[#4E632A] rounded-full text-sm font-medium">
                    ✓ Connected
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Settings</h2>
            <div className="space-y-3">
              <button className="w-full bg-card rounded-2xl p-5 border border-border text-left hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">Edit Profile</h3>
                    <p className="text-sm text-muted-foreground">Update your bio and display name</p>
                  </div>
                  <div className="text-primary text-xl">→</div>
                </div>
              </button>

              <button className="w-full bg-card rounded-2xl p-5 border border-border text-left hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">Manage your notification settings</p>
                  </div>
                  <div className="text-primary text-xl">→</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
