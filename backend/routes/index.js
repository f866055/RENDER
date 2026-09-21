import { Router } from 'express';
import healthRoutes from './health.routes.js';
import productosRoutes from './productos.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/productos', productosRoutes);

export default router;
