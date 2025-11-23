"use client"

import { CreatorHeader } from "@/components/creator-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle2, FileText, Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, use } from "react"
import { useRouter } from "next/navigation"

export default function StartCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [step, setStep] = useState(1)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false)
  const [contentPitch, setContentPitch] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const campaign = {
    id,
    title: "Celo Wallet Mobile App Launch",
    company: "Celo Foundation",
    reward: 50,
    rewardToken: "USDC",
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleStartCampaign = async () => {
    setIsJoining(true)

    try {
      const response = await fetch(`/api/campaigns/${id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentPitch,
          agreedToTerms,
          agreedToGuidelines,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to join campaign")
      }

      const data = await response.json()

      toast({
        title: "Campaign Joined Successfully!",
        description: "You can now start creating content. Check your dashboard for next steps.",
      })

      setTimeout(() => {
        router.push(`/creator/campaigns/${id}`)
      }, 1000)
    } catch (error) {
      console.error("[v0] Error joining campaign:", error)
      toast({
        title: "Failed to Join Campaign",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsJoining(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader username="cryptoartist" />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaigns
          </Button>
        </Link>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > num ? <CheckCircle2 className="h-5 w-5" /> : num}
                </div>
                {num < 3 && <div className={`flex-1 h-1 mx-2 ${step > num ? "bg-primary" : "bg-secondary"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Requirements</span>
            <span>Your Pitch</span>
            <span>Confirm</span>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader className="bg-card-alt">
            <CardTitle className="text-2xl">{campaign.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">by {campaign.company}</p>
          </CardHeader>
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Campaign Requirements</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary border border-border">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">TikTok Account Connected</p>
                          <p className="text-sm text-muted-foreground">Your verified TikTok account is linked</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary border border-border">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">Self.xyz Verified</p>
                          <p className="text-sm text-muted-foreground">Your identity is verified on-chain</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary border border-border">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">CVS Score: 85</p>
                          <p className="text-sm text-muted-foreground">Meets minimum requirement of 75</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-start gap-2 mb-3">
                    <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Campaign Guidelines</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Please review and accept the campaign requirements before proceeding
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground mb-4">
                    <p>• Video duration: 30-90 seconds</p>
                    <p>• HD quality (1080p minimum)</p>
                    <p>• Clear audio with minimal background noise</p>
                    <p>• Must mention "Celo Wallet" and tag @celoorg</p>
                    <p>• No financial advice or profit guarantees</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="guidelines"
                      checked={agreedToGuidelines}
                      onCheckedChange={(checked) => setAgreedToGuidelines(checked as boolean)}
                    />
                    <Label htmlFor="guidelines" className="text-sm leading-relaxed cursor-pointer">
                      I have read and agree to follow all campaign guidelines
                    </Label>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I agree to the zkFluencer Terms of Service and understand that payment will be released after
                    content approval
                  </Label>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!agreedToTerms || !agreedToGuidelines}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Continue to Content Pitch
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Your Content Pitch</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your creative approach for this campaign. What makes your content unique?
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pitch">Content Concept</Label>
                      <Textarea
                        id="pitch"
                        placeholder="Describe your video concept, key points you'll cover, and your unique angle..."
                        value={contentPitch}
                        onChange={(e) => setContentPitch(e.target.value)}
                        className="min-h-[200px] mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-2">{contentPitch.length} / 500 characters</p>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary border border-border">
                      <p className="text-sm font-medium text-foreground mb-2">Pro Tips:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Explain your storytelling approach</li>
                        <li>• Highlight what makes your take unique</li>
                        <li>• Mention any creative elements you'll include</li>
                        <li>• Show how you'll engage your audience</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={contentPitch.length < 50}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Review & Confirm</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Review your submission before joining the campaign
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card-alt border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Campaign</p>
                      <p className="font-semibold text-foreground">{campaign.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{campaign.company}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Reward</p>
                      <p className="text-2xl font-bold text-primary">
                        {campaign.reward} {campaign.rewardToken}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">+ 50 CVS Points + Campaign NFT Badge</p>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">Your Content Pitch</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-primary"
                          onClick={() => setStep(2)}
                        >
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{contentPitch}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <p className="text-sm font-medium text-foreground mb-2">Next Steps</p>
                      <ol className="text-sm text-muted-foreground space-y-1">
                        <li>1. Create your content following the guidelines</li>
                        <li>2. Submit your TikTok video URL for review</li>
                        <li>3. Wait for approval (usually 24-48 hours)</li>
                        <li>4. Receive payment once approved</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent" disabled={isJoining}>
                    Back
                  </Button>
                  <Button
                    onClick={handleStartCampaign}
                    disabled={isJoining}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                  >
                    {isJoining ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Campaign"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6 border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Need help? Check out our{" "}
              <a href="#" className="text-primary hover:underline">
                Creator Guide
              </a>{" "}
              or contact support.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
