import Navigation from './Navigation';
import Link from 'next/link';
import ToggleMode from './ToggleMode';

export default function Header() {
  return (
    <header className='flex justify-between md:items-center mt-4'>
      <div className='flex items-center md:space-x-12'>
        <div className='hidden md:block'>
          <Link href='/' className='text-x1 font-mono'>
            Arie Verburgh
          </Link>
        </div>
        <Navigation />
      </div>
      <div>
        <ToggleMode />
      </div>
    </header>
  );
}
