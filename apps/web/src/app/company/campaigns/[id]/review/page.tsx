import { CompanyHeader } from "@/components/company-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, ExternalLink, TrendingUp, PlayCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ReviewSubmissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const campaign = {
    id,
    title: "Celo Wallet Mobile App Launch",
  }

  const submissions = [
    {
      id: "1",
      creator: {
        name: "Crypto Artist",
        username: "cryptoartist",
        pfp: "/placeholder.svg?height=48&width=48&text=CA",
        cvs: 87,
        approvalRate: 88,
        totalSubmissions: 24,
      },
      tiktokUrl: "https://tiktok.com/@cryptoartist/video/123",
      submittedAt: "2024-12-16T14:20:00",
      status: "pending",
      videoThumbnail: "/placeholder.svg?height=240&width=400&text=Video",
      estimatedViews: "5K-15K",
      validationResults: {
        duration: { value: 45, required: "30-90s", passed: true },
        keywords: { found: 8, required: 10, passed: true, missing: ["Mobile", "Payments"] },
        transcript: {
          quality: "Good",
          passed: true,
          excerpt:
            "Hey everyone! Today I want to show you the new Celo Wallet app. It's super easy to use and makes sending crypto instant...",
        },
        engagement: { predicted: "High", confidence: 85 },
      },
    },
    {
      id: "2",
      creator: {
        name: "Web3 Educator",
        username: "web3teacher",
        pfp: "/placeholder.svg?height=48&width=48&text=W3",
        cvs: 92,
        approvalRate: 95,
        totalSubmissions: 42,
      },
      tiktokUrl: "https://tiktok.com/@web3teacher/video/456",
      submittedAt: "2024-12-16T11:05:00",
      status: "pending",
      videoThumbnail: "/placeholder.svg?height=240&width=400&text=Video",
      estimatedViews: "10K-25K",
      validationResults: {
        duration: { value: 62, required: "30-90s", passed: true },
        keywords: { found: 10, required: 10, passed: true, missing: [] },
        transcript: {
          quality: "Excellent",
          passed: true,
          excerpt:
            "The Celo mobile wallet is revolutionizing how we interact with Web3. Let me show you why this matters for payments...",
        },
        engagement: { predicted: "Very High", confidence: 92 },
      },
    },
    {
      id: "3",
      creator: {
        name: "Blockchain Buddy",
        username: "blockchainbuddy",
        pfp: "/placeholder.svg?height=48&width=48&text=BB",
        cvs: 76,
        approvalRate: 75,
        totalSubmissions: 18,
      },
      tiktokUrl: "https://tiktok.com/@blockchainbuddy/video/789",
      submittedAt: "2024-12-15T18:30:00",
      status: "pending",
      videoThumbnail: "/placeholder.svg?height=240&width=400&text=Video",
      estimatedViews: "2K-8K",
      validationResults: {
        duration: { value: 28, required: "30-90s", passed: false },
        keywords: { found: 6, required: 10, passed: false, missing: ["Celo", "Wallet", "Mobile", "Payments"] },
        transcript: {
          quality: "Fair",
          passed: true,
          excerpt: "Check out this new crypto app I found. It's pretty cool and easy to set up...",
        },
        engagement: { predicted: "Moderate", confidence: 68 },
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Link href={`/company/campaigns/${id}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaign
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Review Submissions</h1>
          <p className="text-muted-foreground text-lg">{campaign.title}</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Review (3)</TabsTrigger>
            <TabsTrigger value="approved">Approved (28)</TabsTrigger>
            <TabsTrigger value="rejected">Rejected (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {submissions.map((submission) => (
              <ReviewSubmissionCard key={submission.id} {...submission} />
            ))}
          </TabsContent>

          <TabsContent value="approved">
            <p className="text-center text-muted-foreground py-8">28 submissions have been approved</p>
          </TabsContent>

          <TabsContent value="rejected">
            <p className="text-center text-muted-foreground py-8">2 submissions have been rejected</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ReviewSubmissionCard({
  creator,
  tiktokUrl,
  submittedAt,
  videoThumbnail,
  estimatedViews,
  validationResults,
}: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Video Preview */}
          <div>
            <div className="relative rounded-lg overflow-hidden mb-4 bg-secondary">
              <img
                src={videoThumbnail || "/placeholder.svg"}
                alt="Video preview"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button
                  size="lg"
                  className="rounded-full w-16 h-16 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <PlayCircle className="h-8 w-8" />
                </Button>
              </div>
            </div>

            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Video on TikTok
              </Button>
            </a>
          </div>

          {/* Review Info */}
          <div className="space-y-6">
            {/* Creator Info */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary">
              <Image
                src={creator.pfp || "/placeholder.svg"}
                alt={creator.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{creator.name}</h3>
                <p className="text-sm text-muted-foreground">@{creator.username}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span className="text-foreground">CVS: {creator.cvs}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-foreground">{creator.approvalRate}% approved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Results */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">AI Validation Results</h4>

              <div
                className={`p-3 rounded-lg border ${validationResults.duration.passed ? "bg-accent/5 border-accent/20" : "bg-destructive/5 border-destructive/20"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Video Duration</span>
                  {validationResults.duration.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {validationResults.duration.value}s (Required: {validationResults.duration.required})
                </p>
              </div>

              <div
                className={`p-3 rounded-lg border ${validationResults.keywords.passed ? "bg-accent/5 border-accent/20" : "bg-destructive/5 border-destructive/20"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Keywords Found</span>
                  {validationResults.keywords.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-chart-2" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {validationResults.keywords.found}/{validationResults.keywords.required} required keywords
                </p>
                {validationResults.keywords.missing.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground">Missing:</span>
                    {validationResults.keywords.missing.map((kw: string) => (
                      <Badge key={kw} variant="outline" className="text-xs">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-lg border bg-accent/5 border-accent/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Transcript Quality</span>
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{validationResults.transcript.quality}</p>
                <p className="text-xs text-muted-foreground italic line-clamp-2">
                  "{validationResults.transcript.excerpt}"
                </p>
              </div>

              <div className="p-3 rounded-lg border bg-secondary border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Predicted Engagement</span>
                  <Badge variant="secondary">{validationResults.engagement.confidence}% confidence</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {validationResults.engagement.predicted} ({estimatedViews} views)
                </p>
              </div>
            </div>

            <Separator />

            {/* Review Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Reviewer Feedback</h4>
              <Textarea
                placeholder="Add feedback for the creator (optional for approval, required for rejection or revision request)..."
                rows={3}
              />

              <div className="flex gap-2">
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve & Pay 50 USDC
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Request Revision
                </Button>
                <Button variant="destructive" className="flex-1">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Submitted {new Date(submittedAt).toLocaleDateString()} at {new Date(submittedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
