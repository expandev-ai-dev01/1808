import { Router } from 'express';

const router = Router();

// This is where you would add public routes.
// Example:
// import publicCarRoutes from '@/api/v1/external/public/cars/routes';
// router.use('/public/cars', publicCarRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'External API endpoint' });
});

export default router;
