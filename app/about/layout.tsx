import P from '@/components/mdx/P';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div className='mt-8'>
        <P>I am a full-stack web developer using Next.js and TypeScript.</P>
      </div>
    </div>
  );
}
