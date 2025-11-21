import { zValidator } from '@hono/zod-validator';
import { success } from '~/lib/result';
import { factory } from '~/server/factory';
import { authMiddleware } from '~/server/middleware/auth';
import { postsCreateSchema, postsDetailSchema, postsUpdateSchema } from './schema';

export const postsRouter = factory.createApp()
  // 获取文章列表
  .get('/', async (c) => {
    const list = await c.var.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return c.json(success(list));
  })
  // 创建文章
  .post('/', authMiddleware, zValidator('json', postsCreateSchema), async (c) => {
    const { htmlContent, summary, ...rest } = c.req.valid('json');
    const res = await c.var.prisma.post.create({
      data: {
        htmlContent,
        ...rest,
        summary: summary || '',
      },
    });
    return c.json(success(res));
  })
  // 修改文章
  .put('/', authMiddleware, zValidator('json', postsUpdateSchema), async (c) => {
    const { id, htmlContent, summary, ...rest } = c.req.valid('json');
    const res = await c.var.prisma.post.update({
      where: { id },
      data: {
        htmlContent,
        ...rest,
        summary: summary || '',
      },
    });
    return c.json(success(res));
  })
  // 获取文章详情
  .get('/:id', zValidator('param', postsDetailSchema), async (c) => {
    const { id } = c.req.valid('param');
    const post = await c.var.prisma.post.findUnique({
      where: { id },
    });
    return c.json(success(post));
  })
  // 删除文章
  .delete('/:id', authMiddleware, zValidator('param', postsDetailSchema), async (c) => {
    const { id } = c.req.valid('param');
    const deleted = await c.var.prisma.post.delete({
      where: { id },
    });
    return c.json(success(deleted));
  });
