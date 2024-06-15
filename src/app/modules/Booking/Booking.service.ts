import { JwtPayload } from 'jsonwebtoken';
import { Tbooking } from './Booking.interface';
import { Booking } from './Booking.model';
import { User } from '../users/user.model';
import { Types } from 'mongoose';
import { Bike } from '../Bike/Bike.Model';
import { date } from 'zod';
import AppError from '../../Error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookingSearchableFields } from './Booking.constant';

const BookingBikeIntoDb = async (userData: JwtPayload, data: Tbooking) => {
  console.log('BookingBikeIntoDb', userData);
  const user = await User.isUserExistsByEmail(userData.email);
  console.log(user, 'hama');
  const result = await Booking.create({ ...data, userId: user._id });

  return result;
};

const BikeReturned = async (id: string) => {
  console.log('BikeReturned', id);
  const BookingInformaiton = await Booking.findById(id);
  const BikeInformation = await Bike.findById(BookingInformaiton?.bikeId);

  if (!BookingInformaiton) {
    throw new Error('Booking Information is Not Found !');
  }

  if (!BikeInformation) {
    throw new Error('Booking Information is Not Found !');
  }

  const startTime = BookingInformaiton?.startTime;
  const returnTime = new Date();
  const durationHours =
    (returnTime.getTime() - startTime?.getTime()) / (1000 * 60 * 60);

  const totalCost = durationHours * BikeInformation?.pricePerHour;

  ////Update data
  BookingInformaiton.returnTime = returnTime;
  BookingInformaiton.totalCost = totalCost;
  BookingInformaiton.isReturned = true;

  await BookingInformaiton?.save();

  console.log(BikeInformation);
  console.log(BookingInformaiton);

  return BookingInformaiton;
};

const getBookingIntoDb = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Booking.find(), query)
    .search(bookingSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await userQuery.Modelquery;
  return result;
};
export const BookingService = {
  BookingBikeIntoDb,
  BikeReturned,
  getBookingIntoDb,
};
