import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

// /video/{id}/analysis
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
export default authMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api (API routes)
     */
    "/((?!static|.*\\..*|_next|favicon.ico|api).*)",
  ],
};
