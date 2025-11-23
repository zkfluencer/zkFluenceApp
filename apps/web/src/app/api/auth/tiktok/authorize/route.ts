import { NextResponse } from 'next/server'
import { getTikTokAuthUrl } from '@/lib/tiktok-auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const returnUrl = searchParams.get('return_url') || '/creator/profile'
    const fid = searchParams.get('fid') // Farcaster FID

    // Build redirect URI
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    const callbackParams = new URLSearchParams()
    if (returnUrl) callbackParams.set('return_url', returnUrl)
    if (fid) callbackParams.set('fid', fid)

    const redirectUri = `${baseUrl}/api/auth/tiktok/callback?${callbackParams.toString()}`

    // Generate TikTok authorization URL
    const authUrl = getTikTokAuthUrl(redirectUri)

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
