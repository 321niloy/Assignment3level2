import { Schema, model } from 'mongoose';
import { Tuser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const TuserSchema = new Schema<Tuser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

TuserSchema.pre('save', async function (next) {
  // console.log(this, 'Khara agay');
  // hashing password and save into db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

TuserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
  // console.log(this, 'after the data');
});

TuserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

TuserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<Tuser, UserModel>('User', TuserSchema);
