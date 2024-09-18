'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import { cn } from '~/lib/cn';
import { EditorBubbleBar } from './editor-bubble-bar';
import { extensions } from './editor-extensions';

interface EditorProps {
  content?: string
  className?: string
}

export function Editor(props: EditorProps) {
  const { content, className } = props;
  const editor = useEditor({
    autofocus: true,
    extensions,
    immediatelyRender: false,
    content,
    editorProps: {
      attributes: {
        class: 'p-4  h-full overflow-hidden prose max-w-full  focus-within:border-none focus-within:outline-none  block selection:bg-cyan-100 selection:text-zinc-900',
      },
    },
  });
  return (
    <>
      <div className={cn('relative h-full flex flex-col pt-36', className)}>
        <input type='text' className='border-none outline-none text-4xl p-4 font-extrabold bg-transparent placeholder:text-[#ddd]' placeholder='Title ' />
        <EditorContent editor={editor} className=' w-full flex-1' />
      </div>
      <EditorBubbleBar editor={editor} />
    </>
  );
}
