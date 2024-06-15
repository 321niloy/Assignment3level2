import { z } from 'zod';

// Define the Zod schema
const TuserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    email: z
      .string()
      .email('Invalid email format')
      .nonempty('Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .nonempty('Password is required'),
    phone: z.string(),
    address: z.string().nonempty('Address is required'),
    role: z.string().nonempty('Role is required'),
  }),
});

const updateTuserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required').optional(),
    email: z.string().optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .nonempty('Password is required')
      .optional(),
    phone: z.string().optional(),
    address: z.string().nonempty('Address is required').optional(),
    role: z.string().nonempty('Role is required').optional(),
  }),
});

const TuserloginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});

export const userValidation = {
  TuserValidationSchema,
  TuserloginValidationSchema,
  updateTuserValidationSchema,
};
