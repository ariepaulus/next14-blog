import { notFound } from 'next/navigation';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MdxContent } from '@/app/mdx-content';
import { promises as fs } from 'fs';

type Frontmatter = {
  title: string;
  date: string;
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

async function getPost(filepath: string): Promise<Post<Frontmatter>> {
  // Read the file from the filesystem
  const raw = await fs.readFile(filepath, 'utf-8');

  // Serialize the MDX content and parse the frontmatter
  const serialized = await serialize(raw, {
    parseFrontmatter: true,
  });

  // Typecast the frontmatter to the correct type
  const frontmatter = serialized.frontmatter as Frontmatter;

  // Return the serialized content and frontmatter
  return {
    frontmatter,
    serialized,
  };
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  let post;

  try {
    post = await getPost(`content/${params.slug}.mdx`);
  } catch (error) {
    return notFound();
  }

  return (
    <article className='prose dark:prose-invert'>
      <div style={{ maxWidth: 600, margin: 'auto' }}>
        <MdxContent source={post.serialized} />
      </div>
    </article>
  );
}
  