"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface OnboardingWizardProps {
  open: boolean
  onClose: () => void
}

export function OnboardingWizard({ open, onClose }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)

  const handleSelfVerification = () => {
    // TODO: Integrate with Self.xyz verification
    console.log("[v0] Starting Self.xyz smart contract verification")
    // Simulate verification
    setTimeout(() => {
      setStep(2)
    }, 1000)
  }

  const handleTikTokConnect = () => {
    // TODO: Integrate with TikTok OAuth
    console.log("[v0] Starting TikTok OAuth connection")
    // Simulate OAuth
    window.open("/api/auth/tiktok", "_blank", "width=600,height=700")
    setTimeout(() => {
      setStep(3)
    }, 2000)
  }

  const handleComplete = () => {
    console.log("[v0] Onboarding completed")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background border-border">
        {/* Step 1: Self.xyz Verification */}
        {step === 1 && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <DialogTitle className="text-2xl font-bold">Self Protocol Verification</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                Verify your identity on-chain using smart contracts
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Gas Fees Warning */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg
                    className="w-6 h-6 text-amber-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-amber-500 mb-1">Gas Fees Required</h4>
                    <p className="text-sm text-amber-500/80">
                      You need CELO tokens in your wallet to pay for gas fees when storing verification on-chain.
                      <br />
                      <span className="font-medium">Estimated cost: ~0.01 CELO</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Verify Button - Using orange theme */}
              <Button
                onClick={handleSelfVerification}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Verify with Self
              </Button>

              {/* Additional Options */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 bg-transparent">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Link
                </Button>
                <Button variant="outline" className="h-12 bg-transparent">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  Show QR
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">Step 1 of 2: Identity Verification</p>
            </div>
          </>
        )}

        {/* Step 2: TikTok Connection */}
        {step === 2 && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
                <DialogTitle className="text-2xl font-bold">Connect TikTok Account</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                Link your TikTok account to participate in campaigns
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#B2EBA1]/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#4E632A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Self.xyz Verified</span>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#B2EBA1]/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#4E632A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">TikTok Connected</span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg
                    className="w-6 h-6 text-blue-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-1">Privacy Notice</h4>
                    <p className="text-sm text-blue-400/80">
                      We only access public profile data. We never post on your behalf or access private information.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleTikTokConnect}
                className="w-full h-14 text-lg bg-[#000000] hover:bg-[#000000]/90 text-white"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
                Connect TikTok Account
              </Button>

              <Button onClick={() => setStep(1)} variant="ghost" className="w-full">
                Back to Verification
              </Button>

              <p className="text-xs text-center text-muted-foreground">Step 2 of 2: TikTok Connection</p>
            </div>
          </>
        )}

        {/* Step 3: Completion */}
        {step === 3 && (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <DialogTitle className="text-2xl font-bold text-center">You're All Set!</DialogTitle>
              </div>
              <DialogDescription className="text-center text-muted-foreground">
                Your account is verified and ready to start earning
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium">Self.xyz Verified</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium">TikTok Connected</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Ready to Start Earning?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse available campaigns and submit your first TikTok video to start earning USDC rewards on Celo
                </p>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-semibold">Instant USDC payouts on Celo</span>
                </div>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start Browsing Campaigns
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
