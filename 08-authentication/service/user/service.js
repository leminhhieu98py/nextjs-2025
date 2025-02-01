import sqlite from 'better-sqlite3';

const db = sqlite('training.db');

const createUser = (user) => {
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

const getUser = (email) => {
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
};

export { createUser, getUser };
