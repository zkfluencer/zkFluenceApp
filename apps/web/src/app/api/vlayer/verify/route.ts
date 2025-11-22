// API Route: /api/vlayer/verify
// Verifica un Web Proof generado previamente

import { NextRequest, NextResponse } from 'next/server';
import { verify, getDefaultConfig } from '@/lib/api/vlayer';
import type { ProveResponse } from '@/lib/api/vlayer';

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

    const { presentation } = body;

    if (!presentation) {
      return NextResponse.json(
        { error: 'presentation is required in request body' },
        { status: 400 }
      );
    }

    // Validar que presentation tenga la estructura correcta
    if (!presentation.data || !presentation.version || !presentation.meta) {
      return NextResponse.json(
        { error: 'Invalid presentation format. Must include data, version, and meta' },
        { status: 400 }
      );
    }

    const config = getDefaultConfig();
    const verificationResult = await verify(config, presentation as ProveResponse);

    return NextResponse.json({
      success: true,
      verification: verificationResult,
    });
  } catch (error) {
    console.error('Error verifying proof:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to verify proof',
      },
      { status: 500 }
    );
  }
}

