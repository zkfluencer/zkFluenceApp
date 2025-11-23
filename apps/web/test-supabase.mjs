// Simple Supabase connection test script
// Run with: node test-supabase.js

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...\n')

// Check environment variables
console.log('Environment Variables:')
console.log('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : '❌ Not set')
console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : '❌ Not set')
console.log()

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file')
  process.exit(1)
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('📡 Testing connection...\n')

    // Test 1: Query creators table
    console.log('1️⃣  Testing creators table...')
    const { data: creators, error: creatorsError } = await supabase
      .from('creators')
      .select('*')
      .limit(5)

    if (creatorsError) {
      console.log('   ❌ Error:', creatorsError.message)
    } else {
      console.log(`   ✅ Success! Found ${creators.length} creators`)
    }

    // Test 2: Query campaigns table
    console.log('\n2️⃣  Testing campaigns table...')
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*')
      .limit(5)

    if (campaignsError) {
      console.log('   ❌ Error:', campaignsError.message)
    } else {
      console.log(`   ✅ Success! Found ${campaigns.length} campaigns`)
    }

    // Test 3: Query brands table
    console.log('\n3️⃣  Testing brands table...')
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select('*')
      .limit(5)

    if (brandsError) {
      console.log('   ❌ Error:', brandsError.message)
    } else {
      console.log(`   ✅ Success! Found ${brands.length} brands`)
    }

    // Test 4: Query campaign_participants table
    console.log('\n4️⃣  Testing campaign_participants table...')
    const { data: participants, error: participantsError } = await supabase
      .from('campaign_participants')
      .select('*')
      .limit(5)

    if (participantsError) {
      console.log('   ❌ Error:', participantsError.message)
    } else {
      console.log(`   ✅ Success! Found ${participants.length} participants`)
    }

    // Test 5: Query content_submissions table
    console.log('\n5️⃣  Testing content_submissions table...')
    const { data: submissions, error: submissionsError } = await supabase
      .from('content_submissions')
      .select('*')
      .limit(5)

    if (submissionsError) {
      console.log('   ❌ Error:', submissionsError.message)
    } else {
      console.log(`   ✅ Success! Found ${submissions.length} submissions`)
    }

    // Summary
    const hasErrors = creatorsError || campaignsError || brandsError || participantsError || submissionsError

    console.log('\n' + '='.repeat(50))
    if (hasErrors) {
      console.log('⚠️  Connection test completed with some errors')
      console.log('\nPossible issues:')
      console.log('- Tables might not exist yet (run migrations)')
      console.log('- Wrong Supabase project or credentials')
      console.log('- RLS policies might be blocking access')
    } else {
      console.log('✅ All tests passed! Supabase connection is working.')
    }
    console.log('='.repeat(50))

  } catch (error) {
    console.error('\n❌ Connection test failed:')
    console.error(error.message)
    process.exit(1)
  }
}

testConnection()
