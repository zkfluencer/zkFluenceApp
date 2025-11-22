import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ExternalLink, Wallet } from "lucide-react"
import Image from "next/image"

interface CreatorProfileCardProps {
  fid: string
  username: string
  displayName: string
  pfpUrl: string
  bio: string
  isVerified: boolean
  region: string
  walletAddress: string
  tiktokConnected: boolean
  tiktokUsername?: string
}

export function CreatorProfileCard({
  displayName,
  pfpUrl,
  bio,
  isVerified,
  region,
  walletAddress,
  tiktokConnected,
  tiktokUsername,
}: CreatorProfileCardProps) {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Profile Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <Image src={pfpUrl || "/placeholder.svg"} alt={displayName} width={64} height={64} className="rounded-full" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{displayName}</h3>
            <p className="text-sm text-muted-foreground truncate">{bio}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Identity</span>
            <div className="flex items-center gap-2">
              {isVerified && <CheckCircle2 className="h-4 w-4 text-accent" />}
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Region</span>
            <span className="text-sm font-medium text-foreground">{region}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">TikTok</span>
            <div className="flex items-center gap-2">
              {tiktokConnected && <CheckCircle2 className="h-4 w-4 text-accent" />}
              <span className="text-sm font-medium text-foreground">@{tiktokUsername}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Celo Wallet</span>
            </div>
            <code className="text-xs bg-secondary px-2 py-1 rounded block truncate">{walletAddress}</code>
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Full Profile
        </Button>
      </CardContent>
    </Card>
  )
}
