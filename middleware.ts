import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// /video/{id}/analysis
const isProtectedRoute = createRouteMatcher(["/video(.*)"]);

export default clerkMiddleware({
  publicRoutes: ["/api/webhook", "/", "/sign-in"],
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
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Optional: Allow images to be accessed publicly
    "/(api|trpc)(.*)",
  ],
};
