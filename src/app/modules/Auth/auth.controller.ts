import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';


const registerUser = catchAsync(async(req,res) => {
  const result = await AuthServices.createUser(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created  successfully!',
    data: result
  });
})

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
  
    data: {
      accessToken,
    },
  });
});


export const AuthControllers = {
  registerUser,
  loginUser,
};
