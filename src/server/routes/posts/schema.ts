import z from 'zod';

export const postsCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  slug: z.string().min(1, 'Slug is required'),
  banner: z.url(),
  summary: z.string().optional(),
  htmlContent: z.string().optional(),
  jsonContent: z.any(),
});

export const postsUpdateSchema = postsCreateSchema.extend({
  id: z.string().min(1, 'ID is required'),
});

export const postsDetailSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});
