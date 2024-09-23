import { AnimatePresence } from 'framer-motion';
import { NavbarMenu } from './navbar-menu';

export function Navbar() {
  return (
    <AnimatePresence>
      <header className='fixed w-full z-10 h-[4.5rem]'>
        <div className='max-w-7xl h-full mx-auto grid grid-cols-[4.5rem_auto_4.5rem]'>
          <div className='nav-start'></div>
          <div className='nav-middle flex items-center justify-center'>
            <NavbarMenu />
          </div>
          <div className='nav-end'></div>
        </div>
      </header>
    </AnimatePresence>
  );
}
