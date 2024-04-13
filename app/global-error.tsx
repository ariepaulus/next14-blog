// Error components must be Client Components
'use client';

import { useEffect } from 'react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log('GlobalError mounted');
    return () => {
      console.log('GlobalError unmounted');
    };
  }, []);

  const resetHandler = () => {
    console.log('Attempting to recover from error');
    reset();
  };

  const handleRefresh = () => {
    console.log('Refreshing the page');
    window.location.reload();
  };

  return (
    <html lang='en'>
      <body className={`${roboto.className} text-white bg-black min-h-screen flex flex-col p-4 pt-0`}>
        <div className='error-container'>
          <h2 className='error-message'>{error.message || 'Something went wrong!'}</h2>
          <div className='flex items-center gap-4'>
            <button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => resetHandler
              }
              className='error-button'
            >
              Please try again!
            </button>
            <div className='flex items-center gap-1'>
              <span className='bg-white/20 block h-px w-2'></span>
              <span className='text-sm text-white/70'>or</span>
              <span className='bg-white/20 block h-px w-2'></span>
            </div>
            <button
              onClick={
                // Reload the page
                handleRefresh
              }
              className='bg-transparent shadow-[inset_0_0_0_2px] shadow-white w-fit text-white font-semibold rounded px-4 py-2 hover:bg-white/10 focus-within:bg-white/20 transition'
            >
              Reload the page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
