import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Clock, XCircle } from "lucide-react"
import Link from "next/link"

export function RecentSubmissionsCard() {
  // Mock data
  const submissions = [
    {
      id: "1",
      campaign: "Celo Wallet Mobile App Launch",
      submittedAt: "2 hours ago",
      status: "approved",
      reward: 50,
    },
    {
      id: "2",
      campaign: "DeFi Made Simple Campaign",
      submittedAt: "1 day ago",
      status: "pending",
      reward: 75,
    },
    {
      id: "3",
      campaign: "Web3 Gaming Platform",
      submittedAt: "3 days ago",
      status: "revision",
      reward: 60,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-accent" />
      case "pending":
        return <Clock className="h-4 w-4 text-chart-2" />
      case "revision":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-accent text-background border-accent">Approved</Badge>
      case "pending":
        return <Badge className="bg-chart-2 text-background border-chart-2">Under Review</Badge>
      case "revision":
        return <Badge className="bg-destructive text-background border-destructive">Needs Revision</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Submissions</CardTitle>
        <Link href="/creator/submissions">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {submissions.map((submission) => (
          <Link key={submission.id} href={`/creator/submissions/${submission.id}`}>
            <div className="p-4 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  {getStatusIcon(submission.status)}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground text-sm truncate">{submission.campaign}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{submission.submittedAt}</p>
                  </div>
                </div>
                {getStatusBadge(submission.status)}
              </div>

              {submission.status === "approved" && (
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-foreground/70">Reward paid</span>
                  <span className="text-sm font-semibold text-foreground">+{submission.reward} USDC</span>
                </div>
              )}

              {submission.status === "revision" && (
                <div className="mt-3 pt-3 border-t border-border">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Feedback
                  </Button>
                </div>
              )}
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
