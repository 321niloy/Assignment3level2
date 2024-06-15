import express from 'express';

import { bikeController } from './Bike.Controller';
import validateRequest from '../../middleware/validationRequest';
import { Bikevalidation } from './Bike.validation';
import auth from '../../middleware/Auth';
import { USER_ROLE } from '../users/userConstant';

const router = express.Router();

router.post(
  '/bikes',
  validateRequest(Bikevalidation.TbikeValidationSchema),
  auth(USER_ROLE.admin),
  bikeController.createBike,
);

router.get('/bikes', bikeController.getBike);

router.put(
  '/bikes/:id',
  validateRequest(Bikevalidation.TbikeUpdateValidationSchema),
  auth(USER_ROLE.admin),
  bikeController.updateBike,
);

router.delete('/bikes/:id', auth(USER_ROLE.admin), bikeController.deleteBike);

export const bikeRoutes = router;
