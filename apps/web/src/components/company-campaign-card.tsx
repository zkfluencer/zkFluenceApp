import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

interface CompanyCampaignCardProps {
  id: string
  title: string
  status: "active" | "draft" | "ended" | "paused"
  submissions: number
  approved: number
  pending: number
  rejected: number
  budget: number
  spent: number
  deadline: string
  views: number
}

export function CompanyCampaignCard({
  id,
  title,
  status,
  submissions,
  approved,
  pending,
  rejected,
  budget,
  spent,
  deadline,
  views,
}: CompanyCampaignCardProps) {
  const budgetPercentage = (spent / budget) * 100
  const daysLeft = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/20">✓ Active</Badge>
      case "draft":
        return <Badge variant="secondary">📝 Draft</Badge>
      case "ended":
        return <Badge variant="outline">🏁 Ended</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">⏸️ Paused</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="hover:border-primary/50 transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-foreground">{title}</h3>
              {getStatusBadge()}
            </div>
            {status === "active" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">{daysLeft} days remaining</span>
              </div>
            )}
          </div>
          <Link href={`/company/campaigns/${id}`}>
            <Button variant="outline" className="hover:bg-primary/10 bg-transparent">
              Manage →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
            <div className="text-3xl font-bold text-emerald-600 mb-1">{approved}</div>
            <p className="text-xs text-emerald-700 font-medium">✓ Approved</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200">
            <div className="text-3xl font-bold text-amber-600 mb-1">{pending}</div>
            <p className="text-xs text-amber-700 font-medium">⏳ Pending</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {views > 0 ? `${(views / 1000).toFixed(0)}K` : "0"}
            </div>
            <p className="text-xs text-purple-700 font-medium">👁️ Views</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {submissions > 0 ? `${((approved / submissions) * 100).toFixed(0)}%` : "0%"}
            </div>
            <p className="text-xs text-blue-700 font-medium">📊 Approval</p>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Budget Usage</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-foreground">
                ${spent.toLocaleString()} / ${budget.toLocaleString()}
              </span>
            </div>
          </div>
          <Progress value={budgetPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground">
            💰 {budgetPercentage.toFixed(1)}% of budget used • ${(budget - spent).toLocaleString()} remaining
          </p>
        </div>

        {pending > 0 && status === "active" && (
          <div className="mt-4 pt-4 border-t border-border">
            <Link href={`/company/campaigns/${id}/review`}>
              <Button
                variant="outline"
                className="w-full hover:bg-primary/10 hover:text-primary hover:border-primary bg-transparent"
                size="sm"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Review {pending} Pending Submission{pending !== 1 ? "s" : ""}
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
