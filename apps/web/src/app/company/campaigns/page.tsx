import { CompanyHeader } from "@/components/company-header"
import Link from "next/link"

export default function CompanyCampaignsPage() {
  const campaigns = [
    {
      id: 1,
      title: "Celo Wallet Mobile App Launch",
      status: "active",
      company: "Celo Foundation",
      reward: 50,
      budget: 5000,
      submissions: 45,
      approved: 32,
      spotsTotal: 100,
      spotsTaken: 67,
      startDate: "2024-01-15",
      endDate: "2024-02-28",
      image: "/mobile-wallet-app-blockchain.jpg",
    },
    {
      id: 2,
      title: "DeFi Made Simple Campaign",
      status: "active",
      company: "Uniswap Labs",
      reward: 75,
      budget: 7500,
      submissions: 38,
      approved: 28,
      spotsTotal: 100,
      spotsTaken: 52,
      startDate: "2024-01-20",
      endDate: "2024-03-15",
      image: "/defi-trading-cryptocurrency.jpg",
    },
    {
      id: 3,
      title: "NFT Marketplace Promotion",
      status: "completed",
      company: "OpenSea",
      reward: 100,
      budget: 10000,
      submissions: 100,
      approved: 87,
      spotsTotal: 100,
      spotsTaken: 100,
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      image: "/nft-digital-art-marketplace.jpg",
    },
    {
      id: 4,
      title: "Web3 Gaming Platform",
      status: "draft",
      company: "Axie Infinity",
      reward: 60,
      budget: 6000,
      submissions: 0,
      approved: 0,
      spotsTotal: 100,
      spotsTaken: 0,
      startDate: "2024-03-01",
      endDate: "2024-04-15",
      image: "/gaming-esports-blockchain.jpg",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        // Updated to Lime Green background and Forest Green text
        return "bg-[#B2EBA1]/20 text-[#4E632A] border-[#4E632A]/20"
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "paused":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Campaigns</h1>
            <p className="mt-1 text-muted-foreground">Manage and monitor your campaign performance</p>
          </div>
          <Link
            href="/company/campaigns/create"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create Campaign
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            All
          </button>
          <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Active
          </button>
          <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Completed
          </button>
          <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Draft
          </button>
          <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Paused
          </button>
        </div>

        {/* Campaigns Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/company/campaigns/${campaign.id}/review`}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
            >
              {/* Campaign Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`rounded-md border px-3 py-1 text-xs font-medium ${getStatusColor(campaign.status)}`}
                  >
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                  <span className="text-sm font-semibold text-primary">${campaign.reward} USDC</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="text-xs text-muted-foreground">Submissions</div>
                    <div className="mt-1 text-lg font-bold text-foreground">{campaign.submissions}</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="text-xs text-muted-foreground">Approved</div>
                    <div className="mt-1 text-lg font-bold text-primary">{campaign.approved}</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="text-xs text-muted-foreground">Spots Filled</div>
                    <div className="mt-1 text-lg font-bold text-foreground">
                      {campaign.spotsTaken}/{campaign.spotsTotal}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="text-xs text-muted-foreground">Budget</div>
                    <div className="mt-1 text-lg font-bold text-foreground">${campaign.budget}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>Campaign Progress</span>
                    <span>{Math.round((campaign.spotsTaken / campaign.spotsTotal) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${(campaign.spotsTaken / campaign.spotsTotal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Started: {new Date(campaign.startDate).toLocaleDateString()}</span>
                  <span>Ends: {new Date(campaign.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (if no campaigns) */}
        {campaigns.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted text-3xl flex items-center justify-center">
              📋
            </div>
            <h3 className="text-lg font-semibold text-foreground">No campaigns yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first campaign to start working with creators
            </p>
            <Link
              href="/company/campaigns/create"
              className="mt-4 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Create Campaign
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
