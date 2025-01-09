import { Meal } from '@/components/meals-grid/type';
import sql from 'better-sqlite3';

const db = sql('meals.db');

const getMeals = () => {
  return db.prepare('SELECT * FROM meals').all() as Meal[];
};

const getMealBySlug = (slug: string) => {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal;
};

const createMeal = async (meal: Omit<Meal, 'id'>) => {
  return db
    .prepare(
      `
    INSERT INTO meals 
      (title, summary, instructions, creator, creator_email, image, slug) 
    VALUES 
      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
    )
    .run(meal);
};

export { getMeals, getMealBySlug, createMeal };
