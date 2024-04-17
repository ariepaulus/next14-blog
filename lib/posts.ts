import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { promises as fs } from 'fs';
import path from 'path';

type Frontmatter = {
  title: string;
  date: string;
  tags: string[];
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

export async function loadPost(filepath: string): Promise<Post<Frontmatter>> {
  // Read the file from the filesystem
  const raw = await fs.readFile(filepath, 'utf-8');

  // Serialize the MDX content and parse the frontmatter
  const serialized = await serialize(raw, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [], // add any necessary remark plugins if needed
      rehypePlugins: [], // add any necessary rehype plugins if needed
    },
    scope: {}, // any additional options required for your setup
  });

  // Typecast the frontmatter to the correct type
  const frontmatter = serialized.frontmatter as Frontmatter;

  // Return the serialized content and frontmatter
  return {
    frontmatter,
    serialized,
  };
}

export async function getPost(slug: string) {
  // Construct the filepath using the slug
  const filepath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  // Use the existing loadPost function which reads and serializes MDX content
  const post = await loadPost(filepath);

  // Return the post with any additional data as needed
  return {
    ...post,
  };
}

type PostFilterOptions = {
  newest?: boolean;
  page?: number;
  limit?: number;
  tags?: string[];
};

export async function getPosts({
  newest = true,
  page = 1,
  limit = 3,
  tags,
}: PostFilterOptions = {}) {
  const dirPath = path.join(process.cwd(), 'content');
  const files = await fs.readdir(dirPath);

  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async filename => {
        const post = await loadPost(path.join(dirPath, filename));
        return {
          ...post,
          slug: filename.replace('.mdx', ''),
        };
      })
  );

  let filteredPosts = posts;

  if (tags) {
    filteredPosts = filteredPosts.filter(
      post =>
        // Ensure tags is an array before calling .some()
        Array.isArray(post.frontmatter.tags) &&
        post.frontmatter.tags.some(tag => tags.includes(tag))
    );
  }

  if (newest) {
    filteredPosts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  } else {
    filteredPosts.sort(
      (a, b) =>
        new Date(a.frontmatter.date).getTime() -
        new Date(b.frontmatter.date).getTime()
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    posts: filteredPosts.slice(startIndex, endIndex),
    pageCount: Math.ceil(filteredPosts.length / limit),
  };
}
