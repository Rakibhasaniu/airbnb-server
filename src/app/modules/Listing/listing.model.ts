import { Schema, model } from 'mongoose';
import {
  IAmenities,
  IImage,
  ListingModel,
  TListing,
  
} from './listing.interface';

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
    amenities:{type:[AmenitiesSchema],required:true}, 
    name: { type: String, required: true },
    summary: { type: String },
    type: { type: String, required: true },
    location:{type:String,required:true},
    bedRoom:{type:String,required:true},
    price: { type: Number, required: true },
    taxPrice:{ type: Number, required: true },
    afterTaxPrice:{ type: Number, required: true },
    availableStart: { type: Date, required: true },
    availableEnd: { type: Date, required: true },
  },
  { timestamps: true } 
);

listingSchema.virtual('totalPrice').get(function () {
  return this?.price + this?.taxPrice ;
});



//creating a custom static method
listingSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Listing.findOne({ id });
  return existingUser;
};

export const Listing = model<TListing, ListingModel>('Listing', listingSchema);
