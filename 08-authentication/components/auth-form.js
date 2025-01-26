'use client';

import { handleSubmitForm } from '@/service/auth/action';
import Image from 'next/image';
import Link from 'next/link';
import { useFormStatus, useFormState } from 'react-dom';

export default function AuthForm() {
  const [state, formAction] = useFormState(handleSubmitForm, { errorMessage: '' });
  const { pending } = useFormStatus();

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image src="/images/auth-icon.jpg" width={80} height={80} alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      <p>
        <button type="submit">{pending ? 'Submitting...' : 'Create Account'}</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
      {state.errorMessage && <p>{state.errorMessage}</p>}
    </form>
  );
}
