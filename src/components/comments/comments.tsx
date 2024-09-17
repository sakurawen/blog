'use client';
import Giscus from '@giscus/react';

export function Comments({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Giscus
        repo='sakurawen/blog-comments'
        repoId='R_kgDOHhXNkw'
        category='Announcements'
        categoryId='DIC_kwDOHhXNk84CPvWm'
        mapping='pathname'
        strict='0'
        reactionsEnabled='1'
        emitMetadata='0'
        input-position='bottom'
        theme='noborder_light'
        lang='zh-CN'
      />
    </div>
  );
}
