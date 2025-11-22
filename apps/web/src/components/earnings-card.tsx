import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, DollarSign } from "lucide-react"
import Link from "next/link"

interface EarningsCardProps {
  totalEarnings: number
  activeCampaigns: number
}

export function EarningsCard({ totalEarnings, activeCampaigns }: EarningsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg text-foreground">Total Earnings</CardTitle>
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-foreground">
            ${totalEarnings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-lg text-muted-foreground mb-1">USDC</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <p className="text-2xl font-bold text-foreground">{activeCampaigns}</p>
            <p className="text-xs text-foreground/70">Active Campaigns</p>
          </div>
          <Link href="/creator/wallet">
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-foreground font-semibold">
              View Details
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="text-xs text-foreground/70">On Celo Network - Instant settlements</div>
      </CardContent>
    </Card>
  )
}
