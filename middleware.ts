// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

// // /video/{id}/analysis
// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// export default auth();

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next
//      * - static (static files)
//      * - favicon.ico (favicon file)
//      * - public (public files)
//      * - api (API routes)
//      */
//     "/((?!static|.*\\..*|_next|favicon.ico|api).*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// /video/{id}/analysis
const isProtectedRoute = createRouteMatcher(["/video(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
