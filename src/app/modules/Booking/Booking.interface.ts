import { Types } from 'mongoose';

export interface Tbooking {
  userId?: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime?: Date;
  totalCost?: number;
  isReturned?: boolean;
}
