import express from 'express';
import { StudentControllers } from './listing.controller';

const router = express.Router();

router.post('/create',StudentControllers.createListing)

router.get(
  '/',
  StudentControllers.getAllListing,
);

router.get(
  '/:id',
  
  StudentControllers.getSingleListing,
);


export const StudentRoutes = router;
