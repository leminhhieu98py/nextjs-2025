'use server';

import { redirect } from 'next/navigation';
import { createUser } from '../user/service';
import { hashUserPassword, validateEmail } from '@/utils/user';
import { lucia } from '@/utils/auth';
import { cookies } from 'next/headers';

function validateFormData(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!validateEmail(email)) {
    return {
      errorMessage: 'Invalid Email'
    };
  }

  if (password?.length < 6) {
    return {
      errorMessage: 'Password must be at least 6 characters'
    };
  }

  const user = {
    email,
    password: hashUserPassword(password)
  };

  return {
    errorMessage: false,
    user
  };
}

async function createSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

async function handleSubmitLoginForm(_, formData) {
  const result = validateFormData(formData);
  if (result.errorMessage) return result.errorMessage;

  try {
    const userId = await createUser(result.user);

    await createSession(userId);
    redirect('/training');
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errorMessage: 'This email is existed. Please try again with another email'
      };
    }

    return {
      errorMessage: 'Something went wrong. Try again later'
    };
  }
}

export { handleSubmitLoginForm };
