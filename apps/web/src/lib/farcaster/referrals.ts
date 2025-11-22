// Farcaster Referral System via Social Graph

import type { Creator } from "@/types/creator"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export interface Referral {
  id: string
  referrerId: string
  referrerFid: string
  referrerUsername: string
  referredId: string
  referredFid: string
  referredUsername: string
  status: "pending" | "active" | "completed"
  rewardAmount: number
  rewardPaid: boolean
  createdAt: string
  completedAt?: string
}

export interface ReferralStats {
  totalReferrals: number
  activeReferrals: number
  completedReferrals: number
  totalEarned: number
  pendingRewards: number
}

export interface ReferralReward {
  signupBonus: number // Reward when referred user signs up
  firstSubmissionBonus: number // Reward when referred user completes first submission
  earningsCommission: number // % of referred user's earnings (e.g., 5%)
}

export class FarcasterReferrals {
  private static readonly REFERRAL_REWARDS: ReferralReward = {
    signupBonus: 5, // $5 USDC
    firstSubmissionBonus: 10, // $10 USDC
    earningsCommission: 0.05, // 5% commission
  }

  /**
   * Generate unique referral code for user
   */
  static generateReferralCode(fid: string, username: string): string {
    // Use base62 encoding of FID + username hash for short codes
    const hash = this.simpleHash(`${fid}-${username}`)
    return `${username.slice(0, 4).toUpperCase()}${hash.slice(0, 6)}`
  }

  /**
   * Simple hash function for referral codes
   */
  private static simpleHash(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36).toUpperCase()
  }

  /**
   * Validate referral code format
   */
  static isValidReferralCode(code: string): boolean {
    return /^[A-Z0-9]{8,12}$/.test(code)
  }

  /**
   * Get user's referral stats
   */
  static async getReferralStats(fid: string): Promise<ReferralStats> {
    const response = await fetch(`${API_BASE_URL}/referrals/stats/${fid}`)
    if (!response.ok) throw new Error("Failed to fetch referral stats")
    return response.json()
  }

  /**
   * Get user's referrals list
   */
  static async getUserReferrals(fid: string): Promise<Referral[]> {
    const response = await fetch(`${API_BASE_URL}/referrals/list/${fid}`)
    if (!response.ok) throw new Error("Failed to fetch referrals")
    return response.json()
  }

  /**
   * Track referral signup
   */
  static async trackReferralSignup(referralCode: string, newUserFid: string): Promise<Referral> {
    const response = await fetch(`${API_BASE_URL}/referrals/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        referralCode,
        newUserFid,
      }),
    })
    if (!response.ok) throw new Error("Failed to track referral")
    return response.json()
  }

  /**
   * Calculate referral rewards
   */
  static calculateRewards(referral: Referral, referredUserEarnings: number): number {
    let totalReward = 0

    // Signup bonus (one-time)
    if (referral.status === "pending") {
      totalReward += this.REFERRAL_REWARDS.signupBonus
    }

    // First submission bonus (one-time)
    if (referral.status === "active") {
      totalReward += this.REFERRAL_REWARDS.firstSubmissionBonus
    }

    // Earnings commission (ongoing)
    if (referral.status === "completed") {
      totalReward += referredUserEarnings * this.REFERRAL_REWARDS.earningsCommission
    }

    return totalReward
  }

  /**
   * Get Farcaster followers who haven't joined yet (potential referrals)
   */
  static async getPotentialReferrals(fid: string): Promise<
    Array<{
      fid: string
      username: string
      displayName: string
      pfpUrl?: string
      isFollowing: boolean
    }>
  > {
    // TODO: Integrate with Farcaster API to get followers
    // Filter out users who already have zkFluencer accounts
    const response = await fetch(`${API_BASE_URL}/referrals/potential/${fid}`)
    if (!response.ok) throw new Error("Failed to fetch potential referrals")
    return response.json()
  }

  /**
   * Send referral invitation via Farcaster DM
   */
  static async sendReferralInvitation(
    targetFid: string,
    referralCode: string
  ): Promise<boolean> {
    // Note: Farcaster doesn't have direct DM API yet
    // This would use Warpcast API or direct cast mention
    const appUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    const referralUrl = `${appUrl}?ref=${referralCode}`

    // For now, open compose window with pre-filled text
    const inviteText = `Hey! I'm earning USDC on zkFluencer by creating TikTok content for Web3 projects. Join me: ${referralUrl}`

    try {
      // TODO: Replace with actual Farcaster DM API when available
      console.log(`Sending referral to FID ${targetFid}: ${inviteText}`)
      return true
    } catch (error) {
      console.error("Failed to send referral invitation:", error)
      return false
    }
  }

  /**
   * Get referral leaderboard
   */
  static async getReferralLeaderboard(limit: number = 10): Promise<
    Array<{
      fid: string
      username: string
      totalReferrals: number
      totalEarned: number
      rank: number
    }>
  > {
    const response = await fetch(`${API_BASE_URL}/referrals/leaderboard?limit=${limit}`)
    if (!response.ok) throw new Error("Failed to fetch leaderboard")
    return response.json()
  }

  /**
   * Claim pending referral rewards
   */
  static async claimReferralRewards(fid: string): Promise<{
    amount: number
    txHash: string
  }> {
    const response = await fetch(`${API_BASE_URL}/referrals/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fid }),
    })
    if (!response.ok) throw new Error("Failed to claim rewards")
    return response.json()
  }

  /**
   * Get social proof for referral program
   */
  static async getReferralSocialProof(): Promise<{
    totalUsers: number
    totalReferrals: number
    totalRewardsPaid: number
    topReferrers: Array<{
      username: string
      referrals: number
    }>
  }> {
    const response = await fetch(`${API_BASE_URL}/referrals/social-proof`)
    if (!response.ok) throw new Error("Failed to fetch social proof")
    return response.json()
  }
}
