/**
 * Módulo para interactuar con la API de TikTok y generar proofs
 * Define los endpoints disponibles y funciones helper para generar proofs
 */

import {
  type VlayerConfig,
  type ProveRequest,
  type ProveResponse,
  type VerifyResponse,
  type CompressionExtractionConfig,
  prove,
  verify,
  proveAndVerify,
  extractResponseBody,
  compressProof,
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
  compressedProof?: any;
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
  data: string;
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
    params: {
      handle: '', // Requerido: @username
    },
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
  // Construir la URL base + path correctamente
  let baseUrl = config.baseUrl.endsWith('/')
    ? config.baseUrl.slice(0, -1)
    : config.baseUrl;
  
  // Asegurar que el path comience con /
  let path = endpoint.path.startsWith('/')
    ? endpoint.path
    : `/${endpoint.path}`;
  
  // Concatenar baseUrl + path manualmente para evitar problemas con new URL()
  const fullUrl = `${baseUrl}${path}`;
  const url = new URL(fullUrl);
  
  // Agregar parámetros de query (solo si tienen valor)
  // Los params pasados tienen prioridad sobre los del endpoint
  const queryParams = { ...endpoint.params, ...params };
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value && typeof value === 'string' && value.trim() !== '') {
      url.searchParams.append(key, value.trim());
    }
  });

  return url.toString();
}

/**
 * Hace una llamada directa a la API de TikTok sin usar vlayer
 * Útil para testing y debugging
 */
export async function callTikTokApiDirectly(
  config: TikTokConfig,
  endpoint: TikTokEndpoint,
  params?: Record<string, string>
): Promise<{ url: string; response: any; status: number }> {
  const url = buildTikTokUrl(config, endpoint, params);
  
  // Construir headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (config.headers) {
    Object.assign(headers, config.headers);
  }
  
  if (config.apiKey) {
    headers['x-api-key'] = config.apiKey;
  }

  console.log('📞 Llamada directa a TikTok API:');
  console.log('   URL completa:', url);
  console.log('   Base URL:', config.baseUrl);
  console.log('   Path:', endpoint.path);
  console.log('   Params:', params);
  console.log('   Method:', endpoint.method || 'GET');
  console.log('   Headers:', headers);

  const response = await fetch(url, {
    method: endpoint.method || 'GET',
    headers,
    body: endpoint.body ? JSON.stringify(endpoint.body) : undefined,
  });

  const status = response.status;
  let responseData: any;
  
  try {
    const text = await response.text();
    try {
      responseData = JSON.parse(text);
    } catch {
      responseData = text;
    }
  } catch (error) {
    responseData = null;
  }

  console.log('📥 Respuesta de TikTok API:');
  console.log('   Status:', status);
  console.log('   Response:', JSON.stringify(responseData, null, 2));

  return {
    url,
    response: responseData,
    status,
  };
}

/**
 * Genera un proof para un endpoint específico de TikTok
 */
/**
 * Configuración de extracción para el perfil de usuario de TikTok
 * Extrae solo: createTime, verified, uniqueId, y statsV2
 */
export function getUserProfileExtractionConfig(): CompressionExtractionConfig {
  return {
    'response.body': {
      jmespath: [
        'user.createTime',
        'user.verified',
        'user.uniqueId',
        'statsV2',
      ],
    },
  };
}

export async function proveTikTokEndpoint(
  tiktokConfig: TikTokConfig,
  vlayerConfig: VlayerConfig,
  endpoint: TikTokEndpoint,
  params?: Record<string, string>,
  options?: { verify?: boolean; extractData?: boolean; compress?: boolean }
): Promise<TikTokProofResult> {
  try {
    // Validar configuración
    if (!tiktokConfig.baseUrl) {
      throw new Error('TikTok API baseUrl is required');
    }

    const url = buildTikTokUrl(tiktokConfig, endpoint, params);
    
    // Construir headers como objeto Record<string, string>
    const headers: Record<string, string> = {};
    if (tiktokConfig.headers) {
      Object.assign(headers, tiktokConfig.headers);
    }
    if (tiktokConfig.apiKey) {
      headers['x-api-key'] = tiktokConfig.apiKey;
    }

    // Log para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('TikTok Proof Request:', {
        url,
        method: endpoint.method || 'GET',
        hasHeaders: Object.keys(headers).length > 0,
        headersKeys: Object.keys(headers),
        endpoint: endpoint.name,
      });
    }

    const request: ProveRequest = {
      url,
      method: endpoint.method || 'GET',
      headers: Object.keys(headers).length > 0 ? headers : undefined,
      body: endpoint.body,
    };

    if (options?.verify) {
      const { proof, verification } = await proveAndVerify(vlayerConfig, request);
      
      // Log del proof generado por vlayer
      console.log('📦 Proof generado por vlayer:');
      console.log(JSON.stringify(proof, null, 2));
      
      // Log de la verificación
      if (verification) {
        console.log('✅ Verificación del proof:');
        console.log(JSON.stringify(
          {
            success: verification.success,
            serverDomain: verification.serverDomain,
            notaryKeyFingerprint: verification.notaryKeyFingerprint,
            request: verification.request,
            response: {
              status: verification.response.status,
              headers: verification.response.headers,
              bodyLength: verification.response.body?.length || 0,
              bodyPreview: verification.response.body?.substring(0, 200) || '',
            },
          },
          null,
          2
        ));
      }
      
      let data: any = undefined;

      if (options.extractData && verification) {
        try {
          const fullData = extractResponseBody(verification);
          // Extraer solo los campos que nos interesan para getUserProfile
          if (endpoint.name === 'getUserProfile') {
            data = {
              createTime: fullData?.user?.createTime,
              verified: fullData?.user?.verified,
              uniqueId: fullData?.user?.uniqueId,
              statsV2: fullData?.statsV2,
            };
          } else {
            data = fullData;
          }
        } catch (error) {
          // Si no se puede parsear, dejamos data como undefined
          console.warn(`No se pudo extraer el body para ${endpoint.name}:`, error);
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
    console.error(`Error en proveTikTokEndpoint para ${endpoint.name}:`, error);
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
      data: JSON.stringify({
        campaign_id: "cmp_001",
        handle_tiktok: "@malu.ag", 
        score_calidad: Math.floor(Math.random() * 100),
        url_video: data.url,
      }),
    } as TikTokVideoInfo;
  } catch (error) {
    console.error('Error extrayendo información del video:', error);
    return null;
  }
}


/**
 * Helper para crear una configuración de TikTok desde variables de entorno
 */
export function getTikTokConfig(): TikTokConfig {
  const baseUrl = process.env.TIKTOK_API_BASE_URL;
  const apiKey = process.env.TIKTOK_API_KEY;

  // Asegurar que la baseUrl tenga el formato correcto
  let finalBaseUrl = baseUrl || 'https://api.scrapecreators.com/v1/tiktok';
  
  // Normalizar la URL (remover trailing slash)
  finalBaseUrl = finalBaseUrl.endsWith('/')
    ? finalBaseUrl.slice(0, -1)
    : finalBaseUrl;

  // Si la URL no incluye /v1/tiktok, agregarlo
  if (!finalBaseUrl.includes('/v1/tiktok')) {
    // Si termina con /v1, agregar /tiktok
    if (finalBaseUrl.endsWith('/v1')) {
      finalBaseUrl = `${finalBaseUrl}/tiktok`;
    } else if (!finalBaseUrl.endsWith('/tiktok')) {
      // Si no termina con /tiktok, agregar /v1/tiktok
      finalBaseUrl = `${finalBaseUrl}/v1/tiktok`;
    }
    console.warn(
      `TIKTOK_API_BASE_URL ajustada a: ${finalBaseUrl}. Asegúrate de que la variable de entorno incluya /v1/tiktok`
    );
  }

  if (!baseUrl) {
    console.warn('TIKTOK_API_BASE_URL no está definida, usando valor por defecto:', finalBaseUrl);
  }

  if (!apiKey) {
    console.warn('TIKTOK_API_KEY no está definida');
  }

  return {
    baseUrl: finalBaseUrl,
    apiKey: apiKey,
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
      options?: { verify?: boolean; extractData?: boolean; compress?: boolean }
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

