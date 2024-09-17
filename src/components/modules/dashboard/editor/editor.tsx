'use client';
import { EditorProvider, FloatingMenu } from '@tiptap/react';
import { EditorBubbleBar } from './editor-bubble-bar';
import { extensions } from './editor-extensions';

interface EditorProps {
  content?: string
}

export function Editor(props: EditorProps) {
  const { content = 'console.log("are you ok?")' } = props;
  return (
    <div className='p-4'>
      <div className='bg-white p-4 shadow rounded-md   '>
        <EditorProvider
          immediatelyRender={false}
          extensions={extensions}
          content={content}
          editorProps={{
            attributes: {
              class: 'prose max-w-full focus-within:border-none focus-within:outline-none  block selection:bg-lime-300 selection:text-zinc-900',
            },
          }}
        >
          <EditorBubbleBar />
        </EditorProvider>
      </div>
    </div>
  );
}
