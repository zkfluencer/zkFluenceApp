// Campaign API client functions

import type { Campaign, CampaignSubmission, CreateCampaignRequest, CreateCampaignResponse } from "@/types/campaign"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export class CampaignAPI {
  /**
   * Fetch all campaigns with optional filters
   */
  static async getCampaigns(params?: {
    category?: string
    minReward?: number
    status?: string
    limit?: number
    offset?: number
  }): Promise<Campaign[]> {
    const queryParams = new URLSearchParams()
    if (params?.category) queryParams.append("category", params.category)
    if (params?.minReward) queryParams.append("minReward", params.minReward.toString())
    if (params?.status) queryParams.append("status", params.status)
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.offset) queryParams.append("offset", params.offset.toString())

    const response = await fetch(`${API_BASE_URL}/campaigns?${queryParams}`)
    if (!response.ok) throw new Error("Failed to fetch campaigns")
    return response.json()
  }

  /**
   * Fetch a single campaign by ID
   */
  static async getCampaign(id: string): Promise<Campaign> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${id}`)
    if (!response.ok) throw new Error("Failed to fetch campaign")
    return response.json()
  }

  /**
   * Create a new campaign (company only)
   */
  static async createCampaign(data: CreateCampaignRequest): Promise<CreateCampaignResponse> {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create campaign")
    return response.json()
  }

  /**
   * Update campaign status
   */
  static async updateCampaignStatus(id: string, status: Campaign["status"]): Promise<Campaign> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) throw new Error("Failed to update campaign status")
    return response.json()
  }

  /**
   * Submit content to a campaign (creator only)
   */
  static async submitToCampaign(
    campaignId: string,
    data: {
      videoUrl: string
      thumbnailUrl?: string
    }
  ): Promise<CampaignSubmission> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to submit to campaign")
    return response.json()
  }

  /**
   * Get submissions for a campaign (company view)
   */
  static async getCampaignSubmissions(campaignId: string): Promise<CampaignSubmission[]> {
    const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/submissions`)
    if (!response.ok) throw new Error("Failed to fetch submissions")
    return response.json()
  }

  /**
   * Review a submission (company only)
   */
  static async reviewSubmission(
    submissionId: string,
    data: {
      status: "approved" | "rejected"
      feedback?: string
    }
  ): Promise<CampaignSubmission> {
    const response = await fetch(`${API_BASE_URL}/submissions/${submissionId}/review`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to review submission")
    return response.json()
  }

  /**
   * Get creator's submissions across all campaigns
   */
  static async getCreatorSubmissions(params?: {
    status?: string
    limit?: number
    offset?: number
  }): Promise<CampaignSubmission[]> {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append("status", params.status)
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.offset) queryParams.append("offset", params.offset.toString())

    const response = await fetch(`${API_BASE_URL}/submissions?${queryParams}`)
    if (!response.ok) throw new Error("Failed to fetch submissions")
    return response.json()
  }
}
