import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../middleware/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { userService } from './user.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.signupIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginIntoDb(req.body);

  const { accessToken, refreshToken, user } = result;

  const userObj = user.toObject();
  delete (userObj as { password?: string }).password;
  delete (userObj as { createdAt?: string }).createdAt;
  delete (userObj as { updatedAt?: string }).updatedAt;

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: accessToken,
    data: userObj,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUserIntoDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updatedProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.updatedProfileIntoDb(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const user = {
  signUp,
  login,
  getUser,
  updatedProfile,
};
