import { notFound } from 'next/navigation';
import { paramsSchema } from '@/ValidationSchemas/params';

interface Params {
  slug: string;
}

export default function BlogPage({ params }: { params: Params }) {
  // Validate the params object against the schema
  const validationResult = paramsSchema.safeParse(params);

  if (!validationResult.success) {
    // Handle validation error
    console.error('Validation error:', validationResult.error);
    return <>Invalid params</>;
  }

  const validatedParams = validationResult.data;

  if (!['first', 'second'].includes(validatedParams.slug)) {
    notFound();
  }

  return <>Hello! {validatedParams.slug}</>;
}
