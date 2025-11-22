"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CreatorHeader } from "@/components/creator-header"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"
import { useState } from "react"

export default function SubmissionsPage() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address } = useAccount()
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Extract Farcaster user data
  const user = context?.user
  const username = user?.username || "creator"

  // Mock submissions data - TODO: Replace with API call
  const submissions = [
    {
      id: "1",
      campaign: "Celo Wallet Mobile App Launch",
      company: "Celo Foundation",
      submittedDate: "2024-11-20T10:00:00Z",
      status: "approved",
      reward: 50,
      videoUrl: "https://tiktok.com/@user/video/123456789",
      thumbnailUrl: "/mobile-wallet-app-blockchain.jpg",
      feedback: "Great content! Very engaging and clear explanation of the wallet features.",
      approvedDate: "2024-11-20T14:30:00Z",
    },
    {
      id: "2",
      campaign: "DeFi Made Simple Campaign",
      company: "Uniswap Labs",
      submittedDate: "2024-11-18T12:00:00Z",
      status: "approved",
      reward: 75,
      videoUrl: "https://tiktok.com/@user/video/987654321",
      thumbnailUrl: "/defi-trading-cryptocurrency.jpg",
      feedback: "Excellent educational content. Viewers will definitely learn from this.",
      approvedDate: "2024-11-18T16:45:00Z",
    },
    {
      id: "3",
      campaign: "NFT Marketplace Promotion",
      company: "OpenSea",
      submittedDate: "2024-11-22T09:00:00Z",
      status: "pending",
      reward: 100,
      videoUrl: "https://tiktok.com/@user/video/456789123",
      thumbnailUrl: "/nft-digital-art-marketplace.jpg",
    },
    {
      id: "4",
      campaign: "Web3 Gaming Experience",
      company: "Immutable X",
      submittedDate: "2024-11-15T14:30:00Z",
      status: "rejected",
      reward: 60,
      videoUrl: "https://tiktok.com/@user/video/789123456",
      thumbnailUrl: "/gaming-esports-blockchain.jpg",
      feedback: "Video quality is good, but we need more focus on the gameplay mechanics. Please resubmit with more gameplay footage.",
      rejectedDate: "2024-11-16T10:00:00Z",
    },
    {
      id: "5",
      campaign: "Celo Wallet Mobile App Launch",
      company: "Celo Foundation",
      submittedDate: "2024-11-10T11:00:00Z",
      status: "approved",
      reward: 50,
      videoUrl: "https://tiktok.com/@user/video/321654987",
      thumbnailUrl: "/mobile-wallet-app-blockchain.jpg",
      feedback: "Perfect! This is exactly what we were looking for.",
      approvedDate: "2024-11-10T15:20:00Z",
    },
  ]

  // Filter submissions by status
  const filteredSubmissions = submissions.filter((submission) => {
    if (selectedStatus === "all") return true
    return submission.status === selectedStatus
  })

  // Calculate stats
  const stats = {
    total: submissions.length,
    approved: submissions.filter((s) => s.status === "approved").length,
    pending: submissions.filter((s) => s.status === "pending").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
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
      <CreatorHeader username={username} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Submissions</h1>
            <p className="text-muted-foreground">Track your campaign submissions and earnings</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-card rounded-xl p-4 text-center border border-border">
              <div className="text-2xl font-bold text-foreground mb-1">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div className="bg-card rounded-xl p-4 text-center border border-border">
              <div className="text-2xl font-bold text-[#4E632A] mb-1">{stats.approved}</div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </div>
            <div className="bg-card rounded-xl p-4 text-center border border-border">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.pending}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="bg-card rounded-xl p-4 text-center border border-border">
              <div className="text-2xl font-bold text-red-600 mb-1">{stats.rejected}</div>
              <div className="text-xs text-muted-foreground">Rejected</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
            {[
              { value: "all", label: "All", count: stats.total },
              { value: "approved", label: "Approved", count: stats.approved },
              { value: "pending", label: "Pending", count: stats.pending },
              { value: "rejected", label: "Rejected", count: stats.rejected },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedStatus(tab.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:border-primary/50"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all">
                <div className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={submission.thumbnailUrl || "/placeholder.svg"}
                      alt={submission.campaign}
                      className="w-full h-full object-cover"
                    />
                    {submission.status === "approved" && (
                      <div className="absolute top-2 right-2 bg-[#4E632A] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                    {submission.status === "pending" && (
                      <div className="absolute top-2 right-2 bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ⏳
                      </div>
                    )}
                    {submission.status === "rejected" && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✕
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground mb-1 line-clamp-2">{submission.campaign}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{submission.company}</p>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-primary">${submission.reward} USDC</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === "approved"
                            ? "bg-[#B2EBA1]/10 text-[#4E632A]"
                            : submission.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-600"
                              : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">
                      Submitted {new Date(submission.submittedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {submission.approvedDate && ` • Approved ${new Date(submission.approvedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                      {submission.rejectedDate && ` • Rejected ${new Date(submission.rejectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                    </p>

                    {/* Feedback */}
                    {submission.feedback && (
                      <div className={`p-3 rounded-lg text-sm ${
                        submission.status === "approved"
                          ? "bg-[#B2EBA1]/10 text-[#4E632A]"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <p className="font-medium mb-1">Feedback:</p>
                        <p>{submission.feedback}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      <a
                        href={submission.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        View Video
                      </a>
                      {submission.status === "rejected" && (
                        <button className="px-4 py-2 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:border-primary/50 transition-colors">
                          Resubmit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSubmissions.length === 0 && (
            <div className="bg-card rounded-2xl p-12 border border-border text-center">
              <div className="text-5xl mb-4">📹</div>
              <p className="text-lg text-muted-foreground mb-2">No submissions yet</p>
              <p className="text-sm text-muted-foreground mb-6">
                {selectedStatus === "all"
                  ? "Start creating content for campaigns to earn USDC"
                  : `You don't have any ${selectedStatus} submissions`}
              </p>
              <Link
                href="/creator/campaigns"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Browse Campaigns
              </Link>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
