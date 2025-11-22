// Campaign types for zkFluencer platform

export interface Campaign {
  id: string
  title: string
  company: string
  companyLogo?: string
  description: string
  reward: number
  rewardToken: "USDC" | "CELO" | "cUSD"
  deadline: string
  spotsTotal: number
  spotsFilled: number
  minCVS: number
  category: "wallet" | "defi" | "nft" | "gaming" | "social" | "infrastructure"
  backgroundImage?: string
  duration: string
  guidelines?: string
  tags?: string[]
  premium?: boolean
  status: "draft" | "active" | "paused" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
  contractAddress?: string
  escrowAmount?: number
}

export interface CampaignSubmission {
  id: string
  campaignId: string
  creatorId: string
  creatorFid: string
  creatorUsername: string
  videoUrl: string
  thumbnailUrl?: string
  submittedDate: string
  status: "pending" | "approved" | "rejected"
  feedback?: string
  approvedDate?: string
  rejectedDate?: string
  txHash?: string
}

export interface CampaignStats {
  totalCampaigns: number
  activeCampaigns: number
  completedCampaigns: number
  totalSpent: number
  totalCreators: number
  totalSubmissions: number
  approvedSubmissions: number
  pendingSubmissions: number
  rejectedSubmissions: number
  avgApprovalRate: number
}

export interface CreateCampaignRequest {
  title: string
  description: string
  category: Campaign["category"]
  reward: number
  rewardToken: Campaign["rewardToken"]
  maxCreators: number
  minCVS: number
  deadline: string
  duration: string
  guidelines?: string
  tags?: string[]
  imageUrl?: string
}

export interface CreateCampaignResponse {
  campaign: Campaign
  contractAddress: string
  txHash: string
}
