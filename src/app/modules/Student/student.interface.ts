import { Model } from 'mongoose';

export interface IAmenities{
  name: string;
}

export interface IImage {
  url: string; // Image URL

}
export type TListing = {
  id: string;
  images: IImage[];
  amenities: IAmenities[]
  name: string;
  summary: string;
  type: string;
  beforeTaxPrice: string;
  taxPrice:string;
  afterTaxPrice: string;
  availableStart: Date;
  availableEnd: Date; 
  
};

//for creating static
export interface ListingModel extends Model<TListing> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TListing | null>;
}
