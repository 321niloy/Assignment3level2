import { Schema, model } from 'mongoose';
import { Tbike } from './Bike.Interface';

const TbikeSchema = new Schema<Tbike>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  cc: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  isDelated: {
    type: Boolean,
    default: false,
  },
});

// TbikeSchema.pre('find', function (next) {
//   this.find({ isDelated: { $ne: true } });
//   next();
// });

export const Bike = model<Tbike>('bike', TbikeSchema);
