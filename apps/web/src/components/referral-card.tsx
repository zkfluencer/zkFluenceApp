"use client"

import { useState, useEffect } from "react"
import { useMiniApp } from "@/contexts/miniapp-context"
import { FarcasterReferrals } from "@/lib/farcaster/referrals"
import { FarcasterSharing } from "@/lib/farcaster/sharing"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Share2, Users } from "lucide-react"

export function ReferralCard() {
  const { context } = useMiniApp()
  const user = context?.user

  const [referralCode, setReferralCode] = useState<string>("")
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarned: 0,
    pendingRewards: 0,
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (user?.fid && user?.username) {
      // Generate referral code
      const code = FarcasterReferrals.generateReferralCode(
        user.fid.toString(),
        user.username
      )
      setReferralCode(code)

      // Fetch referral stats
      FarcasterReferrals.getReferralStats(user.fid.toString())
        .then(setReferralStats)
        .catch(console.error)
    }
  }, [user])

  const handleCopyReferralLink = async () => {
    const appUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    const referralUrl = `${appUrl}?ref=${referralCode}`

    await navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareReferral = async () => {
    if (!user?.username) return

    await FarcasterSharing.shareReferral(referralCode, user.username)
  }

  if (!user) return null

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Refer Friends, Earn USDC
        </CardTitle>
        <CardDescription>
          Invite creators to zkFluencer and earn 5% of their earnings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Referral Code */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Your Referral Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralCode}
              readOnly
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg font-mono text-lg font-bold text-center"
            />
            <Button
              onClick={handleCopyReferralLink}
              variant="outline"
              className="px-4"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-[#4E632A] mt-1">✓ Copied to clipboard!</p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/80 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-foreground">
              {referralStats.totalReferrals}
            </div>
            <div className="text-xs text-muted-foreground">Total Referrals</div>
          </div>
          <div className="bg-background/80 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-primary">
              ${referralStats.totalEarned}
            </div>
            <div className="text-xs text-muted-foreground">Total Earned</div>
          </div>
        </div>

        {/* Pending Rewards */}
        {referralStats.pendingRewards > 0 && (
          <div className="bg-[#B2EBA1]/10 border border-[#4E632A]/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Pending Rewards</p>
                <p className="text-xs text-muted-foreground">Available to claim</p>
              </div>
              <div className="text-xl font-bold text-[#4E632A]">
                ${referralStats.pendingRewards}
              </div>
            </div>
          </div>
        )}

        {/* Share Button */}
        <Button
          onClick={handleShareReferral}
          className="w-full"
          size="lg"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share on Farcaster
        </Button>

        {/* Reward Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>💰 $5 when friend signs up</p>
          <p>💰 $10 when friend completes first submission</p>
          <p>💰 5% of all their future earnings</p>
        </div>
      </CardContent>
    </Card>
  )
}
