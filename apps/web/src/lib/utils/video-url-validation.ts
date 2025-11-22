/**
 * Valida el formato de la URL de video de TikTok
 * @param videoURL - URL del video de TikTok
 * @returns null si es válido, mensaje de error si no lo es
 */
export function validateVideoURL(videoURL: string | null): string | null {
  if (!videoURL) {
    return 'videoURL parameter is required';
  }

  const trimmedURL = videoURL.trim();

  if (trimmedURL.length === 0) {
    return 'videoURL cannot be empty';
  }

  try {
    const url = new URL(trimmedURL);

    // Validar que sea una URL de TikTok
    if (!url.hostname.includes('tiktok.com')) {
      return 'videoURL must be a valid TikTok URL';
    }

    // Validar que tenga el formato correcto
    if (!url.pathname.includes('/video/')) {
      return 'videoURL must be a TikTok video URL (must contain /video/)';
    }

    return null;
  } catch (error) {
    return 'videoURL must be a valid URL';
  }
}

/**
 * Normaliza la URL del video (trim y validación básica)
 * @param videoURL - URL del video de TikTok
 * @returns URL normalizada
 */
export function normalizeVideoURL(videoURL: string): string {
  return videoURL.trim();
}

