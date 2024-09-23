import type { PropsWithChildren } from 'react';
import { Background } from '~/components/legacy/background';
import { Navbar } from './_components/navbar';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='app'>
      <Navbar />
      <Background />
      {children}
    </div>
  );
}
