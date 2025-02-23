import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define protected paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/api/protected',
];

export default withAuth(
  function middleware(req) {
    const response = NextResponse.next();

    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), screen-wake-lock=(), accelerometer=(), gyroscope=()'
    );

    if (process.env.NODE_ENV === 'production') {
      response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
      );
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Check if the path requires authentication
        const path = req.nextUrl.pathname;
        const isProtectedPath = protectedPaths.some(
          (protectedPath) => path.startsWith(protectedPath)
        );

        // Allow access to non-protected paths
        if (!isProtectedPath) return true;

        // Require token for protected paths
        return !!token;
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

// Specify which paths should be processed by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};