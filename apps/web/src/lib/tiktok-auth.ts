/**
 * TikTok OAuth 2.0 Configuration
 * Documentation: https://developers.tiktok.com/doc/login-kit-web/
 */

export const TIKTOK_CONFIG = {
  authUrl: 'https://www.tiktok.com/v2/auth/authorize/',
  tokenUrl: 'https://open.tiktokapis.com/v2/oauth/token/',
  userInfoUrl: 'https://open.tiktokapis.com/v2/user/info/',

  // Required scopes for user profile and video info
  scopes: [
    'user.info.basic',      // Username, display name, avatar
    'user.info.profile',    // Bio, follower count
    'user.info.stats',      // Follower count, following count, video count
  ].join(','),

  responseType: 'code',
  state: () => Math.random().toString(36).substring(7),
}

/**
 * Generate TikTok OAuth authorization URL
 */
export function getTikTokAuthUrl(redirectUri: string): string {
  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY

  if (!clientKey) {
    throw new Error('NEXT_PUBLIC_TIKTOK_CLIENT_KEY is not configured')
  }

  const params = new URLSearchParams({
    client_key: clientKey,
    scope: TIKTOK_CONFIG.scopes,
    response_type: TIKTOK_CONFIG.responseType,
    redirect_uri: redirectUri,
    state: TIKTOK_CONFIG.state(),
  })

  return `${TIKTOK_CONFIG.authUrl}?${params.toString()}`
}

/**
 * Exchange authorization code for access token
 */
export async function getTikTokAccessToken(code: string, redirectUri: string) {
  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET

  if (!clientKey || !clientSecret) {
    throw new Error('TikTok OAuth credentials not configured')
  }

  const response = await fetch(TIKTOK_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`TikTok token exchange failed: ${error.error_description || error.error}`)
  }

  const data = await response.json()
  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
    refreshToken: data.refresh_token,
    tokenType: data.token_type,
    scope: data.scope,
    openId: data.open_id,
  }
}

/**
 * Fetch TikTok user information
 */
export async function getTikTokUserInfo(accessToken: string) {
  const response = await fetch(TIKTOK_CONFIG.userInfoUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`TikTok user info fetch failed: ${error.error_description || error.error}`)
  }

  const data = await response.json()

  return {
    openId: data.data.user.open_id,
    unionId: data.data.user.union_id,
    displayName: data.data.user.display_name,
    username: data.data.user.username,
    avatarUrl: data.data.user.avatar_url,
    avatarLargeUrl: data.data.user.avatar_large_url,
    bioDescription: data.data.user.bio_description,
    followerCount: data.data.user.follower_count,
    followingCount: data.data.user.following_count,
    likesCount: data.data.user.likes_count,
    videoCount: data.data.user.video_count,
    isVerified: data.data.user.is_verified,
  }
}

/**
 * Calculate engagement rate from TikTok stats
 */
export function calculateEngagementRate(userInfo: {
  followerCount: number
  likesCount: number
  videoCount: number
}): number {
  if (userInfo.followerCount === 0 || userInfo.videoCount === 0) {
    return 0
  }

  // Engagement Rate = (Total Likes / (Followers × Videos)) × 100
  const engagementRate = (userInfo.likesCount / (userInfo.followerCount * userInfo.videoCount)) * 100

  // Return as percentage with 2 decimal places
  return Math.round(engagementRate * 100) / 100
}
