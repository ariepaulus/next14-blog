import Image from 'next/image';
import dog1 from '../../public/images/dog1.webp';
import dog2 from '../../public/images/dog2.webp';
import dog3 from '../../public/images/dog3.webp';
import dog4 from '../../public/images/dog4.webp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photos',
};

export default function PhotosPage() {
  return (
    <div>
      <h1 className='text-2xl mb-8 font-semibold'>My Photos</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='h-60 overflow-hidden relative'>
          <Image
            fill
            src={dog1}
            alt='Picture of dog 1'
            className='object-cover w-full h-full'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority={true}
            quality={50}
          />
        </div>
        <div className='h-60 overflow-hidden relative'>
          <Image
            fill
            src={dog2}
            alt='Picture of dog 2'
            className='object-cover w-full h-full'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority={true}
            quality={50}
          />
        </div>
        <div className='h-60 overflow-hidden relative'>
          <Image
            src={dog3}
            alt='Picture of dog 3'
            className='object-cover w-full h-full'
            sizes='(max-width: 768px) 100vw, 50vw'
            placeholder='blur'
            quality={50}
          />
        </div>
        <div className='h-60 overflow-hidden relative'>
          <Image
            src={dog4}
            alt='Picture of dog 4'
            className='object-cover w-full h-full'
            sizes='(max-width: 768px) 100vw, 50vw'
            placeholder='blur'
            quality={50}
          />
        </div>
      </div>
    </div>
  );
}
