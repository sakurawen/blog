import type { PropsWithChildren } from 'react';

export function HoverCard(props: PropsWithChildren) {
  return <div className='py-1 text-zinc-600 transition-colors hover:text-zinc-950'>{props.children}</div>;
}
