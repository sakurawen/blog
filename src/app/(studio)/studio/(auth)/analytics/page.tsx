import { AdminContainer } from '~/components/admin/admin-container';
import { AnalyticsCharts } from './_components/analytics-charts';
import { AnalyticsTable } from './_components/analytics-table';

export default function AnalyticsPage() {
  return (
    <AdminContainer className='space-y-6 p-6'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Analytics</h1>
        <p className='text-muted-foreground'>博客访问统计和数据分析</p>
      </div>

      <div className='space-y-6'>
        <AnalyticsCharts />
        <AnalyticsTable />
      </div>
    </AdminContainer>
  );
}
