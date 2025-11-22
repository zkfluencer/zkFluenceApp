"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { FarcasterSharing } from "@/lib/farcaster/sharing"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareButtonProps {
  type: "campaign" | "submission" | "earnings" | "cvs" | "referral"
  data: any
  className?: string
}

export function ShareButton({ type, data, className }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async (shareType: string) => {
    setIsSharing(true)
    try {
      let success = false

      switch (type) {
        case "campaign":
          success = await FarcasterSharing.shareCampaign(data)
          break
        case "submission":
          success = await FarcasterSharing.shareSubmissionSuccess(data)
          break
        case "earnings":
          success = await FarcasterSharing.shareEarningsMilestone(
            data.totalEarned,
            data.milestone
          )
          break
        case "cvs":
          success = await FarcasterSharing.shareCVSAchievement(data.score, data.tier)
          break
        case "referral":
          success = await FarcasterSharing.shareReferral(data.code, data.username)
          break
      }

      if (success) {
        console.log("✅ Shared successfully")
      }
    } catch (error) {
      console.error("Share failed:", error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={className}
          disabled={isSharing}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleShare("farcaster")}>
          <span className="mr-2">🟣</span>
          Share to Farcaster
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
          <span className="mr-2">🔗</span>
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
