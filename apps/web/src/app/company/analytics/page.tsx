import { CompanyHeader } from "@/components/company-header"

export default function CompanyAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track campaign performance and creator metrics</p>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["7 Days", "30 Days", "90 Days", "All Time"].map((period) => (
            <button
              key={period}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                period === "30 Days" ? "bg-primary text-white" : "bg-white text-foreground hover:bg-gray-100"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📊</div>
              <div className="text-[#4E632A] text-sm font-medium bg-[#B2EBA1]/20 px-2 py-1 rounded">+12%</div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">2.4M</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">❤️</div>
              <div className="text-[#4E632A] text-sm font-medium bg-[#B2EBA1]/20 px-2 py-1 rounded">+8%</div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">184K</div>
            <div className="text-sm text-muted-foreground">Engagement</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">🎯</div>
              <div className="text-[#4E632A] text-sm font-medium bg-[#B2EBA1]/20 px-2 py-1 rounded">+15%</div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">7.6%</div>
            <div className="text-sm text-muted-foreground">Avg CTR</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">💰</div>
              <div className="text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded">-3%</div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">$0.08</div>
            <div className="text-sm text-muted-foreground">Cost per View</div>
          </div>
        </div>

        {/* Campaign Performance Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Campaign Performance</h2>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
              <option>Views</option>
              <option>Engagement</option>
              <option>Conversions</option>
            </select>
          </div>

          {/* Simple Bar Chart Visualization */}
          <div className="space-y-4">
            {[
              { name: "Celo Wallet Launch", value: 85, total: 100 },
              { name: "DeFi Made Simple", value: 72, total: 100 },
              { name: "NFT Marketplace", value: 91, total: 100 },
              { name: "Gaming Platform", value: 64, total: 100 },
            ].map((campaign) => (
              <div key={campaign.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground font-medium">{campaign.name}</span>
                  <span className="text-muted-foreground">{campaign.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-[#4E632A] h-full rounded-full transition-all"
                    style={{ width: `${campaign.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performing Creators */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-foreground mb-6">Top Performing Creators</h2>
            <div className="space-y-4">
              {[
                { name: "Sarah Chen", handle: "@sarahweb3", views: "450K", engagement: "12.3%", cvs: 92 },
                { name: "Mike Johnson", handle: "@mikecrypto", views: "385K", engagement: "10.8%", cvs: 88 },
                { name: "Alex Rivera", handle: "@alexdefi", views: "320K", engagement: "9.5%", cvs: 85 },
                { name: "Emma Davis", handle: "@emmatech", views: "290K", engagement: "11.2%", cvs: 90 },
              ].map((creator, index) => (
                <div
                  key={creator.handle}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl font-bold text-muted-foreground w-8">#{index + 1}</div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#4E632A]" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{creator.name}</div>
                    <div className="text-sm text-muted-foreground">{creator.handle}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{creator.views}</div>
                    <div className="text-sm text-muted-foreground">{creator.engagement} CTR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">CVS</div>
                    <div className="px-3 py-1 rounded-full bg-[#B2EBA1]/20 text-[#4E632A] font-semibold text-sm">
                      {creator.cvs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Demographics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-foreground mb-6">Audience Demographics</h2>

            {/* Age Distribution */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Age Groups</h3>
              <div className="space-y-3">
                {[
                  { range: "18-24", percentage: 35 },
                  { range: "25-34", percentage: 42 },
                  { range: "35-44", percentage: 18 },
                  { range: "45+", percentage: 5 },
                ].map((age) => (
                  <div key={age.range} className="flex items-center gap-3">
                    <div className="w-16 text-sm text-muted-foreground">{age.range}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${age.percentage}%` }} />
                    </div>
                    <div className="w-12 text-sm text-right font-medium text-foreground">{age.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Top Locations</h3>
              <div className="space-y-2">
                {[
                  { country: "🇺🇸 United States", percentage: 38 },
                  { country: "🇬🇧 United Kingdom", percentage: 22 },
                  { country: "🇨🇦 Canada", percentage: 15 },
                  { country: "🇦🇺 Australia", percentage: 12 },
                  { country: "🌍 Other", percentage: 13 },
                ].map((location) => (
                  <div key={location.country} className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{location.country}</span>
                    <span className="text-sm font-medium text-foreground">{location.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROI Analysis */}
        <div className="bg-gradient-to-br from-primary to-[#4E632A] rounded-xl p-6 shadow-sm text-white mb-8">
          <h2 className="text-lg font-semibold mb-6">ROI Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm opacity-90 mb-2">Total Spend</div>
              <div className="text-3xl font-bold mb-1">$12,450</div>
              <div className="text-sm opacity-75">USDC on Celo Network</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-2">Estimated Value</div>
              <div className="text-3xl font-bold mb-1">$48,200</div>
              <div className="text-sm opacity-75">Based on engagement metrics</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-2">Return on Investment</div>
              <div className="text-3xl font-bold mb-1">287%</div>
              <div className="text-sm opacity-75">Above industry average</div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-foreground font-medium hover:bg-gray-50 transition-colors">
            📥 Export CSV
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-foreground font-medium hover:bg-gray-50 transition-colors">
            📊 Download Report
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-foreground font-medium hover:bg-gray-50 transition-colors">
            📧 Email Summary
          </button>
        </div>
      </main>
    </div>
  )
}
