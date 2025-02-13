// // // src/middleware.ts

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   async function middleware(req) {
//     if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
//         return NextResponse.rewrite(new URL('/login', req.url))
//     }

//     if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextauth.token) {
//       return NextResponse.rewrite(new URL('/api/auth/signin', req.url))
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

// export const config = { matcher: ["/admin/:path*", "/dashboard/:path*"] };



// src/middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Restrict /admin routes to ADMIN role only
    if (pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.rewrite(new URL('/login', req.url));
    }

    // Restrict /dashboard routes to logged-in users only
    if (pathname.startsWith("/dashboard") && !req.nextauth.token) {
      return NextResponse.rewrite(new URL('/login', req.url));
    }

    // Restrict /dashboard routes to ADMIN role only (teachers cannot access)
    if (pathname.startsWith("/dashboard") && req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.rewrite(new URL('/unauthorized', req.url)); // Redirect to an unauthorized page
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensure the user is authenticated
    },
  }
);

export const config = { matcher: ["/admin/:path*", "/dashboard/:path*"] };