import type { PropsWithChildren } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '~/lib/auth';

export default async function StudioLayout({ children }: PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect('/');
  }
  return (
    <div className='studio-layout'>
      {children}
    </div>
  );
}
