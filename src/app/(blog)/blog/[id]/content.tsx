/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import { getPost } from './actions';
// --- Lib ---
import '~/components/tiptap/node/blockquote-node/blockquote-node.scss';
import '~/components/tiptap/node/code-block-node/code-block-node.scss';

import '~/components/tiptap/node/horizontal-rule-node/horizontal-rule-node.scss';

import '~/components/tiptap/node/list-node/list-node.scss';

import '~/components/tiptap/node/image-node/image-node.scss';

import '~/components/tiptap/node/heading-node/heading-node.scss';
import '~/components/tiptap/node/paragraph-node/paragraph-node.scss';
import '~/components/tiptap/node/bookmark-node/bookmark-node.scss';
// --- Styles ---
import '~/components/features/editor/simple-editor.scss';

export async function PostContent({ id }: { id: string }) {
  const data = await getPost(id);
  return (
    <div
      className='tiptap ProseMirror'
      dangerouslySetInnerHTML={{
        __html: data?.htmlContent || '',
      }}
    />
  );
}
