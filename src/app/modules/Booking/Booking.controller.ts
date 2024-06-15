import { Request, Response } from 'express';
import catchAsync from '../../middleware/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { BookingService } from './Booking.service';

const createBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.BookingBikeIntoDb(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Rental created successfully',
    data: result,
  });
});

const ReturnBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.BikeReturned(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bike returned successfully',
    data: result,
  });
});

const getBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getBookingIntoDb(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const BookingController = {
  createBike,
  ReturnBike,
  getBooking,
};
