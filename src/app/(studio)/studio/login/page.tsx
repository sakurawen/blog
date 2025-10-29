import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from '~/components/features/login-form';
import { auth } from '~/lib/auth';

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role === 'admin') {
    redirect('/studio');
  }
  return (
    <div className='flex flex-col min-h-svh gap-4 p-6 md:p-10'>
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-xs mx-auto'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
