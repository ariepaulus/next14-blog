import { z } from 'zod';

// Define the schema for a single repository object
const repoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  stargazers_count: z.number(),
});

// Define the schema for the array of repositories
export const reposSchema = z.array(repoSchema);
