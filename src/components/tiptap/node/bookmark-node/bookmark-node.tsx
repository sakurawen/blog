'use client';

import type { NodeViewProps } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import * as React from 'react';
import './bookmark-node.scss';

export const BookmarkNodeView: React.FC<NodeViewProps> = React.memo(({ node }) => {
  const { url, title, description, image, siteName, favicon } = node.attrs;

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <NodeViewWrapper className='bookmark-node'>
      <div
        className='bookmark-card h-30'
        onClick={handleClick}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div className='bookmark-content'>
          <div className='bookmark-info'>
            <div className='flex gap-2'>
              {(siteName || favicon) && (
                <div className='bookmark-site'>
                  {favicon && (
                    <img
                      src={favicon}
                      alt=''
                      className='bookmark-favicon'
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  {siteName && <span className='bookmark-site-name'>{siteName}</span>}
                </div>
              )}
              {title && <div className='bookmark-title'>{title}</div>}
            </div>
            {description && <div className='bookmark-description text-xs!'>{description}</div>}
            <div className='bookmark-url'>{url}</div>
          </div>
          {image
            && (
              <div className='bookmark-image-container'>
                <img
                  src={image}
                  alt={title || ''}
                  className='bookmark-image'
                  onError={(e) => {
                    e.currentTarget.parentElement!.style.display = 'none';
                  }}
                />
              </div>
            )}
        </div>
      </div>
    </NodeViewWrapper>
  );
}, (prev, next) => prev.node.attrs.url === next.node.attrs.url);
