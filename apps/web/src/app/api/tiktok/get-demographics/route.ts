// API Route: /api/tiktok/get-demographics
// Obtiene los demográficos de audiencia de TikTok con proof

import { NextRequest, NextResponse } from 'next/server';
import { createTikTokClient } from '@/lib/api/tiktok';
import { validateHandle, normalizeHandle } from '@/lib/utils/handle-validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const handle = searchParams.get('handle');

    const validationError = validateHandle(handle);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!handle) {
      return NextResponse.json({ error: 'handle is required' }, { status: 400 });
    }

    const client = createTikTokClient();

    const result = await client.proveEndpoint(
      'getUserAudience',
      { handle: normalizeHandle(handle) },
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

    const { handle } = body;

    const validationError = validateHandle(handle);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!handle) {
      return NextResponse.json({ error: 'handle is required' }, { status: 400 });
    }

    const client = createTikTokClient();

    const result = await client.proveEndpoint(
      'getUserAudience',
      { handle: normalizeHandle(handle) },
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

