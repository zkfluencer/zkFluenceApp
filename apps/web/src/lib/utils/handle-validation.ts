/**
 * Valida el formato del handle de TikTok
 * @param handle - Handle de TikTok (con o sin @)
 * @returns null si es válido, mensaje de error si no lo es
 */
export function validateHandle(handle: string | null): string | null {
  if (!handle) {
    return 'handle parameter is required';
  }

  const trimmedHandle = handle.trim();

  if (trimmedHandle.length === 0) {
    return 'handle cannot be empty';
  }

  // Remover @ si está presente
  const cleanHandle = trimmedHandle.startsWith('@')
    ? trimmedHandle.slice(1)
    : trimmedHandle;

  // Validar formato básico (solo letras, números, guiones y guiones bajos)
  if (!/^[a-zA-Z0-9._-]+$/.test(cleanHandle)) {
    return 'handle contains invalid characters. Only letters, numbers, dots, underscores and hyphens are allowed';
  }

  if (cleanHandle.length < 1 || cleanHandle.length > 24) {
    return 'handle must be between 1 and 24 characters';
  }

  return null;
}

/**
 * Normaliza el handle de TikTok (asegura que tenga @ al inicio)
 * @param handle - Handle de TikTok (con o sin @)
 * @returns Handle normalizado con @ al inicio
 */
export function normalizeHandle(handle: string): string {
  const trimmedHandle = handle.trim();
  return trimmedHandle.startsWith('@') ? trimmedHandle : `@${trimmedHandle}`;
}

/**
 * Limpia el handle de TikTok (remueve @ si está presente)
 * @param handle - Handle de TikTok (con o sin @)
 * @returns Handle sin @
 */
export function cleanHandle(handle: string): string {
  const trimmedHandle = handle.trim();
  return trimmedHandle.startsWith('@') ? trimmedHandle.slice(1) : trimmedHandle;
}

