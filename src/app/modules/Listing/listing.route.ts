import express from 'express';
import { ListingControllers } from './listing.controller';

const router = express.Router();

router.post('/create',ListingControllers.createListing)

router.get(
  '/',
  ListingControllers.getAllListing,
);

router.get(
  '/:id',
  
  ListingControllers.getSingleListing,
);


export const ListingRoutes = router;
