// API Route: /api/tiktok/get-video-info
// Obtiene información de video y comentarios de TikTok con proofs

import { NextRequest, NextResponse } from 'next/server';
import { createTikTokClient } from '@/lib/api/tiktok';
import { validateVideoURL, normalizeVideoURL } from '@/lib/utils/video-url-validation';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const videoURL = searchParams.get('videoURL');

    const validationError = validateVideoURL(videoURL);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!videoURL) {
      return NextResponse.json({ error: 'videoURL is required' }, { status: 400 });
    }

    const client = createTikTokClient();

    const normalizedURL = normalizeVideoURL(videoURL);

    // Ejecutar ambas llamadas en paralelo
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

    const errors: string[] = [];
    if (videoInfoResult.error) {
      errors.push(`Video info error: ${videoInfoResult.error.message}`);
    }
    if (commentsResult.error) {
      errors.push(`Comments error: ${commentsResult.error.message}`);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join('; ') },
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

    const { videoURL } = body;

    const validationError = validateVideoURL(videoURL);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!videoURL) {
      return NextResponse.json({ error: 'videoURL is required' }, { status: 400 });
    }

    const client = createTikTokClient();

    const normalizedURL = normalizeVideoURL(videoURL);

    // Ejecutar ambas llamadas en paralelo
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

    const errors: string[] = [];
    if (videoInfoResult.error) {
      errors.push(`Video info error: ${videoInfoResult.error.message}`);
    }
    if (commentsResult.error) {
      errors.push(`Comments error: ${commentsResult.error.message}`);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join('; ') },
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

