import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

interface CVSScoreCardProps {
  cvsScore: number
  totalSubmissions: number
  approvedSubmissions: number
}

export function CVSScoreCard({ cvsScore, totalSubmissions, approvedSubmissions }: CVSScoreCardProps) {
  const approvalRate = totalSubmissions > 0 ? Math.round((approvedSubmissions / totalSubmissions) * 100) : 0

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-accent"
    if (score >= 70) return "text-chart-2"
    return "text-muted-foreground"
  }

  const getScoreTier = (score: number) => {
    if (score >= 95) return "Diamond"
    if (score >= 90) return "Gold"
    if (score >= 75) return "Silver"
    return "Bronze"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg">Creator Quality Score</CardTitle>
        <Badge variant="secondary" className="bg-accent text-foreground border-accent">
          {getScoreTier(cvsScore)} Tier
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <span className={`text-5xl font-bold ${getScoreColor(cvsScore)}`}>{cvsScore}</span>
          <span className="text-2xl text-muted-foreground mb-1">/100</span>
          <div className="ml-auto flex items-center gap-1 text-accent">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+5</span>
          </div>
        </div>

        <Progress value={cvsScore} className="h-2" />

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-2xl font-bold text-foreground">{approvedSubmissions}</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{approvalRate}%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Complete 3 more approved submissions to reach Gold tier</p>
        </div>
      </CardContent>
    </Card>
  )
}
