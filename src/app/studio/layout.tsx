import type { PropsWithChildren } from 'react';

export default function StudioLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div className='studio-layout'>
      {children}
    </div>
  );
}
