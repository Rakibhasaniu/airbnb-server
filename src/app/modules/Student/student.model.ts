import { Schema, model } from 'mongoose';
import {
  IAmenities,
  IImage,
  ListingModel,
  TListing,
  
} from './student.interface';

const ImageSchema = new Schema<IImage>({
  url: { type: String, required: true },
});
const AmenitiesSchema = new Schema<IAmenities>({
  name: { type: String, required: true }
})

// Student schema
const listingSchema = new Schema<TListing>(
  {
    id: { type: String },
    images: { type: [ImageSchema], required: true },
    amenities:{type:[AmenitiesSchema],required:true}, // Array of image objects
    name: { type: String, required: true },
    summary: { type: String },
    type: { type: String, required: true },
    beforeTaxPrice: { type: String, required: true },
    taxPrice:{ type: String, required: true },
    afterTaxPrice:{ type: String, required: true },
    availableStart: { type: Date, required: true },
    availableEnd: { type: Date, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);
//virtual
// studentSchema.virtual('fullName').get(function () {
//   return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
// });

// Query Middleware
// studentSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// studentSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

//creating a custom static method
listingSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Listing.findOne({ id });
  return existingUser;
};

export const Listing = model<TListing, ListingModel>('Listing', listingSchema);
