import type { PropsWithChildren } from 'react';
import { Header } from '~/components/layout/header';
import { Background } from '~/components/legacy/background';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='app'>
      <Header />
      <Background />
      {children}
    </div>
  );
}
