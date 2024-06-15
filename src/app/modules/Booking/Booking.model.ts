import mongoose, { Schema, model } from 'mongoose';
import { Tbooking } from './Booking.interface';

const rentalSchema = new mongoose.Schema<Tbooking>({
  userId: {
    type: Schema.Types.ObjectId,
  },
  bikeId: {
    type: Schema.Types.ObjectId,
  },
  startTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

export const Booking = model<Tbooking>('booking', rentalSchema);
