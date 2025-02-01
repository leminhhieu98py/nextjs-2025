import sqlite from 'better-sqlite3';

const db = sqlite('training.db');

const createUser = async (user) => {
  const result = db
    .prepare(
      `
      INSERT INTO users 
        (email, password) 
      VALUES 
        (@email, @password)
      `
    )
    .run(user);

  return result.lastInsertRowid;
};

export { createUser };
