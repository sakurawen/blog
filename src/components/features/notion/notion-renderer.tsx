'use client';
import type { ComponentProps } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { lazy } from 'react';
import { NotionRenderer as Renderer } from 'react-notion-x';

const Code = import('react-notion-x/build/third-party/code').then(m => ({ default: m.Code }));

const Collection = lazy(() => import('react-notion-x/build/third-party/collection').then(r => ({ default: r.Collection })));

const components: React.ComponentProps<typeof Renderer>['components'] = {
  Code,
  Collection,
  Link,
};

const mapPageUrl = (pageId: string) => `/blog/${pageId}`;

export function NotionRenderer({ ...props }: ComponentProps<typeof Renderer>) {
  const { className, ...restProps } = props;
  return (
    <Renderer
      bodyClassName={clsx(className)}
      mapPageUrl={mapPageUrl}
      components={components}
      {...restProps}
    />
  );
}
