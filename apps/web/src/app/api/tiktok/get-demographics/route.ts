// API Route: /api/tiktok/get-demographics
// Obtiene los demográficos de audiencia de TikTok con proof

import { NextRequest, NextResponse } from 'next/server';
import { createTikTokClient, getTikTokConfig, TIKTOK_ENDPOINTS, callTikTokApiDirectly } from '@/lib/api/tiktok';
import { validateHandle, cleanHandle } from '@/lib/utils/handle-validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const handle = searchParams.get('handle');
    const generateProof = searchParams.get('generateProof') !== 'false';

    const validationError = validateHandle(handle);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!handle) {
      return NextResponse.json({ error: 'handle is required' }, { status: 400 });
    }

    const cleanHandleValue = cleanHandle(handle);
    const config = getTikTokConfig();
    const endpoint = TIKTOK_ENDPOINTS.getUserAudience;

    console.log('🔍 Llamada directa a TikTok API');
    const directCall = await callTikTokApiDirectly(
      config,
      endpoint,
      { handle: cleanHandleValue }
    );

    if (directCall.status !== 200) {
      return NextResponse.json(
        {
          error: `TikTok API returned status ${directCall.status}`,
          tiktokResponse: directCall.response,
        },
        { status: directCall.status }
      );
    }

    if (!generateProof) {
      return NextResponse.json({
        success: true,
        data: directCall.response,
        url: directCall.url,
      });
    }

    console.log('🔍 Generando proof con vlayer');
    const client = createTikTokClient();

    const result = await client.proveEndpoint(
      'getUserAudience',
      { handle: cleanHandleValue },
      {
        verify: true,
        extractData: true,
      }
    );

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      endpoint: result.endpoint,
      data: result.data,
      proof: result.proof,
      verification: result.verification,
    });
  } catch (error) {
    console.error('Error fetching demographics:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch demographics',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { handle, generateProof = true } = body;

    const validationError = validateHandle(handle);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!handle) {
      return NextResponse.json({ error: 'handle is required' }, { status: 400 });
    }

    const cleanHandleValue = cleanHandle(handle);
    const config = getTikTokConfig();
    const endpoint = TIKTOK_ENDPOINTS.getUserAudience;

    console.log('🔍 Llamada directa a TikTok API');
    const directCall = await callTikTokApiDirectly(
      config,
      endpoint,
      { handle: cleanHandleValue }
    );

    if (directCall.status !== 200) {
      return NextResponse.json(
        {
          error: `TikTok API returned status ${directCall.status}`,
          tiktokResponse: directCall.response,
        },
        { status: directCall.status }
      );
    }

    if (!generateProof) {
      return NextResponse.json({
        success: true,
        data: directCall.response,
        url: directCall.url,
      });
    }

    console.log('🔍 Generando proof con vlayer');
    const client = createTikTokClient();

    const result = await client.proveEndpoint(
      'getUserAudience',
      { handle: cleanHandleValue },
      {
        verify: true,
        extractData: true,
      }
    );

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      endpoint: result.endpoint,
      data: result.data,
      proof: result.proof,
      verification: result.verification,
    });
  } catch (error) {
    console.error('Error fetching demographics:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch demographics',
      },
      { status: 500 }
    );
  }
}

