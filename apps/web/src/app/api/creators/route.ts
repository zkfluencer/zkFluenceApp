// API Route: /api/creators
// Browse and filter creators

import { NextRequest, NextResponse } from "next/server"
import type { Creator } from "@/types/creator"

// TODO: Replace with actual database integration
const mockCreators: Creator[] = [
  {
    id: "1",
    fid: "12345",
    username: "cryptoartist",
    displayName: "Crypto Artist",
    pfpUrl: "/creator-avatar.png",
    bio: "TikTok creator sharing Web3 knowledge",
    isVerified: true,
    verifications: ["0x7a8f9d2c"],
    walletAddress: "0x7a8f9d2c1234567890abcdef1234567890abcdef",
    selfVerified: true,
    region: "United States",
    tiktokConnected: true,
    tiktokUsername: "cryptoartist_tk",
    tiktokFollowers: 125000,
    cvsScore: 92,
    totalEarnings: 3250.0,
    totalSubmissions: 45,
    approvedSubmissions: 43,
    rejectedSubmissions: 2,
    activeCampaigns: 3,
    joinedDate: "2024-01-15T00:00:00Z",
    lastActive: "2024-11-22T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const minCVS = searchParams.get("minCVS")
    const sortBy = searchParams.get("sortBy") || "cvs"

    let filteredCreators = mockCreators

    // Apply CVS filter
    if (minCVS) {
      filteredCreators = filteredCreators.filter((c) => c.cvsScore >= parseFloat(minCVS))
    }

    // Apply sorting
    filteredCreators = filteredCreators.sort((a, b) => {
      if (sortBy === "cvs") return b.cvsScore - a.cvsScore
      if (sortBy === "earned") return b.totalEarnings - a.totalEarnings
      if (sortBy === "rate")
        return (
          b.approvedSubmissions / b.totalSubmissions - a.approvedSubmissions / a.totalSubmissions
        )
      return 0
    })

    return NextResponse.json(filteredCreators)
  } catch (error) {
    console.error("Error fetching creators:", error)
    return NextResponse.json({ error: "Failed to fetch creators" }, { status: 500 })
  }
}
