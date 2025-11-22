import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Shield, Zap, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EscrowInfoProps {
  campaignBudget: number
  rewardPerCreator: number
  maxCreators: number
}

export function EscrowInfo({ campaignBudget, rewardPerCreator, maxCreators }: EscrowInfoProps) {
  return (
    <Card className="border-accent/20 bg-accent/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          <CardTitle className="text-base">Smart Contract Escrow</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-background border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Budget</span>
            <span className="text-lg font-bold text-foreground">${campaignBudget.toLocaleString()} USDC</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Per Creator</span>
            <span className="text-sm font-medium text-foreground">${rewardPerCreator} USDC</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Max Creators</span>
            <span className="text-sm font-medium text-foreground">{maxCreators}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <Lock className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Secure Escrow</p>
              <p className="text-xs text-muted-foreground">Funds are locked in smart contract until approval</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <Zap className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Instant Payouts</p>
              <p className="text-xs text-muted-foreground">Creators receive USDC within 5-10 seconds</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <Info className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Refundable</p>
              <p className="text-xs text-muted-foreground">Unused budget can be withdrawn after campaign</p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Network: Celo Mainnet
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Gas: Near Zero
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
