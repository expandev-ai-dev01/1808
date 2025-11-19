import { Router } from 'express';
import internalRoutes from './internalRoutes';
import externalRoutes from './externalRoutes';

const router = Router();

// Internal routes (require authentication in a real app)
// Prefixed with /api/v1/internal
router.use('/internal', internalRoutes);

// External routes (publicly accessible)
// Prefixed with /api/v1/external
router.use('/external', externalRoutes);

export default router;
