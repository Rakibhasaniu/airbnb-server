import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ListingServices } from './listing.service';

const createListing = catchAsync(async (req, res) => {
  const result = await ListingServices.createListing(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Listing is created successfully',
    data: result,
  });
});

const getSingleListing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ListingServices.getSingleListingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const getAllListing: RequestHandler = catchAsync(async (req, res) => {
  const result = await ListingServices.getAllListingFromDB(req.query);
  // console.log({ result });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    meta: result.meta,
    data: result.result,
    // data: result,
  });
});

export const ListigitngControllers = {
  getAllListing,
  getSingleListing,
  createListing,
};
