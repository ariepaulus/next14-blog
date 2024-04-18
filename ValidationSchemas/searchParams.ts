import { z } from 'zod';

export const searchParamsSchema = z.object({
  tags: z
    .union([z.string(), z.array(z.string())])
    .transform(tags => (typeof tags === 'string' ? [tags] : tags))
    .optional(),
  order: z.enum(['newest', 'oldest']).optional(),
  page: z.preprocess(arg => {
    // Attempt to convert the input to a number if it's a string
    if (typeof arg === 'string') return parseInt(arg, 10);
    return arg;
  }, z.number().int().positive().optional()),
  limit: z.preprocess(arg => {
    // Attempt to convert the input to a number if it's a string
    if (typeof arg === 'string') return parseInt(arg, 10);
    return arg;
  }, z.number().int().positive().max(100).optional()),
});
