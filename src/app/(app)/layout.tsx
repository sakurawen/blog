import type { PropsWithChildren } from 'react';
import { Header } from '~/components/layout/header';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='app'>
      <Header />
      {children}
    </div>
  );
}
