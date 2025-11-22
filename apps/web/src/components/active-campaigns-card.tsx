import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export function ActiveCampaignsCard() {
  // Mock data
  const campaigns = [
    {
      id: "1",
      title: "Celo Wallet Mobile App Launch",
      company: "Celo Foundation",
      reward: 50,
      deadline: "3 days left",
      status: "in-progress",
      spotsLeft: 15,
    },
    {
      id: "2",
      title: "DeFi Made Simple Campaign",
      company: "Uniswap Labs",
      reward: 75,
      deadline: "1 week left",
      status: "joined",
      spotsLeft: 8,
    },
    {
      id: "3",
      title: "NFT Marketplace Promotion",
      company: "OpenSea",
      reward: 100,
      deadline: "5 days left",
      status: "submitted",
      spotsLeft: 3,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-chart-2 text-chart-2-foreground border-chart-2"
      case "joined":
        return "bg-accent text-background border-accent"
      case "submitted":
        return "bg-primary/20 text-foreground border-primary/40"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-progress":
        return "Creating"
      case "joined":
        return "Joined"
      case "submitted":
        return "Under Review"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">My Active Campaigns</CardTitle>
        <Link href="/creator/campaigns">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {campaigns.map((campaign) => (
          <Link key={campaign.id} href={`/creator/campaigns/${campaign.id}`}>
            <div className="p-4 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1 text-balance">{campaign.title}</h4>
                  <p className="text-sm text-muted-foreground">{campaign.company}</p>
                </div>
                <Badge className={getStatusColor(campaign.status)}>{getStatusText(campaign.status)}</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-primary font-medium">
                    <DollarSign className="h-4 w-4" />
                    <span>{campaign.reward} USDC</span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Clock className="h-4 w-4" />
                    <span>{campaign.deadline}</span>
                  </div>
                </div>
                <span className="text-xs text-foreground/60">{campaign.spotsLeft} spots left</span>
              </div>
            </div>
          </Link>
        ))}

        <Link href="/creator/campaigns">
          <Button variant="outline" className="w-full bg-transparent">
            Browse More Campaigns
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
