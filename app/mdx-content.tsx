'use client';

import H1 from '@/components/mdx/H1';
import H2 from '@/components/mdx/H2';
import P from '@/components/mdx/P';
import HeroImage from '@/components/mdx/HeroImage';
import { MDXComponents } from 'mdx/types';
// import { MDXRemoteSerializeResult } from 'next-mdx-remote';
/* next-mdx-remote provides a component called <MDXRemote>, that is used to render MDX content. 
To use it, we must wrap it in a client component. This is because <MDXRemote> uses React, 
which is not available on the server. This is why we need to wrap it in a client component, 
which is a component that is only rendered on the client side. 
This way, we can use <MDXRemote> in our MDX content, and it will only be rendered on the client side. 
*/
import dynamic from 'next/dynamic';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';

const MDXRemoteAsync = dynamic(
  () =>
    import('next-mdx-remote').then(module => ({ default: module.MDXRemote })),
  { ssr: false }
);

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

// If we want to add custom components to our posts, we can do so by passing a components prop:
/** Place your custom MDX components here */
const MdxComponents = {
  h1: (
    props: React.HTMLProps<HTMLHeadingElement> & { children: React.ReactNode }
  ) => <H1 {...props} />,
  h2: (
    props: React.HTMLProps<HTMLHeadingElement> & { children: React.ReactNode }
  ) => <H2 {...props} />,
  p: (
    props: React.HTMLProps<HTMLHeadingElement> & { children: React.ReactNode }
  ) => <P {...props} />,
  /** Card component */
  Card: (props: React.HTMLProps<HTMLDivElement>) => (
    <div
      style={{
        background: '#333',
        borderRadius: '0.25rem',
        padding: '0.5rem 1rem',
      }}
      {...props}
    />
  ),
  HeroImage,
};

export function MdxContent({ source }: MdxContentProps) {
  return (
    <MDXRemoteAsync {...source} components={MdxComponents as MDXComponents} />
  );
}
