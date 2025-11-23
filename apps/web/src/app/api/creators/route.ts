import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type Creator = Database['public']['Tables']['creators']['Insert']

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching creators:', error)
    return NextResponse.json(
      { error: 'Failed to fetch creators' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json() as Creator

    const { data, error } = await supabase
      .from('creators')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating creator:', error)
    return NextResponse.json(
      { error: 'Failed to create creator' },
      { status: 500 }
    )
  }
}
