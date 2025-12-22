import { zValidator } from '@hono/zod-validator';
import { and, count, desc, eq, gte, lte, sql } from 'drizzle-orm';
import { UAParser } from 'ua-parser-js';
import { z } from 'zod';
import { pageviews, visitors } from '~/db/schema';
import { factory } from '~/server/factory';
import { authMiddleware } from '~/server/middleware/auth';

// 追踪请求验证 schema
const trackSchema = z.object({
  visitorId: z.string().min(1),
  path: z.string().min(1),
  referrer: z.string().optional(),
});

// 查询参数 schema
const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  path: z.string().optional(),
});

export const analyticsRouter = factory
  .createApp()
  // 追踪端点 - 公开访问
  .post('/track', zValidator('json', trackSchema), async (c) => {
    const db = c.get('db');
    const { visitorId, path, referrer } = c.req.valid('json');

    // 获取 IP 地址
    const ipAddress
      = c.req.header('cf-connecting-ip')
        || c.req.header('x-forwarded-for')
        || c.req.header('x-real-ip')
        || 'unknown';

    // 获取 User-Agent
    const userAgent = c.req.header('user-agent') || 'unknown';

    // 解析 User-Agent
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    try {
      // 记录或更新访客信息
      await db
        .insert(visitors)
        .values({
          visitorId,
          ipAddress,
          firstSeenAt: new Date(),
          lastSeenAt: new Date(),
        })
        .onConflictDoUpdate({
          target: visitors.visitorId,
          set: {
            lastSeenAt: new Date(),
            ipAddress,
          },
        });

      // 记录页面访问
      await db.insert(pageviews).values({
        visitorId,
        path,
        referrer,
        ipAddress,
        userAgent,
        device: result.device.type || 'desktop',
        browser: result.browser.name || 'unknown',
        browserVersion: result.browser.version || 'unknown',
        os: result.os.name || 'unknown',
        osVersion: result.os.version || 'unknown',
        timestamp: new Date(),
      });

      return c.json({ success: true });
    }
    catch (error) {
      console.error('Analytics tracking error:', error);
      return c.json({ success: false, error: 'Failed to track' }, 500);
    }
  })
  // 获取访问记录列表 - 需要认证
  .get('/pageviews', authMiddleware, zValidator('query', querySchema), async (c) => {
    const db = c.get('db');
    const { page, limit, startDate, endDate, path: pathFilter } = c.req.valid('query');

    const offset = (page - 1) * limit;

    // 构建查询条件
    const conditions = [];

    if (startDate) {
      conditions.push(gte(pageviews.timestamp, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(pageviews.timestamp, new Date(endDate)));
    }

    if (pathFilter) {
      conditions.push(eq(pageviews.path, pathFilter));
    }

    try {
      // 查询总数
      const [totalResult] = await db
        .select({ count: count() })
        .from(pageviews)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      // 查询数据
      const data = await db
        .select()
        .from(pageviews)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(pageviews.timestamp))
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
  // 获取统计数据 - 需要认证
  .get('/stats', authMiddleware, zValidator('query', z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })), async (c) => {
    const db = c.get('db');
    const { startDate, endDate } = c.req.valid('query');

    // 构建时间范围条件
    const conditions = [];

    if (startDate) {
      conditions.push(gte(pageviews.timestamp, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(pageviews.timestamp, new Date(endDate)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    try {
      // 总 PV
      const [pvResult] = await db
        .select({ count: count() })
        .from(pageviews)
        .where(whereClause);

      // 总 UV (独立访客数)
      const [uvResult] = await db
        .select({ count: sql<number>`COUNT(DISTINCT ${pageviews.visitorId})` })
        .from(pageviews)
        .where(whereClause);

      // 热门页面
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

      // 设备分布
      const deviceStats = await db
        .select({
          device: pageviews.device,
          count: count(),
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(pageviews.device)
        .orderBy(desc(count()));

      // 浏览器分布
      const browserStats = await db
        .select({
          browser: pageviews.browser,
          count: count(),
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(pageviews.browser)
        .orderBy(desc(count()));

      // 操作系统分布
      const osStats = await db
        .select({
          os: pageviews.os,
          count: count(),
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(pageviews.os)
        .orderBy(desc(count()));

      // 每日趋势（最近 30 天）
      const dailyTrend = await db
        .select({
          date: sql<string>`DATE(${pageviews.timestamp})`,
          pv: count(),
          uv: sql<number>`COUNT(DISTINCT ${pageviews.visitorId})`,
        })
        .from(pageviews)
        .where(whereClause)
        .groupBy(sql`DATE(${pageviews.timestamp})`)
        .orderBy(sql`DATE(${pageviews.timestamp}) DESC`)
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
