import { NextResponse } from 'next/server'
import { getTikTokAccessToken, getTikTokUserInfo, calculateEngagementRate } from '@/lib/tiktok-auth'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    // Handle OAuth errors
    if (error) {
      console.error('TikTok OAuth error:', error, errorDescription)
      return NextResponse.redirect(
        new URL(`/creator/profile?tiktok_error=${encodeURIComponent(errorDescription || error)}`, request.url)
      )
    }

    // Validate required parameters
    if (!code) {
      return NextResponse.json(
        { error: 'Missing authorization code' },
        { status: 400 }
      )
    }

    // Build redirect URI (must match the one used in authorization request)
    const redirectUri = `${process.env.NEXT_PUBLIC_URL}/api/auth/tiktok/callback`

    // Exchange code for access token
    const tokenData = await getTikTokAccessToken(code, redirectUri)

    // Fetch user information
    const userInfo = await getTikTokUserInfo(tokenData.accessToken)

    // Calculate engagement rate
    const engagementRate = calculateEngagementRate({
      followerCount: userInfo.followerCount,
      likesCount: userInfo.likesCount,
      videoCount: userInfo.videoCount,
    })

    // Get Supabase client
    const supabase = await createClient()

    // TODO: Get current user's Farcaster FID from session/context
    // For now, we'll use a placeholder - you'll need to implement session management
    const farcasterFid = searchParams.get('fid') || 'temp_fid'

    // Check if creator exists
    const { data: existingCreator } = await supabase
      .from('creators')
      .select('id')
      .eq('farcaster_fid', farcasterFid)
      .single()

    if (existingCreator) {
      // Update existing creator with TikTok data
      const { error: updateError } = await supabase
        .from('creators')
        .update({
          tiktok_username: userInfo.username,
          tiktok_followers: userInfo.followerCount,
          tiktok_engagement_rate: engagementRate,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingCreator.id)

      if (updateError) {
        console.error('Error updating creator:', updateError)
        throw updateError
      }
    } else {
      // Create new creator with TikTok data
      const { error: insertError } = await supabase
        .from('creators')
        .insert({
          farcaster_fid: farcasterFid,
          tiktok_username: userInfo.username,
          tiktok_followers: userInfo.followerCount,
          tiktok_engagement_rate: engagementRate,
          verification_status: 'pending',
        })

      if (insertError) {
        console.error('Error creating creator:', insertError)
        throw insertError
      }
    }

    // Store TikTok data in session/cookie for immediate use
    // (You may want to implement proper session management here)

    // Redirect back to profile or campaign page with success message
    const returnUrl = searchParams.get('return_url') || '/creator/profile'
    return NextResponse.redirect(
      new URL(`${returnUrl}?tiktok_connected=true&username=${encodeURIComponent(userInfo.username)}`, request.url)
    )

  } catch (error) {
    console.error('TikTok OAuth callback error:', error)
    return NextResponse.redirect(
      new URL(`/creator/profile?tiktok_error=${encodeURIComponent(error instanceof Error ? error.message : 'Unknown error')}`, request.url)
    )
  }
}
