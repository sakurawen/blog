import Link from 'next/link';
import { HeaderMenu } from './header-menu';

export function Header() {
  return (
    <header className='header fixed top-0  w-full z-10 bg-white border-b'>
      <div className='flex justify-between max-w-2xl mx-auto  py-4 px-4'>
        <div className='header-start text-sm space-x-4 flex items-center '>
          <Link className='text-sm rounded-md overflow-hidden text-gray-950' href='/'>
            Home
          </Link>
          <Link className='text-sm rounded-md overflow-hidden text-gray-950' href='/blog'>
            Blog
          </Link>
        </div>
        <div className='header-end'>
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
