"use client"

import React, { useState, useEffect } from 'react'
import { useSelf } from '@/contexts/SelfContext'
import { useAccount, usePublicClient } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { celo } from 'viem/chains'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, Copy, ExternalLink, Loader2, QrCode } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SelfQRcodeWrapper } from '@selfxyz/qrcode'

interface SelfWidgetProps {
  variant?: 'card' | 'inline'
  showQRCode?: boolean
  className?: string
}

export function SelfWidget({
  variant = 'inline',
  showQRCode = false,
  className
}: SelfWidgetProps) {
  const { isConnected, address } = useAccount()
  const {
    isVerified,
    verificationData,
    isVerifying,
    error,
    universalLink,
    selfApp,
    initiateSelfVerification,
    clearVerification,
  } = useSelf()

  const [linkCopied, setLinkCopied] = useState(false)
  const [showQR, setShowQR] = useState(showQRCode)
  const [contractVerified, setContractVerified] = useState(false)
  const [contractVerificationData, setContractVerificationData] = useState<any>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [contractError, setContractError] = useState<string | null>(null)

  const contractAddress = process.env.NEXT_PUBLIC_SELF_ENDPOINT || process.env.NEXT_PUBLIC_VERIFICATION_CONTRACT_ADDRESS
  const contractChain = process.env.NEXT_PUBLIC_SELF_ENDPOINT_TYPE || 'celo'

  const copyToClipboard = () => {
    if (!universalLink) return

    navigator.clipboard.writeText(universalLink)
      .then(() => {
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
      })
      .catch((err) => {
        console.error('Failed to copy:', err)
      })
  }

  // Get block explorer URL
  const getExplorerUrl = (txHash: string) => {
    const explorers: Record<string, string> = {
      'celo': 'https://celoscan.io/tx',
      'staging_celo': 'https://alfajores.celoscan.io/tx',
    }
    const baseUrl = explorers[contractChain] || 'https://celoscan.io/tx'
    return `${baseUrl}/${txHash}`
  }

  // Handle verification with deeplink
  const handleVerify = async () => {
    setIsProcessing(true)
    setContractError(null)
    await initiateSelfVerification()
  }

  // Poll for verification events when processing
  useEffect(() => {
    if (!isProcessing || !address || !contractAddress) return

    let pollCount = 0
    const maxPolls = 60 // Poll for up to 5 minutes
    const startTime = Math.floor(Date.now() / 1000)
    console.log(`⏰ Started polling for events at timestamp: ${startTime}`)

    const pollInterval = setInterval(async () => {
      pollCount++
      console.log(`🔍 Polling for VerificationCompleted events (${pollCount}/${maxPolls})...`)

      try {
        const celoRpcUrl = process.env.NEXT_PUBLIC_CELO_MAINNET_RPC || 'https://forno.celo.org'
        const celoClient = createPublicClient({
          chain: celo,
          transport: http(celoRpcUrl)
        })

        const currentBlock = await celoClient.getBlockNumber()
        const fromBlock = currentBlock - BigInt(9) // Look back 9 blocks

        console.log(`📦 Checking blocks ${fromBlock} to ${currentBlock}`)

        // Query for VerificationCompleted events
        const logs = await celoClient.getLogs({
          address: contractAddress as `0x${string}`,
          event: {
            type: 'event',
            name: 'VerificationCompleted',
            inputs: [
              { indexed: true, name: 'userAddress', type: 'address' },
              { indexed: true, name: 'userIdentifier', type: 'bytes32' },
              { indexed: false, name: 'timestamp', type: 'uint256' },
              { indexed: false, name: 'dateOfBirth', type: 'string' }
            ]
          },
          fromBlock,
          toBlock: currentBlock
        })

        console.log(`📝 Found ${logs.length} VerificationCompleted events`)

        for (const log of logs) {
          const eventUserAddress = log.args?.userAddress as string

          if (eventUserAddress?.toLowerCase() === address?.toLowerCase()) {
            const eventTimestamp = Number(log.args?.timestamp || 0)
            const isRecent = eventTimestamp >= startTime - 60

            console.log('🎯 Found event for current user:', {
              txHash: log.transactionHash,
              timestamp: eventTimestamp,
              isRecent
            })

            if (isRecent) {
              console.log('✅ Recent verification event found!')

              // Read full verification data from contract
              const data = await celoClient.readContract({
                address: contractAddress as `0x${string}`,
                abi: [
                  {
                    inputs: [{ name: '', type: 'address' }],
                    name: 'verifications',
                    outputs: [
                      { name: 'verified', type: 'bool' },
                      { name: 'timestamp', type: 'uint256' },
                      { name: 'dateOfBirth', type: 'string' },
                      { name: 'name', type: 'string' },
                      { name: 'nationality', type: 'string' },
                      { name: 'userIdentifier', type: 'bytes32' },
                      { name: 'userType', type: 'uint8' }
                    ],
                    stateMutability: 'view',
                    type: 'function'
                  }
                ],
                functionName: 'verifications',
                args: [address as `0x${string}`]
              }) as any

              clearInterval(pollInterval)
              setIsProcessing(false)
              setContractVerified(true)
              setTxHash(log.transactionHash)
              setContractVerificationData({
                date_of_birth: data.dateOfBirth,
                name: data.name,
                nationality: data.nationality,
                timestamp: data.timestamp,
                userType: data.userType === 1 ? 'Creator' : data.userType === 2 ? 'Brand' : 'Unknown'
              })

              return
            }
          }
        }
      } catch (error) {
        console.error('❌ Error polling events:', error)
      }

      if (pollCount >= maxPolls) {
        console.log('⏱️ Polling timeout reached')
        clearInterval(pollInterval)
        setIsProcessing(false)
        setContractError('Verification timeout. Please refresh and check again.')
      }
    }, 5000)

    return () => {
      clearInterval(pollInterval)
    }
  }, [isProcessing, address, contractAddress])

  // Don't show if not connected
  if (!isConnected) {
    return null
  }

  // Contract not configured
  if (!contractAddress) {
    return (
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-4 md:p-6 border border-blue-500/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Self Protocol</h3>
            <p className="text-xs text-muted-foreground">Contract not configured</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Deploy the verification contract to enable identity verification.
        </p>
      </div>
    )
  }

  // Inline variant (for profile page)
  if (variant === 'inline') {
    if (contractVerified && contractVerificationData) {
      return (
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-4 md:p-6 border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  Self Protocol Verified
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {contractVerificationData.userType === 'Creator' && 'Verified Creator'}
                  {contractVerificationData.userType === 'Brand' && 'Verified Brand'}
                  {contractVerificationData.userType === 'Unknown' && 'Identity Verified'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => {
              setContractVerified(false)
              setContractVerificationData(null)
              setTxHash(null)
            }}>
              Clear
            </Button>
          </div>

          {/* Verification Data */}
          {(contractVerificationData.date_of_birth || contractVerificationData.name || contractVerificationData.nationality) && (
            <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3 mb-3 space-y-2">
              {contractVerificationData.date_of_birth && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date of Birth:</span>
                  <span className="font-medium">{contractVerificationData.date_of_birth}</span>
                </div>
              )}
              {contractVerificationData.name && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{contractVerificationData.name}</span>
                </div>
              )}
              {contractVerificationData.nationality && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nationality:</span>
                  <span className="font-medium">{contractVerificationData.nationality}</span>
                </div>
              )}
            </div>
          )}

          {/* Transaction Link */}
          {txHash && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
              <p className="text-xs font-semibold mb-1">Transaction Hash:</p>
              <a
                href={getExplorerUrl(txHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-mono break-all"
              >
                <span>{txHash}</span>
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
              </a>
            </div>
          )}

          {/* Contract Info */}
          <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
            <p><strong>Contract:</strong></p>
            <p className="font-mono bg-background p-2 rounded border break-all">
              {contractAddress}
            </p>
            <p><strong>Network:</strong> {contractChain === 'celo' ? 'Celo Mainnet' : contractChain}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-4 md:p-6 border border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Self Protocol</h3>
              <p className="text-xs md:text-sm text-muted-foreground">On-Chain Verification</p>
            </div>
          </div>
        </div>

        {/* On-Chain Info */}
        <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 rounded-lg mb-4">
          <p className="text-sm text-muted-foreground">
            Verification stored on Celo blockchain for decentralized access.
          </p>
        </div>

        {(isProcessing || isVerifying) && (
          <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 rounded-lg mb-4">
            <div className="flex items-start gap-3">
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin flex-shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <h4 className="font-semibold text-sm">Processing verification...</h4>
                <p className="text-xs text-muted-foreground">
                  Your identity proof is being verified and stored on-chain. This may take up to 5 minutes.
                </p>
              </div>
            </div>
          </div>
        )}

        {contractError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm mb-4">
            {contractError}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {showQR && selfApp && (
          <div className="flex flex-col items-center space-y-3 mb-4">
            <div className="bg-white p-4 rounded-lg border">
              <SelfQRcodeWrapper
                selfApp={selfApp}
                onSuccess={() => {
                  console.log('✅ QR scan completed')
                  setIsProcessing(true)
                  setContractError(null)
                }}
                onError={(err) => {
                  console.error('QR verification error:', err)
                  setContractError('QR verification failed')
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Scan with Self Protocol mobile app
            </p>
          </div>
        )}

        {!showQR && !isProcessing && !isVerifying && (
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg mb-4">
            <div className="flex items-start gap-2">
              <svg className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  Gas Fees Required
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                  You need CELO tokens in your wallet to pay for gas fees when storing verification on-chain. Estimated cost: ~0.01 CELO
                </p>
              </div>
            </div>
          </div>
        )}

        {!showQR && (
          <Button
            onClick={handleVerify}
            disabled={isProcessing || isVerifying || !universalLink}
            className="w-full mb-3"
          >
            {(isProcessing || isVerifying) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Waiting for verification...
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Verify with Self
              </>
            )}
          </Button>
        )}

        {universalLink && !isProcessing && !isVerifying && (
          <div className="flex gap-2 mb-4">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Copy className="mr-2 h-3 w-3" />
              {linkCopied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button
              onClick={() => setShowQR(!showQR)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <QrCode className="mr-2 h-3 w-3" />
              {showQR ? 'Hide QR' : 'Show QR'}
            </Button>
          </div>
        )}

        {/* Contract Info */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p><strong>Contract:</strong></p>
          <p className="font-mono bg-background p-2 rounded border break-all">
            {contractAddress}
          </p>
          <p><strong>Network:</strong> {contractChain === 'celo' ? 'Celo Mainnet' : contractChain}</p>
        </div>
      </div>
    )
  }

  // Card variant
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Self Protocol Verification
        </CardTitle>
        <CardDescription>
          Privacy-preserving identity verification on Celo
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Card content similar to inline but with more detail */}
        <p className="text-sm text-muted-foreground">
          Verify your identity using Self Protocol to unlock platform features.
        </p>
      </CardContent>
    </Card>
  )
}
