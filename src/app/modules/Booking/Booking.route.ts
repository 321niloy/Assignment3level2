import express from 'express';
import { BookingController } from './Booking.controller';
import validateRequest from '../../middleware/validationRequest';
import { bookingValidation } from './Booking.Validation';
import auth from '../../middleware/Auth';
import { USER_ROLE } from '../users/userConstant';

const router = express.Router();

router.post(
  '/rentals',
  auth(USER_ROLE.user),
  validateRequest(bookingValidation.bookingValidationSchema),
  BookingController.createBike,
);
router.put('/rentals/:id/return', BookingController.ReturnBike);

router.get('/rentals', BookingController.getBooking);

export const BookingRoutes = router;
