import type { PropsWithChildren } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ScrollArea } from '~/components/ui/scroll-area';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { auth } from '~/lib/auth';
import { AppSidebar } from './_components/app-sidebar';
import { AppThemeToggle } from './_components/app-theme-toggle';

export default async function StudioLayout({ children }: PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role !== 'admin') {
    redirect('/');
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='border-b p-2 flex items-center justify-between'>
          <div>
            <SidebarTrigger className=' className="-ml-1"' />
          </div>
          <div className='flex items-center gap-2'>
            <AppThemeToggle />
          </div>
        </header>
        <div className=''>
          <ScrollArea className='h-[calc(100vh-66px)] p-2'>
            {children}
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
