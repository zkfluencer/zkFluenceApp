// Farcaster Sharing Integration

import { sdk } from "@farcaster/frame-sdk"

export interface ShareConfig {
  text: string
  embeds?: string[]
  channelKey?: string
}

export class FarcasterSharing {
  /**
   * Share campaign to Farcaster feed
   */
  static async shareCampaign(campaign: {
    id: string
    title: string
    company: string
    reward: number
    imageUrl?: string
  }): Promise<boolean> {
    const appUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    const campaignUrl = `${appUrl}/creator/campaigns/${campaign.id}`

    const shareText = `🎯 New campaign on zkFluencer!\n\n"${campaign.title}" by ${campaign.company}\n💰 Earn $${campaign.reward} USDC\n\n${campaignUrl}`

    try {
      await sdk.actions.openUrl(
        `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(campaignUrl)}`
      )
      return true
    } catch (error) {
      console.error("Failed to share campaign:", error)
      return false
    }
  }

  /**
   * Share submission success to Farcaster
   */
  static async shareSubmissionSuccess(submission: {
    campaignTitle: string
    reward: number
    videoUrl?: string
  }): Promise<boolean> {
    const shareText = `✅ Just got approved on zkFluencer!\n\n"${submission.campaignTitle}"\n💰 Earned $${submission.reward} USDC\n\nJoin me: ${process.env.NEXT_PUBLIC_URL}`

    try {
      await sdk.actions.openUrl(
        `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`
      )
      return true
    } catch (error) {
      console.error("Failed to share submission:", error)
      return false
    }
  }

  /**
   * Share earnings milestone to Farcaster
   */
  static async shareEarningsMilestone(totalEarned: number, milestone: number): Promise<boolean> {
    const shareText = `🎉 Just reached $${milestone} in earnings on zkFluencer!\n\nTotal earned: $${totalEarned} USDC 💰\n\nStart earning with verified TikTok content: ${process.env.NEXT_PUBLIC_URL}`

    try {
      await sdk.actions.openUrl(
        `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`
      )
      return true
    } catch (error) {
      console.error("Failed to share milestone:", error)
      return false
    }
  }

  /**
   * Share referral link to Farcaster
   */
  static async shareReferral(referralCode: string, username: string): Promise<boolean> {
    const appUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    const referralUrl = `${appUrl}?ref=${referralCode}`

    const shareText = `🚀 Join me on zkFluencer!\n\nEarn USDC by creating TikTok content for Web3 projects.\n\n✓ Self.xyz verified creators\n✓ Fair CVS scoring\n✓ Instant USDC payments\n\nUse my link: ${referralUrl}`

    try {
      await sdk.actions.openUrl(
        `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(referralUrl)}`
      )
      return true
    } catch (error) {
      console.error("Failed to share referral:", error)
      return false
    }
  }

  /**
   * Share CVS achievement to Farcaster
   */
  static async shareCVSAchievement(cvsScore: number, tier: string): Promise<boolean> {
    const tierEmoji = {
      premium: "⭐",
      high: "✨",
      standard: "✓",
      entry: "→",
      new: "🌱",
    }[tier] || "✓"

    const shareText = `${tierEmoji} Achieved ${tier.toUpperCase()} tier on zkFluencer!\n\nCVS Score: ${cvsScore}/100\n\nVerified creator earning USDC for TikTok content 💰\n\n${process.env.NEXT_PUBLIC_URL}`

    try {
      await sdk.actions.openUrl(
        `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`
      )
      return true
    } catch (error) {
      console.error("Failed to share CVS achievement:", error)
      return false
    }
  }

  /**
   * Share company campaign launch to Farcaster
   */
  static async shareCampaignLaunch(campaign: {
    title: string
    company: string
    totalBudget: number
    maxCreators: number
  }): Promise<boolean> {
    const appUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"

    const shareText = `🚀 ${campaign.company} just launched a campaign on zkFluencer!\n\n"${campaign.title}"\n💰 ${campaign.totalBudget} USDC budget\n👥 ${campaign.maxCreators} spots available\n\nApply now: ${appUrl}/creator/campaigns`

    try {
      await sdk.actions.openUrl(
        `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(appUrl)}`
      )
      return true
    } catch (error) {
      console.error("Failed to share campaign launch:", error)
      return false
    }
  }

  /**
   * Create a custom Farcaster Frame for campaign
   */
  static generateCampaignFrame(campaign: {
    id: string
    title: string
    company: string
    reward: number
    imageUrl?: string
  }): {
    version: string
    imageUrl: string
    button: {
      title: string
      action: {
        type: string
        name: string
        url: string
        splashImageUrl: string
        splashBackgroundColor: string
      }
    }
  } {
    const appUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"

    return {
      version: "1",
      imageUrl: campaign.imageUrl || `${appUrl}/opengraph-image.png`,
      button: {
        title: `Apply Now - $${campaign.reward} USDC`,
        action: {
          type: "launch_frame",
          name: campaign.title,
          url: `${appUrl}/creator/campaigns/${campaign.id}`,
          splashImageUrl: campaign.imageUrl || `${appUrl}/icon.png`,
          splashBackgroundColor: "#0a0a0a",
        },
      },
    }
  }
}
