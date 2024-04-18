import { z } from 'zod';

// Define the schema for a single repository object on GitHub
const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional().nullable(), // Allow 'null' or missing 'description'
  stargazers_count: z.number(),
});

// Define the schema for the array of repositories
export const reposSchema = z.array(repoSchema);
