import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

const titles: { [key: string]: string } = {
  first: 'First blog post',
  second: 'Second blog post',
  third: 'Third blog post',
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  // Font
  const interSemiBold = fetch(new URL('./inter.ttf', import.meta.url)).then(
    res => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 84,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ margin: 25 }}>
          {titles[params.slug] || 'Blog post not found'}
        </div>
        <div style={{ margin: 25, fontSize: 32 }}>
          This is a description of the blog post
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
