'use server';

import { redirect } from 'next/navigation';
import { createUser, getUser } from '../user/service';
import { hashUserPassword, validateEmail, verifyPassword } from '@/utils/user';
import { lucia, validateAuth } from '@/utils/auth';
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
    password
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

async function destroySession() {
  const { session } = await validateAuth();

  if (!session?.id) {
    throw new Error('Unauthorized!');
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

async function handleSubmitSignupForm(_, formData) {
  const result = validateFormData(formData);
  if (result.errorMessage) return result.errorMessage;

  try {
    const userId = await createUser({
      ...result.user,
      password: hashUserPassword(result.user.password)
    });

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

async function handleSubmitLoginForm(_, formData) {
  const result = validateFormData(formData);
  if (result.errorMessage) return result.errorMessage;

  try {
    const existUser = getUser(result.user.email);
    if (!existUser) {
      return {
        errorMessage: 'This email does not exist. Please check the email or signup a new account'
      };
    }
    const isValidPassword = verifyPassword(existUser.password, result.user.password);

    if (!isValidPassword) {
      return {
        errorMessage: 'Password is incorrect. Please try again'
      };
    }

    await createSession(existUser.id);
    redirect('/training');
  } catch {
    return {
      errorMessage: 'Something went wrong. Try again later'
    };
  }
}

async function logout() {
  try {
    await destroySession();
    redirect('/');
  } catch (e) {
    console.log(e);
  }
}

export { handleSubmitSignupForm, handleSubmitLoginForm, logout };
