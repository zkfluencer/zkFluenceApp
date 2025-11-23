import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    clientKey: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY || 'NOT_SET',
    clientSecretConfigured: !!process.env.TIKTOK_CLIENT_SECRET,
    baseUrl: process.env.NEXT_PUBLIC_URL || 'NOT_SET',
    expectedRedirectUri: `${process.env.NEXT_PUBLIC_URL}/api/auth/tiktok/callback`,
    timestamp: new Date().toISOString(),
  })
}
