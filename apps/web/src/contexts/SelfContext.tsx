"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { SelfAppBuilder, type SelfApp, getUniversalLink } from '@selfxyz/qrcode'

interface VerificationData {
  verified: boolean
  date_of_birth?: string
  userIdentifier?: string
  name?: string
  nationality?: string
  timestamp?: number
  userType?: 'Creator' | 'Brand' | 'Unknown'
}

interface SelfContextType {
  // State
  isVerified: boolean
  verificationData: VerificationData | null
  isVerifying: boolean
  error: string | null
  selfApp: SelfApp | null
  universalLink: string | null

  // Actions
  initiateSelfVerification: () => Promise<void>
  checkVerificationStatus: () => Promise<void>
  clearVerification: () => void

  // Widget visibility
  showWidget: boolean
  setShowWidget: (show: boolean) => void
}

const SelfContext = createContext<SelfContextType | null>(null)

export function useSelf() {
  const context = useContext(SelfContext)
  if (!context) {
    throw new Error('useSelf must be used within SelfProvider')
  }
  return context
}

interface SelfProviderProps {
  children: React.ReactNode
}

export function SelfProvider({ children }: SelfProviderProps) {
  const { address, isConnected } = useAccount()

  const [isVerified, setIsVerified] = useState(false)
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selfApp, setSelfApp] = useState<SelfApp | null>(null)
  const [universalLink, setUniversalLink] = useState<string | null>(null)
  const [showWidget, setShowWidget] = useState(false)

  // Configuration from environment
  const contractAddress = process.env.NEXT_PUBLIC_SELF_ENDPOINT || process.env.NEXT_PUBLIC_VERIFICATION_CONTRACT_ADDRESS
  const contractChain = (process.env.NEXT_PUBLIC_SELF_ENDPOINT_TYPE as any) || 'celo'
  const scope = process.env.NEXT_PUBLIC_SELF_SCOPE || 'farcaster-miniapp-template'
  const appName = process.env.NEXT_PUBLIC_SELF_APP_NAME || 'zkFluence'

  // Initialize Self app when address changes
  useEffect(() => {
    if (!address || !isConnected || !contractAddress) {
      setSelfApp(null)
      setUniversalLink(null)
      return
    }

    try {
      console.log('🔧 zkFluence Self Protocol Configuration:', {
        verificationMode: 'contract',
        endpoint: contractAddress,
        endpointType: contractChain,
        scope,
        userId: address,
      })

      const app = new SelfAppBuilder({
        version: 2,
        appName,
        scope,
        endpoint: contractAddress,
        deeplinkCallback: process.env.NEXT_PUBLIC_SELF_DEEPLINK_CALLBACK ||
          (typeof window !== 'undefined' ? window.location.href : ''),
        logoBase64: process.env.NEXT_PUBLIC_SELF_LOGO_URL || '',
        userId: address,
        endpointType: contractChain,
        userIdType: 'hex',
        disclosures: {
          minimumAge: 18,
          excludedCountries: [],
          ofac: false,
          date_of_birth: true,
          name: false,
          nationality: false,
        }
      }).build()

      setSelfApp(app)
      setUniversalLink(getUniversalLink(app))
    } catch (err) {
      console.error('Failed to initialize Self app:', err)
      setError('Failed to initialize Self Protocol')
    }
  }, [address, isConnected, contractAddress, contractChain, scope, appName])

  // Check verification status from blockchain
  const checkVerificationStatus = useCallback(async () => {
    if (!address || !contractAddress) return

    try {
      // This will be handled by the SelfWidget component through event polling
      console.log('📊 Checking verification status for:', address)
    } catch (err) {
      console.error('Failed to check verification status:', err)
    }
  }, [address, contractAddress])

  // Initialize check on mount
  useEffect(() => {
    if (address && isConnected && contractAddress) {
      checkVerificationStatus()
    }
  }, [address, isConnected, contractAddress, checkVerificationStatus])

  const initiateSelfVerification = useCallback(async () => {
    if (!universalLink || !address) {
      setError('Verification link not available')
      return
    }

    console.log('🔗 Opening Self verification deeplink:', universalLink)

    try {
      // Check if we're in Farcaster environment
      const { sdk } = await import('@farcaster/frame-sdk')
      const isInMiniAppResult = await sdk.isInMiniApp()

      if (isInMiniAppResult) {
        // In Farcaster app - open with SDK
        try {
          await sdk.actions.openUrl(universalLink)
          console.log('✅ Opened Self app with Farcaster SDK')
        } catch (sdkError) {
          console.error('Error opening Self app with SDK:', sdkError)
          // Fallback to window.open
          window.open(universalLink, '_blank')
          console.log('⚠️ Fell back to window.open')
        }
      } else {
        // In browser - open in new tab
        window.open(universalLink, '_blank')
        console.log('🌐 Opened Self app in new browser tab')
      }

      setIsVerifying(true)
      setError(null)
    } catch (err) {
      console.error('Failed to open Self app:', err)
      setError('Failed to open Self app')
    }
  }, [universalLink, address])

  const clearVerification = useCallback(() => {
    setIsVerified(false)
    setVerificationData(null)
    setIsVerifying(false)
    setError(null)
  }, [])

  const value: SelfContextType = {
    isVerified,
    verificationData,
    isVerifying,
    error,
    selfApp,
    universalLink,
    initiateSelfVerification,
    checkVerificationStatus,
    clearVerification,
    showWidget,
    setShowWidget,
  }

  return (
    <SelfContext.Provider value={value}>
      {children}
    </SelfContext.Provider>
  )
}
