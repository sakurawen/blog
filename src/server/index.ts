import type { Env } from './env';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from '~/lib/auth';
import { betterAuthMiddleware } from './middleware/better-auth';
import { prismaMiddleware } from './middleware/prisma';
import { s3Router } from './routes/s3';

export const app = new Hono<Env>().use(
  '/api/auth/*',
  cors({
    origin: '*',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
).on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
}).use(prismaMiddleware, betterAuthMiddleware).basePath('/api').route('/s3', s3Router);
