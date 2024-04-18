import { z } from 'zod';

// Define the schema for validating URL parameters
export const paramsSchema = z.object({
  slug: z.string(),
});
