import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// /video/{id}/analysis
const isProtectedRoute = createRouteMatcher(["/video(.*)"]);

export default clerkMiddleware({
  // Ignore routes that don't require authentication
  ignoredRoutes: ["/api/webhook"],
  // Debug mode
  debug: true,
  beforeAuth: (req) => {
    // Check if the route requires authentication
    if (isProtectedRoute(req)) {
      return;
    }
  },
  afterAuth: (auth, req) => {
    const { userId } = auth;
    // If the user is not signed in and the route requires authentication
    if (!userId && isProtectedRoute(req)) {
      return auth.redirectToSignIn();
    }
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
