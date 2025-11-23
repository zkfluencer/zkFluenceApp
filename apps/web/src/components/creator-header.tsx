"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CreatorHeaderProps {
  username: string
  compact?: boolean
}

export function CreatorHeader({ username, compact = false }: CreatorHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [orgMenuOpen, setOrgMenuOpen] = useState(false)

  if (compact) {
    return (
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm font-bold text-primary-foreground">
              zk
            </div>
            <span className="font-bold text-lg">zkFluencer</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12 7-7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-background border-b border-border shadow-lg max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            <nav className="flex flex-col py-2">
              <Link
                href="/creator/dashboard"
                className="px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Creator Dashboard
              </Link>
              <Link
                href="/creator/campaigns"
                className="px-6 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Campaigns
              </Link>
              <Link
                href="/creator/submissions"
                className="px-6 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Submissions
              </Link>
              <Link
                href="/creator/wallet"
                className="px-6 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wallet
              </Link>
              <Link
                href="/creator/profile"
                className="px-6 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>

              <div className="border-t border-border my-2" />

              <div className="px-6 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Organization Workflow
                </p>
              </div>
              <Link
                href="/company/dashboard"
                className="px-6 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Company Dashboard
              </Link>
              <Link
                href="/company/campaigns/create"
                className="px-6 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Campaign
              </Link>
            </nav>
          </div>
        )}
      </header>
    )
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">zk</span>
              </div>
              <span className="text-xl font-bold text-foreground">zkFluencer</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/creator/dashboard"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/creator/campaigns"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Campaigns
              </Link>
              <Link
                href="/creator/submissions"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Submissions
              </Link>
              <Link
                href="/creator/profile"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Profile
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Button variant="outline" size="sm" onClick={() => setOrgMenuOpen(!orgMenuOpen)} className="gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Organization
                <svg
                  className={`w-4 h-4 transition-transform ${orgMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Button>

              {orgMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOrgMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Switch to Organization
                        </p>
                      </div>
                      <Link
                        href="/company/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                        onClick={() => setOrgMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Company Dashboard
                      </Link>
                      <Link
                        href="/company/campaigns/create"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        onClick={() => setOrgMenuOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Campaign
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12 7-7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
            <Link href="/creator/profile">
              <Button variant="outline" size="icon" className="hidden md:flex bg-transparent">
                <span className="text-xl">👤</span>
              </Button>
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/creator/dashboard"
                className="px-4 py-3 text-base font-medium text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Creator Dashboard
              </Link>
              <Link
                href="/creator/campaigns"
                className="px-4 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Campaigns
              </Link>
              <Link
                href="/creator/submissions"
                className="px-4 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Submissions
              </Link>
              <Link
                href="/creator/wallet"
                className="px-4 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wallet
              </Link>
              <Link
                href="/creator/profile"
                className="px-4 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>

              <div className="border-t border-border my-2" />

              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Organization Workflow
                </p>
              </div>
              <Link
                href="/company/dashboard"
                className="px-4 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Company Dashboard
              </Link>
              <Link
                href="/company/campaigns/create"
                className="px-4 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Campaign
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
