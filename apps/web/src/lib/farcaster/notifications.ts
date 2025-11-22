// Farcaster Miniapp Notifications Integration

import { sdk } from "@farcaster/frame-sdk"

export interface NotificationConfig {
  title: string
  body: string
  targetUrl?: string
  icon?: string
}

export class FarcasterNotifications {
  private static readonly MAX_PER_30_SECONDS = 1
  private static readonly MAX_PER_DAY = 100
  private static lastNotificationTime: number = 0
  private static dailyCount: number = 0
  private static dailyResetTime: number = Date.now()

  /**
   * Check if we can send a notification (rate limiting)
   */
  private static canSendNotification(): boolean {
    const now = Date.now()

    // Reset daily counter if 24 hours passed
    if (now - this.dailyResetTime > 24 * 60 * 60 * 1000) {
      this.dailyCount = 0
      this.dailyResetTime = now
    }

    // Check daily limit
    if (this.dailyCount >= this.MAX_PER_DAY) {
      console.warn("Daily notification limit reached")
      return false
    }

    // Check 30-second throttle
    if (now - this.lastNotificationTime < 30 * 1000) {
      console.warn("Notification throttled (30 second limit)")
      return false
    }

    return true
  }

  /**
   * Request notification permission from user
   */
  static async requestPermission(): Promise<boolean> {
    try {
      const result = await sdk.actions.requestNotificationPermission()
      return result.permission === "granted"
    } catch (error) {
      console.error("Failed to request notification permission:", error)
      return false
    }
  }

  /**
   * Send a notification via Farcaster
   */
  static async sendNotification(config: NotificationConfig): Promise<boolean> {
    if (!this.canSendNotification()) {
      return false
    }

    try {
      await sdk.actions.sendNotification({
        title: config.title,
        body: config.body,
        targetUrl: config.targetUrl,
        tokens: {
          // Optional: notification token from user
        },
      })

      this.lastNotificationTime = Date.now()
      this.dailyCount++

      return true
    } catch (error) {
      console.error("Failed to send notification:", error)
      return false
    }
  }

  /**
   * Notify creator about new campaign match
   */
  static async notifyCampaignMatch(campaignTitle: string, reward: number): Promise<boolean> {
    return this.sendNotification({
      title: "🎯 New Campaign Match!",
      body: `${campaignTitle} - Earn $${reward} USDC`,
      targetUrl: "/creator/campaigns",
      icon: "🎯",
    })
  }

  /**
   * Notify creator about submission approval
   */
  static async notifySubmissionApproved(
    campaignTitle: string,
    reward: number
  ): Promise<boolean> {
    return this.sendNotification({
      title: "✅ Submission Approved!",
      body: `Your submission for "${campaignTitle}" was approved. $${reward} USDC earned!`,
      targetUrl: "/creator/wallet",
      icon: "✅",
    })
  }

  /**
   * Notify creator about submission rejection
   */
  static async notifySubmissionRejected(
    campaignTitle: string,
    feedback?: string
  ): Promise<boolean> {
    return this.sendNotification({
      title: "📝 Submission Needs Revision",
      body: feedback || `Your submission for "${campaignTitle}" needs revision`,
      targetUrl: "/creator/submissions",
      icon: "📝",
    })
  }

  /**
   * Notify company about new submission
   */
  static async notifyNewSubmission(
    creatorUsername: string,
    campaignTitle: string
  ): Promise<boolean> {
    return this.sendNotification({
      title: "📹 New Submission",
      body: `@${creatorUsername} submitted content for "${campaignTitle}"`,
      targetUrl: "/company/dashboard",
      icon: "📹",
    })
  }

  /**
   * Notify about payment received
   */
  static async notifyPaymentReceived(amount: number, txHash: string): Promise<boolean> {
    return this.sendNotification({
      title: "💰 Payment Received!",
      body: `$${amount} USDC deposited to your wallet`,
      targetUrl: `/creator/wallet?tx=${txHash}`,
      icon: "💰",
    })
  }

  /**
   * Notify about campaign ending soon
   */
  static async notifyCampaignEnding(
    campaignTitle: string,
    hoursRemaining: number
  ): Promise<boolean> {
    return this.sendNotification({
      title: "⏰ Campaign Ending Soon",
      body: `"${campaignTitle}" ends in ${hoursRemaining} hours!`,
      targetUrl: "/creator/campaigns",
      icon: "⏰",
    })
  }

  /**
   * Notify about CVS score update
   */
  static async notifyCVSUpdate(newScore: number, previousScore: number): Promise<boolean> {
    const change = newScore - previousScore
    const emoji = change > 0 ? "📈" : "📉"

    return this.sendNotification({
      title: `${emoji} CVS Score Updated`,
      body: `Your CVS score is now ${newScore} (${change > 0 ? "+" : ""}${change})`,
      targetUrl: "/creator/profile",
      icon: emoji,
    })
  }
}
