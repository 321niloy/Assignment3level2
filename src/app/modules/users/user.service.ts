import httpStatus from 'http-status';
import { Tuser } from './user.interface';
import { User } from './user.model';
import AppError from '../../Error/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './userConstant';

const signupIntoDb = async (data: Tuser) => {
  const result = await User.create(data);

  const userObj = result.toObject();
  delete (userObj as { password?: string }).password;
  delete (userObj as { createdAt?: string }).createdAt;
  delete (userObj as { updatedAt?: string }).updatedAt;
  return userObj;
};

const loginIntoDb = async (data: Partial<Tuser>) => {
  const user = await User.isUserExistsByEmail(data.email as string);
  console.log(user, 'exi');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (!(await User.isPasswordMatched(data?.password as string, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '5d',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '10d',
    },
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const getUserIntoDb = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await userQuery.Modelquery;
  return { result };
};

const updatedProfileIntoDb = async (
  userData: JwtPayload,
  payload: Partial<Tuser>,
) => {
  const user = await User.isUserExistsByEmail(userData.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findOneAndUpdate(
    {
      email: user.email,
      role: user.role,
    },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Result  is not found !');
  }

  const userObj = result.toObject();
  delete (userObj as { createdAt?: string }).createdAt;
  delete (userObj as { updatedAt?: string }).updatedAt;
  return userObj;
};

export const userService = {
  signupIntoDb,
  loginIntoDb,
  getUserIntoDb,
  updatedProfileIntoDb,
};
