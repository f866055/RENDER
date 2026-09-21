import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';

// Cargar variables de entorno desde .env si existe
dotenv.config();

const app = express();

// REQUISITO OBLIGATORIO: Puerto dinámico compatible con Render y entorno local
const PORT = process.env.PORT || 3000;

// Configuración de CORS
// Permite localhost en desarrollo, la variable CLIENT_URL en producción, y dominios de onrender.com
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://127.0.0.1:5173'
];

if (process.env.CLIENT_URL) {
  // Limpiar posibles barras diagonales al final para evitar discrepancias
  const formattedClientUrl = process.env.CLIENT_URL.replace(/\/+$/, '');
  allowedOrigins.push(formattedClientUrl);
}

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (como clientes REST, apps móviles, curl o health checks de Render)
    if (!origin) return callback(null, true);

    // Permitir si coincide con orígenes explícitos
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Permitir automáticamente cualquier subdominio de render (*.onrender.com)
    if (/\.onrender\.com$/.test(origin)) {
      return callback(null, true);
    }

    // En desarrollo, permitir cualquier origen para facilitar pruebas
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    // Si no coincide pero está en producción
    return callback(new Error(`Acceso bloqueado por política CORS para el origen: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz de bienvenida e información de la API
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    service: "Full-Stack API en Render",
    status: "online",
    documentation: {
      health: "/api/health",
      productos: "/api/productos"
    },
    clientConfigured: process.env.CLIENT_URL || "no definido (modo desarrollo/permisivo)"
  });
});

// Enrutar todas las rutas bajo /api
app.use('/api', apiRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
});

// Manejo global de errores (500)
app.use((err, req, res, next) => {
  console.error("Error no controlado en el servidor:", err.message);
  res.status(500).json({
    ok: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(` Servidor Backend iniciado con éxito`);
  console.log(` Puerto: ${PORT}`);
  console.log(` Modo: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Productos: http://localhost:${PORT}/api/productos`);
  console.log(`===========================================`);
});
