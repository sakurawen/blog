import z from 'zod';

export const postsCreateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  slug: z.string().optional(),
  banner: z.url().optional(),
  summary: z.string().optional(),
  published: z.boolean().optional(),
  htmlContent: z.string().optional(),
  jsonContent: z.any().optional(),
});

export const postsUpdateSchema = postsCreateSchema.extend({
  id: z.string().min(1, 'ID is required'),
});

export const postsDetailSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});
