/**
 * Servicio Centralizado de API
 * 
 * Consume la URL del Backend a través de:
 * 1. import.meta.env.VITE_API_URL (por defecto en local y en producción de Render)
 * 2. Soporte dinámico para probar URLs de Render directamente desde la interfaz
 */

const RAW_API_URL = import.meta.env.VITE_API_URL;

// URL base predeterminada por variable de entorno
export const DEFAULT_API_URL = RAW_API_URL ? RAW_API_URL.replace(/\/+$/, '') : 'http://localhost:3000';

/**
 * Consulta el estado de salud del backend (GET /api/health)
 * @param {string} [baseUrl] - URL opcional para probar endpoints (ej. Render)
 * @returns {Promise<{ ok: boolean, message: string, timestamp?: string, latency?: number, environment?: string }>}
 */
export const checkHealth = async (baseUrl = DEFAULT_API_URL) => {
  const startTime = performance.now();
  const cleanUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : '';

  if (!cleanUrl) {
    return {
      ok: false,
      message: "Variable VITE_API_URL no configurada en las variables de entorno",
      latency: 0
    };
  }

  try {
    const response = await fetch(`${cleanUrl}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const latency = Math.round(performance.now() - startTime);

    if (!response.ok) {
      throw new Error(`Respuesta no exitosa del servidor: HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      ...data,
      latency
    };
  } catch (error) {
    const latency = Math.round(performance.now() - startTime);
    return {
      ok: false,
      message: error.message || "No fue posible conectar con el backend",
      latency
    };
  }
};

/**
 * Consulta la lista de apartamentos / productos (GET /api/productos)
 * @param {string} [categoria] - Categoría opcional para filtrar
 * @param {string} [baseUrl] - URL base opcional
 * @returns {Promise<{ ok: boolean, productos: Array, total: number, message?: string }>}
 */
export const fetchProductos = async (categoria = 'todos', baseUrl = DEFAULT_API_URL) => {
  const cleanUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : '';

  if (!cleanUrl) {
    throw new Error("Variable VITE_API_URL no definida en el archivo .env o configuración de Render.");
  }

  const queryParam = categoria && categoria !== 'todos' ? `?categoria=${encodeURIComponent(categoria)}` : '';
  const url = `${cleanUrl}/api/productos${queryParam}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo cargar los apartamentos desde ${url}`);
  }

  const data = await response.json();
  return data;
};
