"use client"

import Link from "next/link"
import { useState } from "react"

export function CompanyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
                href="/company/dashboard"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/company/campaigns"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Campaigns
              </Link>
              <Link
                href="/company/creators"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Creators
              </Link>
              <Link
                href="/company/analytics"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Analytics
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <Link href="/company/profile" className="hidden md:block">
              <button className="p-2 border rounded-lg hover:bg-muted transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </button>
            </Link>
            {/* </CHANGE> */}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/company/dashboard"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Company Dashboard
              </Link>
              <Link
                href="/company/campaigns"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Campaigns
              </Link>
              <Link
                href="/company/campaigns/create"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Campaign
              </Link>
              <Link
                href="/company/creators"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Creators
              </Link>
              <Link
                href="/company/analytics"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Analytics
              </Link>

              <div className="border-t border-border pt-4 mt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Creator Workflow</p>
                <Link
                  href="/creator/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors block mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Creator Dashboard
                </Link>
                <Link
                  href="/creator/campaigns"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Campaigns
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
