import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, Users, TrendingUp, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CampaignCardProps {
  id: string
  title: string
  company: string
  companyLogo: string
  reward: number
  rewardToken: string
  deadline: string
  spotsTotal: number
  spotsTaken: number
  minCVS: number
  regions: string[]
  duration: { min: number; max: number }
  keywords: string[]
  eligibility: "eligible" | "partial" | "locked"
  description: string
  missingRequirements?: string[]
}

export function CampaignCard({
  id,
  title,
  company,
  companyLogo,
  reward,
  rewardToken,
  deadline,
  spotsTotal,
  spotsTaken,
  minCVS,
  duration,
  keywords,
  eligibility,
  description,
  missingRequirements,
}: CampaignCardProps) {
  const spotsLeft = spotsTotal - spotsTaken
  const daysLeft = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const getEligibilityBadge = () => {
    switch (eligibility) {
      case "eligible":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Eligible</Badge>
      case "partial":
        return <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">Partially Eligible</Badge>
      case "locked":
        return <Badge variant="secondary">Not Eligible</Badge>
      default:
        return null
    }
  }

  return (
    <Card className={`hover:border-accent/50 transition-all ${eligibility === "locked" ? "opacity-60" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Image
            src={companyLogo || "/placeholder.svg"}
            alt={company}
            width={48}
            height={48}
            className="rounded-lg border border-border"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground truncate">{title}</h3>
                  {getEligibilityBadge()}
                </div>
                <p className="text-sm text-muted-foreground">{company}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-accent mb-1">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-2xl font-bold">{reward}</span>
                  <span className="text-sm text-muted-foreground">{rewardToken}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{daysLeft} days left</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {spotsLeft}/{spotsTotal} spots
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>CVS {minCVS}+</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {duration.min}-{duration.max}s
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>

            {missingRequirements && missingRequirements.length > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-destructive mb-1">Requirements not met:</p>
                    <ul className="text-xs text-destructive/80 space-y-1">
                      {missingRequirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Link href={`/creator/campaigns/${id}`} className="flex-1">
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={eligibility === "locked"}
                >
                  {eligibility === "locked" && <Lock className="h-4 w-4 mr-2" />}
                  {eligibility === "locked" ? "Not Eligible" : "View Details"}
                </Button>
              </Link>
              {eligibility === "eligible" && <Button variant="outline">Join Campaign</Button>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
