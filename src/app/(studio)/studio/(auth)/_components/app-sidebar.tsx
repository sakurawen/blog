'use client';
import { Folder, Home, LayoutDashboard, PencilLine } from 'lucide-react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import { useSession } from '~/lib/auth-client';

const menus: Array<{
  icon: React.ReactNode
  label: string
  href: string
}> = [
  {
    label: 'Posts',
    href: '/studio/posts',
    icon: <PencilLine />,
  },
  {
    label: 'Projects',
    href: '/studio/projects',
    icon: <Folder />,
  },
];

export function AppSidebar() {
  const { data } = useSession();
  return (
    <Sidebar collapsible='offcanvas' variant='inset'>
      <SidebarHeader>
        <SidebarMenuButton size='lg' asChild>
          <a href='#'>
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
              <Home className='size-4' />
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>{data?.user.name}</span>
              <span className='truncate text-xs'>{data?.user.role}</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/studio'>
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Resource</SidebarGroupLabel>
          <SidebarMenu>
            {menus.map((menu) => {
              return (
                <SidebarMenuItem key={menu.label}>
                  <SidebarMenuButton asChild>
                    <Link href={menu.href}>
                      {menu.icon}
                      {menu.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
