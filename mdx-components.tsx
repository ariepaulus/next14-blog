import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import H1 from './components/mdx/H1';
import H2 from './components/mdx/H2';
import P from './components/mdx/P';
import HeroImage from './components/mdx/HeroImage';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <H1>{children}</H1>,
    h2: ({ children }) => <H2>{children}</H2>,
    p: ({ children }) => <P>{children}</P>,
    img: props => (
      <Image
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
        alt='Image'
      />
    ),
    HeroImage,
    ...components,
  };
}
