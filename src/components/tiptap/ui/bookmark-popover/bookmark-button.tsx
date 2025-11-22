'use client';

import * as React from 'react';
import { BookmarkIcon } from '~/components/tiptap/icons/bookmark-icon';
import { Button } from '~/components/tiptap/ui-primitive/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/tiptap/ui-primitive/popover';
import { useTiptapEditor } from '~/hooks/use-tiptap-editor';
import { BookmarkPopoverContent } from './bookmark-popover-content';

export function BookmarkButton() {
  const { editor } = useTiptapEditor();
  const [open, setOpen] = React.useState(false);

  if (!editor) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-style='ghost'
          aria-label='Insert bookmark'
          title='Insert bookmark'
        >
          <BookmarkIcon className='tiptap-button-icon' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <BookmarkPopoverContent
          editor={editor}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
