import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import { HeaderContent } from './header-content';

export function Header() {
  return (
    <header className='fixed w-full z-10 top-4'>
      <div className='max-w-3xl h-full mx-auto grid grid-cols-[4.5rem_auto_4.5rem] px-4'>
        <div className='nav-start'></div>
        <div className='nav-middle flex items-center justify-center'>
          <HeaderContent />
        </div>
        <div className='nav-end flex items-center justify-end'>
          <SignedOut>
            <SignInButton mode='modal'>
              <div className='size-7 rounded-full shadow-md ring-2 ring-zinc-100 hover:text-zinc-950 bg-white/80 backdrop-blur-md hover:bg-zinc-100   text-zinc-500  flex items-center justify-center'>
                <Icon icon='lucide:user-round' />
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                userButtonBox: 'shadow-md ring-2 ring-zinc-100 rounded-full',
              },
            }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
