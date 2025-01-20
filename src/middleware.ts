/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextResponse } from 'next/server';

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(request) {
  // console.log('middleware request', request);

  return NextResponse.next();
}
