import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('middleware request', request);

  return NextResponse.next();
}
