/* eslint-disable react-dom/no-dangerously-set-innerhtml */
'use client';

import type { NodeViewProps } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import * as React from 'react';
import './iframe-node.scss';

export const IFrameNodeView: React.FC<NodeViewProps> = React.memo(({ node }) => {
  const { code } = node.attrs;

  return (
    <NodeViewWrapper className='iframe-node'>
      <div className='iframe-container' dangerouslySetInnerHTML={{ __html: code }} />
    </NodeViewWrapper>
  );
}, (prev, next) => prev.node.attrs.code === next.node.attrs.code);
