import { Router } from 'express';
import { getProductos } from '../controllers/productos.controller.js';

const router = Router();

// GET /api/productos
router.get('/', getProductos);

export default router;
