import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: campaignId } = await params
    const { creatorId } = await request.json()

    const supabase = await createClient()

    // Check if creator already joined
    const { data: existing } = await supabase
      .from('campaign_participants')
      .select('id')
      .eq('campaign_id', campaignId)
      .eq('creator_id', creatorId)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Already joined this campaign' },
        { status: 400 }
      )
    }

    // Check if campaign is full
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('max_participants, current_participants')
      .eq('id', campaignId)
      .single()

    if (campaign && campaign.current_participants >= campaign.max_participants) {
      return NextResponse.json(
        { error: 'Campaign is full' },
        { status: 400 }
      )
    }

    // Create participant record
    const { data, error } = await supabase
      .from('campaign_participants')
      .insert({
        campaign_id: campaignId,
        creator_id: creatorId,
        status: 'joined'
      })
      .select()
      .single()

    if (error) throw error

    // Increment participant count
    await supabase
      .from('campaigns')
      .update({ current_participants: (campaign?.current_participants || 0) + 1 })
      .eq('id', campaignId)

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error joining campaign:', error)
    return NextResponse.json(
      { error: 'Failed to join campaign' },
      { status: 500 }
    )
  }
}
