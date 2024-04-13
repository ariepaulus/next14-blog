import Link from 'next/link';
import ToggleMode from './ToggleMode';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className='font-mono'>
      <ul className='flex md:space-x-4 flex-col md:flex-row'>
        <li className='mt-3'>
          <Link href='/' className={styles.link}>
            Home
          </Link>
        </li>
        <li className='mt-3'>
          <Link href='/about' className={styles.link}>
            About
          </Link>
        </li>
        <li className='mt-3'>
          <Link href='/about/projects' className={styles.link}>
            Projects
          </Link>
        </li>
        <li className='mt-1'>
          <ToggleMode />
        </li>
      </ul>
    </nav>
  );
}
