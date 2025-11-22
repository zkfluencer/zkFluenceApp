// API Route: /api/tiktok/get-user-profile
// Obtiene el perfil de usuario de TikTok con proof

import { NextRequest, NextResponse } from 'next/server';
import { createTikTokClient, getTikTokConfig, TIKTOK_ENDPOINTS, callTikTokApiDirectly } from '@/lib/api/tiktok';
import { validateHandle, cleanHandle } from '@/lib/utils/handle-validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const handle = searchParams.get('handle');
    // Parámetro opcional para controlar si se genera proof (default: true)
    const generateProof = searchParams.get('generateProof') !== 'false';

    const validationError = validateHandle(handle);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!handle) {
      return NextResponse.json({ error: 'handle is required' }, { status: 400 });
    }

    // TikTok API requiere el handle SIN @
    const cleanHandleValue = cleanHandle(handle);
    const config = getTikTokConfig();
    const endpoint = TIKTOK_ENDPOINTS.getUserProfile;

    // Hacer llamada directa a la API de TikTok
    console.log('🔍 Llamada directa a TikTok API');
    const directCall = await callTikTokApiDirectly(
      config,
      endpoint,
      { handle: cleanHandleValue }
    );

    // Si la llamada directa falla, retornar el error
    if (directCall.status !== 200) {
      return NextResponse.json(
        {
          error: `TikTok API returned status ${directCall.status}`,
          tiktokResponse: directCall.response,
        },
        { status: directCall.status }
      );
    }

    // Si no se requiere proof, retornar solo la respuesta directa
    if (!generateProof) {
      return NextResponse.json({
        success: true,
        data: directCall.response,
        url: directCall.url,
      });
    }

    // Generar la proof con vlayer
    console.log('🔍 Generando proof con vlayer');
    const client = createTikTokClient();

    const result = await client.proveEndpoint(
      'getUserProfile',
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
      data: result.data, // Solo contiene: createTime, verified, uniqueId, statsV2
      proof: result.proof,
      verification: result.verification,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch user profile',
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

    // TikTok API requiere el handle SIN @
    const cleanHandleValue = cleanHandle(handle);
    const config = getTikTokConfig();
    const endpoint = TIKTOK_ENDPOINTS.getUserProfile;

    // Hacer llamada directa a la API de TikTok
    console.log('🔍 Llamada directa a TikTok API');
    const directCall = await callTikTokApiDirectly(
      config,
      endpoint,
      { handle: cleanHandleValue }
    );

    // Si la llamada directa falla, retornar el error
    if (directCall.status !== 200) {
      return NextResponse.json(
        {
          error: `TikTok API returned status ${directCall.status}`,
          tiktokResponse: directCall.response,
        },
        { status: directCall.status }
      );
    }

    // Si no se requiere proof, retornar solo la respuesta directa
    if (!generateProof) {
      return NextResponse.json({
        success: true,
        data: directCall.response,
        url: directCall.url,
      });
    }

    // Generar la proof con vlayer
    console.log('🔍 Generando proof con vlayer');
    const client = createTikTokClient();

    const result = await client.proveEndpoint(
      'getUserProfile',
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
      data: result.data, // Solo contiene: createTime, verified, uniqueId, statsV2
      proof: result.proof,
      verification: result.verification,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch user profile',
      },
      { status: 500 }
    );
  }
}

