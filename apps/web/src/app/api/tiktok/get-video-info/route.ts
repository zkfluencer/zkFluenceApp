// API Route: /api/tiktok/get-video-info
// Obtiene información de video y comentarios de TikTok con proofs

import { NextRequest, NextResponse } from 'next/server';
import { createTikTokClient, getTikTokConfig, TIKTOK_ENDPOINTS, callTikTokApiDirectly } from '@/lib/api/tiktok';
import { validateVideoURL, normalizeVideoURL } from '@/lib/utils/video-url-validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const videoURL = searchParams.get('videoURL');
    const generateProof = searchParams.get('generateProof') !== 'false';

    const validationError = validateVideoURL(videoURL);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!videoURL) {
      return NextResponse.json({ error: 'videoURL is required' }, { status: 400 });
    }

    const normalizedURL = normalizeVideoURL(videoURL);
    const config = getTikTokConfig();

    // Hacer llamadas directas primero
    console.log('🔍 Llamadas directas a TikTok API');
    const [videoInfoDirect, commentsDirect] = await Promise.all([
      callTikTokApiDirectly(config, TIKTOK_ENDPOINTS.getVideoInfo, { videoURL: normalizedURL }),
      callTikTokApiDirectly(config, TIKTOK_ENDPOINTS.getVideoComments, { videoURL: normalizedURL }),
    ]);

    const errors: string[] = [];
    if (videoInfoDirect.status !== 200) {
      errors.push(`Video info error: status ${videoInfoDirect.status}`);
    }
    if (commentsDirect.status !== 200) {
      errors.push(`Comments error: status ${commentsDirect.status}`);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join('; ') },
        { status: 500 }
      );
    }

    // Si no se requiere proof, retornar solo las respuestas directas
    if (!generateProof) {
      return NextResponse.json({
        success: true,
        videoInfo: {
          data: videoInfoDirect.response,
          url: videoInfoDirect.url,
        },
        comments: {
          data: commentsDirect.response,
          url: commentsDirect.url,
        },
      });
    }

    // Generar proofs con vlayer
    console.log('🔍 Generando proofs con vlayer');
    const client = createTikTokClient();

    const [videoInfoResult, commentsResult] = await Promise.all([
      client.proveEndpoint(
        'getVideoInfo',
        { videoURL: normalizedURL },
        {
          verify: true,
          extractData: true,
        }
      ),
      client.proveEndpoint(
        'getVideoComments',
        { videoURL: normalizedURL },
        {
          verify: true,
          extractData: true,
        }
      ),
    ]);

    const proofErrors: string[] = [];
    if (videoInfoResult.error) {
      proofErrors.push(`Video info error: ${videoInfoResult.error.message}`);
    }
    if (commentsResult.error) {
      proofErrors.push(`Comments error: ${commentsResult.error.message}`);
    }

    if (proofErrors.length > 0) {
      return NextResponse.json(
        { error: proofErrors.join('; ') },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      videoInfo: {
        endpoint: videoInfoResult.endpoint,
        data: videoInfoResult.data,
        proof: videoInfoResult.proof,
        verification: videoInfoResult.verification,
      },
      comments: {
        endpoint: commentsResult.endpoint,
        data: commentsResult.data,
        proof: commentsResult.proof,
        verification: commentsResult.verification,
      },
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch video info',
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

    const { videoURL, generateProof = true } = body;

    const validationError = validateVideoURL(videoURL);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!videoURL) {
      return NextResponse.json({ error: 'videoURL is required' }, { status: 400 });
    }

    const normalizedURL = normalizeVideoURL(videoURL);
    const config = getTikTokConfig();

    // Hacer llamadas directas primero
    console.log('🔍 Llamadas directas a TikTok API');
    const [videoInfoDirect, commentsDirect] = await Promise.all([
      callTikTokApiDirectly(config, TIKTOK_ENDPOINTS.getVideoInfo, { videoURL: normalizedURL }),
      callTikTokApiDirectly(config, TIKTOK_ENDPOINTS.getVideoComments, { videoURL: normalizedURL }),
    ]);

    const errors: string[] = [];
    if (videoInfoDirect.status !== 200) {
      errors.push(`Video info error: status ${videoInfoDirect.status}`);
    }
    if (commentsDirect.status !== 200) {
      errors.push(`Comments error: status ${commentsDirect.status}`);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join('; ') },
        { status: 500 }
      );
    }

    // Si no se requiere proof, retornar solo las respuestas directas
    if (!generateProof) {
      return NextResponse.json({
        success: true,
        videoInfo: {
          data: videoInfoDirect.response,
          url: videoInfoDirect.url,
        },
        comments: {
          data: commentsDirect.response,
          url: commentsDirect.url,
        },
      });
    }

    // Generar proofs con vlayer
    console.log('🔍 Generando proofs con vlayer');
    const client = createTikTokClient();

    const [videoInfoResult, commentsResult] = await Promise.all([
      client.proveEndpoint(
        'getVideoInfo',
        { videoURL: normalizedURL },
        {
          verify: true,
          extractData: true,
        }
      ),
      client.proveEndpoint(
        'getVideoComments',
        { videoURL: normalizedURL },
        {
          verify: true,
          extractData: true,
        }
      ),
    ]);

    const proofErrors: string[] = [];
    if (videoInfoResult.error) {
      proofErrors.push(`Video info error: ${videoInfoResult.error.message}`);
    }
    if (commentsResult.error) {
      proofErrors.push(`Comments error: ${commentsResult.error.message}`);
    }

    if (proofErrors.length > 0) {
      return NextResponse.json(
        { error: proofErrors.join('; ') },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      videoInfo: {
        endpoint: videoInfoResult.endpoint,
        data: videoInfoResult.data,
        proof: videoInfoResult.proof,
        verification: videoInfoResult.verification,
      },
      comments: {
        endpoint: commentsResult.endpoint,
        data: commentsResult.data,
        proof: commentsResult.proof,
        verification: commentsResult.verification,
      },
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch video info',
      },
      { status: 500 }
    );
  }
}

