'use server';

import { redirect } from 'next/navigation';

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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
    password
  };

  console.log('user', user);

  //   await createMeal(meal);

  //   revalidatePath('/meals');

  redirect('/training');
}

export { handleSubmitForm };
