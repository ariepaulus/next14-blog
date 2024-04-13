import Navigation from './Navigation';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex justify-between md:items-center mt-4'>
      <div className='flex items-center md:space-x-12'>
        <div className='hidden md:block'>
          <Link href='/' className='text-x1'>
            Arie Verburgh
          </Link>
        </div>
        <Navigation />
      </div>
    </header>
  );
}
