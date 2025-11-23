"use client"
import { CreatorHeader } from "@/components/creator-header"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubmissionsPage() {
  const submissions = [
    {
      id: "1",
      campaign: "Celo Wallet Mobile App Launch",
      company: "Celo Foundation",
      tiktokUrl: "https://tiktok.com/@user/video/123",
      submittedAt: "2024-12-15T10:30:00",
      status: "approved",
      reward: 50,
      feedback: null,
      videoThumbnail: "/placeholder.svg?height=120&width=200&text=Video",
      views: 12500,
      engagement: 8.5,
      validationResults: {
        duration: { value: 45, passed: true },
        keywords: { found: 8, required: 10, passed: true },
        transcript: { quality: "Good", passed: true },
      },
    },
    {
      id: "2",
      campaign: "DeFi Made Simple Campaign",
      company: "Uniswap Labs",
      tiktokUrl: "https://tiktok.com/@user/video/456",
      submittedAt: "2024-12-16T14:20:00",
      status: "pending",
      reward: 75,
      feedback: null,
      videoThumbnail: "/placeholder.svg?height=120&width=200&text=Video",
      views: 0,
      engagement: 0,
      validationResults: {
        duration: { value: 60, passed: true },
        keywords: { found: 9, required: 8, passed: true },
        transcript: { quality: "Excellent", passed: true },
      },
    },
    {
      id: "3",
      campaign: "NFT Marketplace Promotion",
      company: "OpenSea",
      tiktokUrl: "https://tiktok.com/@user/video/789",
      submittedAt: "2024-12-14T09:15:00",
      status: "revision",
      reward: 100,
      feedback:
        'Please mention "OpenSea" at least twice in the video. The current video only mentions it once. Also, please ensure the audio quality is clear throughout.',
      videoThumbnail: "/placeholder.svg?height=120&width=200&text=Video",
      views: 5200,
      engagement: 4.2,
      validationResults: {
        duration: { value: 75, passed: true },
        keywords: { found: 5, required: 8, passed: false },
        transcript: { quality: "Fair", passed: true },
      },
    },
    {
      id: "4",
      campaign: "Web3 Gaming Platform",
      company: "Immutable X",
      tiktokUrl: "https://tiktok.com/@user/video/321",
      submittedAt: "2024-12-13T16:45:00",
      status: "rejected",
      reward: 60,
      feedback:
        'The video does not meet our duration requirements (20 seconds, minimum 30 required). Additionally, the required keyword "Immutable" was not mentioned.',
      videoThumbnail: "/placeholder.svg?height=120&width=200&text=Video",
      views: 3100,
      engagement: 3.8,
      validationResults: {
        duration: { value: 20, passed: false },
        keywords: { found: 2, required: 6, passed: false },
        transcript: { quality: "Poor", passed: false },
      },
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <svg className="h-5 w-5 text-[#4E632A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "pending":
        return (
          <svg className="h-5 w-5 text-[#F29E5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "revision":
        return (
          <svg className="h-5 w-5 text-[#F29E5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )
      case "rejected":
        return (
          <svg className="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-[#B2EBA1]/20 text-[#4E632A] border-[#4E632A]/20">Approved</Badge>
      case "pending":
        return <Badge className="bg-[#F29E5F]/20 text-[#F29E5F] border-[#F29E5F]/20">Under Review</Badge>
      case "revision":
        return <Badge className="bg-[#F29E5F]/20 text-[#F29E5F] border-[#F29E5F]/20">Needs Revision</Badge>
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>
      default:
        return null
    }
  }

  const filterByStatus = (status: string) => {
    if (status === "all") return submissions
    return submissions.filter((s) => s.status === status)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <CreatorHeader username="cryptoartist" />

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">My Submissions</h1>
          <p className="text-muted-foreground text-base md:text-lg">Track and manage your campaign submissions</p>
        </div>

        <Tabs defaultValue="all" className="space-y-4 md:space-y-6">
          <div className="overflow-x-auto -mx-4 px-4">
            <TabsList className="w-full md:w-auto inline-flex">
              <TabsTrigger value="all" className="text-xs md:text-sm">
                All ({submissions.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs md:text-sm">
                Pending ({filterByStatus("pending").length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="text-xs md:text-sm">
                Approved ({filterByStatus("approved").length})
              </TabsTrigger>
              <TabsTrigger value="revision" className="text-xs md:text-sm whitespace-nowrap">
                Revision ({filterByStatus("revision").length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="text-xs md:text-sm">
                Rejected ({filterByStatus("rejected").length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            {submissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                {...submission}
                getStatusIcon={getStatusIcon}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterByStatus("pending").map((submission) => (
              <SubmissionCard
                key={submission.id}
                {...submission}
                getStatusIcon={getStatusIcon}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {filterByStatus("approved").map((submission) => (
              <SubmissionCard
                key={submission.id}
                {...submission}
                getStatusIcon={getStatusIcon}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </TabsContent>

          <TabsContent value="revision" className="space-y-4">
            {filterByStatus("revision").map((submission) => (
              <SubmissionCard
                key={submission.id}
                {...submission}
                getStatusIcon={getStatusIcon}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {filterByStatus("rejected").map((submission) => (
              <SubmissionCard
                key={submission.id}
                {...submission}
                getStatusIcon={getStatusIcon}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  )
}

function SubmissionCard({
  campaign,
  company,
  tiktokUrl,
  submittedAt,
  status,
  reward,
  feedback,
  videoThumbnail,
  views,
  engagement,
  validationResults,
  getStatusIcon,
  getStatusBadge,
}: any) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={videoThumbnail || "/placeholder.svg"}
            alt="Video thumbnail"
            className="w-full md:w-32 h-48 md:h-20 rounded-lg object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(status)}
                  <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-1">{campaign}</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">{company}</p>
              </div>
              <div className="self-start">{getStatusBadge(status)}</div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3">
              <span>Submitted {new Date(submittedAt).toLocaleDateString()}</span>
              {status === "approved" && (
                <>
                  <span>•</span>
                  <span>{views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{engagement}% engagement</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {validationResults.duration.passed ? "✓" : "✗"} {validationResults.duration.value}s
              </Badge>
              <Badge variant="outline" className="text-xs">
                {validationResults.keywords.passed ? "✓" : "✗"} {validationResults.keywords.found}/
                {validationResults.keywords.required} keywords
              </Badge>
              <Badge variant="outline" className="text-xs">
                {validationResults.transcript.passed ? "✓" : "✗"} {validationResults.transcript.quality}
              </Badge>
            </div>

            {feedback && (
              <div className="mb-3 p-3 rounded-lg bg-[#F29E5F]/10 border border-[#F29E5F]/20">
                <div className="flex items-start gap-2">
                  <svg
                    className="h-4 w-4 text-[#F29E5F] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#F29E5F] mb-1">Reviewer Feedback:</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{feedback}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial">
                <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View on TikTok
                </Button>
              </a>

              {status === "approved" && (
                <div className="flex items-center justify-center gap-1 text-[#4E632A] bg-[#B2EBA1]/20 px-3 py-2 rounded-md">
                  <span className="text-sm font-medium">+{reward} USDC</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}

              {status === "revision" && (
                <Button size="sm" className="w-full sm:w-auto bg-[#F29E5F] hover:bg-[#F29E5F]/90 text-white">
                  Resubmit Video
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
