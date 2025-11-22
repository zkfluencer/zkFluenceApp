/**
 * Módulo para interactuar con la API de vlayer
 * Permite generar y verificar Web Proofs para diferentes fuentes de datos
 */

export interface VlayerConfig {
  clientId: string;
  apiKey: string;
  baseUrl?: string;
}

export interface ProveRequest {
  url: string;
  headers?: Record<string, string> | [string, string][];
  method?: string;
  body?: string;
}

export interface ProveResponse {
  data: string;
  version: string;
  meta: {
    notaryUrl: string;
  };
}

export interface VerifyResponse {
  success: boolean;
  serverDomain: string;
  notaryKeyFingerprint: string;
  request: {
    method: string;
    url: string;
    version: string;
    headers: [string, string][];
    body: string | null;
    raw: string;
  };
  response: {
    status: number;
    version: string;
    headers: [string, string][];
    body: string;
    raw: string;
  };
}

export interface CompressionExtractionConfig {
  'response.body'?: {
    jmespath: string[];
  };
  [key: string]: any; // Permite otras configuraciones de extracción
}

export interface CompressionConfig {
  zkProverUrl?: string;
  clientId?: string;
  apiKey?: string;
  timeout?: number; // En milisegundos, default 85000
}

export interface CompressedProofResponse {
  // La estructura exacta depende de la respuesta del ZK Prover
  [key: string]: any;
}

/**
 * Genera un Web Proof para una llamada API
 */
export async function prove(
  config: VlayerConfig,
  request: ProveRequest
): Promise<ProveResponse> {
  const baseUrl = config.baseUrl || 'https://web-prover.vlayer.xyz';
  const response = await fetch(`${baseUrl}/api/v1/prove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': config.clientId,
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      url: request.url,
      headers: Array.isArray(request.headers)
        ? request.headers
        : request.headers
        ? Object.entries(request.headers).map(([key, value]) => [key, value])
        : [],
      method: request.method || 'GET',
      body: request.body || null,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al generar proof: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return await response.json();
}

/**
 * Verifica un Web Proof generado previamente
 */
export async function verify(
  config: VlayerConfig,
  presentation: ProveResponse
): Promise<VerifyResponse> {
  const baseUrl = config.baseUrl || 'https://web-prover.vlayer.xyz';
  const response = await fetch(`${baseUrl}/api/v1/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': config.clientId,
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(presentation),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error al verificar proof: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return await response.json();
}

/**
 * Genera y verifica un Web Proof en un solo paso
 */
export async function proveAndVerify(
  config: VlayerConfig,
  request: ProveRequest
): Promise<{
  proof: ProveResponse;
  verification: VerifyResponse;
}> {
  const proofResult = await prove(config, request);
  const verificationResult = await verify(config, proofResult);
  return { proof: proofResult, verification: verificationResult };
}

/**
 * Extrae el body de la respuesta verificada como JSON
 */
export function extractResponseBody(verification: VerifyResponse): any {
  try {
    return JSON.parse(verification.response.body);
  } catch (error) {
    throw new Error(
      `Error al parsear el body de la respuesta: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Comprime un Web Proof y extrae datos específicos usando JMESPath
 * Útil para generar pruebas ZK más pequeñas y eficientes
 */
export async function compressProof(
  presentation: ProveResponse,
  extraction: CompressionExtractionConfig,
  compressionConfig?: CompressionConfig
): Promise<CompressedProofResponse> {
  if (!presentation) {
    throw new Error('Presentation data is required');
  }

  if (!extraction || Object.keys(extraction).length === 0) {
    throw new Error('Extraction configuration is required');
  }

  const zkProverUrl =
    compressionConfig?.zkProverUrl ||
    process.env.ZK_PROVER_API_URL ||
    'https://zk-prover.vlayer.xyz/api/v0';

  const clientId =
    compressionConfig?.clientId ||
    process.env.VLAYER_CLIENT_ID ||
    '';

  const apiKey =
    compressionConfig?.apiKey ||
    process.env.VLAYER_API_KEY ||
    '';

  const timeout = compressionConfig?.timeout || 85000;

  const requestBody = {
    presentation,
    extraction,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${zkProverUrl}/compress-web-proof`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': clientId,
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error al comprimir proof: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      // Manejar errores de timeout
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        throw new Error(
          `Request timed out. ZK proof generation took too long to complete (${timeout}ms). Please try again.`
        );
      }
      throw error;
    }
    throw new Error('Failed to compress web proof');
  }
}

/**
 * Obtiene la configuración por defecto desde variables de entorno
 */
export function getDefaultConfig(): VlayerConfig {
  return {
    clientId: process.env.VLAYER_CLIENT_ID || 'get_your_client_id_from_vlayer',
    apiKey: process.env.VLAYER_API_KEY || 'get_your_api_key_from_vlayer',
  };
}

/**
 * Crea una función helper que pre-configura las credenciales
 * Útil cuando vas a hacer múltiples llamadas con la misma configuración
 */
export function createVlayerClient(config?: VlayerConfig) {
  const finalConfig = config || getDefaultConfig();

  return {
    prove: (request: ProveRequest) => prove(finalConfig, request),
    verify: (presentation: ProveResponse) => verify(finalConfig, presentation),
    proveAndVerify: (request: ProveRequest) => proveAndVerify(finalConfig, request),
    extractResponseBody,
    compressProof: (
      presentation: ProveResponse,
      extraction: CompressionExtractionConfig,
      compressionConfig?: CompressionConfig
    ) => compressProof(presentation, extraction, compressionConfig),
  };
}

