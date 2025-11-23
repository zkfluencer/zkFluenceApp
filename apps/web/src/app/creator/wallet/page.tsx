import { CreatorHeader } from "@/components/creator-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"

export default function WalletPage() {
  // Mock data
  const walletData = {
    balance: 1250.5,
    totalEarned: 1850.0,
    pendingPayments: 150.0,
    payments: [
      {
        id: "1",
        campaign: "Celo Wallet Mobile App Launch",
        amount: 50,
        txHash: "0xabcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234",
        timestamp: "2024-12-15T10:30:00",
        status: "confirmed" as const,
      },
      {
        id: "2",
        campaign: "DeFi Made Simple Campaign",
        amount: 75,
        txHash: "0xef123456789012ef123456789012ef123456789012ef123456789012ef123456",
        timestamp: "2024-12-14T14:20:00",
        status: "confirmed" as const,
      },
      {
        id: "3",
        campaign: "Web3 Gaming Platform",
        amount: 60,
        txHash: "0x789012345678789012345678789012345678789012345678789012345678",
        timestamp: "2024-12-10T09:15:00",
        status: "confirmed" as const,
      },
    ],
  }

  const formatTxHash = (hash: string) => `${hash.slice(0, 6)}...${hash.slice(-4)}`
  const getCeloscanUrl = (txHash: string) => `https://celoscan.io/tx/${txHash}`

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CreatorHeader username="cryptoartist" />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-8 mb-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                    💰
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Total Balance</p>
                    <p className="text-xs opacity-70">USDC on Celo</p>
                  </div>
                </div>
                <Badge className="bg-white/20 backdrop-blur border-white/30 text-white">Connected</Badge>
              </div>
              <h1 className="text-5xl font-bold mb-2">${walletData.balance.toFixed(2)}</h1>
              <p className="text-sm opacity-80">≈ {walletData.balance.toFixed(2)} USDC</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-6">
                <div className="text-3xl mb-2">📈</div>
                <p className="text-2xl font-bold text-foreground mb-1">${walletData.totalEarned.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Earned</p>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
              <CardContent className="p-6">
                <div className="text-3xl mb-2">⏳</div>
                <p className="text-2xl font-bold text-foreground mb-1">${walletData.pendingPayments.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-2xl">⚡</span>
                Celo Network Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-xl">
                  <p className="text-3xl font-bold text-primary mb-1">5-10s</p>
                  <p className="text-xs text-muted-foreground">Confirmation Time</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-xl">
                  <p className="text-3xl font-bold text-primary mb-1">~$0.001</p>
                  <p className="text-xs text-muted-foreground">Gas Fees</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">✓</span>
                  <span>Mobile-first blockchain designed for creators</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">✓</span>
                  <span>Instant settlements with near-zero fees</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">✓</span>
                  <span>Stable USDC rewards you can trust</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {walletData.payments.map((payment, index) => (
                  <div
                    key={payment.id}
                    className="relative p-4 rounded-xl border border-border bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">✅</span>
                          <p className="font-semibold text-foreground text-sm">{payment.campaign}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <code className="bg-secondary px-2 py-1 rounded text-xs">{formatTxHash(payment.txHash)}</code>
                          <span>•</span>
                          <span>{new Date(payment.timestamp).toLocaleDateString()}</span>
                        </div>
                        <a
                          href={getCeloscanUrl(payment.txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                        >
                          View on Celoscan
                          <span className="text-sm">→</span>
                        </a>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-primary mb-1">+${payment.amount}</p>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                          Confirmed
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}

                {walletData.payments.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💸</div>
                    <p className="text-muted-foreground">No payments yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Start completing campaigns to earn rewards!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
