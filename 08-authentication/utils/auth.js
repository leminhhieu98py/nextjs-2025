// TODO: 4. invalidateSessionToken

import { cookies } from 'next/headers';
import { cache } from 'react';

import { Lucia, TimeSpan } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import sqlite from 'better-sqlite3';

const db = sqlite('training.db');
const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions'
});

const expireInstance = new TimeSpan(10, 'm'); // 10 minutes

const lucia = new Lucia(adapter, {
  sessionExpiresIn: expireInstance,
  sessionCookie: {
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
});

const validateAuth = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null
    };
  }

  const result = await lucia.validateSession(sessionId);

  // next.js throws when you attempt to set cookie when rendering page so we're using try-catch here
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}
  return result;
});

export { lucia, validateAuth };
