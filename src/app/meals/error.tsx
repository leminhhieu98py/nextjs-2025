'use client';

import type { Error } from '@/typings/common';

export default function Error({ error }: Error) {
  return (
    <main className="error">
      <h1>An error occured. Please try again later</h1>
      <p>Error message: {JSON.stringify(error.message)}</p>
    </main>
  );
}
