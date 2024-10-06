import express from 'express';
import { ListigitngControllers } from './listing.controller';

const router = express.Router();

router.post('/create',ListigitngControllers.createListing)

router.get(
  '/',
  ListigitngControllers.getAllListing,
);

router.get(
  '/:id',
  
  ListigitngControllers.getSingleListing,
);


export const ListingRoutes = router;
