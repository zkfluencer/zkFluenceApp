import { CompanyHeader } from "@/components/company-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function CreateCampaignPage() {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/company/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Create New Campaign</h1>
          <p className="text-muted-foreground text-lg">Set up your campaign requirements and content guidelines</p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input id="title" placeholder="e.g., Celo Wallet Mobile App Launch" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea id="description" placeholder="Describe what you want creators to showcase..." rows={4} />
                <p className="text-xs text-muted-foreground">This will be visible to creators browsing campaigns</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creator Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Creator Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="min-cvs">Minimum CVS Score</Label>
                <Input id="min-cvs" type="number" min="0" max="100" placeholder="75" />
                <p className="text-xs text-muted-foreground">Higher scores indicate more reliable creators</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="regions">Allowed Regions</Label>
                <Input id="regions" placeholder="United States, Canada, United Kingdom" />
                <p className="text-xs text-muted-foreground">Separate multiple regions with commas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-creators">Maximum Creators</Label>
                <Input id="max-creators" type="number" placeholder="50" />
              </div>
            </CardContent>
          </Card>

          {/* Content Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Content Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-duration">Minimum Duration (seconds)</Label>
                  <Input id="min-duration" type="number" placeholder="30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-duration">Maximum Duration (seconds)</Label>
                  <Input id="max-duration" type="number" placeholder="90" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Required Keywords</Label>
                <Input id="keywords" placeholder="Celo, Mobile Wallet, Web3, Payments" />
                <p className="text-xs text-muted-foreground">AI will verify these keywords in video transcripts</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentions">Required Mentions</Label>
                <Input id="mentions" placeholder="@celoorg, Celo Wallet" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guidelines">Content Instructions</Label>
                <Textarea id="guidelines" placeholder="What should creators include in their videos?" rows={6} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prohibitions">Prohibitions</Label>
                <Textarea
                  id="prohibitions"
                  placeholder="What should creators avoid? (e.g., No financial advice, No profit guarantees)"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Reward Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Reward Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reward">Base Reward (USDC)</Label>
                  <Input id="reward" type="number" placeholder="50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-budget">Total Budget (USDC)</Label>
                  <Input id="total-budget" type="number" placeholder="2500" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent mb-1">Budget will be escrowed on Celo Network</p>
                    <p className="text-xs text-muted-foreground">
                      Funds are held in a smart contract and released automatically upon approval. Unused funds can be
                      withdrawn after campaign ends.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bonus">Bonus Reward (Optional)</Label>
                <Input id="bonus" placeholder="e.g., +10 USDC for top 10% engagement" />
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Additional Incentives</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cvs-points" className="font-normal">
                      CVS Points
                    </Label>
                    <Input id="cvs-points" type="number" placeholder="50" className="w-24" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="nft-badge" className="font-normal">
                      NFT Badge Name
                    </Label>
                    <Input id="nft-badge" placeholder="Campaign Contributor" className="w-64" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review & Launch */}
          <Card>
            <CardHeader>
              <CardTitle>Review & Launch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-border space-y-2">
                <h4 className="font-medium text-foreground">Campaign Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Budget:</span>
                    <span className="ml-2 font-medium text-foreground">$2,500 USDC</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Per Creator:</span>
                    <span className="ml-2 font-medium text-foreground">$50 USDC</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Max Creators:</span>
                    <span className="ml-2 font-medium text-foreground">50</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estimated Reach:</span>
                    <span className="ml-2 font-medium text-foreground">500K+ views</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save as Draft
                </Button>
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Fund & Launch Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
