import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  title: '块级富文本',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: '正文', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: '引用', value: 'blockquote' },
      ],
      lists: [
        { title: '无序列表', value: 'bullet' },
        { title: '有序列表', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: '加粗', value: 'strong' },
          { title: '斜体', value: 'em' },
          { title: '下划线', value: 'underline' },
          { title: '删除线', value: 'strike-through' },
          { title: '代码', value: 'code' },
        ],
        annotations: [
          {
            title: '链接',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: '链接',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: '图片',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '替代文本',
        },
        {
          name: 'label',
          type: 'string',
          title: '标注',
        },
      ],
    }),
  ],
});
