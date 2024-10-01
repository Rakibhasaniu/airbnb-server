// /* eslint-disable @typescript-eslint/no-explicit-any */
// import express, { NextFunction, Request, Response } from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { upload } from '../../utils/sendImageToCloudinary';
// import { createStudentValidationSchema } from '../Student/student.validation';
// import { UserControllers } from './user.controller';

// const router = express.Router();

// router.post(
//   '/create-student',
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );





// router.get(
//   '/me',
//   UserControllers.getMe,
// );

// export const UserRoutes = router;
