import type { UseEditorOptions } from '@tiptap/react';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Selection } from '@tiptap/extensions';
import { useEditor as useTipTapEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { BookmarkNode } from '~/components/tiptap/node/bookmark-node/bookmark-node-extension';
import { HorizontalRule } from '~/components/tiptap/node/horizontal-rule-node/horizontal-rule-node-extension';
import { IFrameNode } from '~/components/tiptap/node/iframe-node/iframe-node-extension';
import { ImageUploadNode } from '~/components/tiptap/node/image-upload-node/image-upload-node-extension';

import { handleImageUpload, MAX_FILE_SIZE } from '~/lib/tiptap-utils';

export const defaultEditorOptions = {
  immediatelyRender: false,
  shouldRerenderOnTransaction: false,
  editorProps: {
    attributes: {
      'autocomplete': 'off',
      'autocorrect': 'off',
      'autocapitalize': 'off',
      'aria-label': 'Main content area, start typing to enter text.',
      'class': 'simple-editor',
    },
  },
  extensions: [
    StarterKit.configure({
      horizontalRule: false,
      link: {
        openOnClick: false,
        enableClickSelection: true,
      },
    }),
    HorizontalRule,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Highlight.configure({ multicolor: true }),
    Image,
    Typography,
    Superscript,
    Subscript,
    Selection,
    ImageUploadNode.configure({
      accept: 'image/*',
      maxSize: MAX_FILE_SIZE,
      limit: 3,
      upload: handleImageUpload,
      onError: error => console.error('Upload failed:', error),
    }),
    BookmarkNode,
    IFrameNode,
  ],
};
export function useEditor(options: UseEditorOptions = defaultEditorOptions) {
  return useTipTapEditor(options);
}
