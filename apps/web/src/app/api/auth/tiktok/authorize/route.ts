import { NextResponse } from 'next/server'
import { getTikTokAuthUrl } from '@/lib/tiktok-auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const returnUrl = searchParams.get('return_url') || '/creator/profile'
    const fid = searchParams.get('fid') // Farcaster FID

    // Build redirect URI (MUST NOT include query params - TikTok requires exact match)
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    const redirectUri = `${baseUrl}/api/auth/tiktok/callback`

    // Encode callback params in state parameter (Base64 JSON)
    const stateData = {
      return_url: returnUrl,
      fid: fid,
      timestamp: Date.now(),
    }
    const state = Buffer.from(JSON.stringify(stateData)).toString('base64url')

    // Generate TikTok authorization URL with state
    const authUrl = getTikTokAuthUrl(redirectUri, state)

    // Redirect to TikTok OAuth
    return NextResponse.redirect(authUrl)

  } catch (error) {
    console.error('TikTok authorization error:', error)
    return NextResponse.json(
      {
        error: 'Failed to initiate TikTok authorization',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
