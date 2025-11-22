"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ExternalLink, Loader2, XCircle } from "lucide-react"
import { formatTxHash, getCeloscanUrl } from "@/lib/blockchain/utils"

interface TransactionStatusProps {
  status: "pending" | "confirmed" | "failed"
  txHash?: string
  amount?: number
  token?: string
  recipient?: string
  timestamp?: string
}

export function TransactionStatus({
  status,
  txHash,
  amount,
  token = "USDC",
  recipient,
  timestamp,
}: TransactionStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-6 w-6 text-accent" />
      case "pending":
        return <Loader2 className="h-6 w-6 text-chart-2 animate-spin" />
      case "failed":
        return <XCircle className="h-6 w-6 text-destructive" />
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">Pending</Badge>
      case "failed":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "confirmed":
        return "Your transaction has been confirmed on Celo Network"
      case "pending":
        return "Your transaction is being processed..."
      case "failed":
        return "Your transaction failed. Please try again."
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Transaction Status</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          {getStatusIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-2">{getStatusMessage()}</p>
            {amount && (
              <p className="text-lg font-semibold text-foreground">
                {amount} {token}
              </p>
            )}
          </div>
        </div>

        {txHash && (
          <div className="p-3 rounded-lg bg-secondary space-y-2">
            <p className="text-xs font-medium text-foreground">Transaction Hash</p>
            <code className="text-xs bg-background px-2 py-1 rounded block truncate">{txHash}</code>
            <a href={getCeloscanUrl(txHash)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Celoscan
              </Button>
            </a>
          </div>
        )}

        {recipient && (
          <div className="text-xs text-muted-foreground">
            <span>Recipient: </span>
            <code className="bg-secondary px-1 py-0.5 rounded">{formatTxHash(recipient)}</code>
          </div>
        )}

        {timestamp && status === "confirmed" && (
          <p className="text-xs text-muted-foreground">Confirmed at {new Date(timestamp).toLocaleString()}</p>
        )}
      </CardContent>
    </Card>
  )
}
