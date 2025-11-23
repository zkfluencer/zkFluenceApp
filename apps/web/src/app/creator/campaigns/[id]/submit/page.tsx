import { CreatorHeader } from "@/components/creator-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, Upload } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function SubmitCampaignPage({ params }: { params: { id: string } }) {
  const campaign = {
    id: params.id,
    title: "Celo Wallet Mobile App Launch",
    company: "Celo Foundation",
    reward: 50,
    keywords: ["Celo", "Mobile Wallet", "Web3", "Payments", "Blockchain"],
    duration: { min: 30, max: 90 },
  }

  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader username="cryptoartist" />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href={`/creator/campaigns/${params.id}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaign
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Submit Your Content</h1>
          <p className="text-muted-foreground text-lg">{campaign.title}</p>
        </div>

        <div className="space-y-6">
          {/* Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle>TikTok Video URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tiktok-url">Paste your TikTok video link</Label>
                <Input id="tiktok-url" placeholder="https://tiktok.com/@username/video/..." />
                <p className="text-xs text-muted-foreground">Make sure your video is public before submitting</p>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                <Upload className="h-5 w-5 mr-2" />
                Validate & Submit
              </Button>
            </CardContent>
          </Card>

          {/* Quick Reminder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Reminder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Required Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Video Duration</h4>
                <p className="text-sm text-muted-foreground">
                  {campaign.duration.min}-{campaign.duration.max} seconds
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Reward</h4>
                <p className="text-sm text-accent font-semibold">{campaign.reward} USDC upon approval</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Validation Preview (would show after submitting) */}
          <Card className="hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-accent" />
                Validating Your Video...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
                <span className="text-sm">Duration Check</span>
                <CheckCircle2 className="h-5 w-5 text-accent" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-chart-2/5 border border-chart-2/20">
                <span className="text-sm">Keyword Analysis</span>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-chart-2" />
                  <span className="text-xs text-muted-foreground">8/10 found</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
                <span className="text-sm">Transcript Quality</span>
                <CheckCircle2 className="h-5 w-5 text-accent" />
              </div>

              <p className="text-sm text-muted-foreground text-center pt-4">
                Your submission looks good! It will be sent to the company for final review.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
