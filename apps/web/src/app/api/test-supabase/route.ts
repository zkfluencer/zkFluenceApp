import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Test 1: Check if client was created
    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create Supabase client'
        },
        { status: 500 }
      )
    }

    // Test 2: Try to query tables (will check if connection works)
    const { data: creators, error: creatorsError } = await supabase
      .from('creators')
      .select('count')
      .limit(1)

    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('count')
      .limit(1)

    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select('count')
      .limit(1)

    // Collect results
    const results = {
      success: true,
      message: 'Supabase connection successful',
      tests: {
        client: {
          status: 'success',
          message: 'Supabase client created successfully'
        },
        creators_table: {
          status: creatorsError ? 'error' : 'success',
          message: creatorsError ? creatorsError.message : 'Creators table accessible',
          error: creatorsError?.message
        },
        campaigns_table: {
          status: campaignsError ? 'error' : 'success',
          message: campaignsError ? campaignsError.message : 'Campaigns table accessible',
          error: campaignsError?.message
        },
        brands_table: {
          status: brandsError ? 'error' : 'success',
          message: brandsError ? brandsError.message : 'Brands table accessible',
          error: brandsError?.message
        }
      },
      config: {
        url_configured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        anon_key_configured: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        url_preview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...'
      }
    }

    const hasErrors = creatorsError || campaignsError || brandsError

    return NextResponse.json(results, {
      status: hasErrors ? 500 : 200
    })

  } catch (error) {
    console.error('Supabase connection test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Connection test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        config: {
          url_configured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          anon_key_configured: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      },
      { status: 500 }
    )
  }
}
