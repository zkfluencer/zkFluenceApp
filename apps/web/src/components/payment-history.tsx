import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ExternalLink } from "lucide-react"
import { formatTxHash, getCeloscanUrl } from "@/lib/blockchain/utils"

interface PaymentHistoryProps {
  payments: Array<{
    id: string
    campaign: string
    amount: number
    txHash: string
    timestamp: string
    status: "confirmed"
  }>
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                  <p className="text-sm font-medium text-foreground truncate">{payment.campaign}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <code className="bg-secondary px-1 py-0.5 rounded">{formatTxHash(payment.txHash)}</code>
                  <span>•</span>
                  <span>{new Date(payment.timestamp).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <p className="text-sm font-bold text-accent">+{payment.amount} USDC</p>
                  <Badge variant="secondary" className="text-xs">
                    Confirmed
                  </Badge>
                </div>
                <a href={getCeloscanUrl(payment.txHash)} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          ))}

          {payments.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No payments yet</p>}
        </div>
      </CardContent>
    </Card>
  )
}
