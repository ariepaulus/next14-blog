import { notFound } from 'next/navigation';
import H1 from '@/components/H1';
import Pagination from '@/components/Pagination';
import { getPosts } from '@/lib/posts';
import Link from 'next/link';
import { searchParamsSchema } from '@/ValidationSchemas/searchParams';

interface BlogPostsPageProps {
  searchParams: {
    tags?: string[];
    order?: string;
    page?: number;
    limit?: number;
  };
}

export default async function BlogPostsPage({
  searchParams = { tags: [], order: 'newest', page: 1, limit: 3 },
}: BlogPostsPageProps) {
  const validation = searchParamsSchema.safeParse(searchParams);
  if (!validation.success) {
    console.error('Validation error:', validation.error);
    return notFound(); // Or handle validation failure appropriately
  }

  // Now using the validated and parsed search parameters
  const { tags, order = 'newest', page = 1, limit = 3 } = validation.data;

  // Fetch posts based on the search parameters
  const { posts, pageCount } = await getPosts({
    tags,
    newest: order === 'newest',
    page,
    limit,
  });

  // Check if posts array is empty and handle not found scenario
  if (!posts.length) {
    return notFound();
  }

  return (
    <>
      <H1>Recent Posts</H1>

      <div className='text-lg text-gray-600 dark:text-gray-400 mb-8'>
        Stay up to date with the most recent posts
      </div>

      <hr />

      <div className='mb-8'>
        Display&nbsp;
        {order === 'newest' && (
          <Link href='/blog?order=oldest' className='underline'>
            oldest
          </Link>
        )}
        {order === 'oldest' && (
          <Link href='/blog?order=newest' className='underline'>
            newest
          </Link>
        )}
      </div>

      <ul className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {posts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className='text-2xl font-semibold text-gray-800 dark:text-gray-200'
            >
              {post.frontmatter.title}
            </Link>
            <div className='text-gray-400 text-sm mt-2'>
              {post.frontmatter.date}
            </div>
          </li>
        ))}
      </ul>

      <div className='mt-8'>
        <Pagination pageCount={pageCount} />
      </div>
    </>
  );
}
