'use client';
import type { Editor } from '@tiptap/react';
import { Icon } from '@iconify/react';
import * as Toggle from '@radix-ui/react-toggle';
import { BubbleMenu } from '@tiptap/react';
import { Material } from '~/components/ui/material';
import { EditorActions } from './editor-actions';

export function EditorBubbleBar({ editor }: { editor: Editor | null }) {
  return (
    <BubbleMenu
      editor={editor}
      className='w-fit'
    >
      <Material className='flex space-x-2 w-full p-1'>
        <EditorActions editor={editor} />
      </Material>
    </BubbleMenu>
  );
}
