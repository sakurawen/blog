import { zValidator } from '@hono/zod-validator';
import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm';
import { UAParser } from 'ua-parser-js';
import { z } from 'zod';
import { pageviews, visitors } from '~/db/schema';
import { factory } from '~/server/factory';
import { authMiddleware } from '~/server/middleware/auth';

const trackSchema = z.object({
  visitorId: z.string().min(1),
  path: z.string().min(1),
  referrer: z.string().optional(),
});

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  path: z.string().optional(),
});

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export const analyticsRouter = factory
  .createApp()
  .post('/track', zValidator('json', trackSchema), async (c) => {
    const db = c.get('db');
    const { visitorId, path, referrer } = c.req.valid('json');

    const userAgent = c.req.header('user-agent') || 'unknown';
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const today = getTodayDate();

    try {
      await db
        .insert(visitors)
        .values({
          visitorId,
          firstSeenAt: today,
          lastSeenAt: today,
        })
        .onConflictDoUpdate({
          target: visitors.visitorId,
          set: {
            lastSeenAt: today,
          },
        });

      await db
        .insert(pageviews)
        .values({
          visitorId,
          path,
          date: today,
          referrer,
          device: result.device.type || 'desktop',
          browser: result.browser.name || 'unknown',
          os: result.os.name || 'unknown',
        })
        .onConflictDoNothing();

      return c.json({ success: true });
    }
    catch (error) {
      console.error('Analytics tracking error:', error);
      return c.json({ success: false, error: 'Failed to track' }, 500);
    }
  })
  .get('/pageviews', authMiddleware, zValidator('query', querySchema), async (c) => {
    const db = c.get('db');
    const { page, limit, startDate, endDate, path: pathFilter } = c.req.valid('query');

    const offset = (page - 1) * limit;

    const conditions = [];

    if (startDate) {
      conditions.push(gte(pageviews.date, sql`${startDate}::date`));
    }

    if (endDate) {
      conditions.push(lte(pageviews.date, sql`${endDate}::date`));
    }

    if (pathFilter) {
      conditions.push(eq(pageviews.path, pathFilter));
    }

    try {
      const [totalResult] = await db
        .select({ count: count() })
        .from(pageviews)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      const data = await db
        .select()
        .from(pageviews)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(pageviews.date))
        .limit(limit)
        .offset(offset);

      return c.json({
        success: true,
        data,
        pagination: {
          page,
          limit,
          total: totalResult?.count || 0,
          totalPages: Math.ceil((totalResult?.count || 0) / limit),
        },
      });
    }
    catch (error) {
      console.error('Failed to fetch pageviews:', error);
      return c.json({ success: false, error: 'Failed to fetch data' }, 500);
    }
  })
  .get('/stats', authMiddleware, zValidator('query', z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })), async (c) => {
    const db = c.get('db');
    const { startDate, endDate } = c.req.valid('query');

    const conditions = [];

    if (startDate) {
      conditions.push(gte(pageviews.date, sql`${startDate}::date`));
    }

    if (endDate) {
      conditions.push(lte(pageviews.date, sql`${endDate}::date`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    try {
      const [pvResult] = await db
        .select({ count: count() })
        .from(pageviews)
        .where(whereClause);

      const [uvResult] = await db
        .select({ count: sql<number>`COUNT(DISTINCT ${pageviews.visitorId})` })
        .from(pageviews)
        .where(whereClause);

      const topPages = await db
        .select({
          path: pageviews.path,
          views: count(),
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(pageviews.path)
        .orderBy(desc(count()))
        .limit(10);

      const deviceStats = await db
        .select({
          device: pageviews.device,
          count: count(),
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(pageviews.device)
        .orderBy(desc(count()));

      const browserStats = await db
        .select({
          browser: pageviews.browser,
          count: count(),
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(pageviews.browser)
        .orderBy(desc(count()));

      const osStats = await db
        .select({
          os: pageviews.os,
          count: count(),
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(pageviews.os)
        .orderBy(desc(count()));

      const dailyTrend = await db
        .select({
          date: pageviews.date,
          pv: count(),
          uv: sql<number>`COUNT(DISTINCT ${pageviews.visitorId})`,
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(pageviews.date)
        .orderBy(desc(pageviews.date))
        .limit(30);

      return c.json({
        success: true,
        data: {
          overview: {
            totalPV: pvResult?.count || 0,
            totalUV: uvResult?.count || 0,
          },
          topPages,
          deviceStats,
          browserStats,
          osStats,
          dailyTrend: dailyTrend.reverse(),
        },
      });
    }
    catch (error) {
      console.error('Failed to fetch stats:', error);
      return c.json({ success: false, error: 'Failed to fetch stats' }, 500);
    }
  });
