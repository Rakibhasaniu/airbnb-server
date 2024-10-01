import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  // validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/create',
  AuthControllers.registerUser,
);


// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// );





export const AuthRoutes = router;
