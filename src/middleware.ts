import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)','/dashboard/admin(.*)']);
const isPublicRoute = createRouteMatcher(['/','/sig-in(.*)','/sign-up(.*),',"/api/webhook/register"]);
const isAuthRoute = createRouteMatcher(['/sign-in(.*)','/sign-up(.*)']);

export default clerkMiddleware(
  async (auth,req) => {
    const { userId, sessionClaims } = await auth()

  if(!userId && isProtectedRoute(req)){
    return NextResponse.redirect(new URL('/sign-in',req.url));
  }

  if(userId){
    try {
      const role = sessionClaims?.metadata.role;

      // redirect to admin dashboard if user is admin
      if( role === 'admin' && req.nextUrl.pathname === '/dashboard'){
        return NextResponse.redirect(new URL('/admin/dashboard',req.url));
      }

      // redirect to user dashboard if user is not admin
      if( role !== 'admin' && isAdminRoute(req)){
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // redirect authenticated user to dashboard
      if(isAuthRoute(req)){
        return NextResponse.redirect(
          new URL(
            role === 'admin' ? '/admin/dashboard' : '/dashboard',
            req.url
          )
        )
      }


    } catch (error) {
      console.error(error);
    }

  }

}
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};