import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';
import { IFrameNodeView } from '~/components/tiptap/node/iframe-node/iframe-node';

export interface IFrameAttributes {
  code: string
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    iframe: {
      setIFrame: (attributes: IFrameAttributes) => ReturnType
    }
  }
}

export const IFrameNode = Node.create({
  name: 'iframe',

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      code: {
        default: '',
        parseHTML: element => element.getAttribute('data-code'),
        renderHTML: attributes => ({
          'data-code': attributes.code,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="iframe"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'iframe' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(IFrameNodeView);
  },

  addCommands() {
    return {
      setIFrame:
        attributes =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: attributes,
            });
          },
    };
  },
});
