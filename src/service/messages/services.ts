import sql from 'better-sqlite3';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();
/* eslint-disable @typescript-eslint/no-explicit-any */
export function addMessage(message: any) {
  console.log('addMessage', message);
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

export function getMessages() {
  console.log('Fetching messages from db');
  return db.prepare('SELECT * FROM messages').all();
}
