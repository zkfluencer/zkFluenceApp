// Creator types for zkFluencer platform

export interface Creator {
  id: string
  fid: string
  username: string
  displayName: string
  pfpUrl?: string
  bio?: string
  isVerified: boolean
  verifications: string[]
  walletAddress?: string

  // Self.xyz verification
  selfVerified: boolean
  region?: string

  // TikTok connection
  tiktokConnected: boolean
  tiktokUsername?: string
  tiktokFollowers?: number

  // CVS (Creator Verification Score)
  cvsScore: number

  // Stats
  totalEarnings: number
  totalSubmissions: number
  approvedSubmissions: number
  rejectedSubmissions: number
  activeCampaigns: number

  // Timestamps
  joinedDate: string
  lastActive?: string
}

export interface CreatorStats {
  cvsScore: number
  totalEarnings: number
  totalSubmissions: number
  approvedSubmissions: number
  approvalRate: number
  activeCampaigns: number
}

export interface CVSCalculation {
  score: number
  factors: {
    verificationStatus: number // 0-25 points
    submissionHistory: number // 0-25 points
    approvalRate: number // 0-30 points
    engagement: number // 0-20 points
  }
  breakdown: string
}

export interface SelfVerificationStatus {
  isVerified: boolean
  region?: string
  verifiedAt?: string
  documentType?: string
}

export interface TikTokConnectionStatus {
  isConnected: boolean
  username?: string
  followers?: number
  connectedAt?: string
  lastSync?: string
}
