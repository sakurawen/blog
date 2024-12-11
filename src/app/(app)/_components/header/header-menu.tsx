'use client';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { authClient } from '~/lib/auth-client';

export function HeaderMenu() {
  const { data } = authClient.useSession();
  function handleSignOut() {
    return authClient.signOut();
  }
  if (!data?.user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus-within:outline-none'>
        <div className='cursor-default py-1.5 px-4 text-sm  text-zinc-500  hover:text-zinc-950 hover:bg-zinc-50 inline-flex items-center justify-center ' onClick={handleSignOut}>
          <Image className='rounded-full mr-2' width={20} height={20} src={data.user.image || ''} alt='user avatar' />
          <span>{data.user.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='top' sideOffset={2} align='end'>
        <DropdownMenuItem onClick={handleSignOut}>
          <Icon className='!size-3' icon='lucide:log-out' />
          注销
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
