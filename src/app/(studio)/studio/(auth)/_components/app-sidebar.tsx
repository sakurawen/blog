'use client';
import { CitrusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import { menus } from '~/const/menu';
import { NavUser } from './app-sidebar-user';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible='offcanvas' variant='inset'>
      <SidebarHeader>
        <SidebarMenuButton size='lg' asChild>
          <a href='#'>
            <div className='bg-primary/5  flex aspect-square size-8 items-center justify-center rounded-md'>
              <CitrusIcon className='size-5 text-primary' />
            </div>
            <div className=' flex-1 text-left font-bold text-sm leading-tight'>
              BLOG
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {menus.map((menuGroup) => {
          return (
            <SidebarGroup key={menuGroup.label}>
              <SidebarGroupLabel>{menuGroup.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuGroup.children.map((menu) => {
                    return (
                      <SidebarMenuItem key={menu.label}>
                        <SidebarMenuButton asChild isActive={pathname === menu.href}>
                          <Link href={menu.href}>
                            {menu.icon}
                            {menu.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
