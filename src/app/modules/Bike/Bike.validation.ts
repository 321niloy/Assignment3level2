import { z } from 'zod';

// Define the Zod schema
const TbikeValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    description: z.string().nonempty('Description is required'),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
    cc: z.number().positive('CC must be a positive number'),
    year: z
      .number()
      .int()
      .min(1900, 'Year must be a valid year')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    model: z.string().nonempty('Model is required'),
    brand: z.string().nonempty('Brand is required'),
    isDelated: z.boolean().optional(), // Optional since it has a default value in the Mongoose schema
  }),
});

const TbikeUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required').optional(),
    description: z.string().nonempty('Description is required').optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number')
      .optional(),
    cc: z.number().positive('CC must be a positive number').optional(),
    year: z
      .number()
      .int()
      .min(1900, 'Year must be a valid year')
      .max(new Date().getFullYear(), 'Year cannot be in the future')
      .optional(),
    model: z.string().nonempty('Model is required').optional(),
    brand: z.string().nonempty('Brand is required').optional(),
    isDelated: z.boolean().optional(), // Optional since it has a default value in the Mongoose schema
  }),
});

// Export the schema
export const Bikevalidation = {
  TbikeValidationSchema,
  TbikeUpdateValidationSchema,
};
