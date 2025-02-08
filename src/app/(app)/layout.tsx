import type { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='app'>
      {children}
    </div>
  );
}
