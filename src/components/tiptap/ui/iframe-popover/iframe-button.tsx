'use client';

import * as React from 'react';
import { IFrameIcon } from '~/components/tiptap/icons/iframe-icon';
import { Button } from '~/components/tiptap/ui-primitive/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/tiptap/ui-primitive/popover';
import { useTiptapEditor } from '~/hooks/use-tiptap-editor';
import { IFramePopoverContent } from './iframe-popover-content';

export function IFrameButton() {
  const { editor } = useTiptapEditor();
  const [open, setOpen] = React.useState(false);

  if (!editor) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        nativeButton
        render={(
          <Button
            data-style='ghost'
            aria-label='Insert iframe'
            title='Insert iframe'
          >
            <IFrameIcon className='tiptap-button-icon' />
          </Button>
        )}
      >
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <IFramePopoverContent
          editor={editor}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
