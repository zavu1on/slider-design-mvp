import { type NextRequest, NextResponse } from 'next/server';
import { auth, isRequestWithAuth } from '@/entities/auth';

export default auth((request: NextRequest) => {
  if (!isRequestWithAuth(request) && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(
      new URL(
        `/login?callbackUrl=${request.nextUrl.href}`,
        request.nextUrl.origin
      )
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/', '/login', '/profile', '/slides', '/slides/:path*'],
};
