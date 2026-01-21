import { AdminContainer } from '~/components/admin/admin-container';
import { UmamiDashboard } from './_components/umami-dashboard';

export default function Dashboard() {
  return (
    <AdminContainer className=''>
      <UmamiDashboard />
    </AdminContainer>
  );
}
