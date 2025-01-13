'use client';

import classes from './page.module.css';
import { handleSubmitForm } from '@/service/meal/actions';
import { MealShareForm } from '@/components/meal-form';
import { useActionState } from 'react';

export type MealShareFormStateProps = { errorMessage: string };

export const MealShareFormWrapper = () => {
  const [state, formAction] = useActionState(handleSubmitForm, { errorMessage: '' });

  return (
    <form className={classes.form} action={formAction}>
      <MealShareForm state={state} />
    </form>
  );
};
