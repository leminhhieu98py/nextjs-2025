import AuthForm from '@/components/auth-form';
import { validateAuth } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function Home({ searchParams }) {
  const { user } = await validateAuth();
  if (user) {
    redirect('/training');
  }

  const { authMode = 'signup' } = await searchParams;

  return <AuthForm authMode={authMode} />;
}
