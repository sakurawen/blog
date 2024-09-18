import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';

export const extensions = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'codeBlock') {
        return '';
      }
      if (node.type.name === 'heading') {
        return 'Heading';
      }
      return 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dolor hic nemo voluptate nesciunt consequuntur consequatur optio sapiente, animi, amet corporis iste iure? Hic modi consequuntur ab doloremque accusamus et?';
    },
  }),
  Highlight,
];
