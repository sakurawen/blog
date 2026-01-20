'use client';

import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar';
import { authClient, useSession } from '~/lib/auth-client';

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data, isPending } = useSession();

  function handleLogout() {
    authClient.signOut();
    router.push('/studio/login');
  }

  if (isPending) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar className='h-8 w-8 rounded-lg '>
                  <AvatarImage src={data?.user.image || ''} alt={data?.user.name} />
                  <AvatarFallback className='rounded-lg'>{data?.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{data?.user.name}</span>
                  <span className='text-muted-foreground truncate text-xs'>
                    {data?.user.email}
                  </span>
                </div>
              </SidebarMenuButton>
            )}
          />
          <DropdownMenuContent
            align='end'
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'top'}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={data?.user.image || ''} alt={data?.user.name} />
                    <AvatarFallback className='rounded-lg'>{data?.user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>{data?.user.name}</span>
                    <span className='text-muted-foreground truncate text-xs'>
                      {data?.user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
