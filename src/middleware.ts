/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextResponse } from 'next/server';

// @ts-ignore
export function middleware(request) {
  console.log('middleware request', request);

  return NextResponse.next();
}
