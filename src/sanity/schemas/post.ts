import { defineField, defineType } from 'sanity';
import { z } from 'zod';

export const Post = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.any(),
  description: z.string(),
  publishedAt: z.string(),
});

export default defineType({
  name: 'post',
  title: '文章',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '标识符',
      type: 'slug',
      validation: rule => rule.required(),
      options: {
        source: 'title',
        maxLength: 98,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      title: '简介',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: '内容',
      type: 'blockContent',
      validation: Rule => Rule.required(),
    }),
  ],
  initialValue: () => ({
    publishedAt: new Date().toISOString(),
  }),
  preview: {
    select: {
      title: 'title',
      author: 'slug',
    },
  },
});
