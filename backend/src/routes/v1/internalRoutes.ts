import { Router } from 'express';

const router = Router();

// This is where you would add authenticated routes for your features.
// Example:
// import carRoutes from '@/api/v1/internal/cars/routes';
// router.use('/cars', carRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Internal API endpoint' });
});

export default router;
