import { HeaderLink } from './header-link';
import { HeaderMenu } from './header-menu';

export function Header() {
  return (
    <header className='header fixed top-0  w-full z-10 bg-white/80 backdrop-blur-lg'>
      <div className='flex justify-between max-w-2xl mx-auto px-2 py-2.5'>
        <div className='header-start text-sm space-x-2 flex items-center '>
          <HeaderLink className='py-1 px-2.5 text-[15px] rounded-md overflow-hidden hover:bg-zinc-100' href='/'>
            首页
          </HeaderLink>
          <HeaderLink className='py-1 px-2.5 text-[15px] rounded-md overflow-hidden hover:bg-zinc-100' href='/blog'>
            博客
          </HeaderLink>
        </div>
        <div className='header-end'>
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
