'use client';

import type { Editor } from '@tiptap/react';
import { CornerDownLeftIcon } from 'lucide-react';
import * as React from 'react';
import { Button, ButtonGroup } from '~/components/tiptap/ui-primitive/button';
import { Card, CardBody, CardItemGroup } from '~/components/tiptap/ui-primitive/card';
import { Input, InputGroup } from '~/components/tiptap/ui-primitive/input';
import { useIsMobile } from '~/hooks/use-mobile';
import { hono } from '~/lib/hono';

interface BookmarkPopoverContentProps {
  editor: Editor
  onClose?: () => void
}

export function BookmarkPopoverContent({ editor, onClose }: BookmarkPopoverContentProps) {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const isMobile = useIsMobile();

  const handleInsert = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      const _ = new URL(url);
    }
    catch {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await hono.api.bookmark['fetch-og-data'].$post({
        json: { url },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookmark data');
      }

      const result = await response.json();

      if (result.code !== 200 || !result.data) {
        throw new Error(result.message || 'Failed to fetch bookmark data');
      }

      // Debug: log the data being inserted
      console.warn('Bookmark data to insert:', result.data);

      editor
        .chain()
        .focus()
        .setBookmark(result.data)
        .run();

      setUrl('');
      onClose?.();
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to insert bookmark');
    }
    finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInsert();
    }
    else if (e.key === 'Escape') {
      onClose?.();
    }
  };

  return (
    <Card
      style={isMobile ? { boxShadow: 'none', border: 0 } : undefined}
    >
      <CardBody
        style={isMobile ? { padding: 0 } : undefined}
      >
        <CardItemGroup orientation='horizontal'>
          <InputGroup>
            <Input
              type='url'
              placeholder='Paste a bookmark link...'
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              disabled={loading}
            />
          </InputGroup>

          <ButtonGroup orientation='horizontal'>
            <Button
              type='button'
              onClick={handleInsert}
              title='Insert bookmark'
              disabled={loading || !url.trim()}
              data-style='ghost'
            >
              <CornerDownLeftIcon className='tiptap-button-icon' />
            </Button>
          </ButtonGroup>
        </CardItemGroup>

        {error && (
          <CardItemGroup orientation='horizontal'>
            <p className='text-xs text-red-500 px-2'>{error}</p>
          </CardItemGroup>
        )}
      </CardBody>
    </Card>
  );
}
