"use client"

import { Button } from "@/components/ui/button"
import { Music2, CheckCircle2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useMiniApp } from "@/contexts/miniapp-context"
import { useToast } from "@/hooks/use-toast"

interface TikTokConnectButtonProps {
  returnUrl?: string
  onSuccess?: (username: string) => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function TikTokConnectButton({
  returnUrl,
  onSuccess,
  variant = "default",
  size = "default",
  className,
}: TikTokConnectButtonProps) {
  const { context } = useMiniApp()
  const { toast } = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [tiktokUsername, setTiktokUsername] = useState<string>()

  // Check URL params for connection status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const connected = params.get('tiktok_connected')
      const username = params.get('username')
      const error = params.get('tiktok_error')

      if (connected === 'true' && username) {
        setIsConnected(true)
        setTiktokUsername(username)
        onSuccess?.(username)

        toast({
          title: "TikTok Connected!",
          description: `Successfully connected @${username}`,
        })

        // Clean up URL params
        const cleanUrl = window.location.pathname
        window.history.replaceState({}, '', cleanUrl)
      }

      if (error) {
        toast({
          title: "Connection Failed",
          description: decodeURIComponent(error),
          variant: "destructive",
        })

        // Clean up URL params
        const cleanUrl = window.location.pathname
        window.history.replaceState({}, '', cleanUrl)
      }
    }
  }, [onSuccess, toast])

  const handleConnect = () => {
    setIsConnecting(true)

    // Build authorization URL
    const params = new URLSearchParams()
    if (returnUrl) {
      params.set('return_url', returnUrl)
    } else if (typeof window !== 'undefined') {
      params.set('return_url', window.location.pathname)
    }

    // Add Farcaster FID if available
    if (context?.user?.fid) {
      params.set('fid', context.user.fid.toString())
    }

    const authUrl = `/api/auth/tiktok/authorize?${params.toString()}`

    // Redirect to TikTok OAuth
    window.location.href = authUrl
  }

  if (isConnected && tiktokUsername) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        disabled
      >
        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
        Connected: @{tiktokUsername}
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleConnect}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Music2 className="h-4 w-4 mr-2" />
          Connect TikTok
        </>
      )}
    </Button>
  )
}
