import { CompanyHeader } from "@/components/company-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CompanyCampaignCard } from "@/components/company-campaign-card"

export default function CompanyDashboard() {
  // Mock data
  const stats = {
    activeCampaigns: 5,
    totalCreators: 142,
    totalSpent: 8250,
    totalViews: 1250000,
  }

  const campaigns = [
    {
      id: "1",
      title: "Celo Wallet Mobile App Launch",
      status: "active" as const,
      submissions: 35,
      approved: 28,
      pending: 5,
      rejected: 2,
      budget: 2500,
      spent: 1400,
      deadline: "2024-12-30",
      views: 450000,
    },
    {
      id: "2",
      title: "DeFi Made Simple Educational Series",
      status: "active" as const,
      submissions: 22,
      approved: 18,
      pending: 3,
      rejected: 1,
      budget: 2250,
      spent: 1350,
      deadline: "2024-12-25",
      views: 320000,
    },
    {
      id: "3",
      title: "Blockchain Gaming Platform Launch",
      status: "draft" as const,
      submissions: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
      budget: 2400,
      spent: 0,
      deadline: "2025-01-05",
      views: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Campaign Dashboard</h1>
            <p className="text-muted-foreground text-lg">Monitor and manage your marketing campaigns</p>
          </div>
          <Link href="/company/campaigns/create">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Campaign
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{stats.activeCampaigns}</div>
              <p className="text-xs text-muted-foreground mt-2">📅 2 ending this week</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-500">{stats.totalCreators}</div>
              <p className="text-xs text-muted-foreground mt-2">📈 +24 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-500">${stats.totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">💰 USDC on Celo Network</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-500">{(stats.totalViews / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground mt-2">👁️ Across all campaigns</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Your Campaigns</h2>
            <Button variant="outline" size="sm" className="hover:bg-primary/10 bg-transparent">
              View All
            </Button>
          </div>

          {campaigns.map((campaign) => (
            <CompanyCampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </main>
    </div>
  )
}
