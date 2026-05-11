import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/signin', '/signup', '/forgot-password', '/reset-password', '/verify'];
const ONBOARDING_ROUTES = ['/welcome', '/kyc', '/kyb', '/organization', '/wallet-setup'];

function isDemoAuthenticated(request: NextRequest): boolean {
  return request.cookies.has('cuboid-demo-session');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get('cuboid-access-token')?.value;

  // Allow demo sessions
  if (isDemoAuthenticated(request)) {
    return NextResponse.next();
  }

  if (!token) {
    // Redirect to signin if not authenticated
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Allow onboarding routes for authenticated users
  if (ONBOARDING_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\.png$|.*\.svg$).*)',
  ],
};
