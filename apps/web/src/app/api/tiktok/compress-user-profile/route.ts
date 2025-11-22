// API Route: /api/tiktok/compress-user-profile
// Comprime un Web Proof de perfil de usuario con la configuración de extracción predefinida

import { NextRequest, NextResponse } from 'next/server';
import { compressProof, getDefaultConfig } from '@/lib/api/vlayer';
import { getUserProfileExtractionConfig } from '@/lib/api/tiktok';
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
    const extractionConfig = getUserProfileExtractionConfig();

    console.log('🔍 Comprimiendo proof de perfil de usuario con extracción:');
    console.log('   Extraction config:', JSON.stringify(extractionConfig, null, 2));

    const compressionResult = await compressProof(
      presentation as ProveResponse,
      extractionConfig,
      {
        clientId: config.clientId,
        apiKey: config.apiKey,
      }
    );

    return NextResponse.json({
      success: true,
      data: compressionResult,
      extractionConfig, // Incluir la configuración usada para referencia
    });
  } catch (error) {
    console.error('Error compressing user profile proof:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to compress proof',
      },
      { status: 500 }
    );
  }
}

