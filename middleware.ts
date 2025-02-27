import { authMiddleware } from "@clerk/nextjs";

// /video/{id}/analysis
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/api/webhook"],
  debug: true,
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Optional: Allow images to be accessed publicly
    "/(api|trpc)(.*)",
  ],
};
