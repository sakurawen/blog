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

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then(m => m.Equation), { ssr: false });

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf),
  {
    ssr: false,
  },
);

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  {
    ssr: false,
  },
);
const components = {
  Code,
  nextImage: Image,
  nextLink: Link,
  Collection,
  Equation,
  Modal,
  Pdf,
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
