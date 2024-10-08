import type { PropsWithChildren } from 'react';
import { Header } from '~/components/layout/header';
import { Background } from '~/components/legacy/background';
import { MotionLayout } from './_components/motion-layout';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='app'>
      <Header />
      <Background />
      <MotionLayout>
        {children}
      </MotionLayout>
    </div>
  );
}
