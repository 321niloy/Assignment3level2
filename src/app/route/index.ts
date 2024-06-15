import express from 'express';
import { userRoutes } from '../modules/users/user.route';
import { bikeRoutes } from '../modules/Bike/Bike.route';
import { BookingRoutes } from '../modules/Booking/Booking.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '',
    route: bikeRoutes,
  },
  {
    path: '',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
