'use client';
/* next-mdx-remote provides a component called <MDXRemote>, that is used to render MDX content. 
To use it, we must wrap it in a client component. This is because <MDXRemote> uses React, 
which is not available on the server. This is why we need to wrap it in a client component, 
which is a component that is only rendered on the client side. 
This way, we can use <MDXRemote> in our MDX content, and it will only be rendered on the client side. 
*/
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

// If we want to add custom components to our posts, we can do so by passing a components prop:
/** Place your custom MDX components here */
const MdxComponents = {
  /** h1 colored in yellow */
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 style={{ color: '#FFF676' }} {...props} />
  ),
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
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}
