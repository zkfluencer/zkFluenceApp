import { CreatorHeader } from "@/components/creator-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Globe,
  FileText,
  Video,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // Mock campaign data - would come from API
  const campaign = {
    id,
    title: "Celo Wallet Mobile App Launch",
    company: "Celo Foundation",
    companyLogo: "/placeholder.svg?height=80&width=80&text=CF",
    companyBio: "Building a regenerative digital economy that creates conditions of prosperity for all.",
    reward: 50,
    rewardToken: "USDC",
    bonusReward: "+10 USDC for top 10% engagement",
    deadline: "2024-12-30",
    startDate: "2024-12-01",
    spotsTotal: 50,
    spotsTaken: 35,
    minCVS: 75,
    regions: ["United States", "Canada", "United Kingdom", "Europe"],
    duration: { min: 30, max: 90 },
    keywords: ["Celo", "Mobile Wallet", "Web3", "Payments", "Blockchain"],
    requiredMentions: ["Celo Wallet", "@celoorg"],
    prohibitions: [
      "No financial advice",
      "No profit guarantees",
      "No misleading claims about returns",
      "No comparison with traditional banks",
    ],
    eligibility: "eligible",
    description:
      "We are launching the new Celo mobile wallet and need authentic creators to showcase its features. Create engaging, educational content that demonstrates how easy it is to send and receive crypto with Celo.",
    contentGuidelines: [
      "Show the wallet download and setup process",
      "Demonstrate sending/receiving USDC",
      "Highlight the speed (5-10 second transactions)",
      "Mention zero gas fees for users",
      "Use natural, conversational tone",
      "Include your genuine reaction to the features",
    ],
    qualityStandards: {
      camera: "HD quality (1080p minimum)",
      audio: "Clear audio with minimal background noise",
      lighting: "Well-lit with visible facial expressions",
      editing: "Smooth transitions, no abrupt cuts",
    },
    nftBadge: "Celo Wallet Campaign Contributor NFT",
    cvsPoints: 50,
  }

  const spotsLeft = campaign.spotsTotal - campaign.spotsTaken
  const daysLeft = Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader username="cryptoartist" />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/creator/campaigns">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaigns
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Image
                    src={campaign.companyLogo || "/placeholder.svg"}
                    alt={campaign.company}
                    width={80}
                    height={80}
                    className="rounded-lg border border-border"
                  />
                  <div className="flex-1">
                    <Badge className="bg-accent/10 text-accent border-accent/20 mb-2">Eligible</Badge>
                    <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{campaign.title}</h1>
                    <p className="text-lg text-muted-foreground mb-2">{campaign.company}</p>
                    <p className="text-sm text-muted-foreground">{campaign.companyBio}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-secondary">
                    <div className="flex items-center justify-center gap-1 text-primary mb-1">
                      <DollarSign className="h-5 w-5" />
                      <span className="text-2xl font-bold">{campaign.reward}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Base Reward</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary">
                    <div className="text-2xl font-bold text-foreground mb-1">{spotsLeft}</div>
                    <p className="text-xs text-muted-foreground">Spots Left</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary">
                    <div className="text-2xl font-bold text-foreground mb-1">{daysLeft}</div>
                    <p className="text-xs text-muted-foreground">Days Left</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary">
                    <div className="text-2xl font-bold text-foreground mb-1">{campaign.minCVS}+</div>
                    <p className="text-xs text-muted-foreground">Min CVS</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Campaign Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{campaign.description}</p>
              </CardContent>
            </Card>

            {/* Content Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Content Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">What to Include</h4>
                  <ul className="space-y-2">
                    {campaign.contentGuidelines.map((guideline, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-foreground mb-3">Video Requirements</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="p-3 rounded-lg bg-secondary">
                      <p className="text-sm font-medium text-foreground mb-1">Duration</p>
                      <p className="text-sm text-muted-foreground">
                        {campaign.duration.min}-{campaign.duration.max} seconds
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <p className="text-sm font-medium text-foreground mb-1">Camera Quality</p>
                      <p className="text-sm text-muted-foreground">{campaign.qualityStandards.camera}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <p className="text-sm font-medium text-foreground mb-1">Audio</p>
                      <p className="text-sm text-muted-foreground">{campaign.qualityStandards.audio}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <p className="text-sm font-medium text-foreground mb-1">Lighting</p>
                      <p className="text-sm text-muted-foreground">{campaign.qualityStandards.lighting}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Prohibitions
                  </h4>
                  <ul className="space-y-2">
                    {campaign.prohibitions.map((prohibition, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-destructive text-sm">×</span>
                        <span className="text-sm text-muted-foreground">{prohibition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Join Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-primary">
                      {campaign.reward} {campaign.rewardToken}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Base reward per approved submission</p>
                  {campaign.bonusReward && <p className="text-xs text-primary font-medium">{campaign.bonusReward}</p>}
                </div>

                <Link href={`/creator/campaigns/${params.id}/start`}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                    Join Campaign
                  </Button>
                </Link>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground text-sm">Campaign Details</h4>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Deadline
                    </span>
                    <span className="font-medium text-foreground">
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Spots Available
                    </span>
                    <span className="font-medium text-foreground">
                      {spotsLeft}/{campaign.spotsTotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Min CVS Required
                    </span>
                    <span className="font-medium text-foreground">{campaign.minCVS}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Video Duration
                    </span>
                    <span className="font-medium text-foreground">
                      {campaign.duration.min}-{campaign.duration.max}s
                    </span>
                  </div>

                  <div className="flex items-start justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Globe className="h-4 w-4 flex-shrink-0" />
                      Regions
                    </span>
                    <span className="font-medium text-foreground text-right">{campaign.regions.join(", ")}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground text-sm">Additional Rewards</h4>
                  <div className="text-sm space-y-1">
                    <p className="text-muted-foreground">+ {campaign.cvsPoints} CVS Points</p>
                    <p className="text-muted-foreground">+ {campaign.nftBadge}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
