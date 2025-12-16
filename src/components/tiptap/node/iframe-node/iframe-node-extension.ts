import { Node, ReactNodeViewRenderer } from '@tiptap/react';
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
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="iframe"]',
        getAttrs: (element) => {
          if (typeof element === 'string')
            return false;
          const container = element.querySelector('.iframe-container');
          // 优先从 data-iframe-html 读取,然后是 innerHTML,最后是 data-code
          const code = container?.getAttribute('data-iframe-html')
            || container?.innerHTML
            || element.getAttribute('data-code')
            || '';
          return { code };
        },
      },
    ];
  },

  renderHTML({ node }) {
    const code = node.attrs.code || '';

    // 创建一个临时容器来解析 HTML 字符串
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = code;

    // 获取解析后的第一个元素(通常是 iframe)
    const iframeElement = tempContainer.firstChild;

    return [
      'div',
      {
        'data-type': 'iframe',
        'data-code': code,
        'class': 'iframe-node',
      },
      iframeElement || '',
    ];
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
