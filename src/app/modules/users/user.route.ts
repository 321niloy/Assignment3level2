import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { userValidation } from './user.validation';
import { user } from './user.controller';
import { USER_ROLE } from './userConstant';
import auth from '../../middleware/Auth';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidation.TuserValidationSchema),
  user.signUp,
);

router.post(
  '/login',
  validateRequest(userValidation.TuserloginValidationSchema),
  user.login,
);

router.get('/me', auth(USER_ROLE.admin), user.getUser);
router.put(
  '/me',
  validateRequest(userValidation.updateTuserValidationSchema),
  auth(USER_ROLE.admin),
  user.updatedProfile,
);

export const userRoutes = router;
