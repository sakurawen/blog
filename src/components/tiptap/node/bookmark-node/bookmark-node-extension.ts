import { Node, ReactNodeViewRenderer } from '@tiptap/react';
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
      },
      title: {
        default: null,
        parseHTML: element => element.getAttribute('data-title'),
      },
      description: {
        default: null,
        parseHTML: element => element.getAttribute('data-description'),
      },
      image: {
        default: null,
        parseHTML: element => element.getAttribute('data-image'),
      },
      siteName: {
        default: null,
        parseHTML: element => element.getAttribute('data-site-name'),
      },
      favicon: {
        default: null,
        parseHTML: element => element.getAttribute('data-favicon'),
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

  renderHTML({ node }) {
    const { url, title, description, image, siteName, favicon } = node.attrs;

    const children = [
      'a',
      { class: 'bookmark-card h-30 block ', style: 'text-decoration:none', href: url, target: '_blank', rel: 'noopener noreferrer' },
      [
        'div',
        { class: 'bookmark-content' },
        [
          'div',
          { class: 'bookmark-info no-underline' },
          [
            'div',
            { class: 'flex gap-2' },
            ...(siteName || favicon
              ? [
                  [
                    'div',
                    { class: 'bookmark-site' },
                    ...(favicon ? [['img', { src: favicon, alt: '', class: 'bookmark-favicon' }]] : []),
                    ...(siteName ? [['span', { class: 'bookmark-site-name' }, siteName]] : []),
                  ],
                ]
              : []),
            ...(title ? [['div', { class: 'bookmark-title ' }, title]] : []),
          ],
          ...(description ? [['div', { class: 'bookmark-description text-xs! ' }, description]] : []),
          ['div', { class: 'bookmark-url' }, url],
        ],
        ...(image
          ? [
              [
                'div',
                { class: 'bookmark-image-container' },
                ['img', { src: image, alt: title || '', class: 'bookmark-image' }],
              ],
            ]
          : []),
      ],
    ];

    return [
      'div',
      {
        'data-type': 'bookmark',
        'data-url': url,
        'data-title': title,
        'data-description': description,
        'data-image': image,
        'data-site-name': siteName,
        'data-favicon': favicon,
        'class': 'bookmark-node',
      },
      children,
    ];
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
