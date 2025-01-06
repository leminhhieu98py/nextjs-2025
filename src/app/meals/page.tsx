import Link from 'next/link';

const Meals = () => {
  return (
    <div>
      Meals
      <Link href="/meals/share">Meal share</Link>
      <Link href="/meals/meal-1">Meal 1</Link>
      <Link href="/meals/meal-2">Meal 2</Link>
    </div>
  );
};

export default Meals;
