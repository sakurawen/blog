'use client';
import Giscus from '@giscus/react';

export function Comment() {
  return (
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
      theme={'noborder_light'}
      lang='zh-CN'
    />
  );
}
