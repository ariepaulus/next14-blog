import { z } from 'zod';

// Define the schema for validating search parameters
export const searchParamsSchema = z.object({
  tags: z
    .union([z.string(), z.array(z.string())])
    .transform(tags => (typeof tags === 'string' ? [tags] : tags))
    .optional(),  
  order: z.enum(['newest', 'oldest']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(), // assuming a max limit of 100 for safety
});
