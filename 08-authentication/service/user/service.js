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

  // TODO: invoke function createSession

  return result.lastInsertRowid;
};

export { createUser };
