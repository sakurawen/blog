import type { PortableTextMarkComponentProps } from '@portabletext/react';
import Link from 'next/link';

export function PortableTextLink(props: PortableTextMarkComponentProps) {
  const rel = !props.value?.href.startsWith('/') ? 'noreferrer noopener' : undefined;
  return (
    <Link
      className='underline underline-offset-1'
      href={props.value?.href}
      target='_blank'
      rel={rel}
    >
      {props.children}
    </Link>
  );
}
