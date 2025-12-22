'use client';

import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '~/components/ui/card';
import { hono } from '~/lib/hono';

export function AnalyticsCharts() {
  // 使用蓝色系渐变 - 以 #0085c8 为主色调
  const colors = {
    primary: '#0085c8', // 主蓝色
    secondary: '#1a95d4', // 辅助蓝
    gradients: [
      '#0085c8', // 100% - 主蓝色
      '#1a95d4', // 85% - 亮蓝
      '#4dacde', // 70% - 天蓝
      '#7dc3e8', // 55% - 浅天蓝
      '#a6d5f0', // 40% - 浅蓝
      '#cfe7f8', // 25% - 淡蓝
    ],
  };

  const { data, isLoading } = useQuery({
    queryKey: ['analytics-stats'],
    queryFn: async () => {
      const response = await hono.api.analytics.stats.$get({
        query: {},
      });
      if (!response.ok) {
        throw new Error('Failed to fetch analytics stats');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className='p-6'>
            <div className='h-20 animate-pulse rounded bg-muted' />
          </Card>
        ))}
      </div>
    );
  }

  if (!data?.success || !data.data) {
    return <div className='text-muted-foreground text-center'>无法加载统计数据</div>;
  }

  const { overview, topPages, deviceStats, browserStats, osStats, dailyTrend } = data.data;

  return (
    <div className='space-y-6'>
      {/* 概览卡片 */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='p-5'>
          <div className='text-muted-foreground text-sm font-medium'>总页面浏览量 (PV)</div>
          <div className='mt-2 text-3xl font-bold'>{overview.totalPV.toLocaleString()}</div>
        </Card>
        <Card className='p-5'>
          <div className='text-muted-foreground text-sm font-medium'>独立访客数 (UV)</div>
          <div className='mt-2 text-3xl font-bold'>{overview.totalUV.toLocaleString()}</div>
        </Card>
        <Card className='p-5'>
          <div className='text-muted-foreground text-sm font-medium'>平均 PV/UV</div>
          <div className='mt-2 text-3xl font-bold'>
            {overview.totalUV > 0 ? (overview.totalPV / overview.totalUV).toFixed(2) : '0'}
          </div>
        </Card>
        <Card className='p-5'>
          <div className='text-muted-foreground text-sm font-medium'>今日访问量</div>
          <div className='mt-2 text-3xl font-bold'>
            {(dailyTrend && dailyTrend[dailyTrend.length - 1]?.pv) || 0}
          </div>
        </Card>
      </div>

      {/* 每日趋势 */}
      <Card className='p-5'>
        <h3 className='mb-4 text-lg font-semibold'>访问趋势（最近 30 天）</h3>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={dailyTrend}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='pv'
              stroke={colors.primary}
              strokeWidth={2.5}
              dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name='PV'
            />
            <Line
              type='monotone'
              dataKey='uv'
              stroke={colors.gradients[2]}
              strokeWidth={2.5}
              dot={{ fill: colors.gradients[2], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name='UV'
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* 热门页面 */}
      <Card className='p-5'>
        <h3 className='mb-4 text-lg font-semibold'>热门页面 Top 10</h3>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={topPages}>
            <defs>
              <linearGradient id='colorViews' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor={colors.primary} stopOpacity={1} />
                <stop offset='100%' stopColor={colors.primary} stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='path' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='views' fill='url(#colorViews)' name='访问量' radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* 设备、浏览器、操作系统分布 */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='p-5'>
          <h3 className='mb-4 text-lg font-semibold'>设备分布</h3>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={deviceStats}
                dataKey='count'
                nameKey='device'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {deviceStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors.gradients[index % colors.gradients.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className='p-5'>
          <h3 className='mb-4 text-lg font-semibold'>浏览器分布</h3>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={browserStats}
                dataKey='count'
                nameKey='browser'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {browserStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors.gradients[index % colors.gradients.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className='p-5'>
          <h3 className='mb-4 text-lg font-semibold'>操作系统分布</h3>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={osStats}
                dataKey='count'
                nameKey='os'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {osStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors.gradients[index % colors.gradients.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
