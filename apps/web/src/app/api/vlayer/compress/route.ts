// API Route: /api/vlayer/compress
// Comprime un Web Proof y extrae datos específicos usando JMESPath para generar ZK proof

import { NextRequest, NextResponse } from 'next/server';
import { compressProof, getDefaultConfig } from '@/lib/api/vlayer';
import type { ProveResponse, CompressionExtractionConfig } from '@/lib/api/vlayer';

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

    const { presentation, extraction } = body;

    if (!presentation) {
      return NextResponse.json(
        { error: 'presentation is required in request body' },
        { status: 400 }
      );
    }

    if (!extraction) {
      return NextResponse.json(
        { error: 'extraction is required in request body' },
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

    // Validar que extraction tenga la estructura correcta
    if (!extraction['response.body'] || !extraction['response.body'].jmespath) {
      return NextResponse.json(
        { error: 'Invalid extraction format. Must include response.body.jmespath' },
        { status: 400 }
      );
    }

    const config = getDefaultConfig();
    const compressionResult = await compressProof(
      presentation as ProveResponse,
      extraction as CompressionExtractionConfig,
      {
        clientId: config.clientId,
        apiKey: config.apiKey,
      }
    );

    return NextResponse.json({
      success: true,
      data: compressionResult,
    });
  } catch (error) {
    console.error('Error compressing proof:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to compress proof',
      },
      { status: 500 }
    );
  }
}

