import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
let pathredirectAfterAuth = ["/login"];
let pathredirectAfterAuthProtect = ["/"];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  let cookie = request.cookies.get("auth");

  if (pathredirectAfterAuth.includes(pathname) && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathredirectAfterAuthProtect.includes(pathname) && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png).*)"],
};
