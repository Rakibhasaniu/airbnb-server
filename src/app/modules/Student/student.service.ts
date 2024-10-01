/* eslint-disable @typescript-eslint/no-explicit-any */
// import httpStatus from 'http-status';
// import mongoose from 'mongoose';
// import QueryBuilder from '../../builder/QueryBuilder';
// import AppError from '../../errors/AppError';
// import { User } from '../User/user.model';
// import { studentSearchableFields } from './student.constant';
// import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { Listing } from './student.model';

const createListing = async(payload:any) => {
  const result = await Listing.create(payload)
  return result;
}

const getAllStudentsFromDB = async (query) => {
  // const studentQuery = new QueryBuilder(
  //   Listing.find(),
  //   query,
  // )
  //   .search(studentSearchableFields)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();

  // const meta = await studentQuery.countTotal();
  // const result = await studentQuery.modelQuery;

  // return {
  //   meta,
  //   result,
  // };
  const data = new QueryBuilder(Listing.find(),query).filter().fields();
  const meta= await data.countTotal()

  const result = await data.modelQuery;
  console.log(data)
  return {result,meta};
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Listing.findById(id)
    .populate('admissionSemester')
    .populate('academicDepartment academicFaculty');
  return result;
};

// const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
//   const { name, guardian, localGuardian, ...remainingStudentData } = payload;

//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingStudentData,
//   };

//   /*
//     guardain: {
//       fatherOccupation:"Teacher"
//     }

//     guardian.fatherOccupation = Teacher

//     name.firstName = 'Mezba'
//     name.lastName = 'Abedin'
//   */

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value;
//     }
//   }

//   if (guardian && Object.keys(guardian).length) {
//     for (const [key, value] of Object.entries(guardian)) {
//       modifiedUpdatedData[`guardian.${key}`] = value;
//     }
//   }

//   if (localGuardian && Object.keys(localGuardian).length) {
//     for (const [key, value] of Object.entries(localGuardian)) {
//       modifiedUpdatedData[`localGuardian.${key}`] = value;
//     }
//   }

//   const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

// const deleteStudentFromDB = async (id: string) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const deletedStudent = await Student.findByIdAndUpdate(
//       id,
//       { isDeleted: true },
//       { new: true, session },
//     );

//     if (!deletedStudent) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
//     }

//     // get user _id from deletedStudent
//     const userId = deletedStudent.user;

//     const deletedUser = await User.findByIdAndUpdate(
//       userId,
//       { isDeleted: true },
//       { new: true, session },
//     );

//     if (!deletedUser) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return deletedStudent;
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error('Failed to delete student');
//   }
// };

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  // updateStudentIntoDB,
  // deleteStudentFromDB,
  createListing
};
