'use client';
import { useAtom } from 'jotai';
import { ChevronRight, CitrusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuOpenStateAtom } from '~/atoms/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar';
import { menus } from '~/const/menu';
import { NavUser } from './app-sidebar-user';

export function AppSidebar() {
  const pathname = usePathname();
  const [menuOpenState, setMenuOpenState] = useAtom(menuOpenStateAtom);

  const handleOpenChange = (label: string, isOpen: boolean) => {
    setMenuOpenState(prev => ({
      ...prev,
      [label]: isOpen,
    }));
  };

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
          const isOpen = menuOpenState[menuGroup.label] ?? false;
          return (
            <Collapsible
              key={menuGroup.label}
              asChild
              className='group/collapsible'
              open={isOpen}
              onOpenChange={open => handleOpenChange(menuGroup.label, open)}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={menuGroup.label}>
                    {menuGroup.icon}
                    {menuGroup.label}
                    <ChevronRight className='ml-auto transition-all  group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {menuGroup.children.map((menu) => {
                      return (
                        <SidebarMenuSubItem key={menu.label}>
                          <SidebarMenuSubButton asChild isActive={pathname === menu.href}>
                            <Link href={menu.href}>
                              {menu.label}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
