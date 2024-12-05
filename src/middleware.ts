import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)','/dashboard/admin(.*)']);
const isPublicRoute = createRouteMatcher(['/','/login(.*)','/signup(.*)']);

export default clerkMiddleware(async (auth,req) => {

  if(!isPublicRoute(req) && isProtectedRoute(req)) await auth.protect();

  if(isAdminRoute(req)) {
    await auth.protect({role: 'admin'});
  }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};