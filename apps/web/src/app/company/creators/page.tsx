import { CompanyHeader } from "@/components/company-header" // Fixed import to use named export instead of default

export default function CreatorsPage() {
  const creators = [
    {
      id: 1,
      name: "Alex Rivera",
      handle: "@alexcrypto",
      avatar: "/creator-avatar.png",
      followers: "125K",
      engagementRate: "8.5%",
      cvs: 87,
      tier: "Gold",
      completedCampaigns: 24,
      successRate: "96%",
      categories: ["DeFi", "NFTs", "Blockchain"],
      avgViews: "45K",
      verified: true,
    },
    {
      id: 2,
      name: "Sarah Chen",
      handle: "@sarahweb3",
      avatar: "/creator-avatar.png",
      followers: "89K",
      engagementRate: "9.2%",
      cvs: 92,
      tier: "Platinum",
      completedCampaigns: 31,
      successRate: "98%",
      categories: ["Web3", "DeFi", "Trading"],
      avgViews: "52K",
      verified: true,
    },
    {
      id: 3,
      name: "Mike Johnson",
      handle: "@mikecrypto",
      avatar: "/creator-avatar.png",
      followers: "67K",
      engagementRate: "7.8%",
      cvs: 81,
      tier: "Silver",
      completedCampaigns: 18,
      successRate: "94%",
      categories: ["NFTs", "Gaming", "Metaverse"],
      avgViews: "38K",
      verified: true,
    },
    {
      id: 4,
      name: "Emma Wilson",
      handle: "@emmadefi",
      avatar: "/creator-avatar.png",
      followers: "203K",
      engagementRate: "10.1%",
      cvs: 95,
      tier: "Platinum",
      completedCampaigns: 42,
      successRate: "99%",
      categories: ["DeFi", "Education", "Trading"],
      avgViews: "78K",
      verified: true,
    },
    {
      id: 5,
      name: "Jordan Lee",
      handle: "@jordanblockchain",
      avatar: "/creator-avatar.png",
      followers: "54K",
      engagementRate: "6.9%",
      cvs: 75,
      tier: "Silver",
      completedCampaigns: 15,
      successRate: "93%",
      categories: ["Blockchain", "Tech", "Education"],
      verified: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Discover Creators</h1>
          <p className="text-muted-foreground">Find and connect with verified TikTok creators for your campaigns</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search creators by name or handle..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Followers Filter */}
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Followers</option>
              <option>10K - 50K</option>
              <option>50K - 100K</option>
              <option>100K - 500K</option>
              <option>500K+</option>
            </select>

            {/* CVS Filter */}
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All CVS Scores</option>
              <option>90+ (Platinum)</option>
              <option>80-89 (Gold)</option>
              <option>70-79 (Silver)</option>
              <option>60-69 (Bronze)</option>
            </select>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-muted-foreground mr-2">Categories:</span>
            {["DeFi", "NFTs", "Web3", "Gaming", "Trading", "Education", "Blockchain", "Metaverse"].map((cat) => (
              <button
                key={cat}
                className="px-3 py-1 text-sm border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {creators.length} verified creators</p>
          <select className="px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Sort by: Relevance</option>
            <option>CVS Score (High to Low)</option>
            <option>Followers (High to Low)</option>
            <option>Engagement Rate</option>
            <option>Success Rate</option>
          </select>
        </div>

        {/* Creators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
                <div className="relative inline-block mb-3">
                  <img
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.name}
                    className="w-20 h-20 rounded-full border-4 border-background"
                  />
                  {creator.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{creator.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{creator.handle}</p>
                <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                  {creator.tier} Tier
                </div>
              </div>

              {/* Stats Grid */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="text-lg font-bold">{creator.followers}</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="text-lg font-bold">{creator.engagementRate}</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="text-lg font-bold text-primary">{creator.cvs}</div>
                    <div className="text-xs text-muted-foreground">CVS Score</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <div className="text-lg font-bold">{creator.avgViews}</div>
                    <div className="text-xs text-muted-foreground">Avg Views</div>
                  </div>
                </div>

                {/* Campaign Stats */}
                <div className="mb-4 p-3 bg-muted/30 rounded">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Campaigns</span>
                    <span className="font-semibold">{creator.completedCampaigns}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-[#4E632A]">{creator.successRate}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {creator.categories.map((cat) => (
                      <span key={cat} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    View Profile
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 border rounded-lg hover:bg-muted transition-colors">Load More Creators</button>
        </div>
      </main>
    </div>
  )
}
