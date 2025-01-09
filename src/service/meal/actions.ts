'use server';

import { Meal } from '@/components/meals-grid/type';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';
import { createMeal } from './services';
import { redirect } from 'next/navigation';

const handleSubmitForm = async (formData: FormData) => {
  const slug = slugify(formData.get('title')?.toString() || '', { lower: true });
  const preventSXXInstructions = xss(formData.get('instructions')?.toString() || '');
  const imageExtension = formData.get('image')?.name?.split('.').pop();
  const imageName = `${slug}.${imageExtension}`;

  const stream = fs.createWriteStream(`public/images/foods/${imageName}`);
  const bufferedImage = await formData.get('image').arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Save image fail');
    }
  });

  const meal: Omit<Meal, 'id'> = {
    creator: formData.get('name')?.toString() || '',
    creator_email: formData.get('email')?.toString() || '',
    title: formData.get('title')?.toString() || '',
    summary: formData.get('summary')?.toString() || '',
    instructions: preventSXXInstructions,
    image: `/images/foods/${imageName}`,
    slug
  };

  await createMeal(meal);

  redirect('/meals');
};

export { handleSubmitForm };
