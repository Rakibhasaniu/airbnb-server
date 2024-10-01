import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';



import { StudentRoutes } from '../modules/Listing/listing.route';
// import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/listing',
    route: StudentRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
