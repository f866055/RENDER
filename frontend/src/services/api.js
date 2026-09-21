/**
 * Servicio Centralizado de API
 * 
 * Consume la URL del Backend a través de la variable de entorno de Vite:
 * import.meta.env.VITE_API_URL
 * 
 * En desarrollo: http://localhost:3000
 * En producción (Render): https://tu-backend.onrender.com
 */

// Obtener la variable de entorno configurada en Vite
const RAW_API_URL = import.meta.env.VITE_API_URL;

// Normalizar la URL eliminando barras diagonales al final si las tuviese
export const API_BASE_URL = RAW_API_URL ? RAW_API_URL.replace(/\/+$/, '') : '';

/**
 * Consulta el estado del backend (GET /api/health)
 * @returns {Promise<{ ok: boolean, message: string, timestamp?: string, error?: string, latency?: number }>}
 */
export const checkHealth = async () => {
  const startTime = performance.now();

  if (!API_BASE_URL) {
    return {
      ok: false,
      message: "Variable VITE_API_URL no configurada en las variables de entorno",
      latency: 0
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
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
 * Consulta la lista de productos del backend (GET /api/productos)
 * @param {string} [categoria] - Categoría opcional para filtrar
 * @returns {Promise<{ ok: boolean, productos: Array, total: number, message?: string }>}
 */
export const fetchProductos = async (categoria = 'todos') => {
  if (!API_BASE_URL) {
    throw new Error("Variable VITE_API_URL no definida en el archivo .env o configuración de Render.");
  }

  const queryParam = categoria && categoria !== 'todos' ? `?categoria=${encodeURIComponent(categoria)}` : '';
  const url = `${API_BASE_URL}/api/productos${queryParam}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo cargar los productos desde ${url}`);
  }

  const data = await response.json();
  return data;
};
