import type { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className='dashboard-layout'>
      {children}
    </div>
  );
}
