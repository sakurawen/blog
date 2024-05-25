import { PropsWithChildren } from 'react';

export function HoverCard(props: PropsWithChildren) {
  return <div className='transition-colors py-1 text-zinc-600 hover:text-zinc-950'>{props.children}</div>;
}
