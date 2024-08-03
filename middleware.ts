import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const protectedRoutes= createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)'
])
 
export default clerkMiddleware((auth,req) => {
    if(protectedRoutes(req)) auth().protect();
  return NextResponse.next();
});
 

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};