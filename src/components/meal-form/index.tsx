'use client';

import { ImagePicker } from '@/components/image-picker';
import classes from './page.module.css';
import { useFormStatus } from 'react-dom';
import { MealShareFormStateProps } from '@/components/meal-form-wrapper';

type Props = { state: MealShareFormStateProps };

export const MealShareForm = ({ state }: Props) => {
  const { pending } = useFormStatus();
  return (
    <>
      <div className={classes.row}>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" required />
        </p>
      </div>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input type="text" id="summary" name="summary" required />
      </p>
      <p>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" rows={10} required></textarea>
      </p>
      <ImagePicker label="Your image" name="image" />
      <p className={classes.actions}>
        <button type="submit" disabled={pending}>
          {pending ? 'Submitting...' : 'Share Meal'}
        </button>
      </p>
      {state.errorMessage && <p>{state.errorMessage}</p>}
    </>
  );
};
