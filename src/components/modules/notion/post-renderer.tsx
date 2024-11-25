'use client';
import type { ComponentProps } from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { NotionRenderer } from 'react-notion-x';
import { harmonySans } from '~/lib/font';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(m => m.Code),
);

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    m => m.Collection,
  ), { ssr: false });

const components = {
  Code,
  nextImage: Image,
  nextLink: Link,
  Collection,
};

const mapPageUrl = (pageId: string) => `/blog/${pageId}`;

export function PostRenderer({ ...props }: ComponentProps<typeof NotionRenderer >) {
  const { className, ...restProps } = props;
  return (
    <NotionRenderer
      bodyClassName={clsx(harmonySans.className, className)}
      mapPageUrl={mapPageUrl}
      components={components}
      {...restProps}
    />
  );
}
