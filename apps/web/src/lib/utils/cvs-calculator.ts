// CVS (Creator Verification Score) Calculator

import type { CVSCalculation } from "@/types/creator"

export interface CVSInputs {
  // Verification status (0-25 points)
  isSelfVerified: boolean // 15 points
  isTikTokConnected: boolean // 5 points
  isFarcasterVerified: boolean // 5 points

  // Submission history (0-25 points)
  totalSubmissions: number // Up to 15 points (1 point per submission, max 15)
  experienceBonus: number // Up to 10 points based on time active

  // Approval rate (0-30 points)
  approvedSubmissions: number
  rejectedSubmissions: number

  // Engagement metrics (0-20 points)
  tiktokFollowers?: number // Up to 10 points
  averageViews?: number // Up to 10 points
}

export class CVSCalculator {
  /**
   * Calculate CVS score based on creator metrics
   */
  static calculate(inputs: CVSInputs): CVSCalculation {
    // 1. Verification Status (0-25 points)
    let verificationScore = 0
    if (inputs.isSelfVerified) verificationScore += 15
    if (inputs.isTikTokConnected) verificationScore += 5
    if (inputs.isFarcasterVerified) verificationScore += 5

    // 2. Submission History (0-25 points)
    const submissionPoints = Math.min(inputs.totalSubmissions, 15) // Max 15 points
    const experiencePoints = Math.min(inputs.experienceBonus, 10) // Max 10 points
    const submissionScore = submissionPoints + experiencePoints

    // 3. Approval Rate (0-30 points)
    const totalReviewed = inputs.approvedSubmissions + inputs.rejectedSubmissions
    const approvalRate = totalReviewed > 0 ? inputs.approvedSubmissions / totalReviewed : 0
    const approvalScore = Math.round(approvalRate * 30)

    // 4. Engagement (0-20 points)
    let engagementScore = 0

    // TikTok followers (0-10 points)
    if (inputs.tiktokFollowers) {
      if (inputs.tiktokFollowers >= 1000000) engagementScore += 10
      else if (inputs.tiktokFollowers >= 500000) engagementScore += 9
      else if (inputs.tiktokFollowers >= 100000) engagementScore += 8
      else if (inputs.tiktokFollowers >= 50000) engagementScore += 6
      else if (inputs.tiktokFollowers >= 10000) engagementScore += 4
      else if (inputs.tiktokFollowers >= 5000) engagementScore += 2
      else engagementScore += 1
    }

    // Average views (0-10 points)
    if (inputs.averageViews) {
      if (inputs.averageViews >= 100000) engagementScore += 10
      else if (inputs.averageViews >= 50000) engagementScore += 8
      else if (inputs.averageViews >= 10000) engagementScore += 6
      else if (inputs.averageViews >= 5000) engagementScore += 4
      else if (inputs.averageViews >= 1000) engagementScore += 2
      else engagementScore += 1
    }

    engagementScore = Math.min(engagementScore, 20) // Cap at 20

    // Total score (0-100)
    const totalScore = verificationScore + submissionScore + approvalScore + engagementScore

    // Generate breakdown explanation
    const breakdown = this.generateBreakdown({
      verificationScore,
      submissionScore,
      approvalScore,
      engagementScore,
      totalScore,
      approvalRate,
    })

    return {
      score: totalScore,
      factors: {
        verificationStatus: verificationScore,
        submissionHistory: submissionScore,
        approvalRate: approvalScore,
        engagement: engagementScore,
      },
      breakdown,
    }
  }

  /**
   * Generate human-readable breakdown
   */
  private static generateBreakdown(data: {
    verificationScore: number
    submissionScore: number
    approvalScore: number
    engagementScore: number
    totalScore: number
    approvalRate: number
  }): string {
    const lines = []

    lines.push(`Total CVS Score: ${data.totalScore}/100`)
    lines.push("")
    lines.push(`Verification Status: ${data.verificationScore}/25`)
    lines.push(`Submission History: ${data.submissionScore}/25`)
    lines.push(
      `Approval Rate: ${data.approvalScore}/30 (${Math.round(data.approvalRate * 100)}% approved)`
    )
    lines.push(`Engagement: ${data.engagementScore}/20`)
    lines.push("")

    // Recommendations
    if (data.totalScore >= 90) {
      lines.push("⭐ Premium Creator - Eligible for all campaigns")
    } else if (data.totalScore >= 80) {
      lines.push("✨ High Quality Creator - Eligible for most campaigns")
    } else if (data.totalScore >= 70) {
      lines.push("✓ Standard Creator - Eligible for standard campaigns")
    } else if (data.totalScore >= 60) {
      lines.push("→ Entry Level Creator - Limited campaign access")
    } else {
      lines.push("→ New Creator - Complete verification to unlock campaigns")
    }

    return lines.join("\n")
  }

  /**
   * Get CVS tier based on score
   */
  static getTier(score: number): "premium" | "high" | "standard" | "entry" | "new" {
    if (score >= 90) return "premium"
    if (score >= 80) return "high"
    if (score >= 70) return "standard"
    if (score >= 60) return "entry"
    return "new"
  }

  /**
   * Get minimum campaigns a creator can access
   */
  static getAccessibleCampaigns(score: number): {
    minCVS: number
    percentage: number
  } {
    if (score >= 90) return { minCVS: 60, percentage: 100 }
    if (score >= 80) return { minCVS: 70, percentage: 90 }
    if (score >= 70) return { minCVS: 70, percentage: 70 }
    if (score >= 60) return { minCVS: 60, percentage: 40 }
    return { minCVS: 0, percentage: 10 }
  }
}
