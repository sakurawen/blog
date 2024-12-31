import { Icon } from '@iconify/react';
import { HeaderLink } from './header-link';
import { HeaderMenu } from './header-menu';

const menu: Menu[] = [
  {
    title: '首页',
    path: '/',
    icon: <Icon icon='lucide:tree-palm' />,

  },
  {
    title: '博客',
    path: '/blog',
    icon: <Icon icon='lucide:signpost-big' />,
  },
];
export function Header() {
  return (
    <header className='fixed w-full z-2 top-0 '>
      <div className='max-w-3xl py-2.5 bg-white/90 backdrop-blur-md pl-1 sm:pr-0 pr-4 mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex  items-center w-full'>
            {menu.map((m) => {
              return (
                <HeaderLink href={m.path} key={m.path}>
                  <span className='sm:mr-1.5'>
                    {m.icon}
                  </span>
                  <span className='hidden  sm:inline'>
                    {m.title}
                  </span>
                </HeaderLink>
              );
            })}
          </div>
          <div className='flex justify-end'>
            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
