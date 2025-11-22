// Farcaster Frame Actions Integration

import { sdk } from "@farcaster/frame-sdk"

export class FrameActions {
  /**
   * Initialize frame and notify Farcaster client that app is ready
   */
  static async ready(): Promise<void> {
    try {
      await sdk.actions.ready()
      console.log("✅ Farcaster Frame ready")
    } catch (error) {
      console.error("Failed to signal frame ready:", error)
    }
  }

  /**
   * Open external URL in Farcaster client
   */
  static async openUrl(url: string): Promise<void> {
    try {
      await sdk.actions.openUrl(url)
    } catch (error) {
      console.error("Failed to open URL:", error)
      // Fallback to window.open
      window.open(url, "_blank")
    }
  }

  /**
   * Close the miniapp frame
   */
  static async close(): Promise<void> {
    try {
      await sdk.actions.close()
    } catch (error) {
      console.error("Failed to close frame:", error)
    }
  }

  /**
   * Add frame to user's collection
   */
  static async addFrame(): Promise<boolean> {
    try {
      const result = await sdk.actions.addFrame()
      return result.added
    } catch (error) {
      console.error("Failed to add frame:", error)
      return false
    }
  }

  /**
   * Open TikTok video in external browser
   */
  static async openTikTokVideo(videoUrl: string): Promise<void> {
    await this.openUrl(videoUrl)
  }

  /**
   * Open campaign submission in TikTok
   */
  static async openCampaignSubmission(submissionUrl: string): Promise<void> {
    await this.openUrl(submissionUrl)
  }

  /**
   * Open Self.xyz verification flow
   */
  static async openSelfVerification(verificationUrl: string): Promise<void> {
    await this.openUrl(verificationUrl)
  }

  /**
   * Open TikTok OAuth connection
   */
  static async openTikTokOAuth(oauthUrl: string): Promise<void> {
    await this.openUrl(oauthUrl)
  }

  /**
   * Share to Warpcast compose
   */
  static async openWarpcastCompose(text: string, embeds?: string[]): Promise<void> {
    const embedParams = embeds ? embeds.map((e) => `&embeds[]=${encodeURIComponent(e)}`).join("") : ""
    const composeUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}${embedParams}`
    await this.openUrl(composeUrl)
  }

  /**
   * Open Celo block explorer for transaction
   */
  static async openTransaction(txHash: string, network: "celo" | "alfajores" = "alfajores"): Promise<void> {
    const explorerUrl = network === "celo"
      ? `https://celoscan.io/tx/${txHash}`
      : `https://alfajores.celoscan.io/tx/${txHash}`
    await this.openUrl(explorerUrl)
  }

  /**
   * Open wallet address in block explorer
   */
  static async openWalletExplorer(address: string, network: "celo" | "alfajores" = "alfajores"): Promise<void> {
    const explorerUrl = network === "celo"
      ? `https://celoscan.io/address/${address}`
      : `https://alfajores.celoscan.io/address/${address}`
    await this.openUrl(explorerUrl)
  }

  /**
   * Prompt user to add miniapp to their collection
   */
  static async promptAddToCollection(): Promise<boolean> {
    try {
      const result = await sdk.actions.addFrame()

      if (result.added) {
        console.log("✅ Miniapp added to user's collection")
        return true
      } else {
        console.log("ℹ️ User declined to add miniapp")
        return false
      }
    } catch (error) {
      console.error("Failed to prompt add to collection:", error)
      return false
    }
  }

  /**
   * Get current frame context
   */
  static getContext() {
    return sdk.context
  }

  /**
   * Check if running inside Farcaster frame
   */
  static isInsideFrame(): boolean {
    try {
      return !!sdk.context
    } catch {
      return false
    }
  }
}
