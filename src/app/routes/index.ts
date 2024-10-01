import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';



import { ListingRoutes } from '../modules/Listing/listing.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/listing',
    route: ListingRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
