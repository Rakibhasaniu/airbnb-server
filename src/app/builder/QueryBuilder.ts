import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // filter() {
  //   const queryObj = { ...this.query }; // copy

  //   // Filtering
  //   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  //   excludeFields.forEach((el) => delete queryObj[el]);

  //   this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

  //   return this;
  // }
  filter() {
    const queryObj = { ...this.query }; // copy

    // Exclude fields not needed for filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Handle date range filtering
    if (queryObj.availableStart && queryObj.availableEnd) {
        const startDate = new Date(queryObj.availableStart as string);
        const endDate = new Date(queryObj.availableEnd as string);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            queryObj.availableStart = { $lte: startDate }; // Available on or before this start date
            queryObj.availableEnd = { $gte: endDate }; // Available on or after this end date
        }
    }

    if (queryObj.price) {
      const priceRange = queryObj.price as string;
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      console.log(minPrice,maxPrice)
    
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        queryObj.price = { $gte: minPrice, $lte: maxPrice }
        
      }
      console.log(queryObj)
    }
    // Clean up potential conflicting filters for the same fields
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
}


  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
