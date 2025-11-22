// API Route: /api/campaigns
// Get all campaigns or create a new campaign

import { NextRequest, NextResponse } from "next/server"
import type { Campaign } from "@/types/campaign"

// TODO: Replace with actual database integration
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Celo Wallet Mobile App Launch",
    company: "Celo Foundation",
    companyLogo: "/placeholder.svg?height=48&width=48&text=CF",
    description: "Create engaging content showcasing the new Celo mobile wallet features.",
    reward: 50,
    rewardToken: "USDC",
    deadline: "2024-12-30",
    spotsTotal: 20,
    spotsFilled: 5,
    minCVS: 75,
    category: "wallet",
    backgroundImage: "/mobile-wallet-app-blockchain.jpg",
    duration: "30-90s",
    tags: ["Mobile", "Wallet", "Easy"],
    status: "active",
    createdAt: "2024-11-01T00:00:00Z",
    updatedAt: "2024-11-22T00:00:00Z",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    escrowAmount: 1000,
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const minReward = searchParams.get("minReward")
    const status = searchParams.get("status")

    let filteredCampaigns = mockCampaigns

    // Apply filters
    if (category && category !== "all") {
      filteredCampaigns = filteredCampaigns.filter((c) => c.category === category)
    }

    if (minReward) {
      filteredCampaigns = filteredCampaigns.filter((c) => c.reward >= parseFloat(minReward))
    }

    if (status) {
      filteredCampaigns = filteredCampaigns.filter((c) => c.status === status)
    }

    return NextResponse.json(filteredCampaigns)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Validate request body
    // TODO: Authenticate company user
    // TODO: Create campaign in database
    // TODO: Deploy escrow contract
    // TODO: Fund escrow with USDC

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      ...body,
      spotsFilled: 0,
      status: "draft" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockCampaigns.push(newCampaign)

    return NextResponse.json(
      {
        campaign: newCampaign,
        contractAddress: "0xNEWCONTRACTADDRESS",
        txHash: "0xTRANSACTIONHASH",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
