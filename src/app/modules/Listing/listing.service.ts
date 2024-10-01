/* eslint-disable @typescript-eslint/no-explicit-any */
// import httpStatus from 'http-status';
// import mongoose from 'mongoose';
// import QueryBuilder from '../../builder/QueryBuilder';
// import AppError from '../../errors/AppError';
// import { User } from '../User/user.model';
// import { studentSearchableFields } from './student.constant';
// import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { listingSearchableFields } from './listing.constant';
import { Listing } from './listing.model';

const createListing = async(payload:any) => {
  const result = await Listing.create(payload)
  return result;
}

const getAllListingFromDB = async (query:any) => {
  const data = new QueryBuilder(Listing.find(),query).search(listingSearchableFields).filter().fields();
  const meta= await data.countTotal()

  const result = await data.modelQuery;
  // console.log(data)
  return {result,meta};
};

const getSingleListingFromDB = async (id: string) => {
  const result = await Listing.findById(id)
  return result;
};

export const ListingServices = {
  getAllListingFromDB,
  getSingleListingFromDB,
  createListing
};
