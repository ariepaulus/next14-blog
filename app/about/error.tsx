// Error components must be Client Components
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            startTransition(() => {
              router.refresh();
              reset();
            });
          }
        }
      >
        Please try again!
      </button>
    </div>
  );
}
