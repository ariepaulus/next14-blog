import { notFound } from 'next/navigation';
import { getPost as getPostNotCached, getPosts } from '@/lib/posts';
import { cache } from 'react';
import Link from 'next/link';
import { MdxContent } from '@/app/mdx-content';

const getPost = cache(async (slug: string) => await getPostNotCached(slug));

// Assuming a simple structure for params
interface MetadataParams {
  params: {
    slug: string;
  };
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const { posts } = await getPosts({ limit: 1000 });
  return posts.map(post => ({ slug: post.slug }));
}

// This function assumes that `parent.description` can be a promise.
export async function generateMetadata({ params }: MetadataParams) {
  try {
    const { frontmatter } = await getPost(params.slug);
    return frontmatter;
  } catch (error) {}
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  let post;

  try {
    post = await getPost(params.slug);
  } catch (error) {
    return notFound();
  }

  return (
    <article className='prose dark:prose-invert'>
      <div className='flex space-x-2 mb-8'>
        {post.frontmatter.tags.map(tag => (
          <Link
            key={tag}
            href={`/blog/?tags=${tag}`}
            className='dark:text-gray-400 text-gray-500'
          >
            #{tag}
          </Link>
        ))}
      </div>
      <MdxContent source={post.serialized} />
    </article>
  );
}
