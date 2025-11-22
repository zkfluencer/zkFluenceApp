/**
 * Módulo para interactuar con la API de TikTok y generar proofs
 * Define los endpoints disponibles y funciones helper para generar proofs
 */

import {
  type VlayerConfig,
  type ProveRequest,
  type ProveResponse,
  type VerifyResponse,
  prove,
  verify,
  proveAndVerify,
  extractResponseBody,
  getDefaultConfig,
  createVlayerClient,
} from './vlayer';

export interface TikTokConfig {
  baseUrl: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

export interface TikTokEndpoint {
  name: string;
  path: string;
  method?: 'GET' | 'POST';
  description: string;
  params?: Record<string, string>;
  body?: string;
}

export interface TikTokProofResult {
  endpoint: string;
  proof: ProveResponse;
  verification?: VerifyResponse;
  data?: any;
  error?: Error;
}

export interface BatchProofOptions {
  endpoints: TikTokEndpoint[];
  vlayerConfig?: VlayerConfig;
  verify?: boolean;
  extractData?: boolean;
  parallel?: boolean; // Si true, ejecuta en paralelo; si false, secuencial
}

/**
 * Tipos para la respuesta de información de video de TikTok
 */
export interface TikTokVideoStatistics {
  aweme_id: string;
  play_count: number;
  digg_count: number;
  comment_count: number;
  share_count: number;
  collect_count: number;
  forward_count: number;
  download_count: number;
  repost_count: number;
  lose_comment_count: number;
  lose_count: number;
  whatsapp_share_count: number;
}

export interface TikTokVideoInfo {
  statistics: TikTokVideoStatistics;
  create_time: number; // Timestamp Unix
  create_time_utc?: string; // Fecha ISO opcional
  aweme_id?: string;
  url?: string;
}

/**
 * Respuesta completa de la API de TikTok para video
 */
export interface TikTokVideoResponse {
  success: boolean;
  credits_remaining?: number;
  aweme_detail?: {
    statistics: TikTokVideoStatistics;
    create_time: number;
    create_time_utc?: string;
    aweme_id?: string;
    share_url?: string;
    [key: string]: any; // Para otros campos que no nos interesan
  };
  [key: string]: any;
}

/**
 * Endpoints de TikTok que vamos a usar
 * Agrega aquí los endpoints que necesites
 */
export const TIKTOK_ENDPOINTS: Record<string, TikTokEndpoint> = {
  // Perfil de usuario
  getUserProfile: {
    name: 'getUserProfile',
    path: '/profile',
    method: 'GET',
    description: 'Obtiene información del perfil de usuario',
  },

  // Demográficos de audiencia
  getUserAudience: {
    name: 'getUserAudience',
    path: '/user/audience',
    method: 'GET',
    description: 'Obtiene los demográficos de la audiencia del creador',
    params: {
      handle: '', // Requerido: @username
    },
  },

  // Siguiendo
  getFollowing: {
    name: 'getFollowing',
    path: '/user/following',
    method: 'GET',
    description: 'Obtiene la lista de usuarios que sigue',
    params: {
      handle: '', // Requerido: @username
    },
  },

  // Información de un video
  getVideoInfo: {
    name: 'getVideoInfo',
    path: '/video',
    method: 'GET',
    description: 'Obtiene información de un video',
    params: {
      videoURL: '', // Requerido: videoURL
    },
  },

  // Comentarios
  getVideoComments: {
    name: 'getVideoComments',
    path: '/video/comments',
    method: 'GET',
    description: 'Obtiene los comentarios de un video',
    params: {
      videoURL: '', // Requerido: videoURL
    },
  },

};

/**
 * Construye la URL completa para un endpoint de TikTok
 */
export function buildTikTokUrl(
  config: TikTokConfig,
  endpoint: TikTokEndpoint,
  params?: Record<string, string>
): string {
  const url = new URL(endpoint.path, config.baseUrl);
  
  // Agregar parámetros de query (solo si tienen valor)
  const queryParams = { ...endpoint.params, ...params };
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
}

/**
 * Genera un proof para un endpoint específico de TikTok
 */
export async function proveTikTokEndpoint(
  tiktokConfig: TikTokConfig,
  vlayerConfig: VlayerConfig,
  endpoint: TikTokEndpoint,
  params?: Record<string, string>,
  options?: { verify?: boolean; extractData?: boolean }
): Promise<TikTokProofResult> {
  try {
    const url = buildTikTokUrl(tiktokConfig, endpoint, params);
    
    // Construir headers como array de tuplas [string, string][]
    const headers: [string, string][] = [];
    if (tiktokConfig.headers) {
      Object.entries(tiktokConfig.headers).forEach(([key, value]) => {
        headers.push([key, value]);
      });
    }
    if (tiktokConfig.apiKey) {
      headers.push(['x-api-key', tiktokConfig.apiKey]);
    }

    const request: ProveRequest = {
      url,
      method: endpoint.method || 'GET',
      headers: headers.length > 0 ? headers : undefined,
      body: endpoint.body,
    };

    if (options?.verify) {
      const { proof, verification } = await proveAndVerify(vlayerConfig, request);
      
      let data: any = undefined;
      if (options.extractData && verification) {
        try {
          data = extractResponseBody(verification);
        } catch (error) {
          // Si no se puede parsear, dejamos data como undefined
        }
      }

      return {
        endpoint: endpoint.name,
        proof,
        verification,
        data,
      };
    } else {
      const proofResult = await prove(vlayerConfig, request);
      return {
        endpoint: endpoint.name,
        proof: proofResult,
      };
    }
  } catch (error) {
    return {
      endpoint: endpoint.name,
      proof: {} as ProveResponse, // Placeholder
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

/**
 * Genera proofs para múltiples endpoints de TikTok
 * Puede ejecutarse en paralelo o secuencialmente
 */
export async function proveTikTokEndpoints(
  tiktokConfig: TikTokConfig,
  vlayerConfig: VlayerConfig,
  options: BatchProofOptions
): Promise<TikTokProofResult[]> {
  const { endpoints, verify: shouldVerify = false, extractData = false, parallel = true } = options;

  if (parallel) {
    // Ejecutar todos los endpoints en paralelo
    const promises = endpoints.map((endpoint) =>
      proveTikTokEndpoint(tiktokConfig, vlayerConfig, endpoint, endpoint.params, {
        verify: shouldVerify,
        extractData,
      })
    );

    return Promise.all(promises);
  } else {
    // Ejecutar secuencialmente
    const results: TikTokProofResult[] = [];
    for (const endpoint of endpoints) {
      const result = await proveTikTokEndpoint(
        tiktokConfig,
        vlayerConfig,
        endpoint,
        endpoint.params,
        {
          verify: shouldVerify,
          extractData,
        }
      );
      results.push(result);
      // Pequeña pausa entre requests para no saturar
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return results;
  }
}
/**
 * Extrae la información relevante de un video (statistics y create_time)
 * de la respuesta completa de la API de TikTok
 */
export function extractVideoInfo(data: any): TikTokVideoInfo | null {
  try {
    if (!data || !data.aweme_detail) {
      return null;
    }

    const awemeDetail = data.aweme_detail;

    if (!awemeDetail.statistics || awemeDetail.create_time === undefined) {
      return null;
    }

    return {
      statistics: {
        aweme_id: awemeDetail.statistics.aweme_id || awemeDetail.aweme_id || '',
        play_count: awemeDetail.statistics.play_count || 0,
        digg_count: awemeDetail.statistics.digg_count || 0,
        comment_count: awemeDetail.statistics.comment_count || 0,
        share_count: awemeDetail.statistics.share_count || 0,
        collect_count: awemeDetail.statistics.collect_count || 0,
        forward_count: awemeDetail.statistics.forward_count || 0,
        download_count: awemeDetail.statistics.download_count || 0,
        repost_count: awemeDetail.statistics.repost_count || 0,
        lose_comment_count: awemeDetail.statistics.lose_comment_count || 0,
        lose_count: awemeDetail.statistics.lose_count || 0,
        whatsapp_share_count: awemeDetail.statistics.whatsapp_share_count || 0,
      },
      create_time: awemeDetail.create_time,
      create_time_utc: awemeDetail.create_time_utc || data.create_time_utc,
      aweme_id: awemeDetail.aweme_id,
      url: awemeDetail.share_url || data.url,
    };
  } catch (error) {
    console.error('Error extrayendo información del video:', error);
    return null;
  }
}


/**
 * Helper para crear una configuración de TikTok desde variables de entorno
 */
export function getTikTokConfig(): TikTokConfig {
  return {
    baseUrl: process.env.TIKTOK_API_BASE_URL as string,
    apiKey: process.env.TIKTOK_API_KEY as string,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

/**
 * Factory function para crear un cliente de TikTok con proofs
 */
export function createTikTokClient(
  tiktokConfig?: TikTokConfig,
  vlayerConfig?: VlayerConfig
) {
  const finalTikTokConfig = tiktokConfig || getTikTokConfig();
  const finalVlayerConfig = vlayerConfig || getDefaultConfig();
  const vlayerClient = createVlayerClient(finalVlayerConfig);

  return {
    /**
     * Genera proof para un endpoint específico
     */
    proveEndpoint: (
      endpointName: string,
      params?: Record<string, string>,
      options?: { verify?: boolean; extractData?: boolean }
    ) => {
      const endpoint = TIKTOK_ENDPOINTS[endpointName];
      if (!endpoint) {
        throw new Error(`Endpoint "${endpointName}" no encontrado`);
      }
      return proveTikTokEndpoint(finalTikTokConfig, finalVlayerConfig, endpoint, params, options);
    },

    /**
     * Genera proofs para múltiples endpoints
     */
    proveEndpoints: (options: BatchProofOptions) =>
      proveTikTokEndpoints(finalTikTokConfig, finalVlayerConfig, {
        ...options,
        vlayerConfig: finalVlayerConfig,
      }),

    /**
     * Acceso directo a los endpoints definidos
     */
    endpoints: TIKTOK_ENDPOINTS,

    /**
     * Helpers para extraer información específica
     */
    extractVideoInfo
};
}

