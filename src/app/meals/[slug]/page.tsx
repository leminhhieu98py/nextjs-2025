import Image from 'next/image';
import classes from './page.module.css';
import { getMealBySlug } from '@/service/meal';
import { Suspense } from 'react';
import { Loading } from '@/components/loading';
import { Meal } from '@/components/meals-grid/type';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

const MealDetailUi = async ({ slug }: { slug: string }) => {
  const meal: Meal | undefined = await getMealBySlug(slug);

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.slug} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions.replace(/\n/g, '<br />') }}
        ></p>
      </main>
    </>
  );
};

const MealDetail = async ({ params }: Props) => {
  const { slug } = params;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <MealDetailUi slug={slug} />
      </Suspense>
    </>
  );
};

export default MealDetail;
