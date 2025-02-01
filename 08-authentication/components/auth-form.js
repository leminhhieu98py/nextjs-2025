'use client';

import { handleSubmitSignupForm, handleSubmitLoginForm } from '@/service/auth/action';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useFormStatus, useFormState } from 'react-dom';

export default function AuthForm({ authMode }) {
  const isSignupMode = authMode === 'signup';
  const [state, formAction] = useFormState(
    isSignupMode ? handleSubmitSignupForm : handleSubmitLoginForm,
    { errorMessage: '' }
  );
  const { pending } = useFormStatus();
  const submitGroupInfo = useMemo(
    () => ({
      submitButtonText: isSignupMode ? 'Create Account' : 'Login',
      toHref: isSignupMode ? '/?authMode=login' : '/?authMode=signup',
      linkText: isSignupMode ? 'Login with existing account.' : 'Signup for a new account'
    }),
    [isSignupMode]
  );

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
        <button type="submit">
          {pending ? 'Submitting...' : submitGroupInfo.submitButtonText}
        </button>
      </p>
      <p>
        <Link href={submitGroupInfo.toHref}>{submitGroupInfo.linkText}</Link>
      </p>
      {state.errorMessage && <p>{state.errorMessage}</p>}
    </form>
  );
}
