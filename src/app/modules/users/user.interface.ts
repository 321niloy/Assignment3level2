import { Model, Types } from 'mongoose';
import { USER_ROLE } from './userConstant';

export interface Tuser {
  _id?: Types.ObjectId;
  toObject: any;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'admin';
}

export interface UserModel extends Model<Tuser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<Tuser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TuserRole = keyof typeof USER_ROLE;
