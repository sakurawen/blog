import type { Editor } from '@tiptap/react';
import { Icon } from '@iconify/react';
import * as Toggle from '@radix-ui/react-toggle';

export function EditorActions({ editor }: { editor: Editor | null }) {
  function handleToggleHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    editor?.chain().focus().toggleHeading({ level }).run();
  }

  function handleToggleTextAlign(align: 'left' | 'right' | 'center' | 'justify') {
    editor?.chain().focus().setTextAlign(align).run();
  }

  function handleToggleBold() {
    editor?.chain().focus().toggleBold().run();
  }

  function handleToggleItalic() {
    editor?.chain().focus().toggleItalic().run();
  }

  function handleToggleStrike() {
    editor?.chain().focus().toggleStrike().run();
  }

  function handleToggleHighlight() {
    editor?.chain().focus().toggleHighlight().run();
  }

  return (
    <>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive({ textAlign: 'left' })}
        onClick={() => {
          handleToggleTextAlign('left');
        }}
      >
        <Icon icon='lucide:align-left' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive({ textAlign: 'center' })}
        onClick={() => {
          handleToggleTextAlign('center');
        }}
      >
        <Icon icon='lucide:align-center' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive({ textAlign: 'right' })}
        onClick={() => {
          handleToggleTextAlign('right');
        }}
      >
        <Icon icon='lucide:align-right' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive({ textAlign: 'justify' })}
        onClick={() => {
          handleToggleTextAlign('justify');
        }}
      >
        <Icon icon='lucide:align-justify' />
      </Toggle.Root>

      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('bold')}
        onClick={handleToggleBold}
      >
        <Icon icon='lucide:bold' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('strike')}
        onClick={handleToggleStrike}
      >
        <Icon icon='lucide:strikethrough' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('italic')}
        onClick={handleToggleItalic}
      >
        <Icon icon='lucide:italic' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('highlight')}
        onClick={handleToggleHighlight}
      >
        <Icon icon='lucide:highlighter' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('heading', { level: 1 })}
        onClick={() => {
          handleToggleHeading(1);
        }}
      >
        <Icon icon='lucide:heading-1' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('heading', { level: 2 })}
        onClick={() => {
          handleToggleHeading(2);
        }}
      >
        <Icon icon='lucide:heading-2' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('heading', { level: 3 })}
        onClick={() => {
          handleToggleHeading(3);
        }}
      >
        <Icon icon='lucide:heading-3' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('heading', { level: 4 })}
        onClick={() => {
          handleToggleHeading(4);
        }}
      >
        <Icon icon='lucide:heading-4' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('heading', { level: 5 })}
        onClick={() => {
          handleToggleHeading(5);
        }}
      >
        <Icon icon='lucide:heading-5' />
      </Toggle.Root>
      <Toggle.Root
        className='data-[state=on]:text-cyan-600 hover:bg-zinc-100 p-1.5 rounded'
        pressed={editor?.isActive('heading', { level: 6 })}
        onClick={() => {
          handleToggleHeading(6);
        }}
      >
        <Icon icon='lucide:heading-6' />
      </Toggle.Root>
    </>
  );
}
