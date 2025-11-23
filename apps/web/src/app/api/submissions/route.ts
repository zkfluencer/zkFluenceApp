import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type ContentSubmission = Database['public']['Tables']['content_submissions']['Insert']

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaign_id')
    const creatorId = searchParams.get('creator_id')

    const supabase = await createClient()
    let query = supabase
      .from('content_submissions')
      .select(`
        *,
        campaigns (
          id,
          title
        ),
        creators (
          id,
          farcaster_username,
          tiktok_username
        )
      `)
      .order('submitted_at', { ascending: false })

    if (campaignId) {
      query = query.eq('campaign_id', campaignId)
    }

    if (creatorId) {
      query = query.eq('creator_id', creatorId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json() as ContentSubmission

    const { data, error } = await supabase
      .from('content_submissions')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    // Update participant status
    await supabase
      .from('campaign_participants')
      .update({ status: 'submitted' })
      .eq('id', body.participant_id)

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}
