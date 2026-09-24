import { Router } from 'express';
import healthRoutes from './health.routes.js';
import productosRoutes from './productos.routes.js';

const router = Router();

router.use('/health', healthRoutes);
// Endpoint principal requerido por la especificación original
router.use('/productos', productosRoutes);
// Alias semánticos para mayor flexibilidad
router.use('/vehiculos', productosRoutes);
router.use('/apartamentos', productosRoutes);

export default router;
