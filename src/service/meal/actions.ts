'use server';

import { Meal } from '@/components/meals-grid/type';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';
import { createMeal } from './services';
import { redirect } from 'next/navigation';
import { MealShareFormStateProps } from '@/components/meal-form-wrapper';

const handleSubmitForm = async (previousState: MealShareFormStateProps, formData: FormData) => {
  const slug = slugify(formData.get('title')?.toString() || '', { lower: true });
  const preventSXXInstructions = xss(formData.get('instructions')?.toString() || '');

  if (!formData.get('name')) {
    return {
      errorMessage: 'Invalid Creator name'
    };
  }

  const meal: Omit<Meal, 'id'> = {
    creator: formData.get('name')?.toString() || '',
    creator_email: formData.get('email')?.toString() || '',
    title: formData.get('title')?.toString() || '',
    summary: formData.get('summary')?.toString() || '',
    instructions: preventSXXInstructions,
    image: '',
    slug
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore
  const imageExtension = formData.get('image')?.name?.split('.').pop();
  const imageName = `${slug}.${imageExtension}`;

  const stream = fs.createWriteStream(`public/images/foods/${imageName}`);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore
  const bufferedImage = await formData.get('image').arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      return {
        errorMessage: 'Save image fail'
      };
    }
  });

  meal.image = `/images/foods/${imageName}`;

  await createMeal(meal);

  redirect('/meals');
};

export { handleSubmitForm };
