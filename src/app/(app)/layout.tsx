import type { PropsWithChildren } from 'react';
import { Header } from '~/components/layout/header';
import { MotionLayout } from './_components/motion-layout';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='app'>
      <Header />
      <MotionLayout>
        {children}
      </MotionLayout>
    </div>
  );
}
