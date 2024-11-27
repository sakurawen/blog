import { HeaderContent } from './header-content';

export function Header() {
  return (
    <header className='fixed w-full z-10 top-4'>
      <div className='max-w-2xl h-full mx-auto grid grid-cols-[4.5rem_auto_4.5rem]'>
        <div className='nav-start'></div>
        <div className='nav-middle flex items-center justify-center'>
          <HeaderContent />
        </div>
        <div className='nav-end'></div>
      </div>
    </header>
  );
}
