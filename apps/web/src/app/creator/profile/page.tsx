"use client"

import { useState } from "react"
import { OnboardingWizard } from "@/components/onboarding-wizard"
import Link from "next/link"
import { CreatorHeader } from "@/components/creator-header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { SelfWidget } from "@/components/SelfWidget"
import Image from "next/image"

export default function ProfilePage() {
  const [showWizard, setShowWizard] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20 md:pb-0">
      <CreatorHeader />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-card rounded-2xl p-4 md:p-6 border border-border shadow-sm mb-4">
            <div className="flex flex-col items-center text-center gap-3 md:flex-row md:text-left md:items-start">
              <div className="relative">
                <Image src="/creator-avatar.png" alt="Profile" width={80} height={80} className="rounded-full" />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#4E632A] rounded-full border-2 border-background flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">Crypto Artist</h1>
                <p className="text-muted-foreground mb-3">@cryptoartist</p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B2EBA1]/20 text-[#4E632A] rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Verified Creator
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground my-4 text-center md:text-left">
              Creating engaging Web3 content and helping brands reach crypto-native audiences.
            </p>

            <div className="flex flex-col md:flex-row gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                Edit Profile
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Share
              </Button>
            </div>
          </div>

          {/* TikTok Connection */}
          <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-4 md:p-6 border border-pink-500/20 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">TikTok Connected</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">@cryptoartist · 125K followers</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center">
                <div className="text-xl md:text-2xl font-bold">125K</div>
                <div className="text-[10px] md:text-xs text-muted-foreground">Followers</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center">
                <div className="text-xl md:text-2xl font-bold">5.2M</div>
                <div className="text-[10px] md:text-xs text-muted-foreground">Likes</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center">
                <div className="text-xl md:text-2xl font-bold">8.5%</div>
                <div className="text-[10px] md:text-xs text-muted-foreground">Avg Engagement</div>
              </div>
            </div>
          </div>

          {/* Self Protocol Verification */}
          <SelfWidget variant="inline" />

          {/* Creator Stats */}
          <div className="bg-card rounded-2xl p-4 md:p-6 border border-border shadow-sm mb-4">
            <h2 className="text-lg font-semibold mb-4">Creator Stats</h2>

            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
              <div className="bg-muted/30 rounded-xl p-3 md:p-4 text-center">
                <div className="text-2xl md:text-4xl font-bold text-[#F29E5F] mb-1 leading-tight">$1,250</div>
                <div className="text-[10px] md:text-sm text-muted-foreground">Total Earned</div>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 md:p-4 text-center">
                <div className="text-2xl md:text-4xl font-bold mb-1 leading-tight">87</div>
                <div className="text-[10px] md:text-sm text-muted-foreground">CVS Score</div>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 md:p-4 text-center">
                <div className="text-2xl md:text-4xl font-bold mb-1 leading-tight">3</div>
                <div className="text-[10px] md:text-sm text-muted-foreground">Active</div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[#B2EBA1]/20 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-[#4E632A]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm md:text-base">Quality Tier</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Current level</div>
                  </div>
                </div>
                <div className="text-lg md:text-xl font-bold text-[#4E632A]">Silver</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm md:text-base">Campaigns Completed</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Lifetime</div>
                  </div>
                </div>
                <div className="text-lg md:text-xl font-bold">21</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm md:text-base">Avg. Campaign Pay</div>
                    <div className="text-xs md:text-sm text-muted-foreground">USDC on Celo</div>
                  </div>
                </div>
                <div className="text-lg md:text-xl font-bold text-[#F29E5F]">$59.52</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm md:text-base">Success Rate</div>
                    <div className="text-xs md:text-sm text-muted-foreground">21 of 24 approved</div>
                  </div>
                </div>
                <div className="text-lg md:text-xl font-bold text-[#4E632A]">87.5%</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-card rounded-2xl p-4 md:p-6 border border-border shadow-sm mb-4">
            <h2 className="text-lg font-semibold mb-4">Achievements</h2>

            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="bg-gradient-to-br from-[#B2EBA1]/20 to-[#4E632A]/20 rounded-xl p-3 md:p-4 text-center border border-[#4E632A]/30">
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">🥇</div>
                <div className="text-[10px] md:text-xs font-medium">First Campaign</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-3 md:p-4 text-center border border-green-500/30">
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">✅</div>
                <div className="text-[10px] md:text-xs font-medium">10 Approved</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-3 md:p-4 text-center border border-purple-500/30">
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">💎</div>
                <div className="text-[10px] md:text-xs font-medium">$1K Earned</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-3 md:p-4 text-center border border-blue-500/30">
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">⚡</div>
                <div className="text-[10px] md:text-xs font-medium">Fast Creator</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 md:p-4 text-center border border-border opacity-50">
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">🔒</div>
                <div className="text-[10px] md:text-xs font-medium">20 Campaigns</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-3 md:p-4 text-center border border-border opacity-50">
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">🔒</div>
                <div className="text-[10px] md:text-xs font-medium">Gold Tier</div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <button
              onClick={() => setShowWizard(true)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#F29E5F]/10 to-[#F29E5F]/5 hover:from-[#F29E5F]/20 hover:to-[#F29E5F]/10 transition-colors border-b-2 border-[#F29E5F]/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F29E5F]/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#F29E5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-[#F29E5F]">Complete Verification</div>
                  <div className="text-sm text-muted-foreground">Self.xyz identity & TikTok OAuth</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-[#F29E5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="border-t border-border" />

            <Link
              href="/creator/settings"
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">Settings</span>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <div className="border-t border-border" />

            <Link
              href="/creator/help"
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">Help & Support</span>
              </div>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <div className="border-t border-border" />

            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-red-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <span className="font-medium">Sign Out</span>
              </div>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Onboarding Wizard */}
      <OnboardingWizard open={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  )
}
