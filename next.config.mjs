import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  env: {
    METADATA_BASE_URL: isProd
      ? 'https://your-production-domain.com'
      : 'http://localhost:3000',
  },
};

// Check if it's a production build
const isProd = process.env.NODE_ENV === 'production';

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkParse, remarkRehype],
    rehypePlugins: [
      rehypeStringify,
      rehypeSlug,
      rehypeSanitize,
      rehypeAutolinkHeadings,
    ],
    providerImportSource: '@mdx-js/react',
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
