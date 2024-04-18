import createMDX from '@next/mdx';

// Check if it's a production build
const isProd = process.env.NODE_ENV === 'production';

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

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: { remarkPlugins: [], rehypePlugins: [] },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
