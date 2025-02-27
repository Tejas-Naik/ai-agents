import { NextResponse } from "next/server";
import { withClerkMiddleware } from "@clerk/nextjs/server";

// /video/{id}/analysis
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
export default withClerkMiddleware(() => {
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.*\\..*|_next).*)",
    // Optional: Allow images to be accessed publicly
    "/",
    "/(api|trpc)(.*)",
  ],
};
