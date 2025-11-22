"use client"

import { useMiniApp } from "@/contexts/miniapp-context"
import { useAccount } from "wagmi"
import { CompanyHeader } from "@/components/company-header"
import { useState } from "react"

export default function AnalyticsPage() {
  const { context, isMiniAppReady } = useMiniApp()
  const { address } = useAccount()

  // Extract Farcaster user data
  const user = context?.user
  const companyName = user?.displayName || "Web3 Company"

  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  // Mock analytics data - TODO: Replace with API call
  const analytics = {
    overview: {
      totalSpent: 8950.0,
      totalCampaigns: 12,
      activeCampaigns: 4,
      completedCampaigns: 8,
      totalCreators: 47,
      totalSubmissions: 89,
      approvedSubmissions: 78,
      pendingSubmissions: 8,
      rejectedSubmissions: 3,
      avgApprovalRate: 92,
    },
    campaignPerformance: [
      {
        id: "1",
        name: "Celo Wallet Mobile App Launch",
        spent: 2500.0,
        creators: 15,
        submissions: 22,
        approved: 18,
        avgCVS: 84,
        status: "completed",
      },
      {
        id: "2",
        name: "DeFi Made Simple Campaign",
        spent: 1800.0,
        creators: 12,
        submissions: 18,
        approved: 16,
        avgCVS: 87,
        status: "completed",
      },
      {
        id: "3",
        name: "NFT Marketplace Promotion",
        spent: 3200.0,
        creators: 18,
        submissions: 25,
        approved: 22,
        avgCVS: 89,
        status: "completed",
      },
      {
        id: "4",
        name: "Web3 Gaming Experience",
        spent: 1450.0,
        creators: 10,
        submissions: 14,
        approved: 12,
        avgCVS: 81,
        status: "active",
      },
    ],
    topCreators: [
      {
        username: "cryptoartist",
        submissions: 8,
        approved: 8,
        earned: 600.0,
        avgCVS: 92,
      },
      {
        username: "web3educator",
        submissions: 6,
        approved: 6,
        earned: 450.0,
        avgCVS: 88,
      },
      {
        username: "defimaster",
        submissions: 7,
        approved: 6,
        earned: 525.0,
        avgCVS: 90,
      },
      {
        username: "nftcollector",
        submissions: 5,
        approved: 5,
        earned: 375.0,
        avgCVS: 85,
      },
      {
        username: "gamingchain",
        submissions: 6,
        approved: 5,
        earned: 425.0,
        avgCVS: 82,
      },
    ],
    categoryBreakdown: [
      { category: "NFTs", campaigns: 4, spent: 3800.0, creators: 22 },
      { category: "DeFi", campaigns: 3, spent: 2400.0, creators: 15 },
      { category: "Wallet", campaigns: 3, spent: 2100.0, creators: 12 },
      { category: "Gaming", campaigns: 2, spent: 650.0, creators: 8 },
    ],
  }

  // Loading state
  if (!isMiniAppReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CompanyHeader companyName={companyName} />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
              <p className="text-muted-foreground">Track your campaign performance and ROI</p>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-5 border border-primary/20">
              <div className="text-3xl font-bold text-primary mb-1">${analytics.overview.totalSpent}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>

            <div className="bg-gradient-to-br from-[#4E632A]/20 to-[#4E632A]/10 rounded-2xl p-5 border border-[#4E632A]/20">
              <div className="text-3xl font-bold text-[#4E632A] mb-1">{analytics.overview.totalCampaigns}</div>
              <div className="text-sm text-muted-foreground">Total Campaigns</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl p-5 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-500 mb-1">{analytics.overview.totalCreators}</div>
              <div className="text-sm text-muted-foreground">Total Creators</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl p-5 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-500 mb-1">{analytics.overview.avgApprovalRate}%</div>
              <div className="text-sm text-muted-foreground">Approval Rate</div>
            </div>
          </div>

          {/* Submission Stats */}
          <div className="bg-card rounded-2xl p-6 border border-border mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Submission Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{analytics.overview.totalSubmissions}</div>
                <div className="text-xs text-muted-foreground">Total Submissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4E632A] mb-1">{analytics.overview.approvedSubmissions}</div>
                <div className="text-xs text-muted-foreground">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{analytics.overview.pendingSubmissions}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{analytics.overview.rejectedSubmissions}</div>
                <div className="text-xs text-muted-foreground">Rejected</div>
              </div>
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="bg-card rounded-2xl p-6 border border-border mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Campaign Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Campaign</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Spent</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Creators</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Submissions</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Approved</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Avg CVS</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.campaignPerformance.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 text-sm font-medium text-foreground">{campaign.name}</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">${campaign.spent}</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">{campaign.creators}</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">{campaign.submissions}</td>
                      <td className="py-3 px-2 text-sm text-right text-[#4E632A]">{campaign.approved}</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">{campaign.avgCVS}</td>
                      <td className="py-3 px-2 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.status === "active"
                              ? "bg-primary/10 text-primary"
                              : "bg-[#B2EBA1]/10 text-[#4E632A]"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Creators */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Top Performing Creators</h2>
              <div className="space-y-3">
                {analytics.topCreators.map((creator, index) => (
                  <div key={creator.username} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">@{creator.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {creator.approved}/{creator.submissions} approved • CVS {creator.avgCVS}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${creator.earned}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Category Breakdown</h2>
              <div className="space-y-3">
                {analytics.categoryBreakdown.map((cat) => (
                  <div key={cat.category} className="p-3 bg-muted/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{cat.category}</p>
                      <p className="font-bold text-primary">${cat.spent}</p>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{cat.campaigns} campaigns</span>
                      <span>{cat.creators} creators</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
