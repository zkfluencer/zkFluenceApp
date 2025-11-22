// Creator API client functions

import type { Creator, CVSCalculation, SelfVerificationStatus, TikTokConnectionStatus } from "@/types/creator"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export class CreatorAPI {
  /**
   * Get creator profile by FID
   */
  static async getCreatorByFid(fid: string): Promise<Creator> {
    const response = await fetch(`${API_BASE_URL}/creators/fid/${fid}`)
    if (!response.ok) throw new Error("Failed to fetch creator")
    return response.json()
  }

  /**
   * Get creator profile by username
   */
  static async getCreatorByUsername(username: string): Promise<Creator> {
    const response = await fetch(`${API_BASE_URL}/creators/username/${username}`)
    if (!response.ok) throw new Error("Failed to fetch creator")
    return response.json()
  }

  /**
   * Update creator profile
   */
  static async updateCreatorProfile(data: Partial<Creator>): Promise<Creator> {
    const response = await fetch(`${API_BASE_URL}/creators/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update profile")
    return response.json()
  }

  /**
   * Get creator CVS (Creator Verification Score) calculation
   */
  static async getCreatorCVS(fid: string): Promise<CVSCalculation> {
    const response = await fetch(`${API_BASE_URL}/creators/${fid}/cvs`)
    if (!response.ok) throw new Error("Failed to fetch CVS")
    return response.json()
  }

  /**
   * Browse creators with filters (company view)
   */
  static async browseCreators(params?: {
    minCVS?: number
    category?: string
    sortBy?: "cvs" | "earned" | "rate"
    limit?: number
    offset?: number
  }): Promise<Creator[]> {
    const queryParams = new URLSearchParams()
    if (params?.minCVS) queryParams.append("minCVS", params.minCVS.toString())
    if (params?.category) queryParams.append("category", params.category)
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy)
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.offset) queryParams.append("offset", params.offset.toString())

    const response = await fetch(`${API_BASE_URL}/creators?${queryParams}`)
    if (!response.ok) throw new Error("Failed to fetch creators")
    return response.json()
  }

  /**
   * Start Self.xyz verification flow
   */
  static async startSelfVerification(): Promise<{ verificationUrl: string; sessionId: string }> {
    const response = await fetch(`${API_BASE_URL}/verification/self/start`, {
      method: "POST",
    })
    if (!response.ok) throw new Error("Failed to start verification")
    return response.json()
  }

  /**
   * Check Self.xyz verification status
   */
  static async getSelfVerificationStatus(): Promise<SelfVerificationStatus> {
    const response = await fetch(`${API_BASE_URL}/verification/self/status`)
    if (!response.ok) throw new Error("Failed to fetch verification status")
    return response.json()
  }

  /**
   * Connect TikTok account via OAuth
   */
  static async connectTikTok(): Promise<{ authUrl: string }> {
    const response = await fetch(`${API_BASE_URL}/oauth/tiktok/connect`, {
      method: "POST",
    })
    if (!response.ok) throw new Error("Failed to initiate TikTok connection")
    return response.json()
  }

  /**
   * Get TikTok connection status
   */
  static async getTikTokStatus(): Promise<TikTokConnectionStatus> {
    const response = await fetch(`${API_BASE_URL}/oauth/tiktok/status`)
    if (!response.ok) throw new Error("Failed to fetch TikTok status")
    return response.json()
  }

  /**
   * Disconnect TikTok account
   */
  static async disconnectTikTok(): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/oauth/tiktok/disconnect`, {
      method: "POST",
    })
    if (!response.ok) throw new Error("Failed to disconnect TikTok")
    return response.json()
  }
}
