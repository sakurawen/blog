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
    <header className='fixed w-full z-2 top-0'>
      <div className='border-b border-zinc-200 flex items-center justify-between bg-white/95 backdrop-blur-md  mx-auto'>
        <div className='divide-x border-zinc-200 border-r'>
          {menu.map((m) => {
            return (
              <HeaderLink href={m.path} key={m.path}>
                <span className='mr-1.5'>
                  {m.icon}
                </span>
                <span>
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
    </header>
  );
}
