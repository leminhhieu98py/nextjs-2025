'use server';

import { redirect } from 'next/navigation';
import { createUser } from '../user/service';
import { hashUserPassword, validateEmail } from '@/utils/user';

async function handleSubmitForm(_, formData) {
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

  console.log('user', user);

  try {
    await createUser(meal);
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

  // revalidatePath('/');

  // redirect('/training');
}

// TODO: add login server action

export { handleSubmitForm };
