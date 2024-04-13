import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1 className='text-2xl'>404</h1>
      <h2 className='text-2xl my-auto self-center font-semibold'>Not found!</h2>
      <p>Could not find requested resource!</p>
      <Link href='/'>Return home</Link>
    </div>
  );
}
