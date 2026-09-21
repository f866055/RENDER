import { Router } from 'express';
import healthRoutes from './health.routes.js';
import productosRoutes from './productos.routes.js';

const router = Router();

router.use('/health', healthRoutes);
// Endpoint requerido por la especificación original
router.use('/productos', productosRoutes);
// Alias inmobiliario para mayor claridad semántica
router.use('/apartamentos', productosRoutes);

export default router;
