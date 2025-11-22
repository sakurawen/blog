import { mergeAttributes, Node, ReactNodeViewRenderer } from '@tiptap/react';
import { BookmarkNodeView } from '~/components/tiptap/node/bookmark-node/bookmark-node';

export interface BookmarkAttributes {
  url: string
  title?: string
  description?: string
  image?: string
  siteName?: string
  favicon?: string
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    bookmark: {
      setBookmark: (attributes: BookmarkAttributes) => ReturnType
    }
  }
}

export const BookmarkNode = Node.create({
  name: 'bookmark',

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      url: {
        default: null,
        parseHTML: element => element.getAttribute('data-url'),
        renderHTML: attributes => ({
          'data-url': attributes.url,
        }),
      },
      title: {
        default: null,
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => ({
          'data-title': attributes.title,
        }),
      },
      description: {
        default: null,
        parseHTML: element => element.getAttribute('data-description'),
        renderHTML: attributes => ({
          'data-description': attributes.description,
        }),
      },
      image: {
        default: null,
        parseHTML: element => element.getAttribute('data-image'),
        renderHTML: attributes => ({
          'data-image': attributes.image,
        }),
      },
      siteName: {
        default: null,
        parseHTML: element => element.getAttribute('data-site-name'),
        renderHTML: attributes => ({
          'data-site-name': attributes.siteName,
        }),
      },
      favicon: {
        default: null,
        parseHTML: element => element.getAttribute('data-favicon'),
        renderHTML: attributes => ({
          'data-favicon': attributes.favicon,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="bookmark"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'bookmark' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BookmarkNodeView);
  },

  addCommands() {
    return {
      setBookmark:
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
