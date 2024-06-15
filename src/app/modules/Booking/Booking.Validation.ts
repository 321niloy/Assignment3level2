import { z } from 'zod';

// Define the validation schema
const bookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'),
    startTime: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .transform((val) => new Date(val)),
  }),
});

export const bookingValidation = { bookingValidationSchema };
