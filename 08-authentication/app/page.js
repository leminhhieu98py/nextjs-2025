import AuthForm from '@/components/auth-form';
import { validateAuth } from '@/utils/auth';
import { redirect } from 'next/navigation';

// TODO: add login mode from search params
export default async function Home() {
  const { user } = await validateAuth();
  if (user) {
    redirect('/training');
  }

  return <AuthForm />;
}
